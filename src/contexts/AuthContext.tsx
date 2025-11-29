import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

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
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
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

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('makario_token');
        if (token) {
          // Verify token and get user profile
          const response = await api.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.data.user);
          } else {
            // Invalid token, clear it
            localStorage.removeItem('makario_token');
            localStorage.removeItem('makario_user');
          }
        }
      } catch (error: any) {
        console.log('Error loading user:', error);
        // Clear invalid token
        localStorage.removeItem('makario_token');
        localStorage.removeItem('makario_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store token and user
        localStorage.setItem('makario_token', token);
        localStorage.setItem('makario_user', JSON.stringify(user));
        setUser(user);

        return { success: true, message: response.data.message || 'Login successful' };
      } else {
        return { success: false, message: response.data.message || 'Login failed' };
      }
    } catch (error: any) {
      console.log('Login error:', error);
      const message = error.response?.data?.message || 'An error occurred during login';
      return { success: false, message };
    }
  };

  const signup = async (userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await api.post('/auth/register', userData);
      
      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Store token and user
        localStorage.setItem('makario_token', token);
        localStorage.setItem('makario_user', JSON.stringify(user));
        setUser(user);

        return { success: true, message: response.data.message || 'Signup successful' };
      } else {
        return { success: false, message: response.data.message || 'Signup failed' };
      }
    } catch (error: any) {
      console.log('Signup error:', error);
      const message = error.response?.data?.message || 'An error occurred during signup';
      return { success: false, message };
    }
  };

  const logout = () => {
    localStorage.removeItem('makario_token');
    localStorage.removeItem('makario_user');
    setUser(null);
  };

  const updateProfile = async (data: Partial<AuthUser>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      const response = await api.put('/auth/profile', data);
      
      if (response.data.success) {
        const updatedUser = response.data.data.user;
        localStorage.setItem('makario_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true, message: response.data.message || 'Profile updated successfully' };
      } else {
        return { success: false, message: response.data.message || 'Failed to update profile' };
      }
    } catch (error: any) {
      console.log('Update profile error:', error);
      const message = error.response?.data?.message || 'An error occurred while updating profile';
      return { success: false, message };
    }
  };

  const addAddress = async (address: Omit<UserAddress, 'id'>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      // For now, update profile with new address array
      // In a full implementation, you'd have a separate addresses endpoint
      const addresses = user.addresses || [];
      const newAddress: UserAddress = {
        ...address,
        id: Date.now().toString(),
      };
      const updatedAddresses = [...addresses, newAddress];

      const response = await api.put('/auth/profile', { addresses: updatedAddresses });
      
      if (response.data.success) {
        const updatedUser = response.data.data.user;
        localStorage.setItem('makario_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true, message: 'Address added successfully' };
      } else {
        return { success: false, message: 'Failed to add address' };
      }
    } catch (error: any) {
      console.log('Add address error:', error);
      const message = error.response?.data?.message || 'An error occurred while adding address';
      return { success: false, message };
    }
  };

  const updateAddress = async (id: string, address: Omit<UserAddress, 'id'>): Promise<{ success: boolean; message: string }> => {
    try {
      if (!user) {
        return { success: false, message: 'User not authenticated' };
      }

      const addresses = user.addresses || [];
      const updatedAddresses = addresses.map(a => a.id === id ? { ...a, ...address } : a);

      const response = await api.put('/auth/profile', { addresses: updatedAddresses });
      
      if (response.data.success) {
        const updatedUser = response.data.data.user;
        localStorage.setItem('makario_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true, message: 'Address updated successfully' };
      } else {
        return { success: false, message: 'Failed to update address' };
      }
    } catch (error: any) {
      console.log('Update address error:', error);
      const message = error.response?.data?.message || 'An error occurred while updating address';
      return { success: false, message };
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

      const response = await api.put('/auth/profile', { addresses: updatedAddresses });
      
      if (response.data.success) {
        const updatedUser = response.data.data.user;
        localStorage.setItem('makario_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true, message: 'Address deleted successfully' };
      } else {
        return { success: false, message: 'Failed to delete address' };
      }
    } catch (error: any) {
      console.log('Delete address error:', error);
      const message = error.response?.data?.message || 'An error occurred while deleting address';
      return { success: false, message };
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

      const response = await api.put('/auth/profile', { addresses: updatedAddresses });
      
      if (response.data.success) {
        const updatedUser = response.data.data.user;
        localStorage.setItem('makario_user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true, message: 'Default address updated successfully' };
      } else {
        return { success: false, message: 'Failed to update default address' };
      }
    } catch (error: any) {
      console.log('Set default address error:', error);
      const message = error.response?.data?.message || 'An error occurred while setting default address';
      return { success: false, message };
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
