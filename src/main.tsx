import { createRoot } from "react-dom/client";
import { Suspense } from 'react';
import App from "./App.tsx";
import "./index.css";
import { initWebVitals, initImageOptimization } from "./utils/performance";

// Initialize performance monitoring
initWebVitals();
initImageOptimization();

// Enhanced loading spinner hide function
const hideSpinner = () => {
  const spinner = document.getElementById('loading');
  if (spinner) {
    // Add fade out animation before hiding
    spinner.style.opacity = '0';
    spinner.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => {
      spinner.style.display = 'none';
    }, 300);
  }
};

// Initialize React app
const root = createRoot(document.getElementById("root")!);
root.render(
  <Suspense fallback={<div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-golden"></div>
  </div>}>
    <App />
  </Suspense>
);

// Hide spinner after initial render with proper timing
setTimeout(hideSpinner, 100);
