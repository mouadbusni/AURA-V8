import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };
  
  return (
    <PageTransition>
      <div className="pt-32 pb-20">
        <div className="container-custom max-w-md mx-auto">
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl font-bold mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Sign In
            </motion.h1>
            <motion.p 
              className="text-aura-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Welcome back to Aura
            </motion.p>
          </div>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-aura-white p-8 shadow-sm border border-aura-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {error && (
              <div className="bg-red-50 text-red-600 p-4 mb-6">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="font-medium">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-aura-gold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-aura-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-aura-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
            
            <div className="mt-6 text-center">
              <p className="text-aura-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-aura-gold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.form>
          
          {/* Demo credentials */}
          <motion.div 
            className="mt-6 p-4 bg-aura-gray-100 text-sm text-aura-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="mb-2 font-medium">Demo Credentials:</p>
            <p>Customer: customer@example.com / password</p>
            <p>Admin: admin@aura.com / admin123</p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default LoginPage;