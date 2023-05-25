import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { base64Decode, base64Encode } from '../encoding/base64';
import { md5 } from '../encoding/md5';
import { LicenseStatus } from '../utils/licenseStatus';
import { LICENSE_SCOPES } from '../utils/licenseScope';
import { LICENSING_MODELS } from '../utils/licensingModel';
var getDefaultReleaseDate = function getDefaultReleaseDate() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
export function generateReleaseInfo() {
  var releaseDate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultReleaseDate();
  return base64Encode(releaseDate.getTime().toString());
}
var expiryReg = /^.*EXPIRY=([0-9]+),.*$/;
/**
 * Format: ORDER:${orderNumber},EXPIRY=${expiryTimestamp},KEYVERSION=1
 */
var decodeLicenseVersion1 = function decodeLicenseVersion1(license) {
  var expiryTimestamp;
  try {
    expiryTimestamp = parseInt(license.match(expiryReg)[1], 10);
    if (!expiryTimestamp || Number.isNaN(expiryTimestamp)) {
      expiryTimestamp = null;
    }
  } catch (err) {
    expiryTimestamp = null;
  }
  return {
    scope: 'pro',
    licensingModel: 'perpetual',
    expiryTimestamp: expiryTimestamp
  };
};

/**
 * Format: O=${orderNumber},E=${expiryTimestamp},S=${scope},LM=${licensingModel},KV=2`;
 */
var decodeLicenseVersion2 = function decodeLicenseVersion2(license) {
  var licenseInfo = {
    scope: null,
    licensingModel: null,
    expiryTimestamp: null
  };
  license.split(',').map(function (token) {
    return token.split('=');
  }).filter(function (el) {
    return el.length === 2;
  }).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    if (key === 'S') {
      licenseInfo.scope = value;
    }
    if (key === 'LM') {
      licenseInfo.licensingModel = value;
    }
    if (key === 'E') {
      var expiryTimestamp = parseInt(value, 10);
      if (expiryTimestamp && !Number.isNaN(expiryTimestamp)) {
        licenseInfo.expiryTimestamp = expiryTimestamp;
      }
    }
  });
  return licenseInfo;
};

/**
 * Decode the license based on its key version and return a version-agnostic `MuiLicense` object.
 */
var decodeLicense = function decodeLicense(encodedLicense) {
  var license = base64Decode(encodedLicense);
  if (license.includes('KEYVERSION=1')) {
    return decodeLicenseVersion1(license);
  }
  if (license.includes('KV=2')) {
    return decodeLicenseVersion2(license);
  }
  return null;
};
export function verifyLicense(_ref3) {
  var releaseInfo = _ref3.releaseInfo,
    licenseKey = _ref3.licenseKey,
    acceptedScopes = _ref3.acceptedScopes,
    isProduction = _ref3.isProduction;
  if (!releaseInfo) {
    throw new Error('MUI: The release information is missing. Not able to validate license.');
  }
  if (!licenseKey) {
    return LicenseStatus.NotFound;
  }
  var hash = licenseKey.substr(0, 32);
  var encoded = licenseKey.substr(32);
  if (hash !== md5(encoded)) {
    return LicenseStatus.Invalid;
  }
  var license = decodeLicense(encoded);
  if (license == null) {
    console.error('Error checking license. Key version not found!');
    return LicenseStatus.Invalid;
  }
  if (license.licensingModel == null || !LICENSING_MODELS.includes(license.licensingModel)) {
    console.error('Error checking license. Sales model not found or invalid!');
    return LicenseStatus.Invalid;
  }
  if (license.expiryTimestamp == null) {
    console.error('Error checking license. Expiry timestamp not found or invalid!');
    return LicenseStatus.Invalid;
  }
  if (license.licensingModel === 'perpetual' || isProduction) {
    var pkgTimestamp = parseInt(base64Decode(releaseInfo), 10);
    if (Number.isNaN(pkgTimestamp)) {
      throw new Error('MUI: The release information is invalid. Not able to validate license.');
    }
    if (license.expiryTimestamp < pkgTimestamp) {
      return LicenseStatus.ExpiredVersion;
    }
  } else if (license.licensingModel === 'subscription') {
    if (license.expiryTimestamp < new Date().getTime()) {
      return LicenseStatus.Expired;
    }
  }
  if (license.scope == null || !LICENSE_SCOPES.includes(license.scope)) {
    console.error('Error checking license. scope not found or invalid!');
    return LicenseStatus.Invalid;
  }
  if (!acceptedScopes.includes(license.scope)) {
    return LicenseStatus.OutOfScope;
  }
  return LicenseStatus.Valid;
}