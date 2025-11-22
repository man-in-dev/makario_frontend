// Custom hook to safely manage body scroll lock
// Prevents conflicts when multiple components try to lock scroll

let scrollLockCount = 0;

export const useScrollLock = () => {
  const lock = () => {
    if (scrollLockCount === 0) {
      document.body.style.overflow = 'hidden';
    }
    scrollLockCount++;
  };

  const unlock = () => {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) {
      document.body.style.overflow = 'unset';
    }
  };

  return { lock, unlock };
};
