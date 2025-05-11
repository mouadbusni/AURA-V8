import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await register(formData.name, formData.email, formData.password);
        navigate('/profile');
      } catch (err) {
        setErrors({
          form: 'Registration failed. Please try again.',
        });
      }
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
              Create Account
            </motion.h1>
            <motion.p 
              className="text-aura-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join the Aura community
            </motion.p>
          </div>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-aura-white p-8 shadow-sm border border-aura-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {errors.form && (
              <div className="bg-red-50 text-red-600 p-4 mb-6">
                {errors.form}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="name" className="block mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border ${
                  errors.name ? 'border-red-500' : 'border-aura-gray-300'
                } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border ${
                  errors.email ? 'border-red-500' : 'border-aura-gray-300'
                } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.password ? 'border-red-500' : 'border-aura-gray-300'
                  } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold`}
                  placeholder="Create a password"
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
              {errors.password && (
                <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            
            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block mb-2 font-medium">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-aura-gray-300'
                } px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aura-gold`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <div className="mt-6 text-center">
              <p className="text-aura-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-aura-gold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </PageTransition>
  );
};

export default RegisterPage;