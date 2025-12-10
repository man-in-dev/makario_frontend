import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Login } from './Login';
import { Signup } from './Signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
  title?: string;
  subtitle?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialView = 'login',
  title,
  subtitle
}) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => setView(initialView), 300);
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 z-[99]"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full animate-in fade-in duration-200 relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-4 right-4 h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Custom Header */}
          {(title || subtitle) && (
            <div className="pt-6 px-6 pb-2 border-b border-gray-100">
              {title && (
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          
          {view === 'login' ? (
            <Login
              onSwitchToSignup={() => setView('signup')}
              onClose={handleClose}
            />
          ) : (
            <Signup
              onSwitchToLogin={() => setView('login')}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModal;
