const ua = window.navigator.userAgent.toLowerCase()

export const isWindows = ua.indexOf('windows nt') !== -1
export const isMac = ua.indexOf('mac os x') !== -1
export const isIE = ua.indexOf('trident') !== -1
export const isEdge =
  ua.indexOf('edge') !== -1 ||
  ua.indexOf('edga') !== -1 ||
  ua.indexOf('edgios') !== -1
export const isChrome = ua.indexOf('chrome') !== -1