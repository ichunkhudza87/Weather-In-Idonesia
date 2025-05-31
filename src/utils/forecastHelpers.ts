import { ForecastData, DailyForecast } from '../types/weather';
import { format, parseISO } from 'date-fns';

// Group forecast data by day and get daily high/low
export const getDailyForecast = (forecastData: ForecastData): DailyForecast[] => {
  const dailyData: Record<string, DailyForecast> = {};
  
  // If we have a mocked 7-day forecast, it's already daily
  if (forecastData.list.length <= 7) {
    return forecastData.list.map(item => {
      const date = new Date(item.dt * 1000);
      return {
        date,
        day: format(date, 'EEE'),
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        condition: item.weather[0].main,
        icon: item.weather[0].icon
      };
    });
  }
  
  // Group by day if we have multiple forecasts per day (typical OpenWeatherMap format)
  forecastData.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    
    if (!dailyData[date]) {
      dailyData[date] = {
        date: parseISO(date),
        day: format(parseISO(date), 'EEE'),
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        condition: item.weather[0].main,
        icon: item.weather[0].icon
      };
    } else {
      // Update max/min temperatures
      if (item.main.temp_max > dailyData[date].temp_max) {
        dailyData[date].temp_max = item.main.temp_max;
      }
      if (item.main.temp_min < dailyData[date].temp_min) {
        dailyData[date].temp_min = item.main.temp_min;
      }
      
      // For simplicity, we'll use the noon forecast for the condition
      if (item.dt_txt.includes('12:00:00')) {
        dailyData[date].condition = item.weather[0].main;
        dailyData[date].icon = item.weather[0].icon;
      }
    }
  });
  
  // Convert the object to an array and limit to 7 days
  return Object.values(dailyData).slice(0, 7);
};