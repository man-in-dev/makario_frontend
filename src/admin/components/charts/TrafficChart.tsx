import React from 'react';

export default function TrafficChart() {
  const trafficData = [
    { name: 'Direct', value: 35, color: '#1a4d3e' },
    { name: 'Organic', value: 28, color: '#d4af37' },
    { name: 'Social', value: 22, color: '#f4d03f' },
    { name: 'Paid', value: 15, color: '#0f3d2f' },
  ];

  const total = trafficData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const pieSegments = trafficData.map((item) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);

    const x1 = 100 + 80 * Math.cos(startRadians);
    const y1 = 100 + 80 * Math.sin(startRadians);
    const x2 = 100 + 80 * Math.cos(endRadians);
    const y2 = 100 + 80 * Math.sin(endRadians);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;

    currentAngle = endAngle;

    return { ...item, pathData };
  });

  return (
    <div className="space-y-4">
      {/* SVG Pie Chart */}
      <svg viewBox="0 0 200 200" className="w-full h-48">
        {pieSegments.map((segment, index) => (
          <path
            key={index}
            d={segment.pathData}
            fill={segment.color}
            className="hover:opacity-80 transition-opacity cursor-pointer"
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="space-y-2">
        {trafficData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-700">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
