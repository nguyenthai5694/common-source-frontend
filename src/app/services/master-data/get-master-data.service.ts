import { Observable, ObservedValueOf, forkJoin } from 'rxjs';
// import { map, shareReplay } from 'rxjs/operators'
import { masterDataMap } from './master-data-map.config'

type MasterDataMap = typeof masterDataMap;

type MasterDataKeys = keyof typeof masterDataMap;

const _masterDataObsStore: { [k: string]: any } = {};

const _masterDataValueStore: { [k: string]: any } = {};

/**
 * DEFAULT_KEY is used as a key for getting master data having no arguments.
 */
const DEFAULT_KEY = 'soumu_dk_i2nd1';

function getSubKeyMasterData(args: any[]) {
  if (!args || args.length === 0) {
    return DEFAULT_KEY;
  }

  let subKey = '';

  for (const arg of args) {
    if (_.isString(arg) || _.isNumber(arg)) {
      subKey = `${subKey}_${arg}`;
      continue;
    }

    subKey = `${subKey}_${JSON.stringify(arg)}`;
  }

  return subKey || DEFAULT_KEY;
}

/**
 * Get master data by key with RxJS based API.
 */
export function getMasterData
  <
    K extends MasterDataKeys,
    R = ReturnType<MasterDataMap[K]>,
  >(key: K, ...args: any[]): R {
  const subKey = getSubKeyMasterData(args);

  if (!_masterDataObsStore[key]) {
    _masterDataValueStore[key] = {};
    _masterDataObsStore[key] = {};
  }

  if (_masterDataObsStore[key][subKey]) {
    return _masterDataObsStore[key][subKey];
  }

  // const obs$ = from(masterDataMap[key](args))
  //   .pipe(
  //     map(res => {
  //       _masterDataValueStore[key][subKey] = res;

  //       return res;
  //     }),
  //     shareReplay({ refCount: true }),
  //   );

  // _masterDataObsStore[key][subKey] = obs$;

  // return _masterDataObsStore[key][subKey];
}

/**
 * Convinent method to get list of master data.
 * 
 * TODO: narrow down type hint base on `masterDataKeys`.
 */
export function getListMasterData
  <
    K extends MasterDataKeys[],
    R = Observable<{ [key in MasterDataKeys]: ObservedValueOf<ReturnType<MasterDataMap[key]>> }>,
  >(masterDataKeys: K): R {
  const listObs = {};

  masterDataKeys.forEach(key => {
    listObs[key] = getMasterData(key);
  });

  return forkJoin(listObs) as any;
}

/**
 * Get master data by key in sync.
 * 
 * **Note**: For safety, before get master data with this function,
 * you HAVE TO ensure that it was loaded before!
 */
export function getMasterDataSync
  <
    K extends MasterDataKeys,
    R = ObservedValueOf<ReturnType<MasterDataMap[K]>>,
  >(key: K, ...args: any): R {
  const savedCollection = _masterDataValueStore[key];

  if (!savedCollection) {
    return null;
  }

  return savedCollection[getSubKeyMasterData(args)];
}
