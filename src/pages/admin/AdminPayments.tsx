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
  CreditCard, 
  Smartphone, 
  DollarSign,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Settings,
  Zap,
  TrendingUp,
  RefreshCw,
  Download,
  AlertTriangle
} from 'lucide-react';

interface PaymentGateway {
  id: string;
  name: string;
  logo: string;
  isEnabled: boolean;
  isConfigured: boolean;
  credentials: {
    keyId?: string;
    keySecret?: string;
    clientId?: string;
    clientSecret?: string;
    merchantId?: string;
    appId?: string;
  };
  settings: {
    testMode: boolean;
    webhookUrl: string;
    supportedMethods: string[];
  };
}

interface PaymentTransaction {
  id: string;
  orderId: string;
  gateway: string;
  method: string;
  amount: number;
  status: 'pending' | 'success' | 'failed' | 'refunded';
  transactionId: string;
  customerName: string;
  createdAt: string;
  updatedAt: string;
}

// Sample payment gateways data
const initialGateways: PaymentGateway[] = [
  {
    id: 'razorpay',
    name: 'Razorpay',
    logo: '💳',
    isEnabled: false,
    isConfigured: false,
    credentials: {
      keyId: '',
      keySecret: ''
    },
    settings: {
      testMode: true,
      webhookUrl: '',
      supportedMethods: ['card', 'netbanking', 'upi', 'wallet']
    }
  },
  {
    id: 'cashfree',
    name: 'Cashfree',
    logo: '💰',
    isEnabled: false,
    isConfigured: false,
    credentials: {
      clientId: '',
      clientSecret: ''
    },
    settings: {
      testMode: true,
      webhookUrl: '',
      supportedMethods: ['card', 'netbanking', 'upi', 'wallet']
    }
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    logo: '📱',
    isEnabled: false,
    isConfigured: false,
    credentials: {
      merchantId: '',
      keySecret: ''
    },
    settings: {
      testMode: true,
      webhookUrl: '',
      supportedMethods: ['upi', 'card', 'netbanking']
    }
  }
];

// Sample transaction data
const sampleTransactions: PaymentTransaction[] = [
  {
    id: '1',
    orderId: 'ORD-2024-001',
    gateway: 'razorpay',
    method: 'upi',
    amount: 599,
    status: 'success',
    transactionId: 'pay_MxxxxxxxxxxxxxxxY',
    customerName: 'Rajesh Kumar',
    createdAt: '2024-01-22T10:30:00Z',
    updatedAt: '2024-01-22T10:31:00Z'
  },
  {
    id: '2',
    orderId: 'ORD-2024-002',
    gateway: 'phonepe',
    method: 'upi',
    amount: 299,
    status: 'failed',
    transactionId: 'T2401221045123456',
    customerName: 'Priya Sharma',
    createdAt: '2024-01-22T11:45:00Z',
    updatedAt: '2024-01-22T11:46:00Z'
  },
  {
    id: '3',
    orderId: 'ORD-2024-003',
    gateway: 'cashfree',
    method: 'card',
    amount: 899,
    status: 'pending',
    transactionId: 'cf_xxxxxxxxxxxxxxxx',
    customerName: 'Amit Patel',
    createdAt: '2024-01-23T09:15:00Z',
    updatedAt: '2024-01-23T09:15:00Z'
  }
];

