import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Users,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  DollarSign,
  Calendar,
  MoreHorizontal,
  Eye,
  Ban,
  Star
} from 'lucide-react';

// Mock customer data
const customers = [
  {
    id: 'CUST-001',
    name: 'Amit Kumar',
    email: 'amit.kumar@example.com',
    phone: '+91-9876543210',
    avatar: null,
    location: 'Mumbai, Maharashtra',
    joinDate: '2023-12-15',
    totalOrders: 12,
    totalSpent: 4580,
    lastOrder: '2024-01-15',
    status: 'active',
    tier: 'gold'
  },
  {
    id: 'CUST-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91-9876543211',
    avatar: null,
    location: 'Bangalore, Karnataka',
    joinDate: '2024-01-05',
    totalOrders: 8,
    totalSpent: 2890,
    lastOrder: '2024-01-14',
    status: 'active',
    tier: 'silver'
  },
  {
    id: 'CUST-003',
    name: 'Rahul Singh',
    email: 'rahul.singh@example.com',
    phone: '+91-9876543212',
    avatar: null,
    location: 'Delhi, Delhi',
    joinDate: '2023-11-20',
    totalOrders: 15,
    totalSpent: 6750,
    lastOrder: '2024-01-14',
    status: 'active',
    tier: 'platinum'
  },
  {
    id: 'CUST-004',
    name: 'Anita Devi',
    email: 'anita.devi@example.com',
    phone: '+91-9876543213',
    avatar: null,
    location: 'Chennai, Tamil Nadu',
    joinDate: '2023-10-10',
    totalOrders: 5,
    totalSpent: 1250,
    lastOrder: '2024-01-13',
    status: 'active',
    tier: 'bronze'
  },
  {
    id: 'CUST-005',
    name: 'Ravi Patel',
    email: 'ravi.patel@example.com',
    phone: '+91-9876543214',
    avatar: null,
    location: 'Ahmedabad, Gujarat',
    joinDate: '2024-01-01',
    totalOrders: 3,
    totalSpent: 890,
    lastOrder: '2024-01-12',
    status: 'inactive',
    tier: 'bronze'
  }
];

const AdminCustomers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return { color: 'bg-purple-100 text-purple-800', icon: '💎' };
      case 'gold':
        return { color: 'bg-yellow-100 text-yellow-800', icon: '🏆' };
      case 'silver':
        return { color: 'bg-gray-100 text-gray-800', icon: '🥈' };
      case 'bronze':
        return { color: 'bg-orange-100 text-orange-800', icon: '🥉' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: '👤' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'blocked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const customerStats = {
    total: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    newThisMonth: customers.filter(c => new Date(c.joinDate) > new Date('2024-01-01')).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships and analytics.</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customerStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserPlus className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customerStats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-gray-900">{customerStats.newThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{customerStats.totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const tierConfig = getTierConfig(customer.tier);
                  
                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={customer.avatar || ''} />
                            <AvatarFallback className="bg-blue-500 text-white">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{customer.name}</p>
                            <p className="text-sm text-gray-500">{customer.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-3 h-3 mr-1" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-3 h-3 mr-1" />
                            {customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-3 h-3 mr-1" />
                          {customer.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={tierConfig.color}>
                          {tierConfig.icon} {customer.tier.charAt(0).toUpperCase() + customer.tier.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ShoppingCart className="w-4 h-4 mr-1 text-gray-400" />
                          <span className="font-medium">{customer.totalOrders}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">₹{customer.totalSpent.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{customer.lastOrder}</span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => {
                              alert(`Viewing profile for ${customer.name}`);
                              console.log('View customer profile:', customer);
                            }}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              alert(`Sending email to ${customer.email}`);
                              console.log('Send email to:', customer);
                            }}>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              alert(`${customer.name} added to VIP customers!`);
                              console.log('Add to VIP:', customer);
                            }}>
                              <Star className="mr-2 h-4 w-4" />
                              Add to VIP
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              if (confirm(`Are you sure you want to block ${customer.name}?`)) {
                                alert(`Customer ${customer.name} has been blocked!`);
                                console.log('Block customer:', customer);
                              }
                            }} className="text-red-600">
                              <Ban className="mr-2 h-4 w-4" />
                              Block Customer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomers;