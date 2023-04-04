// For more information, please refer C.17
import { getCurrentRouteId } from 'app/services/route';

interface Storage {
  setItem(k: string, v: string): void;
  getItem(k: string): any;
  removeItem(k: string): void;
}

/**
 * How it work: if data is not empty, save and return data immediately,
 * otherwise get data from storage or use `defaultValue`.
 * 
 * NOTE:
 * - the screen that use this function must have an unique id(configure in route).
 * 
 * @param rawKey Unique key in the current screen.
 * @param data It only support data that can be stringify.
 * Eg: string, number, array, simple POJO(Eg: { foo: 'bar' }).
 * @param defaultValue Default value will be returned when data is not found in storage.
 * @param storage Storage driver, use sessionStorage by default.
 */
export function useData<T>(
  rawKey: string,
  data: T,
  defaultValue = {},
  storage: Storage = window.sessionStorage,
): T {
  const key = getDataKey(rawKey);

  if (!_.isEmpty(data)) {
    storage.setItem(key, JSON.stringify(data));

    return data;
  }

  const dataFromStorage = storage.getItem(key);

  if (!dataFromStorage) {
    return defaultValue as T;
  }

  return JSON.parse(dataFromStorage);
}

export function deleteData(
  rawKey: string,
  storage: Storage = window.sessionStorage,
) {
  const key = getDataKey(rawKey);

  storage.removeItem(key);
}

function getDataKey(rawKey: string) {
  return `data:${getCurrentRouteId()}:${rawKey}`;
}