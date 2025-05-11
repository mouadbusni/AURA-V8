import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/ui/ScrollToTop';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;