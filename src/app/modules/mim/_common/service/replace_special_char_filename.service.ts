/**
 * convert special character when input filename
 * @param mDefault
 * @param mFlag
 */

export default function ReplaceSpecialCharForFilename(e, formik, length = 10) {
  const inputName = e.target.name;
  var filename = e.target.value;

  filename = filename.replaceAll('\\', '￥');
  filename = filename.replaceAll('/', '／');
  filename = filename.replaceAll(':', '：');
  filename = filename.replaceAll('*', '＊');
  filename = filename.replaceAll('?', '？');
  filename = filename.replaceAll('"', '“');
  filename = filename.replaceAll('<', '＜');
  filename = filename.replaceAll('>', '＞');
  filename = filename.replaceAll('|', '｜');

  formik.current.setFieldValue(inputName, filename.substring(0, length));
}
