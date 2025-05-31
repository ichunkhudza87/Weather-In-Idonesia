import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:justify-between items-center">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1, type: "spring" }}
            className="mr-2"
          >
            <div className="relative">
              <Sun className="text-yellow-300" size={28} />
              <Cloud className="text-white absolute -bottom-1 -right-1" size={16} />
            </div>
          </motion.div>
          <h1 className="text-2xl font-semibold text-white">WeatherNow</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center md:text-right"
        >
          <p className="text-white/90 text-sm">
            Real-time weather with geolocation
          </p>
          <p className="text-white/80 text-xs mt-1">
            Featuring weather updates for cities across Indonesia
          </p>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;