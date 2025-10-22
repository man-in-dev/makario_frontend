import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Gift,
  Percent,
  Calendar,
  Users,
  Eye,
  Edit3,
  Plus,
  Tag,
  Zap,
  Clock,
  TrendingUp,
  ShoppingBag,
  Image,
  Star
} from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'bogo' | 'free_shipping' | 'flash_sale';
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  code: string;
  minOrderValue: number;
  maxDiscount?: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'scheduled' | 'expired' | 'paused';
  usageLimit: number;
  usageCount: number;
  applicableProducts: string[];
}

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  position: 'hero' | 'category' | 'footer';
  status: 'active' | 'paused' | 'draft';
  startDate: string;
  endDate: string;
  clicks: number;
  impressions: number;
}

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: '1',
      title: 'Summer Sale 2025',
      description: 'Get 25% off on all makhana products',
      type: 'discount',
      discountType: 'percentage',
      discountValue: 25,
      code: 'SUMMER25',
      minOrderValue: 500,
      maxDiscount: 1000,
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      status: 'active',
      usageLimit: 1000,
      usageCount: 347,
      applicableProducts: ['all']
    },
    {
      id: '2',
      title: 'Free Shipping Weekend',
      description: 'Free delivery on orders above ₹299',
      type: 'free_shipping',
      discountType: 'fixed',
      discountValue: 0,
      code: 'FREESHIP299',
      minOrderValue: 299,
      startDate: '2025-09-21',
      endDate: '2025-09-22',
      status: 'active',
      usageLimit: 500,
      usageCount: 234,
      applicableProducts: ['all']
    },
    {
      id: '3',
      title: 'Flash Sale - Premium Makhana',
      description: 'Limited time: 40% off premium products',
      type: 'flash_sale',
      discountType: 'percentage',
      discountValue: 40,
      code: 'FLASH40',
      minOrderValue: 799,
      maxDiscount: 2000,
      startDate: '2025-09-25',
      endDate: '2025-09-25',
      status: 'scheduled',
      usageLimit: 100,
      usageCount: 0,
      applicableProducts: ['premium']
    }
  ]);

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: '1',
      title: 'Summer Sale 2025',
      subtitle: 'Up to 25% off on all products',
      image: '/banner-summer-sale.jpg',
      ctaText: 'Shop Now',
      ctaLink: '/products',
      position: 'hero',
      status: 'active',
      startDate: '2025-06-01',
      endDate: '2025-08-31',
      clicks: 2841,
      impressions: 45320
    },
    {
      id: '2',
      title: 'Premium Bihar Makhana',
      subtitle: 'Authentic taste from Bihar farms',
      image: '/banner-premium.jpg',
      ctaText: 'Explore Premium',
      ctaLink: '/products/premium',
      position: 'category',
      status: 'active',
      startDate: '2025-07-01',
      endDate: '2025-12-31',
      clicks: 1673,
      impressions: 28450
    }
  ]);

  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    type: 'discount' as Promotion['type'],
    discountType: 'percentage' as Promotion['discountType'],
    discountValue: '',
    code: '',
    minOrderValue: '',
    maxDiscount: '',
    startDate: '',
    endDate: '',
    usageLimit: ''
  });

  const [newBanner, setNewBanner] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    position: 'hero' as Banner['position'],
    startDate: '',
    endDate: ''
  });

  const handleCreatePromotion = () => {
    if (!newPromotion.title || !newPromotion.code || !newPromotion.startDate || !newPromotion.endDate) {
      alert('Please fill all required promotion details');
      return;
    }

    const promotion: Promotion = {
      id: (promotions.length + 1).toString(),
      title: newPromotion.title,
      description: newPromotion.description,
      type: newPromotion.type,
      discountType: newPromotion.discountType,
      discountValue: parseFloat(newPromotion.discountValue) || 0,
      code: newPromotion.code.toUpperCase(),
      minOrderValue: parseFloat(newPromotion.minOrderValue) || 0,
      maxDiscount: parseFloat(newPromotion.maxDiscount) || undefined,
      startDate: newPromotion.startDate,
      endDate: newPromotion.endDate,
      status: 'active',
      usageLimit: parseInt(newPromotion.usageLimit) || 100,
      usageCount: 0,
      applicableProducts: ['all']
    };

    setPromotions([...promotions, promotion]);
    setNewPromotion({
      title: '', description: '', type: 'discount', discountType: 'percentage',
      discountValue: '', code: '', minOrderValue: '', maxDiscount: '',
      startDate: '', endDate: '', usageLimit: ''
    });
    alert('Promotion created successfully!');
  };

  const handleCreateBanner = () => {
    if (!newBanner.title || !newBanner.ctaText || !newBanner.startDate || !newBanner.endDate) {
      alert('Please fill all required banner details');
      return;
    }

    const banner: Banner = {
      id: (banners.length + 1).toString(),
      title: newBanner.title,
      subtitle: newBanner.subtitle,
      image: '/placeholder-banner.jpg',
      ctaText: newBanner.ctaText,
      ctaLink: newBanner.ctaLink,
      position: newBanner.position,
      status: 'active',
      startDate: newBanner.startDate,
      endDate: newBanner.endDate,
      clicks: 0,
      impressions: 0
    };

    setBanners([...banners, banner]);
    setNewBanner({
      title: '', subtitle: '', ctaText: '', ctaLink: '',
      position: 'hero', startDate: '', endDate: ''
    });
    alert('Banner created successfully!');
  };

  const getPromotionStatusColor = (status: Promotion['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getBannerStatusColor = (status: Banner['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
    }
  };

  const getPromotionTypeIcon = (type: Promotion['type']) => {
    switch (type) {
      case 'discount': return <Percent className="h-4 w-4" />;
      case 'bogo': return <Gift className="h-4 w-4" />;
      case 'free_shipping': return <ShoppingBag className="h-4 w-4" />;
      case 'flash_sale': return <Zap className="h-4 w-4" />;
    }
  };

  const generatePromotionCode = () => {
    const prefix = newPromotion.title.substring(0, 4).toUpperCase();
    const random = Math.floor(Math.random() * 99) + 10;
    const code = `${prefix}${random}`;
    setNewPromotion({ ...newPromotion, code });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Promotions & Offers</h1>
          <p className="text-gray-600 mt-1">Manage discounts, coupons, and promotional banners</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Promotion
        </Button>
      </div>

      {/* Promotions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Percent className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Promotions</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Usage</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">18.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Gift className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Savings Given</p>
                <p className="text-2xl font-bold text-gray-900">₹45,231</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="promotions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="flash-sales">Flash Sales</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="promotions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                Create New Promotion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="promo-title">Promotion Title</Label>
                  <Input
                    id="promo-title"
                    value={newPromotion.title}
                    onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                    placeholder="Enter promotion title"
                  />
                </div>
                <div>
                  <Label htmlFor="promo-type">Promotion Type</Label>
                  <select 
                    id="promo-type"
                    className="w-full p-2 border rounded-md"
                    value={newPromotion.type}
                    onChange={(e) => setNewPromotion({ ...newPromotion, type: e.target.value as Promotion['type'] })}
                  >
                    <option value="discount">Discount</option>
                    <option value="bogo">Buy One Get One</option>
                    <option value="free_shipping">Free Shipping</option>
                    <option value="flash_sale">Flash Sale</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="discount-type">Discount Type</Label>
                  <select 
                    id="discount-type"
                    className="w-full p-2 border rounded-md"
                    value={newPromotion.discountType}
                    onChange={(e) => setNewPromotion({ ...newPromotion, discountType: e.target.value as Promotion['discountType'] })}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="discount-value">Discount Value</Label>
                  <Input
                    id="discount-value"
                    type="number"
                    value={newPromotion.discountValue}
                    onChange={(e) => setNewPromotion({ ...newPromotion, discountValue: e.target.value })}
                    placeholder={newPromotion.discountType === 'percentage' ? 'Enter percentage' : 'Enter amount'}
                  />
                </div>
                <div>
                  <Label htmlFor="promo-code">Promotion Code</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="promo-code"
                      value={newPromotion.code}
                      onChange={(e) => setNewPromotion({ ...newPromotion, code: e.target.value.toUpperCase() })}
                      placeholder="Enter promo code"
                    />
                    <Button type="button" variant="outline" onClick={generatePromotionCode}>
                      Generate
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="min-order">Minimum Order Value (₹)</Label>
                  <Input
                    id="min-order"
                    type="number"
                    value={newPromotion.minOrderValue}
                    onChange={(e) => setNewPromotion({ ...newPromotion, minOrderValue: e.target.value })}
                    placeholder="Enter minimum order value"
                  />
                </div>
                <div>
                  <Label htmlFor="max-discount">Maximum Discount (₹)</Label>
                  <Input
                    id="max-discount"
                    type="number"
                    value={newPromotion.maxDiscount}
                    onChange={(e) => setNewPromotion({ ...newPromotion, maxDiscount: e.target.value })}
                    placeholder="Enter maximum discount limit"
                  />
                </div>
                <div>
                  <Label htmlFor="usage-limit">Usage Limit</Label>
                  <Input
                    id="usage-limit"
                    type="number"
                    value={newPromotion.usageLimit}
                    onChange={(e) => setNewPromotion({ ...newPromotion, usageLimit: e.target.value })}
                    placeholder="Enter usage limit"
                  />
                </div>
                <div>
                  <Label htmlFor="promo-start">Start Date</Label>
                  <Input
                    id="promo-start"
                    type="date"
                    value={newPromotion.startDate}
                    onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="promo-end">End Date</Label>
                  <Input
                    id="promo-end"
                    type="date"
                    value={newPromotion.endDate}
                    onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="promo-description">Description</Label>
                <Textarea
                  id="promo-description"
                  rows={3}
                  value={newPromotion.description}
                  onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                  placeholder="Enter promotion description"
                />
              </div>
              <Button onClick={handleCreatePromotion} className="w-full">
                Create Promotion
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotions.map((promo) => (
                  <div key={promo.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getPromotionTypeIcon(promo.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{promo.title}</h3>
                          <p className="text-sm text-gray-600">{promo.description}</p>
                        </div>
                      </div>
                      <Badge className={getPromotionStatusColor(promo.status)}>
                        {promo.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600">Code</p>
                        <p className="font-semibold font-mono bg-gray-100 px-2 py-1 rounded">{promo.code}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Discount</p>
                        <p className="font-semibold">
                          {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `₹${promo.discountValue}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Min Order</p>
                        <p className="font-semibold">₹{promo.minOrderValue}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Usage</p>
                        <p className="font-semibold">{promo.usageCount}/{promo.usageLimit}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Valid Until</p>
                        <p className="font-semibold">{new Date(promo.endDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(promo.usageCount / promo.usageLimit) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Create New Banner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="banner-title">Banner Title</Label>
                  <Input
                    id="banner-title"
                    value={newBanner.title}
                    onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                    placeholder="Enter banner title"
                  />
                </div>
                <div>
                  <Label htmlFor="banner-position">Position</Label>
                  <select 
                    id="banner-position"
                    className="w-full p-2 border rounded-md"
                    value={newBanner.position}
                    onChange={(e) => setNewBanner({ ...newBanner, position: e.target.value as Banner['position'] })}
                  >
                    <option value="hero">Hero Section</option>
                    <option value="category">Category Page</option>
                    <option value="footer">Footer</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="banner-subtitle">Subtitle</Label>
                  <Input
                    id="banner-subtitle"
                    value={newBanner.subtitle}
                    onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                    placeholder="Enter banner subtitle"
                  />
                </div>
                <div>
                  <Label htmlFor="banner-cta">CTA Text</Label>
                  <Input
                    id="banner-cta"
                    value={newBanner.ctaText}
                    onChange={(e) => setNewBanner({ ...newBanner, ctaText: e.target.value })}
                    placeholder="Enter call-to-action text"
                  />
                </div>
                <div>
                  <Label htmlFor="banner-link">CTA Link</Label>
                  <Input
                    id="banner-link"
                    value={newBanner.ctaLink}
                    onChange={(e) => setNewBanner({ ...newBanner, ctaLink: e.target.value })}
                    placeholder="Enter link URL"
                  />
                </div>
                <div>
                  <Label htmlFor="banner-image">Upload Image</Label>
                  <Input
                    id="banner-image"
                    type="file"
                    accept="image/*"
                  />
                </div>
                <div>
                  <Label htmlFor="banner-start">Start Date</Label>
                  <Input
                    id="banner-start"
                    type="date"
                    value={newBanner.startDate}
                    onChange={(e) => setNewBanner({ ...newBanner, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="banner-end">End Date</Label>
                  <Input
                    id="banner-end"
                    type="date"
                    value={newBanner.endDate}
                    onChange={(e) => setNewBanner({ ...newBanner, endDate: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleCreateBanner} className="w-full">
                Create Banner
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Banners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {banners.map((banner) => (
                  <div key={banner.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{banner.title}</h3>
                        <p className="text-sm text-gray-600">{banner.subtitle}</p>
                      </div>
                      <Badge className={getBannerStatusColor(banner.status)}>
                        {banner.status}
                      </Badge>
                    </div>
                    
                    <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center mb-3">
                      <span className="text-gray-500 text-sm">Banner Preview</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600">Position</p>
                        <p className="font-semibold capitalize">{banner.position}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">CTA Text</p>
                        <p className="font-semibold">{banner.ctaText}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Clicks</p>
                        <p className="font-semibold">{banner.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Impressions</p>
                        <p className="font-semibold">{banner.impressions.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        CTR: {banner.impressions > 0 ? ((banner.clicks / banner.impressions) * 100).toFixed(2) : 0}%
                      </span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flash-sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Flash Sales Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-red-800">🔥 Mega Flash Sale</h3>
                    <Badge className="bg-red-100 text-red-800">Live Now</Badge>
                  </div>
                  <p className="text-red-600 mb-3">Up to 50% off on selected products - Limited time only!</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-red-600" />
                      <span className="text-red-600">Ends in: 2h 34m 12s</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-red-600" />
                      <span className="text-red-600">68 sold</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-blue-800">⚡ Lightning Deal</h3>
                    <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                  </div>
                  <p className="text-blue-600 mb-3">Premium makhana collection at 40% off</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                      <span className="text-blue-600">Starts: Sep 25, 2025 at 12:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1 text-blue-600" />
                      <span className="text-blue-600">Stock: 100 units</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Create New Flash Sale
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Top Performing Promotions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'SUMMER25', usage: 347, conversion: '18.5%' },
                    { name: 'FREESHIP299', usage: 234, conversion: '22.1%' },
                    { name: 'BULK50', usage: 156, conversion: '15.3%' },
                  ].map((promo, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium font-mono">{promo.name}</p>
                        <p className="text-sm text-gray-600">{promo.usage} uses</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-100 text-green-800">
                          {promo.conversion}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Customer Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'Free Shipping', popularity: '89%' },
                    { type: 'Percentage Off', popularity: '76%' },
                    { type: 'Flash Sales', popularity: '68%' },
                    { type: 'Buy One Get One', popularity: '45%' }
                  ].map((favorite, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <p className="font-medium">{favorite.type}</p>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: favorite.popularity }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">{favorite.popularity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  Revenue Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">+₹2,34,567</p>
                    <p className="text-sm text-green-600">Additional Revenue</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">18.5%</p>
                    <p className="text-sm text-blue-600">Avg. Order Increase</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">1,247</p>
                    <p className="text-sm text-purple-600">New Customers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPromotions;