
let logoutNormal = false;

export function isLogoutNormal() {
  return logoutNormal;
}

export function handleLogout(
  onSuccess?: () => void,
  onFail?: () => void,
  isChunkLoadError?: boolean,
) {
  // Check logout from case chunk load error

  // Make sure unlock dae record before call api logout

}
