import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import AbandonedCheckouts from './pages/AbandonedCheckouts';
import Discounts from './pages/Discounts';
import Content from './pages/Content';
import Blog from './pages/Blog';
import Payments from './pages/Payments';
import Integrations from './pages/Integrations';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Support from './pages/Support';
import BlogCreate from './pages/BlogCreate';
import BlogEdit from './pages/BlogEdit';
import PageCreate from './pages/PageCreate';
import PageEdit from './pages/PageEdit';
import AdminLogin from './pages/AdminLogin';
import ProtectedAdminRoute from './ProtectedAdminRoute';

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Login Route - No protection needed */}
      <Route path="login" element={<AdminLogin />} />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} />
        <Route path="customers" element={<Customers />} />
        <Route path="abandoned-checkouts" element={<AbandonedCheckouts />} />
        <Route path="discounts" element={<Discounts />} />
        <Route path="content" element={<Content />} />
        <Route path="blog" element={<Blog />} />
        <Route path="payments" element={<Payments />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="support" element={<Support />} />
      </Route>

      {/* Blog Create/Edit Pages */}
      <Route
        path="blog/create"
        element={
          <ProtectedAdminRoute>
            <BlogCreate />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="blog/edit/:id"
        element={
          <ProtectedAdminRoute>
            <BlogEdit />
          </ProtectedAdminRoute>
        }
      />

      {/* Page Create/Edit Pages */}
      <Route
        path="content/create"
        element={
          <ProtectedAdminRoute>
            <PageCreate />
          </ProtectedAdminRoute>
        }
      />
      <Route
        path="content/edit/:id"
        element={
          <ProtectedAdminRoute>
            <PageEdit />
          </ProtectedAdminRoute>
        }
      />
    </Routes>
  );
}
