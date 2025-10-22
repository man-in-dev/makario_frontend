import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  CreditCard,
  Mail,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Save,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  AlertCircle,
  Database,
  Server,
  Monitor
} from 'lucide-react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'manager' | 'editor';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  createdDate: string;
  permissions: string[];
}

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  timezone: string;
  currency: string;
  language: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
}

const AdminSettings = () => {
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.admin@makario.in',
      role: 'super_admin',
      status: 'active',
      lastLogin: '2025-09-24T09:30:00',
      createdDate: '2025-01-15',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.manager@makario.in',
      role: 'manager',
      status: 'active',
      lastLogin: '2025-09-23T16:45:00',
      createdDate: '2025-03-20',
      permissions: ['products', 'orders', 'customers', 'inventory']
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit.editor@makario.in',
      role: 'editor',
      status: 'active',
      lastLogin: '2025-09-22T11:20:00',
      createdDate: '2025-05-10',
      permissions: ['products', 'content', 'marketing']
    }
  ]);

  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'Makario - Premium Bihar Makhana',
    siteDescription: 'India\'s leading premium Bihar makhana delivery service',
    contactEmail: 'support@makario.in',
    contactPhone: '+91-9953240031',
    address: 'Darbhanga, Bihar 846004, India',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    language: 'en',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true
  });

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'editor' as AdminUser['role'],
    password: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    orderAlerts: true,
    inventoryAlerts: true,
    securityAlerts: true,
    marketingReports: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Please fill all required fields');
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const user: AdminUser = {
      id: (users.length + 1).toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      lastLogin: '',
      createdDate: new Date().toISOString().split('T')[0],
      permissions: getDefaultPermissions(newUser.role)
    };

    setUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'editor', password: '', confirmPassword: '' });
    alert('User created successfully!');
  };

  const getDefaultPermissions = (role: AdminUser['role']): string[] => {
    switch (role) {
      case 'super_admin': return ['all'];
      case 'admin': return ['products', 'orders', 'customers', 'inventory', 'marketing', 'settings'];
      case 'manager': return ['products', 'orders', 'customers', 'inventory'];
      case 'editor': return ['products', 'content', 'marketing'];
      default: return [];
    }
  };

  const getRoleColor = (role: AdminUser['role']) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'editor': return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: AdminUser['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage system settings, users, and configurations</p>
        </div>
        <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Settings
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Site Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea
                    id="site-description"
                    rows={3}
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input
                    id="contact-phone"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    rows={3}
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    className="w-full p-2 border rounded-md"
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <select 
                    id="currency"
                    className="w-full p-2 border rounded-md"
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="language">Default Language</Label>
                  <select 
                    id="language"
                    className="w-full p-2 border rounded-md"
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                    <option value="gu">Gujarati</option>
                  </select>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      <p className="text-sm text-gray-600">Put site in maintenance mode</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="maintenance-mode"
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                        className="rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-registration">Allow User Registration</Label>
                      <p className="text-sm text-gray-600">Allow new users to register</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="allow-registration"
                        type="checkbox"
                        checked={settings.allowRegistration}
                        onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                        className="rounded"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-verification">Email Verification Required</Label>
                      <p className="text-sm text-gray-600">Require email verification for new users</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="email-verification"
                        type="checkbox"
                        checked={settings.requireEmailVerification}
                        onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Add New User
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="user-email">Email Address</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <Label htmlFor="user-role">Role</Label>
                  <select 
                    id="user-role"
                    className="w-full p-2 border rounded-md"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value as AdminUser['role'] })}
                  >
                    <option value="editor">Editor</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="user-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="user-password"
                      type={showPassword ? 'text' : 'password'}
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="user-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="user-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-2 text-gray-500"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <Button onClick={handleCreateUser} className="w-full">
                Create User
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role.replace('_', ' ')}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-gray-600">Created</p>
                        <p className="font-semibold">{new Date(user.createdDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Login</p>
                        <p className="font-semibold">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Permissions</p>
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.slice(0, 3).map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission === 'all' ? 'All Access' : permission}
                            </Badge>
                          ))}
                          {user.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-1" />
                        Permissions
                      </Button>
                      {user.role !== 'super_admin' && (
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Notifications
                    </h4>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                    className="rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center">
                      <Smartphone className="h-4 w-4 mr-2" />
                      SMS Notifications
                    </h4>
                    <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.smsNotifications}
                    onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                    className="rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Push Notifications
                    </h4>
                    <p className="text-sm text-gray-600">Receive browser push notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                    className="rounded"
                  />
                </div>
              </div>

              <hr />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Notification Types</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Order Alerts</h4>
                    <p className="text-sm text-gray-600">New orders, cancellations, refunds</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.orderAlerts}
                    onChange={(e) => setNotifications({ ...notifications, orderAlerts: e.target.checked })}
                    className="rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Inventory Alerts</h4>
                    <p className="text-sm text-gray-600">Low stock, out of stock notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.inventoryAlerts}
                    onChange={(e) => setNotifications({ ...notifications, inventoryAlerts: e.target.checked })}
                    className="rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Security Alerts</h4>
                    <p className="text-sm text-gray-600">Login attempts, security events</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.securityAlerts}
                    onChange={(e) => setNotifications({ ...notifications, securityAlerts: e.target.checked })}
                    className="rounded"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Reports</h4>
                    <p className="text-sm text-gray-600">Weekly and monthly marketing reports</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.marketingReports}
                    onChange={(e) => setNotifications({ ...notifications, marketingReports: e.target.checked })}
                    className="rounded"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">Add extra security layer</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Login Attempts Limit</h4>
                      <p className="text-sm text-gray-600">Max failed login attempts</p>
                    </div>
                    <Input
                      type="number"
                      defaultValue={5}
                      className="w-20"
                      min={3}
                      max={10}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Session Timeout</h4>
                      <p className="text-sm text-gray-600">Auto logout after inactivity</p>
                    </div>
                    <select className="p-1 border rounded">
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Password Requirements</h4>
                      <p className="text-sm text-gray-600">Minimum password complexity</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Strong</Badge>
                  </div>
                </div>
                
                <Button className="w-full">
                  <Lock className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Recent Security Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { event: 'Admin login from new device', time: '2 hours ago', status: 'warning' },
                    { event: 'Password changed successfully', time: '1 day ago', status: 'success' },
                    { event: 'Failed login attempt', time: '2 days ago', status: 'error' },
                    { event: '2FA enabled', time: '3 days ago', status: 'success' },
                    { event: 'New admin user created', time: '5 days ago', status: 'info' }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{event.event}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        event.status === 'success' ? 'bg-green-500' :
                        event.status === 'warning' ? 'bg-yellow-500' :
                        event.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Database & Backup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Database Size</span>
                    <span className="font-semibold">245.8 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Last Backup</span>
                    <span className="font-semibold">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Backup Frequency</span>
                    <span className="font-semibold">Daily</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Storage Used</span>
                    <span className="font-semibold">1.2 GB / 5 GB</span>
                  </div>
                </div>
                <Button className="w-full">
                  <Database className="h-4 w-4 mr-2" />
                  Create Manual Backup
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">CPU Usage</span>
                    <span className="font-semibold">23%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Memory Usage</span>
                    <span className="font-semibold">67%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Disk Usage</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Version</span>
                  <span className="font-semibold">v2.1.3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Environment</span>
                  <span className="font-semibold">Production</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Server</span>
                  <span className="font-semibold">Ubuntu 20.04 LTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">PHP Version</span>
                  <span className="font-semibold">8.2.12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="font-semibold">MySQL 8.0.35</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="font-semibold">15 days, 6 hours</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-mono">
                  <div className="p-2 bg-gray-50 rounded text-gray-600">
                    [2025-09-24 09:30:15] INFO: Admin user logged in
                  </div>
                  <div className="p-2 bg-green-50 rounded text-green-700">
                    [2025-09-24 09:15:32] SUCCESS: Backup completed
                  </div>
                  <div className="p-2 bg-blue-50 rounded text-blue-700">
                    [2025-09-24 08:45:21] INFO: System maintenance completed
                  </div>
                  <div className="p-2 bg-yellow-50 rounded text-yellow-700">
                    [2025-09-24 08:30:10] WARNING: High memory usage detected
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-gray-600">
                    [2025-09-24 08:15:45] INFO: Cache cleared successfully
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-3">
                  View Full Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;