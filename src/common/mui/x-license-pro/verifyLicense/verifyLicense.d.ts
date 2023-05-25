import { LicenseScope } from '../utils/licenseScope';
import { LicenseStatus } from '../utils/licenseStatus';

export declare function generateReleaseInfo(releaseDate?: Date): string;
export declare function verifyLicense({ releaseInfo, licenseKey, acceptedScopes, isProduction }: {
    releaseInfo: string;
    licenseKey: string | undefined;
    acceptedScopes: LicenseScope[];
    isProduction: boolean;
}): LicenseStatus;
