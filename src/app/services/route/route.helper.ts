/**
 * @see https://stackoverflow.com/a/13419367
 */
export function parseQuery(queryString) {
  const query = {};

  if (queryString.length === 0) {
    return query;
  }

  const pairs = (
    queryString[0] === '?'
      ? queryString.substr(1)
      : queryString
  ).split('&');

  for (var i = 0; i < pairs.length; i++) {
    const [name, value] = pairs[i].split('=');

    query[decodeURIComponent(name)] = decodeURIComponent(value || '');
  }

  return query;
}

/**
 * Replace URL without trigger react router dom event
 */
export function replaceUrl(newUrl) {
  window.history.replaceState(null, null, newUrl);
}