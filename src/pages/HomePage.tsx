import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import { getFeaturedProducts, getBestsellerProducts } from '../data/products';
import { productImages } from '../config/images';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 3);
  const bestsellerProducts = getBestsellerProducts().slice(0, 4);

  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { 
        delay: custom * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={productImages.hero}
            alt="Aura Clothing Hero" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-aura-black/70 to-aura-black/30" />
        </div>
        
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-xl text-aura-white">
            <motion.h1 
              custom={0}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              Elevate Your <span className="text-aura-gold">Style</span>
            </motion.h1>
            
            <motion.p 
              custom={1}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="text-xl mb-8"
            >
              Premium streetwear that defines you. Crafted for those who dare to stand out.
            </motion.p>
            
            <motion.div
              custom={2}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              className="flex flex-wrap gap-4"
            >
              <Button 
                variant="accent" 
                size="lg" 
                href="/products"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Shop Collection
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                href="/about"
              >
                Our Story
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-aura-white">
        <div className="container-custom">
          <div className="flex flex-wrap items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Collection</h2>
              <p className="text-aura-gray-600 max-w-xl">Explore our latest designs crafted with premium materials and attention to detail.</p>
            </div>
            <Button href="/products" variant="secondary" icon={<ArrowRight size={18} />} iconPosition="right">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-28 bg-aura-black text-aura-white relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-24 h-24 lg:w-40 lg:h-40 rounded-full bg-aura-gold opacity-40 blur-3xl"
          initial={{ x: -100, y: -100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-32 h-32 lg:w-56 lg:h-56 rounded-full bg-aura-gold opacity-30 blur-3xl"
          initial={{ x: 100, y: 100 }}
          animate={{ x: 0, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              The <span className="text-aura-gold">AURA</span> Difference
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-10 text-aura-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              More than just clothing, Aura is a state of mind. Each piece is meticulously crafted from premium materials, 
              designed to elevate your style and stand the test of time. We believe in creating timeless essentials 
              that embody confidence, individuality, and uncompromising quality.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Button href="/about" variant="accent" size="lg">
                Discover Our Story
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-aura-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Bestsellers</h2>
            <p className="text-aura-gray-600 max-w-xl mx-auto">Our most loved pieces that have become customer favorites.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellerProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button href="/products" variant="primary">
              Shop All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-aura-white">
        <div className="container-custom">
          <div className="bg-aura-black text-aura-white p-10 md:p-16 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 right-0 w-40 h-40 rounded-full bg-aura-gold opacity-20 blur-3xl"
              animate={{ 
                x: [0, 20, 0],
                y: [0, 20, 0],
              }} 
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <div className="relative z-10 max-w-xl mx-auto text-center">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Join the <span className="text-aura-gold">AURA</span> Community
              </motion.h2>
              
              <motion.p 
                className="mb-8 text-aura-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow px-4 py-3 bg-aura-gray-800 text-aura-white focus:outline-none"
                />
                <Button variant="accent">
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-16 bg-aura-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">
              <span className="text-aura-gold">#</span>AURASTYLE
            </h2>
            <p className="text-aura-gray-600">
              Share your style with us on Instagram
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {productImages.instagram.map((image, index) => (
              <motion.div 
                key={index}
                className="aspect-square overflow-hidden"
                whileHover={{ scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={image}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default HomePage;