export function openWindowModeView(path, target='bunsyoWindow') {
  const { availWidth, availHeight } = window.screen;
  let width, height, top, left;

  if (availWidth > 1366) {
    width = availWidth - 200;
    left = 100;
  } else {
    width = availWidth;
    left = 0;
  }

  if (availHeight > 768) {
    height = availHeight - 100;
    top = 40;
  } else {
    height = availHeight;
    top = 0;
  }

  var windowFeatures = `resizable=1,scrollbars=1,status=1,width=${width},height=${height},top=${top},left=${left}`;

  window.open(`${path}`, target, windowFeatures);
}
