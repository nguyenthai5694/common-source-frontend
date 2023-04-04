/**
 * Get previous data that was saved for backing screen purpose.
 *
 * Note: this method also clears session storage's item.
 *
 * @returns data: data that was saved for backing screen purpose.
 */
const listScreen = [
  'haikiikanbosearch',
  'offlineoutputlist',
];

const getDataBack = function (screen_id = '') {
  const dataBack = JSON.parse(sessionStorage.getItem('dataBack_' + screen_id));

  listScreen.forEach(item => {
    clearDataBack(item);
  })

  return dataBack;
};

/**
 *
 * @param dataBack data to save for backing screen purpose.
 */
const setDataBack = function (dataBack, screen_id = '') {
  sessionStorage.setItem('dataBack_' + screen_id, JSON.stringify(dataBack));
};

/**
 * Clear data that is served for backing screen purpose on session storage.
 */
const clearDataBack = function (screen_id = '') {
  sessionStorage.removeItem('dataBack_' + screen_id);
};

/**
 * Helper object for manipulating data that
 * will be used to render data on previous screen
 */
export const dataBackHelper = {
  getDataBack,
  setDataBack,
  clearDataBack,
};
