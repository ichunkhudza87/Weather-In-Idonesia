import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudFog, 
  CloudDrizzle, 
  Waves
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  icon: string;
  size?: number;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, icon, size = 24 }) => {
  const isDay = icon.includes('d');
  
  // Different animation variants for different weather conditions
  const getAnimationVariants = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return {
          animate: {
            rotate: 360,
            transition: {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }
          }
        };
      case 'clouds':
        return {
          animate: {
            x: [0, 5, 0, -5, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'rain':
      case 'drizzle':
        return {
          animate: {
            y: [0, 3, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'thunderstorm':
        return {
          animate: {
            scale: [1, 1.1, 1],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      case 'snow':
        return {
          animate: {
            y: [0, 3, 0],
            rotate: [0, 5, 0, -5, 0],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
      default:
        return {
          animate: {
            scale: [1, 1.05, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }
        };
    }
  };

  // Choose icon based on condition
  const renderIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun size={size} className="text-yellow-300" />;
      case 'clouds':
        return <Cloud size={size} className="text-gray-200" />;
      case 'rain':
        return <CloudRain size={size} className="text-blue-300" />;
      case 'drizzle':
        return <CloudDrizzle size={size} className="text-blue-200" />;
      case 'thunderstorm':
        return <CloudLightning size={size} className="text-purple-300" />;
      case 'snow':
        return <CloudSnow size={size} className="text-blue-100" />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <CloudFog size={size} className="text-gray-300" />;
      default:
        return <Sun size={size} className="text-yellow-300" />;
    }
  };

  const animationVariants = getAnimationVariants();

  return (
    <motion.div 
      variants={animationVariants}
      animate="animate"
    >
      {renderIcon()}
    </motion.div>
  );
};

export default WeatherIcon;