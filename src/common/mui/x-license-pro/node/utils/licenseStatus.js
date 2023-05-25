"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicenseStatus = void 0;
var LicenseStatus = /*#__PURE__*/function (LicenseStatus) {
  LicenseStatus["NotFound"] = "NotFound";
  LicenseStatus["Invalid"] = "Invalid";
  LicenseStatus["Expired"] = "Expired";
  LicenseStatus["ExpiredVersion"] = "ExpiredVersion";
  LicenseStatus["Valid"] = "Valid";
  LicenseStatus["OutOfScope"] = "OutOfScope";
  return LicenseStatus;
}(LicenseStatus || {});
exports.LicenseStatus = LicenseStatus;