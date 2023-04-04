// Internet Explorer response may have 'string' type so we need to parse
export const parseJSON = (error) => {
  return typeof error === 'string' ? JSON.parse(error) : error;
};
