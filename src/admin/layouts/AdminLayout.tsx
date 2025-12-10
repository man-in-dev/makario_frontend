import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminTopBar from '../components/AdminTopBar';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-page flex h-screen bg-gray-50">
      {/* Sidebar - Fixed Position */}
      <div className={`fixed left-0 top-0 h-screen ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 z-40`}>
        <AdminSidebar isOpen={sidebarOpen} />
      </div>

      {/* Main Content with Sidebar Margin */}
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 flex flex-col overflow-hidden transition-all duration-300`}>
        {/* Top Bar */}
        <AdminTopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto px-6 pt-4 pb-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
