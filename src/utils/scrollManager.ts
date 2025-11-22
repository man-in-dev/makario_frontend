// Simple scroll lock manager to prevent conflicts
let scrollLockCount = 0;

export const lockScroll = () => {
  scrollLockCount++;
  if (scrollLockCount === 1) {
    // Save current scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollTop}px`;
  }
};

export const unlockScroll = () => {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    const scrollTop = parseInt(document.body.style.top || '0') * -1;
    document.body.style.overflow = 'unset';
    document.body.style.position = 'unset';
    document.body.style.width = 'unset';
    document.body.style.top = 'unset';
    window.scrollTo(0, scrollTop);
  }
};

export const resetScroll = () => {
  scrollLockCount = 0;
  document.body.style.overflow = 'unset';
  document.body.style.position = 'unset';
  document.body.style.width = 'unset';
  document.body.style.top = 'unset';
};
