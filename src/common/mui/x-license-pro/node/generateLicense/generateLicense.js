"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLicense = generateLicense;
var _md = require("../encoding/md5");
var _base = require("../encoding/base64");
var _licenseScope = require("../utils/licenseScope");
var _licensingModel = require("../utils/licensingModel");
const licenseVersion = '2';
function getClearLicenseString(details) {
  if (details.scope && !_licenseScope.LICENSE_SCOPES.includes(details.scope)) {
    throw new Error('MUI: Invalid scope');
  }
  if (details.licensingModel && !_licensingModel.LICENSING_MODELS.includes(details.licensingModel)) {
    throw new Error('MUI: Invalid sales model');
  }
  return `O=${details.orderNumber},E=${details.expiryDate.getTime()},S=${details.scope ?? 'pro'},LM=${details.licensingModel ?? 'perpetual'},KV=${licenseVersion}`;
}
function generateLicense(details) {
  const licenseStr = getClearLicenseString(details);
  return `${(0, _md.md5)((0, _base.base64Encode)(licenseStr))}${(0, _base.base64Encode)(licenseStr)}`;
}