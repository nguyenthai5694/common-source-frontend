import { useState } from 'react';
import { handleLogout } from 'app/services/auth'
import { onConfirmBeforeLeave } from 'app/services/auth/confirm.service';

export function useLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const logout = () => {
    const onLogout = () => {
      setIsLoggingOut(true);

      handleLogout(null, () => setIsLoggingOut(false));
    }

    onConfirmBeforeLeave(onLogout);
  }

  return {
    isLoggingOut,
    logout,
  }
}
