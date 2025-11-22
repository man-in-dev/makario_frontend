import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Lock, Zap, LogOut } from "lucide-react";
import React, { useState } from "react";

const Settings = () => {
    const [userSettings, setUserSettings] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+91 98765 43210",
        address: "123 Main St, City, State 110001"
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        orderUpdates: true,
        promotionalOffers: false,
        newsletter: true,
        pushNotifications: true
    });

    const [securitySettings, setSecuritySettings] = useState({
        twoFactorAuth: false,
        loginAlerts: true
    });

    const handleUserSettingsChange = (field: string, value: string) => {
        setUserSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleNotificationToggle = (field: string) => {
        setNotifications(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSecurityToggle = (field: string) => {
        setSecuritySettings(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title="Account Settings | Makario"
                description="Manage your Makario account settings, preferences, and security options."
                keywords="account settings, preferences, security, notifications, makario"
                canonical="https://www.makario.in/settings"
            />
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-heritage to-heritage/80 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Account Settings</h1>
                        <p className="text-white/90 text-lg">Manage your profile, preferences, and security settings</p>
                    </div>
                </div>
            </section>

            {/* Settings Content */}
            <section className="py-12 flex-1">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-8">
                                <TabsTrigger value="profile" className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="hidden sm:inline">Profile</span>
                                </TabsTrigger>
                                <TabsTrigger value="notifications" className="flex items-center gap-2">
                                    <Bell className="w-4 h-4" />
                                    <span className="hidden sm:inline">Notifications</span>
                                </TabsTrigger>
                                <TabsTrigger value="security" className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    <span className="hidden sm:inline">Security</span>
                                </TabsTrigger>
                                <TabsTrigger value="preferences" className="flex items-center gap-2">
                                    <Zap className="w-4 h-4" />
                                    <span className="hidden sm:inline">Preferences</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Profile Tab */}
                            <TabsContent value="profile" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Profile Information</CardTitle>
                                        <CardDescription>
                                            Update your personal information and contact details
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName">First Name</Label>
                                                <Input
                                                    id="firstName"
                                                    value={userSettings.firstName}
                                                    onChange={(e) => handleUserSettingsChange('firstName', e.target.value)}
                                                    placeholder="John"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName">Last Name</Label>
                                                <Input
                                                    id="lastName"
                                                    value={userSettings.lastName}
                                                    onChange={(e) => handleUserSettingsChange('lastName', e.target.value)}
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={userSettings.email}
                                                onChange={(e) => handleUserSettingsChange('email', e.target.value)}
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={userSettings.phone}
                                                onChange={(e) => handleUserSettingsChange('phone', e.target.value)}
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Input
                                                id="address"
                                                value={userSettings.address}
                                                onChange={(e) => handleUserSettingsChange('address', e.target.value)}
                                                placeholder="123 Main St, City, State"
                                            />
                                        </div>

                                        <div className="pt-4 flex gap-4">
                                            <Button className="bg-golden hover:bg-golden/90">
                                                Save Changes
                                            </Button>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Notifications Tab */}
                            <TabsContent value="notifications" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Notification Preferences</CardTitle>
                                        <CardDescription>
                                            Choose how you want to receive updates from Makario
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Email Notifications</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive important updates via email
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={notifications.emailNotifications}
                                                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Order Updates</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Get notified about your order status
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={notifications.orderUpdates}
                                                    onCheckedChange={() => handleNotificationToggle('orderUpdates')}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Promotional Offers</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive exclusive deals and promotions
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={notifications.promotionalOffers}
                                                    onCheckedChange={() => handleNotificationToggle('promotionalOffers')}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Newsletter</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Subscribe to our makhana insights newsletter
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={notifications.newsletter}
                                                    onCheckedChange={() => handleNotificationToggle('newsletter')}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Push Notifications</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Receive push notifications on your browser
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={notifications.pushNotifications}
                                                    onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button className="bg-golden hover:bg-golden/90">
                                                Save Preferences
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Security Tab */}
                            <TabsContent value="security" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Security Settings</CardTitle>
                                        <CardDescription>
                                            Manage your password and security preferences
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="p-4 border rounded-lg">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <p className="font-medium">Change Password</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Update your account password
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Change Password
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Two-Factor Authentication</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Add an extra layer of security to your account
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={securitySettings.twoFactorAuth}
                                                    onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Login Alerts</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Get notified of new login attempts
                                                    </p>
                                                </div>
                                                <Switch
                                                    checked={securitySettings.loginAlerts}
                                                    onCheckedChange={() => handleSecurityToggle('loginAlerts')}
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <p className="font-medium mb-4 text-sm">Active Sessions</p>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                                    <div>
                                                        <p className="text-sm font-medium">Current Session</p>
                                                        <p className="text-xs text-muted-foreground">Last active: just now</p>
                                                    </div>
                                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                                        Active
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button variant="destructive" size="sm">
                                                Sign Out All Other Sessions
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Preferences Tab */}
                            <TabsContent value="preferences" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>App Preferences</CardTitle>
                                        <CardDescription>
                                            Customize your Makario experience
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Dark Mode</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Use dark theme for the interface
                                                    </p>
                                                </div>
                                                <Switch defaultChecked={false} />
                                            </div>

                                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="space-y-1">
                                                    <p className="font-medium">Product Recommendations</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Show personalized product recommendations
                                                    </p>
                                                </div>
                                                <Switch defaultChecked={true} />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Preferred Language</Label>
                                                <select className="w-full px-3 py-2 border rounded-lg">
                                                    <option>English</option>
                                                    <option>Hindi</option>
                                                    <option>Bengali</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Default Currency</Label>
                                                <select className="w-full px-3 py-2 border rounded-lg">
                                                    <option>INR (₹)</option>
                                                    <option>USD ($)</option>
                                                    <option>EUR (€)</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <Button className="bg-golden hover:bg-golden/90">
                                                Save Preferences
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Danger Zone */}
                                <Card className="border-red-200">
                                    <CardHeader>
                                        <CardTitle className="text-red-600">Danger Zone</CardTitle>
                                        <CardDescription>
                                            Irreversible and destructive actions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                            <p className="text-sm font-medium text-red-900 mb-4">
                                                Delete Account
                                            </p>
                                            <p className="text-sm text-red-700 mb-4">
                                                Once you delete your account, there is no going back. Please be certain.
                                            </p>
                                            <Button variant="destructive" size="sm">
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Delete Account
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Settings;


