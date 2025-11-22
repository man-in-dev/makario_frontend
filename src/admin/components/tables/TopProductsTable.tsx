import React from 'react';

export default function TopProductsTable() {
  const products = [
    {
      id: 1,
      name: 'Classic Makhana (500g)',
      image: '🥜',
      category: 'Premium',
      revenue: '₹45,670',
      units: '234 units',
    },
    {
      id: 2,
      name: 'Organic Makhana (1kg)',
      image: '🥜',
      category: 'Organic',
      revenue: '₹38,450',
      units: '156 units',
    },
    {
      id: 3,
      name: 'Roasted & Salted (300g)',
      image: '🥜',
      category: 'Flavored',
      revenue: '₹32,180',
      units: '189 units',
    },
    {
      id: 4,
      name: 'Caramel Makhana (250g)',
      image: '🥜',
      category: 'Premium',
      revenue: '₹28,900',
      units: '145 units',
    },
    {
      id: 5,
      name: 'Spicy Masala Mix (400g)',
      image: '🥜',
      category: 'Flavored',
      revenue: '₹22,340',
      units: '112 units',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Revenue
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Units Sold
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{product.image}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {product.name}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-semibold text-gray-900">
                  {product.revenue}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm text-gray-600">{product.units}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
