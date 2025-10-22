import { createRoot } from "react-dom/client";
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
root.render(<App />);

// Hide spinner after initial render with proper timing
setTimeout(hideSpinner, 100);
