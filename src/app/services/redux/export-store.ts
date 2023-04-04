interface StandardStoreOpts<S, E> {
  slice: S,
  epics?: E,
}

/**
 * TODO:
 * - remove 'any' type.
 */
export interface StandardStore {
  name: any,
  reducer: any,
  actions: any,
  epics?: any,
}

/**
 * Convinent method to export store config with consistent API.
 * @deprecated please use rxjs, react context instead.
 */
export function standardStore<S extends object, E>({ slice, epics }: StandardStoreOpts<S, E>) {
  return {
    ...slice,
    epics: epics || [],
  }
}