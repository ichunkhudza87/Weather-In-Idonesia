import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40 }) => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent"
        style={{ width: size, height: size }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      <p className="text-white/80 mt-4">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;