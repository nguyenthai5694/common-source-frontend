import { md5 } from '../encoding/md5';
import { base64Encode } from '../encoding/base64';
import { LICENSE_SCOPES } from '../utils/licenseScope';
import { LICENSING_MODELS } from '../utils/licensingModel';
const licenseVersion = '2';
function getClearLicenseString(details) {
  if (details.scope && !LICENSE_SCOPES.includes(details.scope)) {
    throw new Error('MUI: Invalid scope');
  }
  if (details.licensingModel && !LICENSING_MODELS.includes(details.licensingModel)) {
    throw new Error('MUI: Invalid sales model');
  }
  return `O=${details.orderNumber},E=${details.expiryDate.getTime()},S=${details.scope ?? 'pro'},LM=${details.licensingModel ?? 'perpetual'},KV=${licenseVersion}`;
}
export function generateLicense(details) {
  const licenseStr = getClearLicenseString(details);
  return `${md5(base64Encode(licenseStr))}${base64Encode(licenseStr)}`;
}