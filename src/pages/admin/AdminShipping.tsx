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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Eye,
  RefreshCw,
  Settings,
  Plus,
  Ship,
  Zap
} from 'lucide-react';

interface ShippingOrder {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  pincode: string;
  products: string;
  weight: number;
  dimensions: string;
  codAmount?: number;
  shipmentId?: string;
  awbCode?: string;
  courierPartner?: string;
  status: 'pending' | 'created' | 'picked' | 'in-transit' | 'delivered' | 'cancelled';
  trackingUrl?: string;
  estimatedDelivery?: string;
  createdAt: string;
}

// Sample shipping data
const sampleShipments: ShippingOrder[] = [
  {
    id: '1',
    orderId: 'ORD-2024-001',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91-9876543210',
    customerAddress: '123 Main Street, Sector 15, Noida',
    pincode: '201301',
    products: 'Premium Makhana 250g x2',
    weight: 0.5,
    dimensions: '20x15x10',
    codAmount: 598,
    shipmentId: 'SH001234567',
    awbCode: 'AWB123456789',
    courierPartner: 'Delhivery',
    status: 'in-transit',
    trackingUrl: 'https://tracking.delhivery.com/AWB123456789',
    estimatedDelivery: '2024-01-25',
    createdAt: '2024-01-22'
  },
  {
    id: '2',
    orderId: 'ORD-2024-002',
    customerName: 'Priya Sharma',
    customerPhone: '+91-8765432109',
    customerAddress: '456 Park Avenue, Bandra West, Mumbai',
    pincode: '400050',
    products: 'Flavored Makhana Combo Pack',
    weight: 0.8,
    dimensions: '25x20x12',
    status: 'pending',
    createdAt: '2024-01-23'
  }
];

