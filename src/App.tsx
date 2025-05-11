import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from 'react-error-boundary';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminDashboard from './pages/AdminDashboard';
import WishlistPage from './pages/WishlistPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

// Providers
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

// Error Fallback
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-600 mb-8">
          We're sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
        </p>
        <button
          onClick={resetErrorBoundary}
          className="bg-black text-white px-6 py-3 rounded-none hover:bg-opacity-90 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

function App() {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Analytics tracking
  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-XXXXXXXXXX', {
          page_path: location.pathname + location.search,
        });
      }
    };

    trackPageView();
  }, [location]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="products" element={<ProductsPage />} />
                  <Route path="products/:id" element={<ProductDetailPage />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                  <Route path="admin" element={<AdminDashboard />} />
                  <Route path="wishlist" element={<WishlistPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="faq" element={<FAQPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="terms" element={<TermsPage />} />
                  <Route path="privacy" element={<PrivacyPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </AnimatePresence>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;