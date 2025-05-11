import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, ShoppingBag } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const quickLinks = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <Search size={20} />, label: 'Search', path: '/products' },
    { icon: <ShoppingBag size={20} />, label: 'Shop', path: '/products' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center pt-16 pb-20 bg-gradient-to-b from-aura-white to-aura-gray-100">
        <div className="container-custom text-center max-w-3xl px-4">
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-block"
            >
              <h1 className="text-[12rem] font-bold leading-none bg-gradient-to-r from-aura-black via-aura-gold to-aura-black bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>
          </motion.div>
          
          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-aura-gray-600 text-lg mb-8 max-w-md mx-auto">
              The page you're looking for seems to have wandered off. 
              Let's help you find your way back.
            </p>
            
            {/* Primary Action */}
            <div className="mb-12">
              <Button 
                href="/"
                variant="primary"
                size="lg"
                icon={<ArrowLeft size={20} />}
                iconPosition="left"
              >
                Back to Home
              </Button>
            </div>
            
            {/* Quick Links */}
            <div className="max-w-md mx-auto">
              <p className="text-sm text-aura-gray-500 mb-4">
                Or try one of these popular destinations
              </p>
              <div className="grid grid-cols-3 gap-4">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  >
                    <Link
                      to={link.path}
                      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <span className="text-aura-gray-600 mb-2">
                        {link.icon}
                      </span>
                      <span className="text-sm font-medium">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Support Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-sm text-aura-gray-500"
          >
            <p>
              Need help? <a href="/contact" className="text-aura-gold hover:underline">Contact our support team</a>
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFoundPage;