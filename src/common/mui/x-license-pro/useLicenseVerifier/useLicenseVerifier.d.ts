import { LicenseStatus } from '../utils/licenseStatus';

export type MuiCommercialPackageName = 'x-data-grid-pro' | 'x-data-grid-premium' | 'x-date-pickers-pro';
export declare const sharedLicenseStatuses: {
    [packageName in MuiCommercialPackageName]?: {
        key: string | undefined;
        status: LicenseStatus;
    };
};
export declare function useLicenseVerifier(packageName: MuiCommercialPackageName, releaseInfo: string): LicenseStatus;
