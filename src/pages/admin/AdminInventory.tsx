import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Label } from '../../components/ui/label';
import { 
  Package, 
  Search, 
  MoreHorizontal, 
  Edit, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Minus,
  RefreshCw,
  Download
} from 'lucide-react';

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  costPrice: number;
  stockValue: number;
  location: string;
  supplier: string;
  lastUpdated: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstocked';
}

// Sample inventory data
const sampleInventory: InventoryItem[] = [
  {
    id: '1',
    productId: 'PROD-001',
    productName: 'Premium Bihar Makhana - Classic',
    sku: 'MKH-PREM-250',
    category: 'Premium Makhana',
    currentStock: 150,
    minStock: 50,
    maxStock: 500,
    price: 299,
    costPrice: 180,
    stockValue: 27000,
    location: 'Warehouse A',
    supplier: 'Bihar Farms Co.',
    lastUpdated: '2024-01-20',
    status: 'in-stock'
  },
  {
    id: '2',
    productId: 'PROD-002',
    productName: 'Roasted Salted Makhana',
    sku: 'MKH-SALT-200',
    category: 'Flavored Makhana',
    currentStock: 25,
    minStock: 30,
    maxStock: 200,
    price: 350,
    costPrice: 220,
    stockValue: 8750,
    location: 'Warehouse B',
    supplier: 'Mithila Foods',
    lastUpdated: '2024-01-19',
    status: 'low-stock'
  },
  {
    id: '3',
    productId: 'PROD-003',
    productName: 'Organic Premium Makhana',
    sku: 'MKH-ORG-300',
    category: 'Organic Makhana',
    currentStock: 0,
    minStock: 20,
    maxStock: 150,
    price: 450,
    costPrice: 300,
    stockValue: 0,
    location: 'Warehouse A',
    supplier: 'Organic Bihar Ltd.',
    lastUpdated: '2024-01-18',
    status: 'out-of-stock'
  },
  {
    id: '4',
    productId: 'PROD-004',
    productName: 'Caramel Flavored Makhana',
    sku: 'MKH-CAR-150',
    category: 'Flavored Makhana',
    currentStock: 320,
    minStock: 40,
    maxStock: 250,
    price: 380,
    costPrice: 250,
    stockValue: 80000,
    location: 'Warehouse C',
    supplier: 'Sweet Treats Co.',
    lastUpdated: '2024-01-20',
    status: 'overstocked'
  }
];

const AdminInventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(sampleInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [stockAdjustment, setStockAdjustment] = useState({ 
    type: 'add', 
    quantity: '', 
    reason: '',
    location: ''
  });

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStockAdjustment = () => {
    if (!selectedItem || !stockAdjustment.quantity) return;

    const quantity = parseInt(stockAdjustment.quantity);
    const updatedInventory = inventory.map(item => {
      if (item.id === selectedItem.id) {
        const newStock = stockAdjustment.type === 'add' 
          ? item.currentStock + quantity 
          : Math.max(0, item.currentStock - quantity);
        
        let status: InventoryItem['status'] = 'in-stock';
        if (newStock === 0) status = 'out-of-stock';
        else if (newStock < item.minStock) status = 'low-stock';
        else if (newStock > item.maxStock) status = 'overstocked';

        return {
          ...item,
          currentStock: newStock,
          stockValue: newStock * item.costPrice,
          lastUpdated: new Date().toISOString().split('T')[0],
          status
        };
      }
      return item;
    });

    setInventory(updatedInventory);
    setSelectedItem(null);
    setIsStockDialogOpen(false);
    setStockAdjustment({ type: 'add', quantity: '', reason: '', location: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'default';
      case 'low-stock': return 'destructive';
      case 'out-of-stock': return 'secondary';
      case 'overstocked': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low-stock': 
      case 'out-of-stock': 
        return <AlertTriangle className="h-4 w-4" />;
      case 'overstocked': 
        return <TrendingUp className="h-4 w-4" />;
      default: 
        return <Package className="h-4 w-4" />;
    }
  };

  const totalStockValue = inventory.reduce((sum, item) => sum + item.stockValue, 0);
  const lowStockItems = inventory.filter(item => item.status === 'low-stock').length;
  const outOfStockItems = inventory.filter(item => item.status === 'out-of-stock').length;
  const totalProducts = inventory.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your product inventory levels.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Sync Inventory
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Stock Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalStockValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
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
                placeholder="Search products, SKU, or category..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                <SelectItem value="overstocked">Overstocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({filteredInventory.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Stock Levels</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stock Value</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell>
                    <span className="text-lg font-semibold">{item.currentStock}</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Min: {item.minStock}</p>
                      <p>Max: {item.maxStock}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(item.status)} className="gap-1">
                      {getStatusIcon(item.status)}
                      {item.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>₹{item.stockValue.toLocaleString()}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem 
                          onClick={() => {
                            setSelectedItem(item);
                            setIsStockDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Adjust Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Stock History
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No inventory items found</h3>
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search terms or filters' 
                  : 'Your inventory will appear here once you add products'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Adjustment Dialog */}
      <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Stock - {selectedItem?.productName}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Current Stock:</span>
                  <span className="font-semibold">{selectedItem.currentStock}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>SKU:</span>
                  <span>{selectedItem.sku}</span>
                </div>
              </div>
              
              <div>
                <Label>Adjustment Type</Label>
                <Select 
                  value={stockAdjustment.type} 
                  onValueChange={(value) => setStockAdjustment({...stockAdjustment, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">Add Stock</SelectItem>
                    <SelectItem value="remove">Remove Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={stockAdjustment.quantity}
                  onChange={(e) => setStockAdjustment({...stockAdjustment, quantity: e.target.value})}
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  placeholder="Warehouse location"
                  value={stockAdjustment.location}
                  onChange={(e) => setStockAdjustment({...stockAdjustment, location: e.target.value})}
                />
              </div>

              <div>
                <Label>Reason</Label>
                <Input
                  placeholder="Reason for adjustment"
                  value={stockAdjustment.reason}
                  onChange={(e) => setStockAdjustment({...stockAdjustment, reason: e.target.value})}
                />
              </div>

              <Button onClick={handleStockAdjustment} className="w-full">
                {stockAdjustment.type === 'add' ? (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stock
                  </>
                ) : (
                  <>
                    <Minus className="h-4 w-4 mr-2" />
                    Remove Stock
                  </>
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminInventory;