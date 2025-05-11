import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../ui/Logo';
import SearchModal from '../search/SearchModal';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'T-Shirts', path: '/products?category=t-shirts' },
    { name: 'Hoodies', path: '/products?category=hoodies' },
    { name: 'All Products', path: '/products' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-10" aria-label="AURA - Home">
            <Logo size={isScrolled ? 'small' : 'large'} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main menu">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors hover:text-aura-gold ${
                  location.pathname === item.path ? 'text-aura-gold' : ''
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Navigation: Search, Account, Wishlist, Cart */}
          <div className="flex items-center space-x-4 z-10">
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products" 
              className="p-2 hover:text-aura-gold transition-colors"
            >
              <Search size={20} />
            </button>
            
            <Link
              to={isAuthenticated ? (isAdmin ? '/admin' : '/profile') : '/login'}
              aria-label={isAuthenticated ? 'Your account' : 'Sign in'}
              className="p-2 hover:text-aura-gold transition-colors"
            >
              <User size={20} />
            </Link>

            <Link
              to="/wishlist"
              aria-label="Your wishlist"
              className="p-2 hover:text-aura-gold transition-colors"
            >
              <Heart size={20} />
            </Link>
            
            <Link
              to="/cart"
              aria-label={`Shopping cart with ${itemCount} items`}
              className="p-2 hover:text-aura-gold transition-colors relative"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-aura-gold text-black text-xs font-semibold rounded-full"
                  aria-label={`${itemCount} items in cart`}
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="p-2 md:hidden hover:text-aura-gold transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
            role="navigation"
            aria-label="Mobile menu"
          >
            <nav className="container-custom py-5 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-2 font-medium transition-colors hover:text-aura-gold ${
                    location.pathname === item.path ? 'text-aura-gold' : ''
                  }`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </header>
  );
};

export default Header;