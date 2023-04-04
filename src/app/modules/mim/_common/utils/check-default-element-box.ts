/**
 * Utility method
 * Check default value for select-box, check-box...
 */
export const checkDefaultElementBox = (data) => {
  return data ? [data] : [];
};

// data like '1/2/3/4', pattern here is '/'
export const checkDefaultElementBoxWithPattern = (data, pattern) => {
  return data ? (data.includes(pattern) ? data.split(pattern) : [data]) : [];
};

export const checkDefaultElementBoxWithPatternForComboReason = (data, pattern) => {
  return data ? (data.includes(pattern) ? data.split(pattern) : [data]) : [''];
};
