"use client"
import { useState } from 'react';
import useAuthStore from '@/store/auth';
import { api } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state: any) => state.login);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login({ email: email }, data.access_token);
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
    setIsLoading(false);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-pink-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-60 right-1/3 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-50"></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transform rotate-12"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-blue-600/20 to-cyan-600/20 transform -rotate-12"></div>
      </div>

      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center space-x-2 text-purple-300 hover:text-white transition-colors group"
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-50"></div>
              <BookOpen className="relative h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Ethereal Pages
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-purple-300">Sign in to continue your literary journey</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-end justify-between">
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-purple-300">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white "
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/5 border-white/20 text-white "
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-purple-300">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