const AdminPayments: React.FC = () => {
  const [gateways, setGateways] = useState<PaymentGateway[]>(initialGateways);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(sampleTransactions);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [showSecrets, setShowSecrets] = useState<{[key: string]: boolean}>({});

  const handleGatewayToggle = (gatewayId: string, enabled: boolean) => {
    const gateway = gateways.find(g => g.id === gatewayId);
    if (!gateway?.isConfigured && enabled) {
      alert('Please configure the gateway credentials first');
      return;
    }

    setGateways(prev => prev.map(gateway =>
      gateway.id === gatewayId
        ? { ...gateway, isEnabled: enabled }
        : gateway
    ));
  };

  const getRequiredFields = (gatewayId: string): string[] => {
    switch (gatewayId) {
      case 'razorpay':
        return ['keyId', 'keySecret'];
      case 'phonepe':
        return ['merchantId', 'appId'];
      case 'cashfree':
        return ['clientId', 'clientSecret'];
      default:
        return [];
    }
  };

  const handleSaveConfiguration = () => {
    if (!selectedGateway) return;

    const requiredFields = getRequiredFields(selectedGateway.id);
    const hasAllFields = requiredFields.every(field => 
      selectedGateway.credentials[field as keyof typeof selectedGateway.credentials]
    );

    if (!hasAllFields) {
      alert('Please fill all required fields');
      return;
    }

    setGateways(prev => prev.map(gateway =>
      gateway.id === selectedGateway.id
        ? { ...selectedGateway, isConfigured: true }
        : gateway
    ));

    setIsConfigDialogOpen(false);
    setSelectedGateway(null);
    alert('Gateway configured successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      case 'refunded': return 'outline';
      default: return 'secondary';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'card': return <CreditCard className="h-4 w-4" />;
      case 'upi': return <Smartphone className="h-4 w-4" />;
      case 'netbanking': return <DollarSign className="h-4 w-4" />;
      case 'wallet': return <DollarSign className="h-4 w-4" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  const totalTransactions = transactions.length;
  const successfulTransactions = transactions.filter(t => t.status === 'success').length;
  const totalRevenue = transactions.filter(t => t.status === 'success').reduce((sum, t) => sum + t.amount, 0);
  const successRate = totalTransactions > 0 ? Math.round((successfulTransactions / totalTransactions) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Gateways</h1>
          <p className="text-gray-600">Configure and manage payment gateway integrations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Transactions
          </Button>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Payments
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-blue-600">{successRate}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Gateways</p>
                <p className="text-2xl font-bold text-gray-900">
                  {gateways.filter(g => g.isEnabled).length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="gateways" className="space-y-6">
        <TabsList>
          <TabsTrigger value="gateways">Gateway Configuration</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="gateways" className="space-y-6">
          {/* Payment Gateways */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gateways.map((gateway) => (
              <Card key={gateway.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{gateway.logo}</span>
                      <CardTitle className="text-lg">{gateway.name}</CardTitle>
                    </div>
                    <Switch
                      checked={gateway.isEnabled}
                      onCheckedChange={(checked) => handleGatewayToggle(gateway.id, checked)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant={gateway.isEnabled ? 'default' : 'secondary'}>
                      {gateway.isEnabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Configuration:</span>
                    <Badge variant={gateway.isConfigured ? 'default' : 'destructive'}>
                      {gateway.isConfigured ? 'Configured' : 'Not Configured'}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mode:</span>
                    <Badge variant="outline">
                      {gateway.settings.testMode ? 'Test' : 'Live'}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Supported Methods:</p>
                    <div className="flex flex-wrap gap-1">
                      {gateway.settings.supportedMethods.map(method => (
                        <Badge key={method} variant="outline" className="text-xs">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedGateway(gateway);
                      setIsConfigDialogOpen(true);
                    }}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Transactions ({transactions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Gateway</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.orderId}</TableCell>
                      <TableCell>{transaction.customerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {gateways.find(g => g.id === transaction.gateway)?.logo}
                          </span>
                          <span className="capitalize">{transaction.gateway}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getMethodIcon(transaction.method)}
                          <span className="capitalize">{transaction.method}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ₹{transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(transaction.status)}>
                          {transaction.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {transaction.transactionId}
                        </code>
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {transactions.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                  <p className="text-gray-500">Payment transactions will appear here once customers start making payments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Gateway Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Configure {selectedGateway?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedGateway && (
            <div className="space-y-6">
              {/* API Credentials */}
              <div>
                <h3 className="text-lg font-medium mb-4">API Credentials</h3>
                <div className="grid grid-cols-1 gap-4">
                  {selectedGateway.id === 'razorpay' && (
                    <>
                      <div>
                        <Label htmlFor="keyId">Key ID *</Label>
                        <Input
                          id="keyId"
                          value={selectedGateway.credentials.keyId || ''}
                          onChange={(e) => setSelectedGateway({
                            ...selectedGateway,
                            credentials: { ...selectedGateway.credentials, keyId: e.target.value }
                          })}
                          placeholder="rzp_test_xxxxxxxxxxxxxxxx"
                        />
                      </div>
                      <div>
                        <Label htmlFor="keySecret">Key Secret *</Label>
                        <div className="relative">
                          <Input
                            id="keySecret"
                            type={showSecrets[selectedGateway.id] ? 'text' : 'password'}
                            value={selectedGateway.credentials.keySecret || ''}
                            onChange={(e) => setSelectedGateway({
                              ...selectedGateway,
                              credentials: { ...selectedGateway.credentials, keySecret: e.target.value }
                            })}
                            placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowSecrets(prev => ({
                              ...prev,
                              [selectedGateway.id]: !prev[selectedGateway.id]
                            }))}
                          >
                            {showSecrets[selectedGateway.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedGateway.id === 'cashfree' && (
                    <>
                      <div>
                        <Label htmlFor="clientId">Client ID *</Label>
                        <Input
                          id="clientId"
                          value={selectedGateway.credentials.clientId || ''}
                          onChange={(e) => setSelectedGateway({
                            ...selectedGateway,
                            credentials: { ...selectedGateway.credentials, clientId: e.target.value }
                          })}
                          placeholder="CF_XXXXXXXXXXXXXXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="clientSecret">Client Secret *</Label>
                        <div className="relative">
                          <Input
                            id="clientSecret"
                            type={showSecrets[selectedGateway.id] ? 'text' : 'password'}
                            value={selectedGateway.credentials.clientSecret || ''}
                            onChange={(e) => setSelectedGateway({
                              ...selectedGateway,
                              credentials: { ...selectedGateway.credentials, clientSecret: e.target.value }
                            })}
                            placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowSecrets(prev => ({
                              ...prev,
                              [selectedGateway.id]: !prev[selectedGateway.id]
                            }))}
                          >
                            {showSecrets[selectedGateway.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedGateway.id === 'phonepe' && (
                    <>
                      <div>
                        <Label htmlFor="merchantId">Merchant ID *</Label>
                        <Input
                          id="merchantId"
                          value={selectedGateway.credentials.merchantId || ''}
                          onChange={(e) => setSelectedGateway({
                            ...selectedGateway,
                            credentials: { ...selectedGateway.credentials, merchantId: e.target.value }
                          })}
                          placeholder="PGTESTPAYUAT"
                        />
                      </div>
                      <div>
                        <Label htmlFor="keySecret">API Key *</Label>
                        <div className="relative">
                          <Input
                            id="keySecret"
                            type={showSecrets[selectedGateway.id] ? 'text' : 'password'}
                            value={selectedGateway.credentials.keySecret || ''}
                            onChange={(e) => setSelectedGateway({
                              ...selectedGateway,
                              credentials: { ...selectedGateway.credentials, keySecret: e.target.value }
                            })}
                            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={() => setShowSecrets(prev => ({
                              ...prev,
                              [selectedGateway.id]: !prev[selectedGateway.id]
                            }))}
                          >
                            {showSecrets[selectedGateway.id] ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Settings */}
              <div>
                <h3 className="text-lg font-medium mb-4">Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Test Mode</Label>
                      <p className="text-sm text-gray-500">Use test credentials for development</p>
                    </div>
                    <Switch
                      checked={selectedGateway.settings.testMode}
                      onCheckedChange={(checked) => setSelectedGateway({
                        ...selectedGateway,
                        settings: { ...selectedGateway.settings, testMode: checked }
                      })}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      value={selectedGateway.settings.webhookUrl}
                      onChange={(e) => setSelectedGateway({
                        ...selectedGateway,
                        settings: { ...selectedGateway.settings, webhookUrl: e.target.value }
                      })}
                      placeholder="https://yourdomain.com/webhook"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsConfigDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleSaveConfiguration}
                >
                  Save Configuration
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPayments;