import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aura-black text-aura-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and newsletter */}
          <div className="lg:col-span-2">
            <Logo color="white" />
            <p className="mt-4 mb-6 text-aura-gray-300 max-w-md">
              Premium streetwear crafted with attention to detail and quality materials.
              Join our community for exclusive drops and special offers.
            </p>
            <div className="flex mb-8">
              <input
                type="email"
                placeholder="Your email"
                className="bg-aura-gray-800 text-aura-white px-4 py-3 w-full max-w-xs focus:outline-none"
              />
              <button className="bg-aura-gold text-aura-black px-4 py-3 hover:bg-opacity-90 transition-all">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-aura-white">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=t-shirts" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/products?category=hoodies" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  Hoodies
                </Link>
              </li>
              <li>
                <Link to="/products?new=true" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products?bestseller=true" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-aura-white">Information</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  About Aura
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social and Copyright */}
        <div className="mt-12 pt-8 border-t border-aura-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
              <Youtube size={20} />
            </a>
            <a href="mailto:info@auraclothing.com" aria-label="Email" className="text-aura-gray-300 hover:text-aura-gold transition-colors">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-aura-gray-400 text-sm">
            &copy; {currentYear} Aura Clothing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;