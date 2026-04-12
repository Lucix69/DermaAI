import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';

export function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const { signIn } = await import('../../services/authService');
        const result = await signIn(email, password);

        if (result.success) {
          toast.success('Successfully logged in!');
          navigate('/dashboard');
        } else {
          toast.error(result.message);
        }
      } else {
        // Sign up
        const { signUp } = await import('../../services/authService');
        const result = await signUp(email, password);

        if (result.success) {
          toast.success('Account created successfully!');
          navigate('/assessment');
        } else {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info('Google sign-in coming soon!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfbf8] via-[#f5e9e4] to-[#ffd4d4]/20 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-semibold text-foreground">DermaAI</span>
          </Link>
          <p className="text-sm text-muted-foreground">AI-Powered Skincare Analysis</p>
        </div>

        <Card className="border-border shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? 'Sign in to access your personalized skincare routine'
                : 'Get started with your personalized skincare journey'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button 
                variant="outline" 
                type="button" 
                className="w-full"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
                disabled={isLoading}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </div>

            {!isLogin && (
              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>
            )}
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}