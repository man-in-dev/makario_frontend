import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin';
}

export interface AdminAuthContextType {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

// Dummy admin credentials
const DUMMY_ADMIN = {
  id: 'admin_001',
  name: 'Admin User',
  email: 'admin@makario.com',
  password: 'admin@123', // Dummy password (should be hashed in real app)
  role: 'admin' as const,
};

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load admin from token on mount
  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const token = localStorage.getItem('makario_admin_token');
        const adminData = localStorage.getItem('makario_admin');

        if (token && adminData) {
          try {
            const parsedAdmin = JSON.parse(adminData);
            setAdmin(parsedAdmin);
          } catch (e) {
            // Invalid stored data
            localStorage.removeItem('makario_admin_token');
            localStorage.removeItem('makario_admin');
          }
        }
      } catch (error) {
        console.log('Error loading admin:', error);
        localStorage.removeItem('makario_admin_token');
        localStorage.removeItem('makario_admin');
      } finally {
        setIsLoading(false);
      }
    };

    loadAdmin();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Check against dummy admin credentials
      if (email === DUMMY_ADMIN.email && password === DUMMY_ADMIN.password) {
        const adminUser: AdminUser = {
          id: DUMMY_ADMIN.id,
          name: DUMMY_ADMIN.name,
          email: DUMMY_ADMIN.email,
          role: DUMMY_ADMIN.role,
        };

        // Create a simple token
        const token = btoa(JSON.stringify({ email, timestamp: Date.now() }));

        // Store in localStorage
        localStorage.setItem('makario_admin_token', token);
        localStorage.setItem('makario_admin', JSON.stringify(adminUser));

        setAdmin(adminUser);
        return {
          success: true,
          message: 'Admin login successful',
        };
      } else {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }
    } catch (error: any) {
      console.log('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('makario_admin_token');
    localStorage.removeItem('makario_admin');
    setAdmin(null);
  };

  const value: AdminAuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
};
