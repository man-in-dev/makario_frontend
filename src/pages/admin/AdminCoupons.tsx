import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Copy,
  Ticket,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isPublic: boolean;
  applicableProducts: string[];
  createdAt: string;
}

// Sample coupon data
const sampleCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME20',
    name: 'Welcome Discount',
    description: 'Welcome discount for new customers',
    type: 'percentage',
    value: 20,
    minOrderAmount: 500,
    maxDiscount: 200,
    usageLimit: 100,
    usedCount: 45,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    isActive: true,
    isPublic: true,
    applicableProducts: [],
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    code: 'BULK50',
    name: 'Bulk Order Discount',
    description: 'Special discount for bulk orders',
    type: 'fixed',
    value: 50,
    minOrderAmount: 1000,
    usageLimit: 50,
    usedCount: 12,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    isActive: true,
    isPublic: false,
    applicableProducts: ['bulk-makhana', 'premium-makhana'],
    createdAt: '2024-01-15'
  },
  {
    id: '3',
    code: 'FESTIVAL25',
    name: 'Festival Special',
    description: 'Festival season special discount',
    type: 'percentage',
    value: 25,
    minOrderAmount: 300,
    maxDiscount: 150,
    usageLimit: 200,
    usedCount: 187,
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    isActive: false,
    isPublic: true,
    applicableProducts: [],
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    code: 'PREMIUM15',
    name: 'Premium Product Discount',
    description: 'Exclusive discount on premium makhana',
    type: 'percentage',
    value: 15,
    minOrderAmount: 800,
    maxDiscount: 120,
    usageLimit: 75,
    usedCount: 23,
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    isActive: true,
    isPublic: true,
    applicableProducts: ['premium-makhana'],
    createdAt: '2024-02-01'
  }
];

