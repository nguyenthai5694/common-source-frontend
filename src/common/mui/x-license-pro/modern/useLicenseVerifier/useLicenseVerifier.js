import * as React from 'react';
import { verifyLicense } from '../verifyLicense/verifyLicense';
import { LicenseInfo } from '../utils/licenseInfo';
import { showExpiredLicenseKeyError, showInvalidLicenseKeyError, showMissingLicenseKeyError, showLicenseKeyPlanMismatchError, showExpiredPackageVersionError } from '../utils/licenseErrorMessageUtils';
import { LicenseStatus } from '../utils/licenseStatus';
export const sharedLicenseStatuses = {};
export function useLicenseVerifier(packageName, releaseInfo) {
  return React.useMemo(() => {
    const licenseKey = LicenseInfo.getLicenseKey();
    if (sharedLicenseStatuses[packageName] && sharedLicenseStatuses[packageName].key === licenseKey) {
      return sharedLicenseStatuses[packageName].status;
    }
    const acceptedScopes = packageName.includes('premium') ? ['premium'] : ['pro', 'premium'];
    const plan = packageName.includes('premium') ? 'Premium' : 'Pro';
    const licenseStatus = verifyLicense({
      releaseInfo,
      licenseKey,
      acceptedScopes,
      isProduction: process.env.NODE_ENV === 'production'
    });
    sharedLicenseStatuses[packageName] = {
      key: licenseKey,
      status: licenseStatus
    };
    const fullPackageName = `@mui/${packageName}`;
    if (licenseStatus === LicenseStatus.Invalid) {
      showInvalidLicenseKeyError();
    } else if (licenseStatus === LicenseStatus.OutOfScope) {
      showLicenseKeyPlanMismatchError();
    } else if (licenseStatus === LicenseStatus.NotFound) {
      showMissingLicenseKeyError({
        plan,
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