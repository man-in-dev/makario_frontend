import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  Download,
  Filter,
  Calendar,
  Target,
  Package,
  Star,
  MapPin
} from 'lucide-react';

interface SalesMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

interface ProductPerformance {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  views: number;
  conversion: number;
  rating: number;
}

interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  conversion: number;
}

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  
  const salesMetrics: SalesMetric[] = [
    {
      label: 'Total Revenue',
      value: '₹4,56,789',
      change: 12.5,
      trend: 'up'
    },
    {
      label: 'Total Orders',
      value: 1247,
      change: 8.3,
      trend: 'up'
    },
    {
      label: 'Average Order Value',
      value: '₹366',
      change: -2.1,
      trend: 'down'
    },
    {
      label: 'Conversion Rate',
      value: '3.2%',
      change: 5.7,
      trend: 'up'
    }
  ];

  const productPerformance: ProductPerformance[] = [
    {
      id: '1',
      name: 'Premium Bihar Makhana - Classic',
      sales: 456,
      revenue: 136440,
      views: 8934,
      conversion: 5.1,
      rating: 4.8
    },
    {
      id: '2',
      name: 'Flavored Makhana - Masala Twist',
      sales: 289,
      revenue: 100861,
      views: 6712,
      conversion: 4.3,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Jumbo Size Makhana - Extra Large',
      sales: 178,
      revenue: 79922,
      views: 4523,
      conversion: 3.9,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Roasted Makhana Family Pack',
      sales: 234,
      revenue: 187066,
      views: 5841,
      conversion: 4.0,
      rating: 4.7
    },
    {
      id: '5',
      name: 'Honey Glazed Makhana - Sweet Delight',
      sales: 123,
      revenue: 49077,
      views: 3456,
      conversion: 3.6,
      rating: 4.8
    }
  ];

  const trafficSources: TrafficSource[] = [
    {
      source: 'Organic Search',
      visitors: 12458,
      percentage: 42.3,
      conversion: 3.8
    },
    {
      source: 'Direct',
      visitors: 8934,
      percentage: 30.4,
      conversion: 4.2
    },
    {
      source: 'Social Media',
      visitors: 4567,
      percentage: 15.5,
      conversion: 2.9
    },
    {
      source: 'Email Marketing',
      visitors: 2341,
      percentage: 8.0,
      conversion: 5.1
    },
    {
      source: 'Paid Ads',
      visitors: 1123,
      percentage: 3.8,
      conversion: 3.2
    }
  ];

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4" />;
      case 'down': return <TrendingDown className="h-4 w-4" />;
      case 'neutral': return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '1d': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      case '1y': return 'Last Year';
      default: return 'Last 7 Days';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Track performance, sales, and visitor analytics</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {salesMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`p-2 rounded-lg ${
                  metric.trend === 'up' ? 'bg-green-100' :
                  metric.trend === 'down' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <div className={getTrendColor(metric.trend)}>
                    {getTrendIcon(metric.trend)}
                  </div>
                </div>
              </div>
              <div className={`flex items-center mt-2 text-sm ${getTrendColor(metric.trend)}`}>
                {getTrendIcon(metric.trend)}
                <span className="ml-1">
                  {Math.abs(metric.change)}% vs last {timeRange === '1d' ? 'day' : timeRange === '7d' ? 'week' : 'period'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Revenue Trend ({getTimeRangeLabel(timeRange)})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Revenue Chart Visualization</p>
                    <p className="text-sm">Interactive chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Visitor Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">29,456</p>
                      <p className="text-sm text-blue-600">Total Visitors</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">18,234</p>
                      <p className="text-sm text-green-600">Unique Visitors</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Page Views</span>
                      <span className="font-semibold">125,432</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bounce Rate</span>
                      <span className="font-semibold">32.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Avg. Session Duration</span>
                      <span className="font-semibold">2m 45s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pages per Session</span>
                      <span className="font-semibold">4.2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Top Locations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { location: 'Mumbai, Maharashtra', visitors: 8934, percentage: 30.4 },
                    { location: 'Ahmedabad, Gujarat', visitors: 5678, percentage: 19.3 },
                    { location: 'Bangalore, Karnataka', visitors: 4523, percentage: 15.4 },
                    { location: 'Chennai, Tamil Nadu', visitors: 3412, percentage: 11.6 },
                    { location: 'Delhi, NCR', visitors: 2890, percentage: 9.8 }
                  ].map((location, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{location.location}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{location.visitors.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{location.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  Device Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">Mobile</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">18,456</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62.7%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Monitor className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Desktop</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">8,234</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '28.0%' }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Monitor className="h-4 w-4 mr-2 text-purple-500" />
                      <span className="text-sm">Tablet</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold">2,766</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '9.4%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Real-time Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">127</p>
                    <p className="text-sm text-green-600">Active Users</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Page Views (last hour)</span>
                      <span className="font-semibold">1,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Orders (today)</span>
                      <span className="font-semibold">45</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cart Additions</span>
                      <span className="font-semibold">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Checkout Started</span>
                      <span className="font-semibold">23</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Sales Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">₹4,56,789</p>
                    <p className="text-sm text-green-600">Total Revenue ({getTimeRangeLabel(timeRange)})</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gross Sales</span>
                      <span className="font-semibold">₹4,89,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Discounts</span>
                      <span className="font-semibold">-₹23,456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Refunds</span>
                      <span className="font-semibold">-₹8,989</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Net Sales</span>
                      <span>₹4,56,789</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Order Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                    <p className="text-sm text-blue-600">Total Orders</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completed Orders</span>
                      <span className="font-semibold">1,156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Orders</span>
                      <span className="font-semibold">67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cancelled Orders</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Order Value</span>
                      <span className="font-semibold">₹366</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Conversion Funnel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { stage: 'Visitors', count: 29456, percentage: 100 },
                    { stage: 'Product Views', count: 12456, percentage: 42.3 },
                    { stage: 'Add to Cart', count: 3456, percentage: 11.7 },
                    { stage: 'Checkout Started', count: 1567, percentage: 5.3 },
                    { stage: 'Orders Completed', count: 945, percentage: 3.2 }
                  ].map((stage, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{stage.stage}</span>
                        <span className="font-semibold">{stage.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${stage.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {stage.percentage}% of visitors
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Product Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {productPerformance.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {product.conversion}% conversion
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Sales</p>
                        <p className="font-semibold">{product.sales}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Views</p>
                        <p className="font-semibold">{product.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">View-to-Sale</p>
                        <p className="font-semibold">{product.conversion}%</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${product.conversion * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Customer Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">8,456</p>
                    <p className="text-sm text-purple-600">Total Customers</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">New Customers</span>
                      <span className="font-semibold">234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Returning Customers</span>
                      <span className="font-semibold">1,013</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer Retention</span>
                      <span className="font-semibold">68.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Lifetime Value</span>
                      <span className="font-semibold">₹1,245</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Segments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { segment: 'Premium Customers', count: 1234, percentage: 14.6, color: 'bg-purple-600' },
                    { segment: 'Regular Customers', count: 3456, percentage: 40.9, color: 'bg-blue-600' },
                    { segment: 'Occasional Buyers', count: 2567, percentage: 30.4, color: 'bg-green-600' },
                    { segment: 'New Customers', count: 1199, percentage: 14.2, color: 'bg-yellow-600' }
                  ].map((segment, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{segment.segment}</span>
                        <span className="font-semibold">{segment.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${segment.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {segment.percentage}% of customers
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Rajesh Kumar', orders: 23, spent: 12450 },
                    { name: 'Priya Sharma', orders: 18, spent: 9876 },
                    { name: 'Amit Patel', orders: 15, spent: 8234 },
                    { name: 'Sunita Singh', orders: 12, spent: 7654 },
                    { name: 'Vikash Gupta', orders: 11, spent: 6789 }
                  ].map((customer, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-600">{customer.orders} orders</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{customer.spent.toLocaleString()}</p>
                        <Badge className="bg-gold-100 text-gold-800 text-xs">
                          VIP
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Traffic Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{source.source}</span>
                        <div className="text-right">
                          <p className="font-semibold">{source.visitors.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{source.percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Conversion: {source.conversion}%</span>
                        <span>{source.visitors.toLocaleString()} visitors</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-5 w-5 mr-2" />
                  Top Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { page: '/', title: 'Home Page', views: 45678, bounce: 28.5 },
                    { page: '/products', title: 'Products', views: 23456, bounce: 35.2 },
                    { page: '/products/premium-bihar-makhana-classic', title: 'Premium Makhana', views: 18234, bounce: 22.1 },
                    { page: '/about', title: 'About Us', views: 12456, bounce: 45.8 },
                    { page: '/contact', title: 'Contact', views: 9876, bounce: 52.3 }
                  ].map((page, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{page.title}</p>
                        <p className="text-xs text-gray-500">{page.page}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{page.views.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{page.bounce}% bounce</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;