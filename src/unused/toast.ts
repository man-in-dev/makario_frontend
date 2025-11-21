export interface ToastConfig {
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const showToast = (config: ToastConfig) => {
  // For now, using simple alert, but in production this would integrate with
  // a proper toast system like react-hot-toast or the shadcn toast component
  const message = config.description 
    ? `${config.title}: ${config.description}`
    : config.title;
  
  if (config.type === 'error') {
    console.error(message);
  } else {
    console.log(message);
  }
  
  alert(message);
};

export const toastSuccess = (title: string, description?: string) => 
  showToast({ title, description, type: 'success' });

export const toastError = (title: string, description?: string) => 
  showToast({ title, description, type: 'error' });

export const toastWarning = (title: string, description?: string) => 
  showToast({ title, description, type: 'warning' });

export const toastInfo = (title: string, description?: string) => 
  showToast({ title, description, type: 'info' });