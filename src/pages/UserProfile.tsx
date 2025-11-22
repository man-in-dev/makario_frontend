import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../contexts/AuthContext';
import { User, Edit2, Save, LogOut, Lock, MapPin, Phone, Mail, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    pincode: user?.pincode || '',
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-heritage mb-4">Please login first</h1>
          <Button
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-golden to-golden/90 text-white font-bold"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    const result = await updateProfile(formData);

    if (result.success) {
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-golden/5 via-white to-golden/10 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 border-2 border-golden/20 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-golden/20 to-golden/10 h-32"></div>
            <CardContent className="pt-0">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 -mt-16 mb-6">
                {/* Avatar */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-golden/20 to-golden/10 border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0">
                  <User className="h-16 w-16 text-golden" />
                </div>

                {/* Welcome Text */}
                <div className="flex-1 mt-4 md:mt-0">
                  <h1 className="text-3xl font-bold text-heritage">{user.name}</h1>
                  <p className="text-heritage/60 flex items-center gap-2 mt-2">
                    <Mail className="h-4 w-4" /> {user.email}
                  </p>
                  <p className="text-heritage/60 flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" /> Joined {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 w-full md:w-auto">
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 md:flex-none bg-golden/20 text-golden border-2 border-golden/30 hover:bg-golden/30"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                  <Button
                    onClick={handleLogout}
                    variant="destructive"
                    className="flex-1 md:flex-none"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600 ml-2">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600 ml-2">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* Personal Information */}
          <Card className="mb-8 border-2 border-golden/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-golden/10 to-golden/5 border-b border-golden/20">
              <CardTitle className="text-2xl text-heritage flex items-center gap-2">
                <User className="h-5 w-5 text-golden" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <Label className="text-heritage font-semibold">Full Name</Label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20"
                      disabled={loading}
                    />
                  ) : (
                    <p className="mt-2 p-2 bg-golden/5 rounded border border-golden/20 text-heritage font-medium">
                      {user.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label className="text-heritage font-semibold">Email Address</Label>
                  <p className="mt-2 p-2 bg-golden/5 rounded border border-golden/20 text-heritage/70 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-golden" />
                    {user.email}
                  </p>
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <Label className="text-heritage font-semibold">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20"
                      disabled={loading}
                    />
                  ) : (
                    <p className="mt-2 p-2 bg-golden/5 rounded border border-golden/20 text-heritage font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-golden" />
                      {user.phone}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="mb-8 border-2 border-golden/20 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-golden/10 to-golden/5 border-b border-golden/20">
              <CardTitle className="text-2xl text-heritage flex items-center gap-2">
                <MapPin className="h-5 w-5 text-golden" />
                Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address */}
                <div className="md:col-span-2">
                  <Label className="text-heritage font-semibold">Street Address</Label>
                  {isEditing ? (
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20"
                      disabled={loading}
                    />
                  ) : (
                    <p className="mt-2 p-2 bg-golden/5 rounded border border-golden/20 text-heritage font-medium">
                      {user.address}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <Label className="text-heritage font-semibold">City</Label>
                  {isEditing ? (
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20"
                      disabled={loading}
                    />
                  ) : (
                    <p className="mt-2 p-2 bg-golden/5 rounded border border-golden/20 text-heritage font-medium">
                      {user.city}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <Label className="text-heritage font-semibold">State</Label>
                  {isEditing ? (
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20"
                      disabled={loading}
                    />
                  ) : (
                    <p className="mt-2 p-2 bg-golden/5 rounded border border-golden/20 text-heritage font-medium">
                      {user.state}
                    </p>
                  )}
                </div>

                {/* Pincode */}
                <div>
                  <Label className="text-heritage font-semibold">Pincode</Label>
                  {isEditing ? (
                    <Input
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20"
                      disabled={loading}
                    />
                  ) : (
                    <p className="mt-2 p-2 bg-golden/5 rounded border border-golden/20 text-heritage font-medium">
                      {user.pincode}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Changes */}
          {isEditing && (
            <div className="flex gap-4 justify-end">
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user.name,
                    phone: user.phone,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    pincode: user.pincode,
                  });
                }}
                variant="outline"
                className="px-8 h-11"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="px-8 h-11 bg-gradient-to-r from-golden to-golden/90 text-white font-bold"
                disabled={loading}
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}

          {/* Quick Links */}
          <Separator className="my-12 bg-golden/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-golden/20 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/orders')}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl text-golden mb-3">📦</div>
                <h3 className="font-bold text-heritage mb-2">My Orders</h3>
                <p className="text-sm text-heritage/60">View and track your orders</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-golden/20 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/wishlist')}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl text-golden mb-3">❤️</div>
                <h3 className="font-bold text-heritage mb-2">Wishlist</h3>
                <p className="text-sm text-heritage/60">Your saved items</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-golden/20 hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/shop')}>
              <CardContent className="pt-6 text-center">
                <div className="text-4xl text-golden mb-3">🛍️</div>
                <h3 className="font-bold text-heritage mb-2">Continue Shopping</h3>
                <p className="text-sm text-heritage/60">Explore more products</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
