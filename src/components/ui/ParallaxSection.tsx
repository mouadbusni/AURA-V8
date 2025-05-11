import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  offset?: number[];
  scale?: number[];
}

const ParallaxSection = ({ 
  children, 
  className = '',
  offset = [0, 1],
  scale = [1, 1.1]
}: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scaleProgress = useTransform(scrollYProgress, offset, scale);

  return (
    <motion.div
      ref={ref}
      style={{ scale: scaleProgress }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;