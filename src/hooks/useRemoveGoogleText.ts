import { useEffect } from 'react';

/**
 * Hook to remove Google verification text that appears after page load
 * This handles text injected by browser extensions or cached scripts
 */
export const useRemoveGoogleText = () => {
  useEffect(() => {
    const removeGoogleText = () => {
      // Remove any text nodes containing google-site-verification
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );

      const nodesToRemove: Node[] = [];
      
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node.nodeValue && node.nodeValue.includes('google-site-verification')) {
          nodesToRemove.push(node);
        }
      }

      nodesToRemove.forEach(node => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      });

      // Also check for any divs or spans with this text
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        if (element.textContent && 
            element.textContent.includes('google-site-verification') &&
            element.id !== 'root') {
          element.remove();
        }
      });
    };

    // Run immediately
    removeGoogleText();

    // Run after a short delay to catch dynamically added content
    const timeout1 = setTimeout(removeGoogleText, 500);
    const timeout2 = setTimeout(removeGoogleText, 1000);
    const timeout3 = setTimeout(removeGoogleText, 2000);

    // Also run on DOM mutations
    const observer = new MutationObserver(removeGoogleText);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      observer.disconnect();
    };
  }, []);
};
