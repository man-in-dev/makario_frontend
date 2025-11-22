import React from 'react';

export default function SalesChart() {
  // Simple chart visualization using CSS
  const data = [
    { day: 'Mon', sales: 45 },
    { day: 'Tue', sales: 62 },
    { day: 'Wed', sales: 55 },
    { day: 'Thu', sales: 78 },
    { day: 'Fri', sales: 88 },
    { day: 'Sat', sales: 95 },
    { day: 'Sun', sales: 70 },
  ];

  const maxSales = Math.max(...data.map((d) => d.sales));

  return (
    <div>
      <div className="flex items-end justify-between gap-2 h-64">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden relative">
              <div
                className="w-full bg-gradient-to-t from-[#d4af37] to-[#f4d03f] transition-all duration-300 hover:opacity-80"
                style={{
                  height: `${(item.sales / maxSales) * 200}px`,
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.day}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex justify-between items-center text-xs text-gray-600">
        <div>₹0</div>
        <div>₹50k</div>
        <div>₹100k</div>
      </div>
    </div>
  );
}
