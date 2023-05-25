/**
 * common/mui/x-license-pro v6.0.3
 *
 * @license MUI X Commercial
 * This source code is licensed under the commercial license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var _generateLicense = require('./generateLicense');

Object.keys(_generateLicense).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;

  if (key in exports && exports[key] === _generateLicense[key]) return;

  Object.defineProperty(exports, key, {
    enumerable: true,
    get() {
      return _generateLicense[key];
    },
  });
});
var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;

  if (key in exports && exports[key] === _utils[key]) return;

  Object.defineProperty(exports, key, {
    enumerable: true,
    get() {
      return _utils[key];
    },
  });
});
var _verifyLicense = require('./verifyLicense');

Object.keys(_verifyLicense).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;

  if (key in exports && exports[key] === _verifyLicense[key]) return;

  Object.defineProperty(exports, key, {
    enumerable: true,
    get() {
      return _verifyLicense[key];
    },
  });
});
var _useLicenseVerifier = require('./useLicenseVerifier');

Object.keys(_useLicenseVerifier).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;

  if (key in exports && exports[key] === _useLicenseVerifier[key]) return;

  Object.defineProperty(exports, key, {
    enumerable: true,
    get() {
      return _useLicenseVerifier[key];
    },
  });
});
var _Watermark = require('./Watermark');

Object.keys(_Watermark).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;

  if (key in exports && exports[key] === _Watermark[key]) return;

  Object.defineProperty(exports, key, {
    enumerable: true,
    get() {
      return _Watermark[key];
    },
  });
});