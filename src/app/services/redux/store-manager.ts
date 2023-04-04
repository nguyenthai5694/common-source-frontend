import { configureStore } from '@reduxjs/toolkit';
import { combineReducers, ReducersMapObject, Store } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { StandardStore } from './export-store';

/**
 * @deprecated please use rxjs, react context instead.
 */
export class StoreManager {
  private static store: Store;

  private static reducers: ReducersMapObject = {};

  private static epic$: BehaviorSubject<any>

  static initStore(rootStore: StandardStore[]): Store {
    if (StoreManager.store) {
      throw new Error('StoreManager.store already exists');
    }

    const rootReducers = {};

    rootStore.forEach(store => {
      rootReducers[store.name] = store.reducer;
    });

    StoreManager.appendReducers(rootReducers);

    const epicMiddleware = createEpicMiddleware();
    const store = configureStore({
      reducer: combineReducers(StoreManager.reducers),
      middleware: [epicMiddleware],
    });

    const epic$ = new BehaviorSubject(combineEpics() as any);
    const rootEpic = (action$, state$) => epic$.pipe(
      mergeMap(epic => epic(action$, state$)),
    );

    epicMiddleware.run(rootEpic as any);

    StoreManager.epic$ = epic$;
    StoreManager.store = store;

    return store;
  }

  static addStore(store: StandardStore) {
    if (store.reducer) {
      StoreManager.addReducers({ [store.name]: store.reducer });
    }

    if (store.epics) {
      StoreManager.addEpics(store.epics);
    }
  }

  /**
   * Mainly used to add async epic
   */
  private static addEpics(epics: Epic[]) {
    epics.forEach(epic => {
      StoreManager.epic$.next(epic);
    });
  }

  /**
   * Mainly used to add async reducer
   */
  private static addReducers(reducers) {
    StoreManager.appendReducers(reducers);

    StoreManager.store.replaceReducer(
      combineReducers(StoreManager.reducers),
    );
  }

  private static appendReducers(reducers) {
    Object.keys(reducers).forEach(reducerName => {
      if (StoreManager.reducers[reducerName]) {
        throw new Error(`Redeclare reducer for "${reducerName}".`
          + 'For better predictable store, override reducer is not allowed!');
      }

      StoreManager.reducers[reducerName] = reducers[reducerName];
    });
  }
}
