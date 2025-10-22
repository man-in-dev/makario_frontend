import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  Eye,
  ArrowUpRight,
  Calendar,
  Filter
} from 'lucide-react';

// Mock data - In production, this would come from your API
const dashboardData = {
  stats: [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Orders',
      value: '1,249',
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Customers',
      value: '856',
      change: '+4.1%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Products',
      value: '124',
      change: '+2.4%',
      trend: 'up',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ],
  recentOrders: [
    {
      id: '#12345',
      customer: 'Amit Kumar',
      product: 'Premium Bihar Makhana - Classic',
      amount: '₹299',
      status: 'Delivered',
      date: '2024-01-15'
    },
    {
      id: '#12346',
      customer: 'Priya Sharma',
      product: 'Flavored Makhana - Roasted Masala',
      amount: '₹349',
      status: 'Shipped',
      date: '2024-01-14'
    },
    {
      id: '#12347',
      customer: 'Rahul Singh',
      product: 'Organic Makhana - Natural',
      amount: '₹399',
      status: 'Processing',
      date: '2024-01-14'
    },
    {
      id: '#12348',
      customer: 'Anita Devi',
      product: 'Premium Bihar Makhana - Jumbo',
      amount: '₹449',
      status: 'Pending',
      date: '2024-01-13'
    }
  ],
  topProducts: [
    {
      name: 'Premium Bihar Makhana - Classic',
      sales: 245,
      revenue: '₹73,255',
      stock: 89
    },
    {
      name: 'Flavored Makhana - Roasted Masala',
      sales: 189,
      revenue: '₹65,961',
      stock: 156
    },
    {
      name: 'Organic Makhana - Natural',
      sales: 167,
      revenue: '₹66,633',
      stock: 78
    },
    {
      name: 'Premium Bihar Makhana - Jumbo',
      sales: 134,
      revenue: '₹60,166',
      stock: 234
    }
  ]
};

const AdminDashboard: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, index) => (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/orders">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">{order.id}</span>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-900 font-medium">{order.customer}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{order.amount}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/products">
                <ArrowUpRight className="w-4 h-4 mr-2" />
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">{product.sales} sales</span>
                      <span className="text-xs text-gray-500">Stock: {product.stock}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{product.revenue}</p>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 100 ? 'bg-green-100 text-green-700' : 
                      product.stock > 50 ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 100 ? 'In Stock' : product.stock > 50 ? 'Low Stock' : 'Critical'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild className="h-16 flex-col gap-2">
              <Link to="/admin/products/add">
                <Package className="w-5 h-5" />
                Add Product
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-16 flex-col gap-2">
              <Link to="/admin/orders">
                <ShoppingCart className="w-5 h-5" />
                View Orders
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-16 flex-col gap-2">
              <Link to="/admin/customers">
                <Users className="w-5 h-5" />
                Customers
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-16 flex-col gap-2">
              <Link to="/admin/analytics">
                <TrendingUp className="w-5 h-5" />
                Analytics
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;