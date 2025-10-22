import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Download,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 245680,
      revenueChange: 12.5,
      totalOrders: 1249,
      ordersChange: 8.2,
      totalCustomers: 856,
      customersChange: 4.1,
      avgOrderValue: 197,
      avgOrderValueChange: -2.3
    },
    salesData: [
      { month: 'Jan', revenue: 45000, orders: 180 },
      { month: 'Feb', revenue: 52000, orders: 210 },
      { month: 'Mar', revenue: 48000, orders: 195 },
      { month: 'Apr', revenue: 61000, orders: 245 },
      { month: 'May', revenue: 55000, orders: 220 },
      { month: 'Jun', revenue: 67000, orders: 270 }
    ],
    topProducts: [
      { 
        name: 'Premium Bihar Makhana - Classic',
        sales: 245,
        revenue: 73255,
        growth: 15.2
      },
      { 
        name: 'Flavored Makhana - Roasted Masala',
        sales: 189,
        revenue: 65961,
        growth: 8.7
      },
      { 
        name: 'Organic Makhana - Natural',
        sales: 167,
        revenue: 66633,
        growth: 12.3
      },
      { 
        name: 'Premium Bihar Makhana - Jumbo',
        sales: 134,
        revenue: 60166,
        growth: -2.1
      }
    ],
    customerSegments: [
      { segment: 'New Customers', count: 234, percentage: 27.3, revenue: 46800 },
      { segment: 'Returning Customers', count: 412, percentage: 48.1, revenue: 125600 },
      { segment: 'VIP Customers', count: 89, percentage: 10.4, revenue: 89200 },
      { segment: 'Inactive Customers', count: 121, percentage: 14.2, revenue: 0 }
    ],
    recentActivity: [
      {
        type: 'order',
        message: 'New order #ORD-12349 from Amit Kumar',
        time: '2 mins ago',
        value: '₹399'
      },
      {
        type: 'customer',
        message: 'New customer registration: Priya Singh',
        time: '5 mins ago',
        value: 'Mumbai'
      },
      {
        type: 'product',
        message: 'Low stock alert: Premium Makhana - Classic',
        time: '10 mins ago',
        value: '8 units'
      },
      {
        type: 'order',
        message: 'Order #ORD-12345 shipped to Delhi',
        time: '15 mins ago',
        value: '₹599'
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights.</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{analyticsData.overview.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    +{analyticsData.overview.revenueChange}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalOrders}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    +{analyticsData.overview.ordersChange}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalCustomers}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-green-600">
                    +{analyticsData.overview.customersChange}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{analyticsData.overview.avgOrderValue}</p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm font-medium text-red-600">
                    {analyticsData.overview.avgOrderValueChange}%
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-orange-50">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Sales Chart Placeholder</p>
                <p className="text-sm text-gray-400">Chart library integration required</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Top Products</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900 line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{product.sales} sales</span>
                      <div className="flex items-center">
                        {product.growth > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${product.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.growth > 0 ? '+' : ''}{product.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{product.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.customerSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{segment.segment}</p>
                      <Badge variant="secondary" className="text-xs">
                        {segment.percentage}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{segment.count} customers</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">₹{segment.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'order' ? 'bg-green-100' :
                    activity.type === 'customer' ? 'bg-blue-100' : 'bg-yellow-100'
                  }`}>
                    {activity.type === 'order' ? (
                      <ShoppingCart className="w-4 h-4 text-green-600" />
                    ) : activity.type === 'customer' ? (
                      <Users className="w-4 h-4 text-blue-600" />
                    ) : (
                      <Package className="w-4 h-4 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className="text-xs font-medium text-gray-700">{activity.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;