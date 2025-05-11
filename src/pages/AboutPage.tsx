import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useIntersectionObserver } from 'react-intersection-observer';
import { Users, Shield, Truck, Award, ArrowRight } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Button from '../components/ui/Button';
import { productImages } from '../config/images';

const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);
  
  const scaleProgress = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const opacityProgress = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.5, 0]);
  
  const values = [
    {
      icon: <Users size={24} />,
      title: "Community First",
      description: "Building a global community of fashion enthusiasts who share our passion for quality and style."
    },
    {
      icon: <Shield size={24} />,
      title: "Sustainable Fashion",
      description: "Committed to ethical manufacturing and sustainable practices to protect our planet."
    },
    {
      icon: <Truck size={24} />,
      title: "Quality Delivery",
      description: "Ensuring your premium streetwear arrives in perfect condition, every time."
    },
    {
      icon: <Award size={24} />,
      title: "Premium Quality",
      description: "Using only the finest materials and craftsmanship in every piece we create."
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <PageTransition>
      {/* Hero Section with Parallax */}
      <section className="h-screen relative overflow-hidden" ref={containerRef}>
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            scale: scaleProgress,
            opacity: opacityProgress
          }}
        >
          <img 
            src={productImages.hero}
            alt="AURA Fashion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <div className="relative h-full flex items-center">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl text-black"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
                Crafting the Future of <span className="text-aura-gold">Fashion</span>
              </h1>
              <p className="text-xl md:text-2xl text-black-200 mb-8 leading-relaxed">
                Since 2024, we've been redefining premium streetwear through innovation, 
                sustainability, and uncompromising quality.
              </p>
              <Button 
                variant="accent"
                size="lg"
                href="#story"
                icon={<ArrowRight size={20} />}
                iconPosition="right"
              >
                Discover Our Story
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight size={32} className="text-white rotate-90" />
        </motion.div>
      </section>

      {/* Values Section with Staggered Animation */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                className="group p-8 bg-white border border-gray-200 hover:border-aura-gold transition-colors"
              >
                <motion.div 
                  className="w-16 h-16 bg-aura-gold bg-opacity-10 rounded-full flex items-center justify-center mb-6 group-hover:bg-aura-gold group-hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-aura-gold group-hover:text-white transition-colors">
                    {value.icon}
                  </span>
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-aura-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section with Scroll-Triggered Animations */}
      <section id="story" className="py-32 bg-aura-black text-white relative overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-aura-gold rounded-full opacity-10 blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-aura-gold">Journey</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  AURA began with a vision to create streetwear that transcends traditional 
                  boundaries. Founded in New York City's vibrant fashion district, we set out 
                  to blend urban culture with luxury craftsmanship.
                </p>
                <p>
                  Our commitment to sustainability drives every decision, from sourcing 
                  eco-friendly materials to implementing ethical manufacturing processes. 
                  We believe that premium fashion should never compromise our planet's future.
                </p>
                <p>
                  Today, AURA stands as a testament to innovation in streetwear, creating 
                  pieces that are both timeless and forward-thinking. Our community of 
                  fashion enthusiasts continues to grow, united by a passion for quality 
                  and style.
                </p>
              </div>
            </motion.div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {productImages.instagram.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`AURA fashion ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Hover Animations */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet the Visionaries
            </h2>
            <p className="text-xl text-aura-gray-600 max-w-2xl mx-auto">
              The creative minds shaping the future of streetwear, bringing together 
              expertise in fashion, sustainability, and innovation.
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src={productImages.instagram[index]}
                    alt="Team member"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-semibold mb-2">John Doe</h3>
                  <p className="text-aura-gray-600 mb-4">Creative Director</p>
                  <p className="text-aura-gray-500 hidden group-hover:block">
                    Visionary designer with 15+ years of experience in luxury fashion.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Join Section with Dynamic Background */}
      <section className="py-32 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-aura-black"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <img 
            src={productImages.hero}
            alt="AURA background"
            className="w-full h-full object-cover opacity-30"
          />
        </motion.div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join the <span className="text-aura-gold">Movement</span>
            </h2>
            <p className="text-xl mb-8">
              Be part of a community that's redefining fashion. Subscribe for exclusive 
              updates, behind-the-scenes content, and early access to new collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:border-aura-gold"
              />
              <Button variant="accent">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default AboutPage;