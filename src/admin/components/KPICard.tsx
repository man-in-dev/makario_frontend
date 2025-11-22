import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  icon: LucideIcon;
}

export default function KPICard({
  title,
  value,
  change,
  isPositive,
  period,
  icon: Icon,
}: KPICardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center gap-2 mt-3">
            <span
              className={`text-sm font-semibold ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {change}
            </span>
            <span className="text-xs text-gray-500">{period}</span>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#d4af37] to-[#f4d03f] p-3 rounded-lg">
          <Icon size={24} className="text-gray-800" />
        </div>
      </div>
    </div>
  );
}
