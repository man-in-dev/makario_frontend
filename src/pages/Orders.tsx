import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Orders: React.FC = () => {
  // Dummy orders data
  const orders = [
    {
      id: 'ORD001',
      product: 'Makhana 100g Pack of 1',
      date: '2025-09-01',
      status: 'Delivered',
      amount: 500,
    },
    {
      id: 'ORD002',
      product: 'Makhana 100g Pack of 2',
      date: '2025-09-15',
      status: 'Refunded',
      amount: 250,
    },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-golden">Order Management</h1>
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-golden/20">
          <table className="w-full text-sm bg-gradient-to-r from-golden/5 to-white rounded-xl shadow border border-golden/10">
            <thead>
              <tr className="bg-gradient-to-r from-golden to-heritage text-white">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b hover:bg-golden/10 transition-all duration-150">
                  <td className="p-3 font-semibold">{order.id}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3 text-green-600">₹{order.amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold shadow ${order.status === 'Refunded' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
