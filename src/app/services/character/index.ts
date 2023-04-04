export function convertFullWidthToHalfWidth(str = '') {
  return str.replace(/[！-～]/g, r => String.fromCharCode(r.charCodeAt(0) - 0xFEE0));
}
