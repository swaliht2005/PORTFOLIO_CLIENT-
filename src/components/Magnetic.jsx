import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Magnetic is a wrapper component that pulls its child towards the cursor on hover.
 * Uses spring physics for an organic, elastic motion feel.
 */
const Magnetic = ({ children, range = 70, actionScale = 1.05 }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Elastic and smooth spring physics configuration for high-end feel
  const springConfig = { damping: 12, stiffness: 120, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Check if cursor is within magnetic range
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      setIsHovered(true);
      // Pull element towards mouse (35% strength)
      const pull = 0.35; 
      x.set(distanceX * pull);
      y.set(distanceY * pull);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      animate={isHovered ? { scale: actionScale } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
