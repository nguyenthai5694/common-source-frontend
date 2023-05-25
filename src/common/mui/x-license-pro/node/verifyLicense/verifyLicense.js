"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateReleaseInfo = generateReleaseInfo;
exports.verifyLicense = verifyLicense;
var _base = require("../encoding/base64");
var _md = require("../encoding/md5");
var _licenseStatus = require("../utils/licenseStatus");
var _licenseScope = require("../utils/licenseScope");
var _licensingModel = require("../utils/licensingModel");
const getDefaultReleaseDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
function generateReleaseInfo(releaseDate = getDefaultReleaseDate()) {
  return (0, _base.base64Encode)(releaseDate.getTime().toString());
}
const expiryReg = /^.*EXPIRY=([0-9]+),.*$/;
/**
 * Format: ORDER:${orderNumber},EXPIRY=${expiryTimestamp},KEYVERSION=1
 */
const decodeLicenseVersion1 = license => {
  let expiryTimestamp;
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
    expiryTimestamp
  };
};

/**
 * Format: O=${orderNumber},E=${expiryTimestamp},S=${scope},LM=${licensingModel},KV=2`;
 */
const decodeLicenseVersion2 = license => {
  const licenseInfo = {
    scope: null,
    licensingModel: null,
    expiryTimestamp: null
  };
  license.split(',').map(token => token.split('=')).filter(el => el.length === 2).forEach(([key, value]) => {
    if (key === 'S') {
      licenseInfo.scope = value;
    }
    if (key === 'LM') {
      licenseInfo.licensingModel = value;
    }
    if (key === 'E') {
      const expiryTimestamp = parseInt(value, 10);
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
const decodeLicense = encodedLicense => {
  const license = (0, _base.base64Decode)(encodedLicense);
  if (license.includes('KEYVERSION=1')) {
    return decodeLicenseVersion1(license);
  }
  if (license.includes('KV=2')) {
    return decodeLicenseVersion2(license);
  }
  return null;
};
function verifyLicense({
  releaseInfo,
  licenseKey,
  acceptedScopes,
  isProduction
}) {
  if (!releaseInfo) {
    throw new Error('MUI: The release information is missing. Not able to validate license.');
  }
  if (!licenseKey) {
    return _licenseStatus.LicenseStatus.NotFound;
  }
  const hash = licenseKey.substr(0, 32);
  const encoded = licenseKey.substr(32);
  if (hash !== (0, _md.md5)(encoded)) {
    return _licenseStatus.LicenseStatus.Invalid;
  }
  const license = decodeLicense(encoded);
  if (license == null) {
    console.error('Error checking license. Key version not found!');
    return _licenseStatus.LicenseStatus.Invalid;
  }
  if (license.licensingModel == null || !_licensingModel.LICENSING_MODELS.includes(license.licensingModel)) {
    console.error('Error checking license. Sales model not found or invalid!');
    return _licenseStatus.LicenseStatus.Invalid;
  }
  if (license.expiryTimestamp == null) {
    console.error('Error checking license. Expiry timestamp not found or invalid!');
    return _licenseStatus.LicenseStatus.Invalid;
  }
  if (license.licensingModel === 'perpetual' || isProduction) {
    const pkgTimestamp = parseInt((0, _base.base64Decode)(releaseInfo), 10);
    if (Number.isNaN(pkgTimestamp)) {
      throw new Error('MUI: The release information is invalid. Not able to validate license.');
    }
    if (license.expiryTimestamp < pkgTimestamp) {
      return _licenseStatus.LicenseStatus.ExpiredVersion;
    }
  } else if (license.licensingModel === 'subscription') {
    if (license.expiryTimestamp < new Date().getTime()) {
      return _licenseStatus.LicenseStatus.Expired;
    }
  }
  if (license.scope == null || !_licenseScope.LICENSE_SCOPES.includes(license.scope)) {
    console.error('Error checking license. scope not found or invalid!');
    return _licenseStatus.LicenseStatus.Invalid;
  }
  if (!acceptedScopes.includes(license.scope)) {
    return _licenseStatus.LicenseStatus.OutOfScope;
  }
  return _licenseStatus.LicenseStatus.Valid;
}