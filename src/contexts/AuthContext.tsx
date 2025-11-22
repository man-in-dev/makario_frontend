import React, { createContext, useContext, useState, useEffect } from 'react';
import { initDemoUser } from '../utils/initDemoUser';

export interface UserAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  label: string; // home, work, other
  isDefault: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  addresses?: UserAddress[];
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
  addAddress: (address: Omit<UserAddress, 'id'>) => Promise<{ success: boolean; message: string }>;
  updateAddress: (id: string, address: Omit<UserAddress, 'id'>) => Promise<{ success: boolean; message: string }>;
  deleteAddress: (id: string) => Promise<{ success: boolean; message: string }>;
  setDefaultAddress: (id: string) => Promise<{ success: boolean; message: string }>;
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
      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      
      const foundUser = registeredUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return { success: false, message: 'Invalid email or password' };
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      
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
      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      
      if (registeredUsers.some((u: any) => u.email === userData.email)) {
        return { success: false, message: 'Email already registered' };
      }

      const newUser: AuthUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        pincode: userData.pincode,
        addresses: [
          {
            id: '1',
            street: userData.address,
            city: userData.city,
            state: userData.state,
            pincode: userData.pincode,
            phone: userData.phone,
            label: 'home',
            isDefault: true,
          },
        ],
        createdAt: new Date().toISOString(),
      };

      const userWithPassword = { ...newUser, password: userData.password };
      registeredUsers.push(userWithPassword);
      localStorage.setItem('makario_users', JSON.stringify(registeredUsers));

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

      const updatedUser = { ...user, ...data };
      localStorage.setItem('makario_user', JSON.stringify(updatedUser));

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

  const addAddress = async (address: Omit<UserAddress, 'id'>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      const newAddress: UserAddress = {
        ...address,
        id: Date.now().toString(),
      };

      const addresses = user.addresses || [];
      const updatedAddresses = [...addresses, newAddress];

      const updatedUser = { ...user, addresses: updatedAddresses };
      localStorage.setItem('makario_user', JSON.stringify(updatedUser));

      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex].addresses = updatedAddresses;
        localStorage.setItem('makario_users', JSON.stringify(registeredUsers));
      }

      setUser(updatedUser);
      return { success: true, message: 'Address added successfully' };
    } catch (error) {
      console.error('Add address error:', error);
      return { success: false, message: 'An error occurred while adding address' };
    }
  };

  const updateAddress = async (id: string, address: Omit<UserAddress, 'id'>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      const addresses = user.addresses || [];
      const updatedAddresses = addresses.map(a => a.id === id ? { ...a, ...address } : a);

      const updatedUser = { ...user, addresses: updatedAddresses };
      localStorage.setItem('makario_user', JSON.stringify(updatedUser));

      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex].addresses = updatedAddresses;
        localStorage.setItem('makario_users', JSON.stringify(registeredUsers));
      }

      setUser(updatedUser);
      return { success: true, message: 'Address updated successfully' };
    } catch (error) {
      console.error('Update address error:', error);
      return { success: false, message: 'An error occurred while updating address' };
    }
  };

  const deleteAddress = async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      const addresses = user.addresses || [];
      if (addresses.length === 1) {
        return { success: false, message: 'You must have at least one address' };
      }

      const updatedAddresses = addresses.filter(a => a.id !== id);
      // If deleted address was default, set first address as default
      if (!updatedAddresses.some(a => a.isDefault)) {
        updatedAddresses[0].isDefault = true;
      }

      const updatedUser = { ...user, addresses: updatedAddresses };
      localStorage.setItem('makario_user', JSON.stringify(updatedUser));

      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex].addresses = updatedAddresses;
        localStorage.setItem('makario_users', JSON.stringify(registeredUsers));
      }

      setUser(updatedUser);
      return { success: true, message: 'Address deleted successfully' };
    } catch (error) {
      console.error('Delete address error:', error);
      return { success: false, message: 'An error occurred while deleting address' };
    }
  };

  const setDefaultAddress = async (id: string): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      const addresses = user.addresses || [];
      const updatedAddresses = addresses.map(a => ({
        ...a,
        isDefault: a.id === id,
      }));

      const updatedUser = { ...user, addresses: updatedAddresses };
      localStorage.setItem('makario_user', JSON.stringify(updatedUser));

      const registeredUsers = JSON.parse(localStorage.getItem('makario_users') || '[]');
      const userIndex = registeredUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        registeredUsers[userIndex].addresses = updatedAddresses;
        localStorage.setItem('makario_users', JSON.stringify(registeredUsers));
      }

      setUser(updatedUser);
      return { success: true, message: 'Default address updated successfully' };
    } catch (error) {
      console.error('Set default address error:', error);
      return { success: false, message: 'An error occurred while setting default address' };
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
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
