import React, { useState } from 'react';
import { Dialog, DialogContent, DialogOverlay } from '../ui/dialog';
import { Login } from './Login';
import { Signup } from './Signup';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialView = 'login' 
}) => {
  const [view, setView] = useState<'login' | 'signup'>(initialView);

  const handleClose = () => {
    onClose();
    // Reset to login view when modal closes
    setTimeout(() => setView('login'), 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-md">
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
      </DialogContent>
    </Dialog>
  );
};