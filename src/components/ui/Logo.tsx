import { motion } from 'framer-motion';
import { CircleDot } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'large';
  color?: 'black' | 'white' | 'gold';
}

const Logo = ({ size = 'large', color = 'black' }: LogoProps) => {
  const logoColors = {
    black: 'text-aura-black',
    white: 'text-aura-white',
    gold: 'text-aura-gold',
  };

  const fontSize = size === 'small' ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl';

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Dot animation variants
  const dotVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        delay: 0.4,
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.2,
      rotate: 180,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 400
      }
    }
  };

  // Container hover animation
  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div
      className="flex items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className="flex">
        {['A', 'U', 'R', 'A'].map((letter, i) => (
          <motion.span
            key={letter}
            custom={i}
            variants={letterVariants}
            className={`font-bold ${fontSize} ${logoColors[color]} tracking-wider logo-text`}
            whileHover={{
              y: -2,
              transition: { duration: 0.2 }
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      
      <motion.div 
        className="ml-1"
        variants={dotVariants}
      >
        <CircleDot 
          size={size === 'small' ? 14 : 18} 
          className={logoColors[color]}
        />
      </motion.div>
    </motion.div>
  );
};

export default Logo;