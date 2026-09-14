import { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('dsa_auth', false);

  const login = useCallback(() => setIsLoggedIn(true), [setIsLoggedIn]);
  const logout = useCallback(() => setIsLoggedIn(false), [setIsLoggedIn]);

  const value = useMemo(
    () => ({ isLoggedIn, login, logout }),
    [isLoggedIn, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
