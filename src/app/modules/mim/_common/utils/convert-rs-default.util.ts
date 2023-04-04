/**
 * This function is used to convert RS default value
 * If rsValue is '0', then it is converted to empty string
 * @param rsValue
 */
export const convertRsValue = (rsValue: any, defaulValue: any = '') => {
  if (rsValue === null) {
    return defaulValue;
  }

  return rsValue.toString() !== '0' ? rsValue : '';
};
