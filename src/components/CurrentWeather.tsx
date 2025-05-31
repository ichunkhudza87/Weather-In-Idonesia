import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { formatDate, formatTime, formatTemperature } from '../utils/formatters';
import WeatherIcon from './WeatherIcon';
import { Wind, Droplets, Gauge, Clock, Sunrise, Sunset } from 'lucide-react';

const CurrentWeather: React.FC = () => {
  const { currentWeather, location } = useWeather();

  if (!currentWeather) return null;

  const { 
    weather, 
    main: { temp, feels_like, humidity, pressure }, 
    wind, 
    sys, 
    dt 
  } = currentWeather;
  
  const weatherCondition = weather[0].main;
  const weatherDescription = weather[0].description;
  const weatherIcon = weather[0].icon;
  
  const sunriseTime = formatTime(new Date(sys.sunrise * 1000));
  const sunsetTime = formatTime(new Date(sys.sunset * 1000));
  const currentDate = formatDate(new Date(dt * 1000));
  
  const windSpeed = Math.round(wind.speed * 3.6); // Convert to km/h

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-medium">{location?.name}</h2>
          <p className="text-white/80">{currentDate}</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-2 md:mt-0"
        >
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span className="text-sm text-white/80">
              Last updated: {formatTime(new Date(dt * 1000))}
            </span>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
            className="mr-4"
          >
            <WeatherIcon condition={weatherCondition} icon={weatherIcon} size={100} />
          </motion.div>
          
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-end"
            >
              <span className="text-6xl font-light">{formatTemperature(temp)}</span>
              <span className="text-2xl ml-1 mb-2">°C</span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl capitalize"
            >
              {weatherDescription}
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-white/80"
            >
              Feels like {formatTemperature(feels_like)}°C
            </motion.p>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3">Weather Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Wind size={20} className="mr-2 text-white/80" />
              <div>
                <p className="text-white/80 text-sm">Wind</p>
                <p className="font-medium">{windSpeed} km/h</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Droplets size={20} className="mr-2 text-white/80" />
              <div>
                <p className="text-white/80 text-sm">Humidity</p>
                <p className="font-medium">{humidity}%</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Sunrise size={20} className="mr-2 text-white/80" />
              <div>
                <p className="text-white/80 text-sm">Sunrise</p>
                <p className="font-medium">{sunriseTime}</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Sunset size={20} className="mr-2 text-white/80" />
              <div>
                <p className="text-white/80 text-sm">Sunset</p>
                <p className="font-medium">{sunsetTime}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;