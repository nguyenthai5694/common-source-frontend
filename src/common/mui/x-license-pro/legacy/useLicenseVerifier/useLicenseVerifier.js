import * as React from 'react';
import { verifyLicense } from '../verifyLicense/verifyLicense';
import { LicenseInfo } from '../utils/licenseInfo';
import { showExpiredLicenseKeyError, showInvalidLicenseKeyError, showMissingLicenseKeyError, showLicenseKeyPlanMismatchError, showExpiredPackageVersionError } from '../utils/licenseErrorMessageUtils';
import { LicenseStatus } from '../utils/licenseStatus';
export var sharedLicenseStatuses = {};
export function useLicenseVerifier(packageName, releaseInfo) {
  return React.useMemo(function () {
    var licenseKey = LicenseInfo.getLicenseKey();
    if (sharedLicenseStatuses[packageName] && sharedLicenseStatuses[packageName].key === licenseKey) {
      return sharedLicenseStatuses[packageName].status;
    }
    var acceptedScopes = packageName.includes('premium') ? ['premium'] : ['pro', 'premium'];
    var plan = packageName.includes('premium') ? 'Premium' : 'Pro';
    var licenseStatus = verifyLicense({
      releaseInfo: releaseInfo,
      licenseKey: licenseKey,
      acceptedScopes: acceptedScopes,
      isProduction: process.env.NODE_ENV === 'production'
    });
    sharedLicenseStatuses[packageName] = {
      key: licenseKey,
      status: licenseStatus
    };
    var fullPackageName = "@mui/".concat(packageName);
    if (licenseStatus === LicenseStatus.Invalid) {
      showInvalidLicenseKeyError();
    } else if (licenseStatus === LicenseStatus.OutOfScope) {
      showLicenseKeyPlanMismatchError();
    } else if (licenseStatus === LicenseStatus.NotFound) {
      showMissingLicenseKeyError({
        plan: plan,
        packageName: fullPackageName
      });
    } else if (licenseStatus === LicenseStatus.Expired) {
      showExpiredLicenseKeyError();
    } else if (licenseStatus === LicenseStatus.ExpiredVersion) {
      showExpiredPackageVersionError({
        packageName: fullPackageName
      });
    }
    return licenseStatus;
  }, [packageName, releaseInfo]);
}