import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError('Please fill all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    const result = await signup(formData);

    if (result.success) {
      setSuccess('Account created successfully! Redirecting to profile...');
      setTimeout(() => {
        navigate('/profile');
      }, 1500);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-golden/5 via-white to-golden/10 pt-20 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-golden/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-golden/10 to-golden/5 border-b border-golden/20">
              <CardTitle className="text-3xl font-bold text-center text-heritage">
                Create Account
              </CardTitle>
              <p className="text-center text-heritage/60 mt-2 text-sm">
                Join Makario and get premium makhana delivered to your door
              </p>
            </CardHeader>

            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Alert */}
                {error && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-600 ml-2">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Success Alert */}
                {success && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600 ml-2">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="text-heritage font-semibold">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Raja Raj"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden"
                      disabled={loading}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-heritage font-semibold">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden"
                      disabled={loading}
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-heritage font-semibold">
                      Password *
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden"
                      disabled={loading}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-heritage font-semibold">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden"
                      disabled={loading}
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-heritage font-semibold">
                      Address *
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden"
                      disabled={loading}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <Label htmlFor="city" className="text-heritage font-semibold">
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Patna"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden"
                      disabled={loading}
                    />
                  </div>

                  {/* State */}
                  <div>
                    <Label htmlFor="state" className="text-heritage font-semibold">
                      State *
                    </Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="Bihar"
                      value={formData.state}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden"
                      disabled={loading}
                    />
                  </div>

                  {/* Pincode */}
                  <div>
                    <Label htmlFor="pincode" className="text-heritage font-semibold">
                      Pincode *
                    </Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="800001"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="mt-2 border-2 border-golden/20 focus:border-golden"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-golden to-golden/90 hover:from-golden/90 hover:to-golden/80 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl mt-8"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>

                {/* Login Link */}
                <p className="text-center text-heritage/60">
                  Already have an account?{' '}
                  <Link to="/login" className="text-golden hover:text-golden/80 font-semibold">
                    Sign In
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
