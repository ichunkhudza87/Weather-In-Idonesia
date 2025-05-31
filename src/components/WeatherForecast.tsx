import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { formatDayOfWeek, formatTemperature } from '../utils/formatters';
import WeatherIcon from './WeatherIcon';
import { getDailyForecast } from '../utils/forecastHelpers';

const WeatherForecast: React.FC = () => {
  const { forecast } = useWeather();

  if (!forecast) return null;

  const dailyForecast = getDailyForecast(forecast);

  return (
    <div>
      <h3 className="text-xl font-medium mb-4">7-Day Forecast</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {dailyForecast.map((day, index) => (
          <motion.div
            key={index}
            className="bg-white/10 rounded-lg p-3 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.4,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.03, 
              backgroundColor: "rgba(255, 255, 255, 0.15)" 
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p className="font-medium">{formatDayOfWeek(day.date)}</p>
            
            <div className="my-2">
              <WeatherIcon condition={day.condition} icon={day.icon} size={40} />
            </div>
            
            <div className="flex justify-between w-full mt-1">
              <span className="font-medium">{formatTemperature(day.temp_max)}°</span>
              <span className="text-white/70">{formatTemperature(day.temp_min)}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;