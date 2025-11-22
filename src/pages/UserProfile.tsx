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
import { useAuth, UserAddress } from '../contexts/AuthContext';
import { User, Edit2, Save, LogOut, MapPin, Phone, Mail, Calendar, CheckCircle, AlertCircle, Plus, Trash2, Star, X } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const [addressForm, setAddressForm] = useState<Omit<UserAddress, 'id'>>({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    label: 'home',
    isDefault: false,
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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSaveProfile = async () => {
    setError('');
    setSuccess('');

    if (!formData.name || !formData.phone) {
      setError('Please fill all required fields');
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

  const handleSaveAddress = async () => {
    setError('');
    setSuccess('');

    if (!addressForm.street || !addressForm.city || !addressForm.state || !addressForm.pincode || !addressForm.phone) {
      setError('Please fill all address fields');
      return;
    }

    setLoading(true);
    let result;

    if (editingAddressId) {
      result = await updateAddress(editingAddressId, addressForm);
    } else {
      result = await addAddress(addressForm);
    }

    if (result.success) {
      setSuccess(editingAddressId ? 'Address updated successfully' : 'Address added successfully');
      setShowAddAddress(false);
      setEditingAddressId(null);
      setAddressForm({
        street: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        label: 'home',
        isDefault: false,
      });
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleEditAddress = (address: UserAddress) => {
    setAddressForm({
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
      label: address.label,
      isDefault: address.isDefault,
    });
    setEditingAddressId(address.id);
    setShowAddAddress(true);
  };

  const handleDeleteAddress = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setLoading(true);
      const result = await deleteAddress(id);

      if (result.success) {
        setSuccess('Address deleted successfully');
      } else {
        setError(result.message);
      }

      setLoading(false);
    }
  };

  const handleSetDefault = async (id: string) => {
    setLoading(true);
    const result = await setDefaultAddress(id);

    if (result.success) {
      setSuccess('Default address updated');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const cancelAddressForm = () => {
    setShowAddAddress(false);
    setEditingAddressId(null);
    setAddressForm({
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      label: 'home',
      isDefault: false,
    });
  };

  const addresses = user.addresses || [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-golden/5 via-white to-golden/10 pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Card */}
          <Card className="mb-8 border-2 border-golden/30 shadow-2xl overflow-hidden bg-white">
            <div className="bg-gradient-to-r from-golden via-golden/80 to-golden/60 h-40"></div>
            <CardContent className="pt-0">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 -mt-20 mb-8">
                {/* Avatar */}
                <div className="w-40 h-40 rounded-full bg-white border-4 border-golden shadow-xl flex items-center justify-center flex-shrink-0">
                  <User className="h-20 w-20 text-golden" />
                </div>

                {/* Welcome Text */}
                <div className="flex-1 mt-6 md:mt-0">
                  <h1 className="text-4xl font-bold text-heritage mb-2">{user.name}</h1>
                  <div className="space-y-2">
                    <p className="text-heritage/70 flex items-center gap-3">
                      <Mail className="h-5 w-5 text-golden" /> {user.email}
                    </p>
                    <p className="text-heritage/70 flex items-center gap-3">
                      <Phone className="h-5 w-5 text-golden" /> {formData.phone}
                    </p>
                    <p className="text-heritage/70 flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-golden" /> Member since {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-golden hover:bg-golden/90 text-white font-bold h-11 rounded-lg"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      logout();
                      navigate('/login');
                    }}
                    variant="destructive"
                    className="h-11 rounded-lg font-bold"
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
            <Alert className="mb-6 bg-red-50 border-2 border-red-200">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <AlertDescription className="text-red-600 ml-2 font-medium">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 border-2 border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-600 ml-2 font-medium">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* Personal Information Section */}
          {isEditing ? (
            <Card className="mb-8 border-2 border-golden/30 shadow-lg bg-white">
              <CardHeader className="bg-gradient-to-r from-golden/10 to-golden/5 border-b-2 border-golden/20">
                <CardTitle className="text-2xl text-heritage flex items-center gap-2">
                  <User className="h-6 w-6 text-golden" />
                  Edit Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-heritage font-semibold text-sm">Full Name</Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleProfileChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden rounded-lg h-11"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Label className="text-heritage font-semibold text-sm">Phone Number</Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleProfileChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden rounded-lg h-11"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Label className="text-heritage font-semibold text-sm">Email (Cannot be changed)</Label>
                    <div className="mt-2 p-3 bg-golden/5 rounded-lg border-2 border-golden/10 text-heritage/70 font-medium">
                      {user.email}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8 justify-end">
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({ name: user.name, phone: user.phone });
                    }}
                    variant="outline"
                    className="px-8 h-11 border-2 rounded-lg font-semibold"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="px-8 h-11 bg-golden hover:bg-golden/90 text-white font-bold rounded-lg"
                    disabled={loading}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}

          {/* Addresses Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-heritage flex items-center gap-2">
                <MapPin className="h-8 w-8 text-golden" />
                Saved Addresses
              </h2>
              {!showAddAddress && (
                <Button
                  onClick={() => {
                    setShowAddAddress(true);
                    cancelAddressForm();
                  }}
                  className="bg-golden hover:bg-golden/90 text-white font-bold h-11 rounded-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              )}
            </div>

            {/* Add/Edit Address Form */}
            {showAddAddress && (
              <Card className="mb-8 border-2 border-golden/30 shadow-lg bg-white">
                <CardHeader className="bg-gradient-to-r from-golden/10 to-golden/5 border-b-2 border-golden/20">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-heritage">
                      {editingAddressId ? 'Edit Address' : 'Add New Address'}
                    </CardTitle>
                    <button
                      onClick={cancelAddressForm}
                      className="text-heritage/60 hover:text-heritage"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-heritage font-semibold text-sm">Street Address</Label>
                      <Input
                        name="street"
                        placeholder="Street address"
                        value={addressForm.street}
                        onChange={handleAddressChange}
                        className="mt-2 border-2 border-golden/20 focus:border-golden rounded-lg h-11"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <Label className="text-heritage font-semibold text-sm">City</Label>
                      <Input
                        name="city"
                        placeholder="City"
                        value={addressForm.city}
                        onChange={handleAddressChange}
                        className="mt-2 border-2 border-golden/20 focus:border-golden rounded-lg h-11"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <Label className="text-heritage font-semibold text-sm">State</Label>
                      <Input
                        name="state"
                        placeholder="State"
                        value={addressForm.state}
                        onChange={handleAddressChange}
                        className="mt-2 border-2 border-golden/20 focus:border-golden rounded-lg h-11"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <Label className="text-heritage font-semibold text-sm">Pincode</Label>
                      <Input
                        name="pincode"
                        placeholder="Pincode"
                        value={addressForm.pincode}
                        onChange={handleAddressChange}
                        className="mt-2 border-2 border-golden/20 focus:border-golden rounded-lg h-11"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <Label className="text-heritage font-semibold text-sm">Phone</Label>
                      <Input
                        name="phone"
                        placeholder="Phone number"
                        value={addressForm.phone}
                        onChange={handleAddressChange}
                        className="mt-2 border-2 border-golden/20 focus:border-golden rounded-lg h-11"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <Label className="text-heritage font-semibold text-sm">Label</Label>
                      <select
                        name="label"
                        value={addressForm.label}
                        onChange={handleAddressChange}
                        className="mt-2 w-full px-4 py-2 border-2 border-golden/20 focus:border-golden rounded-lg h-11 bg-white text-heritage"
                        disabled={loading}
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-8 justify-end">
                    <Button
                      onClick={cancelAddressForm}
                      variant="outline"
                      className="px-8 h-11 border-2 rounded-lg font-semibold"
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSaveAddress}
                      className="px-8 h-11 bg-golden hover:bg-golden/90 text-white font-bold rounded-lg"
                      disabled={loading}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Address'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Addresses Grid */}
            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {addresses.map((address) => (
                  <Card
                    key={address.id}
                    className={`border-2 shadow-lg hover:shadow-xl transition-all relative bg-white ${
                      address.isDefault ? 'border-golden/50 bg-gradient-to-br from-golden/5 to-white' : 'border-golden/20'
                    }`}
                  >
                    {address.isDefault && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-golden/20 text-golden px-3 py-1 rounded-full text-xs font-bold">
                        <Star className="h-3 w-3 fill-golden" />
                        Default
                      </div>
                    )}

                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-heritage/60 font-semibold uppercase">
                            {address.label === 'home' ? '🏠 Home' : address.label === 'work' ? '💼 Work' : '📍 Other'}
                          </p>
                        </div>

                        <div>
                          <p className="text-heritage font-semibold text-sm">{address.street}</p>
                          <p className="text-heritage/70 text-sm">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-heritage/70 text-sm">
                          <Phone className="h-4 w-4 text-golden" />
                          {address.phone}
                        </div>

                        <Separator className="bg-golden/15" />

                        <div className="flex gap-2 pt-2">
                          {!address.isDefault && (
                            <Button
                              onClick={() => handleSetDefault(address.id)}
                              variant="outline"
                              className="flex-1 border-golden/20 text-golden hover:bg-golden/10 rounded-lg font-semibold text-sm h-10"
                              disabled={loading}
                            >
                              <Star className="h-4 w-4 mr-1" />
                              Set Default
                            </Button>
                          )}
                          <Button
                            onClick={() => handleEditAddress(address)}
                            variant="outline"
                            className="flex-1 border-golden/20 text-golden hover:bg-golden/10 rounded-lg font-semibold text-sm h-10"
                            disabled={loading}
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteAddress(address.id)}
                            variant="outline"
                            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-semibold text-sm h-10"
                            disabled={loading}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-2 border-dashed border-golden/30 bg-golden/5">
                <CardContent className="pt-8 pb-8 text-center">
                  <MapPin className="h-12 w-12 text-golden/40 mx-auto mb-4" />
                  <p className="text-heritage/60 font-medium">No addresses added yet</p>
                  <p className="text-heritage/50 text-sm mt-1">Click "Add Address" to add your first address</p>
                </CardContent>
              </Card>
            )}
          </div>

          <Separator className="my-12 bg-golden/20" />

          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-bold text-heritage mb-6">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-golden/20 hover:border-golden/50 hover:shadow-xl transition-all cursor-pointer bg-white"
                onClick={() => navigate('/orders')}>
                <CardContent className="pt-8 text-center pb-8">
                  <div className="text-5xl mb-4">📦</div>
                  <h3 className="font-bold text-heritage text-lg mb-2">My Orders</h3>
                  <p className="text-sm text-heritage/60">View and track your orders</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-golden/20 hover:border-golden/50 hover:shadow-xl transition-all cursor-pointer bg-white"
                onClick={() => navigate('/wishlist')}>
                <CardContent className="pt-8 text-center pb-8">
                  <div className="text-5xl mb-4">❤️</div>
                  <h3 className="font-bold text-heritage text-lg mb-2">Wishlist</h3>
                  <p className="text-sm text-heritage/60">Your saved items</p>
                </CardContent>
              </Card>

              <Card className="border-2 border-golden/20 hover:border-golden/50 hover:shadow-xl transition-all cursor-pointer bg-white"
                onClick={() => navigate('/shop')}>
                <CardContent className="pt-8 text-center pb-8">
                  <div className="text-5xl mb-4">🛍️</div>
                  <h3 className="font-bold text-heritage text-lg mb-2">Continue Shopping</h3>
                  <p className="text-sm text-heritage/60">Explore more products</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
