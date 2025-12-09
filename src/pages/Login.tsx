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
import { Mail, Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    
    if (result.success) {
      setSuccess('Login successful! Redirecting...');
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
      <div className="min-h-screen bg-gradient-to-br from-golden/5 via-white to-golden/10 pt-6 md:pt-32 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-2 border-golden/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-golden/10 to-golden/5 border-b border-golden/20">
              <CardTitle className="text-3xl font-bold text-center text-heritage">
                Welcome Back
              </CardTitle>
              <p className="text-center text-heritage/60 mt-2 text-sm">
                Sign in to your Makario account
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

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-heritage font-semibold">
                    Email Address
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-golden" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-2 border-golden/20 focus:border-golden focus:ring-golden/20"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="password" className="text-heritage font-semibold">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-golden" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 border-2 border-golden/20 focus:border-golden focus:ring-golden/20"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-gradient-to-r from-golden to-golden/90 hover:from-golden/90 hover:to-golden/80 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-golden/20"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-heritage/60">New to Makario?</span>
                  </div>
                </div>

                {/* Signup Link */}
                <Button
                  type="button"
                  onClick={() => navigate('/signup')}
                  variant="outline"
                  className="w-full h-12 border-2 border-golden/30 text-heritage font-bold text-base rounded-xl hover:bg-golden/5 hover:border-golden/50"
                >
                  Create an Account
                </Button>
              </form>


            </CardContent>
          </Card>

          {/* Help Text */}
          <p className="text-center text-heritage/60 text-sm mt-6">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-golden hover:text-golden/80 font-semibold">
              Terms
            </Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-golden hover:text-golden/80 font-semibold">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
