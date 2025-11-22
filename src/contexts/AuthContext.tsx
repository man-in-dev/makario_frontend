import React, { createContext, useContext, useState, useEffect } from 'react';
import { initDemoUser } from '../utils/initDemoUser';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  createdAt: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      // Initialize demo user on first load
      initDemoUser();
      
      const storedUser = localStorage.getItem('makario_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      
      // Find user with matching email and password
      const foundUser = registeredUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return { success: false, message: 'Invalid email or password' };
      }

      // Remove password from stored user data
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store user in localStorage
      localStorage.setItem('makario_user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);

      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      // Get existing users
      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      
      // Check if email already exists
      if (registeredUsers.some((u: any) => u.email === userData.email)) {
        return { success: false, message: 'Email already registered' };
      }

      // Create new user
      const newUser: AuthUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        pincode: userData.pincode,
        createdAt: new Date().toISOString(),
      };

      // Store with password (for login verification only)
      const userWithPassword = { ...newUser, password: userData.password };
      registeredUsers.push(userWithPassword);
      localStorage.setItem('makario_users', JSON.stringify(registeredUsers));

      // Store current user without password
      localStorage.setItem('makario_user', JSON.stringify(newUser));
      setUser(newUser);

      return { success: true, message: 'Signup successful' };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'An error occurred during signup' };
    }
  };

  const logout = () => {
    localStorage.removeItem('makario_user');
    setUser(null);
  };

  const updateProfile = async (data: Partial<AuthUser>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      // Update user in localStorage
      const updatedUser = { ...user, ...data };
      localStorage.setItem('makario_user', JSON.stringify(updatedUser));

      // Also update in registered users list
      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex] = { ...registeredUsers[userIndex], ...data };
        localStorage.setItem('makario_users', JSON.stringify(registeredUsers));
      }

      setUser(updatedUser);
      return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, message: 'An error occurred while updating profile' };
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
