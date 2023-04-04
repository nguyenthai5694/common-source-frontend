export function getCopyText(e) {
  return (window as any).clipboardData && (window as any).clipboardData.getData // for IE
    ? (window as any).clipboardData.getData('Text')
    : e.clipboardData && e.clipboardData.getData // for modern browser
      ? e.clipboardData.getData('text/plain')
      : '' // for other
}