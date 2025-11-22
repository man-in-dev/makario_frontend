import React, { createContext, useContext, useRef, useCallback } from 'react';

interface ScrollLockContextType {
  lock: (source: string) => void;
  unlock: (source: string) => void;
}

const ScrollLockContext = createContext<ScrollLockContextType | undefined>(undefined);

let scrollLockSources = new Set<string>();

export const useScrollLock = () => {
  const context = useContext(ScrollLockContext);
  if (context === undefined) {
    throw new Error('useScrollLock must be used within a ScrollLockProvider');
  }
  return context;
};

export const ScrollLockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lockRef = useRef(false);

  const lock = useCallback((source: string) => {
    scrollLockSources.add(source);
    if (!lockRef.current && scrollLockSources.size > 0) {
      document.body.style.overflow = 'hidden';
      lockRef.current = true;
    }
  }, []);

  const unlock = useCallback((source: string) => {
    scrollLockSources.delete(source);
    if (lockRef.current && scrollLockSources.size === 0) {
      document.body.style.overflow = 'unset';
      lockRef.current = false;
    }
  }, []);

  return (
    <ScrollLockContext.Provider value={{ lock, unlock }}>
      {children}
    </ScrollLockContext.Provider>
  );
};
