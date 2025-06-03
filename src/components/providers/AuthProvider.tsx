import { IUser } from '@src/api/auth/interface';
import { createContext, useContext, useState } from 'react';

interface AuthContextType {
  user: IUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

const AuthContext = createContext<null | AuthContextType>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>();

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be use within AuthProvider');

  return context;
};
