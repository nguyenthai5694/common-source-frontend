import { md5 } from '../encoding/md5';
import { base64Encode } from '../encoding/base64';
import { LICENSE_SCOPES } from '../utils/licenseScope';
import { LICENSING_MODELS } from '../utils/licensingModel';
var licenseVersion = '2';
function getClearLicenseString(details) {
  var _details$scope, _details$licensingMod;
  if (details.scope && !LICENSE_SCOPES.includes(details.scope)) {
    throw new Error('MUI: Invalid scope');
  }
  if (details.licensingModel && !LICENSING_MODELS.includes(details.licensingModel)) {
    throw new Error('MUI: Invalid sales model');
  }
  return "O=".concat(details.orderNumber, ",E=").concat(details.expiryDate.getTime(), ",S=").concat((_details$scope = details.scope) != null ? _details$scope : 'pro', ",LM=").concat((_details$licensingMod = details.licensingModel) != null ? _details$licensingMod : 'perpetual', ",KV=").concat(licenseVersion);
}
export function generateLicense(details) {
  var licenseStr = getClearLicenseString(details);
  return "".concat(md5(base64Encode(licenseStr))).concat(base64Encode(licenseStr));
}