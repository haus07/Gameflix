// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import api from '@/axios/axios';
import toast from 'react-hot-toast';


interface UserInfo {
  id:number
  username:string
  email: string;
  phone: string;
  roleId: number 
}

interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (accessToken: string) => Promise<void>; 
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
    const isAdmin = user?.roles?.map(role => role.name)
        .includes('admin')  
        || false;
    console.log(isAdmin)
    console.log(isAuthenticated)



  const logout = async () => {
    try {
      const response = await api.get('api/v1/auth/logout')
      if (response.data.message === 'success') {
        setUser(null)
        toast.success("Đăng xuất thành công")
      }
    }
    catch (error) {
      toast.error("Lỗi server")
    }
    }
    
  

  useEffect(() => {
    const checkAuth = async () => {
        try {
          console.log('testuser thanh cong do google')
          const response = await api.get('api/v1/auth/verify_login')
          setUser(response.data.data)
          console.log(user)
          console.log(response.data.data)
        } catch (error) {
          setUser(null)
        }
        finally {
          setIsLoading(false)
        }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, isLoading, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};