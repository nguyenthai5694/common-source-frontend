import _ from 'lodash';

export function generateDataUid<T>(data: T[]) {
  return data.map((val) => {
    return {
      ...val,
      uid: _.uniqueId('UID_'),
    };
  });
}