const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(sampleCoupons);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    minOrderAmount: '',
    maxDiscount: '',
    usageLimit: '',
    startDate: '',
    endDate: '',
    isActive: true,
    isPublic: true
  });

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && coupon.isActive) ||
                         (statusFilter === 'inactive' && !coupon.isActive) ||
                         (statusFilter === 'expired' && new Date(coupon.endDate) < new Date());
    return matchesSearch && matchesStatus;
  });

  const handleAddCoupon = () => {
    if (!formData.code.trim() || !formData.name.trim()) return;

    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      name: formData.name,
      description: formData.description,
      type: formData.type,
      value: parseFloat(formData.value) || 0,
      minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
      maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : undefined,
      usageLimit: parseInt(formData.usageLimit) || 0,
      usedCount: 0,
      startDate: formData.startDate,
      endDate: formData.endDate,
      isActive: formData.isActive,
      isPublic: formData.isPublic,
      applicableProducts: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCoupons([...coupons, newCoupon]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description,
      type: coupon.type,
      value: coupon.value.toString(),
      minOrderAmount: coupon.minOrderAmount.toString(),
      maxDiscount: coupon.maxDiscount?.toString() || '',
      usageLimit: coupon.usageLimit.toString(),
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      isActive: coupon.isActive,
      isPublic: coupon.isPublic
    });
  };

  const handleUpdateCoupon = () => {
    if (!editingCoupon || !formData.code.trim() || !formData.name.trim()) return;

    const updatedCoupons = coupons.map(coupon =>
      coupon.id === editingCoupon.id
        ? {
            ...coupon,
            code: formData.code.toUpperCase(),
            name: formData.name,
            description: formData.description,
            type: formData.type,
            value: parseFloat(formData.value) || 0,
            minOrderAmount: parseFloat(formData.minOrderAmount) || 0,
            maxDiscount: formData.maxDiscount ? parseFloat(formData.maxDiscount) : undefined,
            usageLimit: parseInt(formData.usageLimit) || 0,
            startDate: formData.startDate,
            endDate: formData.endDate,
            isActive: formData.isActive,
            isPublic: formData.isPublic
          }
        : coupon
    );

    setCoupons(updatedCoupons);
    setEditingCoupon(null);
    resetForm();
  };

  const handleDeleteCoupon = (couponId: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(coupon => coupon.id !== couponId));
    }
  };

  const handleCopyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Coupon code copied to clipboard!');
  };

  const toggleCouponStatus = (couponId: string) => {
    const updatedCoupons = coupons.map(coupon =>
      coupon.id === couponId
        ? { ...coupon, isActive: !coupon.isActive }
        : coupon
    );
    setCoupons(updatedCoupons);
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      type: 'percentage',
      value: '',
      minOrderAmount: '',
      maxDiscount: '',
      usageLimit: '',
      startDate: '',
      endDate: '',
      isActive: true,
      isPublic: true
    });
  };

  const getStatusBadge = (coupon: Coupon) => {
    const now = new Date();
    const endDate = new Date(coupon.endDate);
    const isExpired = endDate < now;
    
    if (isExpired) {
      return <Badge variant="secondary">Expired</Badge>;
    } else if (!coupon.isActive) {
      return <Badge variant="destructive">Inactive</Badge>;
    } else {
      return <Badge variant="default">Active</Badge>;
    }
  };

  const activeCoupons = coupons.filter(c => c.isActive && new Date(c.endDate) >= new Date()).length;
  const totalUsage = coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0);
  const expiredCoupons = coupons.filter(c => new Date(c.endDate) < new Date()).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coupons & Discounts</h1>
          <p className="text-gray-600">Manage discount coupons and promotional offers.</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="code">Coupon Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="DISCOUNT20"
                />
              </div>
              <div>
                <Label htmlFor="name">Coupon Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Welcome Discount"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description of the coupon"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="type">Discount Type</Label>
                <Select value={formData.type} onValueChange={(value: 'percentage' | 'fixed') => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="value">
                  Discount Value * ({formData.type === 'percentage' ? '%' : '₹'})
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder={formData.type === 'percentage' ? '20' : '100'}
                />
              </div>
              <div>
                <Label htmlFor="minOrderAmount">Minimum Order Amount (₹)</Label>
                <Input
                  id="minOrderAmount"
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                  placeholder="500"
                />
              </div>
              {formData.type === 'percentage' && (
                <div>
                  <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                    placeholder="200"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublic"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  />
                  <Label htmlFor="isPublic">Public</Label>
                </div>
              </div>
              <div className="col-span-2">
                <Button onClick={handleAddCoupon} className="w-full">
                  Create Coupon
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Coupons</p>
                <p className="text-2xl font-bold text-gray-900">{coupons.length}</p>
              </div>
              <Ticket className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Coupons</p>
                <p className="text-2xl font-bold text-green-600">{activeCoupons}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-purple-600">{totalUsage}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{expiredCoupons}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search coupons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Coupons</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>Coupons ({filteredCoupons.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Valid Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {coupon.code}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCouponCode(coupon.code)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{coupon.name}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {coupon.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {coupon.type === 'percentage' 
                      ? `${coupon.value}%`
                      : `₹${coupon.value}`
                    }
                    {coupon.maxDiscount && (
                      <p className="text-xs text-gray-500">Max: ₹{coupon.maxDiscount}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{coupon.usedCount}/{coupon.usageLimit}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%` 
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{coupon.startDate}</p>
                      <p>to {coupon.endDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(coupon)}</TableCell>
                  <TableCell>
                    <Badge variant={coupon.isPublic ? "default" : "secondary"}>
                      {coupon.isPublic ? (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Public
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Private
                        </>
                      )}
                    </Badge>
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
                        <DropdownMenuItem onClick={() => handleEditCoupon(coupon)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCopyCouponCode(coupon.code)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleCouponStatus(coupon.id)}>
                          <Calendar className="mr-2 h-4 w-4" />
                          {coupon.isActive ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteCoupon(coupon.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCoupons.length === 0 && (
            <div className="text-center py-12">
              <Ticket className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No coupons found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search terms or filters' 
                  : 'Create your first coupon to start offering discounts'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Coupon
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Coupon Dialog */}
      <Dialog open={!!editingCoupon} onOpenChange={() => setEditingCoupon(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-code">Coupon Code *</Label>
              <Input
                id="edit-code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="DISCOUNT20"
              />
            </div>
            <div>
              <Label htmlFor="edit-name">Coupon Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Welcome Discount"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description of the coupon"
                rows={2}
              />
            </div>
            <div>
              <Label htmlFor="edit-type">Discount Type</Label>
              <Select value={formData.type} onValueChange={(value: 'percentage' | 'fixed') => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-value">
                Discount Value * ({formData.type === 'percentage' ? '%' : '₹'})
              </Label>
              <Input
                id="edit-value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                placeholder={formData.type === 'percentage' ? '20' : '100'}
              />
            </div>
            <div>
              <Label htmlFor="edit-minOrderAmount">Minimum Order Amount (₹)</Label>
              <Input
                id="edit-minOrderAmount"
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value })}
                placeholder="500"
              />
            </div>
            {formData.type === 'percentage' && (
              <div>
                <Label htmlFor="edit-maxDiscount">Maximum Discount (₹)</Label>
                <Input
                  id="edit-maxDiscount"
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                  placeholder="200"
                />
              </div>
            )}
            <div>
              <Label htmlFor="edit-usageLimit">Usage Limit</Label>
              <Input
                id="edit-usageLimit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                placeholder="100"
              />
            </div>
            <div>
              <Label htmlFor="edit-startDate">Start Date</Label>
              <Input
                id="edit-startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-endDate">End Date</Label>
              <Input
                id="edit-endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                />
                <Label htmlFor="edit-isActive">Active</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                />
                <Label htmlFor="edit-isPublic">Public</Label>
              </div>
            </div>
            <div className="col-span-2">
              <Button onClick={handleUpdateCoupon} className="w-full">
                Update Coupon
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCoupons;