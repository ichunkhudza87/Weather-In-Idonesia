import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import SearchLocation from './SearchLocation';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const WeatherDashboard: React.FC = () => {
  const { isLoading, error, currentWeather } = useWeather();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        damping: 12, 
        stiffness: 100 
      }
    }
  };

  const weatherCondition = currentWeather?.weather[0]?.main?.toLowerCase() || 'clear';
  
  const getBgGradient = () => {
    switch(weatherCondition) {
      case 'clouds':
        return 'from-slate-600 to-slate-800';
      case 'rain':
        return 'from-slate-700 to-slate-900';
      case 'thunderstorm':
        return 'from-slate-800 to-slate-900';
      case 'snow':
        return 'from-slate-500 to-slate-700';
      case 'clear':
      default:
        return 'from-slate-600 to-slate-800';
    }
  };

  return (
    <motion.div
      className={`rounded-xl shadow-xl overflow-hidden bg-gradient-to-br ${getBgGradient()} text-white`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <SearchLocation />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="p-6">
          <ErrorMessage message={error} />
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-6 pt-0"
        >
          <motion.div variants={itemVariants}>
            <CurrentWeather />
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-8">
            <WeatherForecast />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherDashboard;