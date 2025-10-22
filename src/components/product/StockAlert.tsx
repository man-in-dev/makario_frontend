import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';

interface StockAlertProps {
  stockQuantity: number;
}

export const StockAlert: React.FC<StockAlertProps> = ({ stockQuantity }) => {
  if (stockQuantity <= 0) return null;

  const getAlertStyle = () => {
    if (stockQuantity <= 3) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (stockQuantity <= 5) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    if (stockQuantity <= 10) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    return '';
  };

  const getMessage = () => {
    if (stockQuantity <= 3) {
      return `Hurry! Only ${stockQuantity} left`;
    }
    if (stockQuantity <= 5) {
      return `Only ${stockQuantity} left in stock`;
    }
    if (stockQuantity <= 10) {
      return `${stockQuantity} items remaining`;
    }
    return '';
  };

  const message = getMessage();
  if (!message) return null;

  return (
    <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded border ${getAlertStyle()} mt-1.5`}>
      {stockQuantity <= 3 ? (
        <AlertCircle className="w-3 h-3 md:w-3.5 md:h-3.5" />
      ) : (
        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
      )}
      <p className="text-xs md:text-[13px] font-medium leading-tight">{message}</p>
    </div>
  );
};