const AdminShipping: React.FC = () => {
  const [shipments, setShipments] = useState<ShippingOrder[]>(sampleShipments);
  const [apiConfig, setApiConfig] = useState({
    email: '',
    password: '',
    isConnected: false,
    token: ''
  });
  const [defaultSettings, setDefaultSettings] = useState({
    pickupAddress: '',
    pickupPincode: '',
    pickupPhone: '',
    pickupName: '',
    companyName: 'Bihar Makhana Pride',
    gstNumber: '',
    length: '20',
    breadth: '15',
    height: '10',
    weight: '0.5'
  });
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ShippingOrder | null>(null);
  const [isCreateShipmentOpen, setIsCreateShipmentOpen] = useState(false);

  const handleApiLogin = async () => {
    if (!apiConfig.email || !apiConfig.password) {
      alert('Please enter email and password');
      return;
    }

    // Simulate API login
    setTimeout(() => {
      setApiConfig(prev => ({
        ...prev,
        isConnected: true,
        token: 'sample_token_' + Date.now()
      }));
      alert('Successfully connected to Shiprocket!');
      setIsConfigDialogOpen(false);
    }, 1500);
  };

  const handleCreateShipment = async (order: ShippingOrder) => {
    if (!apiConfig.isConnected) {
      alert('Please configure Shiprocket API first');
      return;
    }

    // Validate required shipping information
    if (!defaultSettings.pickupAddress || !defaultSettings.pickupPincode || !defaultSettings.pickupPhone) {
      alert('Please complete pickup address settings first');
      return;
    }

    // Simulate shipment creation
    const updatedShipments = shipments.map(shipment => 
      shipment.id === order.id 
        ? {
            ...shipment,
            status: 'created' as const,
            shipmentId: 'SH' + Date.now(),
            awbCode: 'AWB' + Math.random().toString().substr(2, 9),
            courierPartner: 'Delhivery',
            trackingUrl: `https://tracking.delhivery.com/AWB${Math.random().toString().substr(2, 9)}`,
            estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          }
        : shipment
    );

    setShipments(updatedShipments);
    alert('Shipment created successfully!');
  };

  const handleTrackShipment = (shipment: ShippingOrder) => {
    if (shipment.trackingUrl) {
      window.open(shipment.trackingUrl, '_blank');
    } else {
      alert('Tracking URL not available');
    }
  };

  const handleDownloadLabel = (shipment: ShippingOrder) => {
    if (!shipment.awbCode) {
      alert('AWB code not available');
      return;
    }
    // Simulate label download
    alert(`Downloading shipping label for AWB: ${shipment.awbCode}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'created': return 'default';
      case 'picked': return 'default';
      case 'in-transit': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'created': return <Package className="h-4 w-4" />;
      case 'picked': return <Truck className="h-4 w-4" />;
      case 'in-transit': return <Ship className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const pendingShipments = shipments.filter(s => s.status === 'pending').length;
  const activeShipments = shipments.filter(s => ['created', 'picked', 'in-transit'].includes(s.status)).length;
  const deliveredShipments = shipments.filter(s => s.status === 'delivered').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shipping Management</h1>
          <p className="text-gray-600">Manage shipments with Shiprocket integration.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Settings className="h-4 w-4" />
                API Configuration
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Shiprocket API Configuration</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-email">Email</Label>
                  <Input
                    id="api-email"
                    type="email"
                    value={apiConfig.email}
                    onChange={(e) => setApiConfig({...apiConfig, email: e.target.value})}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="api-password">Password</Label>
                  <Input
                    id="api-password"
                    type="password"
                    value={apiConfig.password}
                    onChange={(e) => setApiConfig({...apiConfig, password: e.target.value})}
                    placeholder="Your password"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${apiConfig.isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">
                    {apiConfig.isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <Button onClick={handleApiLogin} className="w-full" disabled={apiConfig.isConnected}>
                  {apiConfig.isConnected ? 'Already Connected' : 'Connect to Shiprocket'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {apiConfig.isConnected && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Bulk Create Shipments
            </Button>
          )}
        </div>
      </div>

      {/* Connection Status Alert */}
      {!apiConfig.isConnected && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <p className="text-orange-800">
                Shiprocket API is not configured. Please configure API credentials to start creating shipments.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Shipments</p>
                <p className="text-2xl font-bold text-orange-600">{pendingShipments}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Shipments</p>
                <p className="text-2xl font-bold text-blue-600">{activeShipments}</p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-green-600">{deliveredShipments}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">API Status</p>
                <p className="text-sm font-bold text-gray-900">
                  {apiConfig.isConnected ? 'Connected' : 'Disconnected'}
                </p>
              </div>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                apiConfig.isConnected ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                <Zap className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="shipments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="settings">Default Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="shipments" className="space-y-6">
          {/* Shipments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Orders ({shipments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>AWB/Tracking</TableHead>
                    <TableHead>Courier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipments.map((shipment) => (
                    <TableRow key={shipment.id}>
                      <TableCell className="font-medium">{shipment.orderId}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{shipment.customerName}</p>
                          <p className="text-sm text-gray-500">{shipment.customerPhone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{shipment.pincode}</p>
                          <p className="text-gray-500 truncate max-w-xs">{shipment.customerAddress}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{shipment.products}</p>
                          <p className="text-gray-500">{shipment.weight}kg</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {shipment.awbCode ? (
                          <div className="text-sm">
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                              {shipment.awbCode}
                            </code>
                            {shipment.trackingUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleTrackShipment(shipment)}
                                className="ml-2 h-6 w-6 p-0"
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {shipment.courierPartner || (
                          <span className="text-gray-400">Not assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(shipment.status)} className="gap-1">
                          {getStatusIcon(shipment.status)}
                          {shipment.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {shipment.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleCreateShipment(shipment)}
                              disabled={!apiConfig.isConnected}
                              className="text-xs"
                            >
                              Create Shipment
                            </Button>
                          )}
                          
                          {shipment.awbCode && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadLabel(shipment)}
                              className="text-xs"
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          )}
                          
                          {shipment.trackingUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTrackShipment(shipment)}
                              className="text-xs"
                            >
                              Track
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {shipments.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments found</h3>
                  <p className="text-gray-500">Shipments will appear here when orders are ready to ship</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Shipping Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={defaultSettings.companyName}
                    onChange={(e) => setDefaultSettings({...defaultSettings, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="gst-number">GST Number</Label>
                  <Input
                    id="gst-number"
                    value={defaultSettings.gstNumber}
                    onChange={(e) => setDefaultSettings({...defaultSettings, gstNumber: e.target.value})}
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="pickup-address">Pickup Address</Label>
                <Textarea
                  id="pickup-address"
                  value={defaultSettings.pickupAddress}
                  onChange={(e) => setDefaultSettings({...defaultSettings, pickupAddress: e.target.value})}
                  rows={3}
                  placeholder="Complete pickup address"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="pickup-pincode">Pickup Pincode</Label>
                  <Input
                    id="pickup-pincode"
                    value={defaultSettings.pickupPincode}
                    onChange={(e) => setDefaultSettings({...defaultSettings, pickupPincode: e.target.value})}
                    placeholder="110001"
                  />
                </div>
                <div>
                  <Label htmlFor="pickup-phone">Pickup Phone</Label>
                  <Input
                    id="pickup-phone"
                    value={defaultSettings.pickupPhone}
                    onChange={(e) => setDefaultSettings({...defaultSettings, pickupPhone: e.target.value})}
                    placeholder="+91-9876543210"
                  />
                </div>
                <div>
                  <Label htmlFor="pickup-name">Pickup Contact Name</Label>
                  <Input
                    id="pickup-name"
                    value={defaultSettings.pickupName}
                    onChange={(e) => setDefaultSettings({...defaultSettings, pickupName: e.target.value})}
                    placeholder="Contact Person"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Default Package Dimensions</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="length">Length (cm)</Label>
                    <Input
                      id="length"
                      value={defaultSettings.length}
                      onChange={(e) => setDefaultSettings({...defaultSettings, length: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="breadth">Breadth (cm)</Label>
                    <Input
                      id="breadth"
                      value={defaultSettings.breadth}
                      onChange={(e) => setDefaultSettings({...defaultSettings, breadth: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      value={defaultSettings.height}
                      onChange={(e) => setDefaultSettings({...defaultSettings, height: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      value={defaultSettings.weight}
                      onChange={(e) => setDefaultSettings({...defaultSettings, weight: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">
                  Save Default Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminShipping;