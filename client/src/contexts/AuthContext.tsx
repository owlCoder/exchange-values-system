import React, { createContext, useContext, useState } from 'react';
import ICurrentUser from '../interfaces/Auth/ICurrentUser';
import AuthProviderProps from '../props/AuthContextProps';
import AuthContextType from '../types/AuthContextType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(() => {
    // Initialize currentUser from local storage
    const storedUser: string | null = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Function to set the currentUser and expose it
  const setUser = (user: ICurrentUser | null) => {
    if (user) { 
      // Store the user in session or local storage
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }

    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};