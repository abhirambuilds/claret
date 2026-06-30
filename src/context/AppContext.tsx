import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AppContextType {
  isAdminLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('claret_admin_logged_in') === 'true';
  });

  const login = useCallback((email: string, password: string) => {
    // Obfuscated fixed credentials for security (admin@Claret.com / Claret@admin477)
    const correctEmail = atob('YWRtaW5AQ2xhcmV0LmNvbQ==');
    const correctPassword = atob('Q2xhcmV0QGFkbWluNDc3');

    if (email.toLowerCase() === correctEmail.toLowerCase() && password === correctPassword) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('claret_admin_logged_in', 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('claret_admin_logged_in');
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAdminLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
