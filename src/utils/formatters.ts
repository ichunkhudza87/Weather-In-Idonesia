import { format } from 'date-fns';

// Format temperature to whole number
export const formatTemperature = (temp: number): string => {
  return Math.round(temp).toString();
};

// Format date to readable format
export const formatDate = (date: Date): string => {
  return format(date, 'EEEE, MMMM do yyyy');
};

// Format time to 12-hour format
export const formatTime = (date: Date): string => {
  return format(date, 'h:mm a');
};

// Format day of week
export const formatDayOfWeek = (date: Date): string => {
  return format(date, 'EEE');
};

// Format humidity
export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

// Format wind speed (convert from m/s to km/h)
export const formatWindSpeed = (speed: number): string => {
  return `${Math.round(speed * 3.6)} km/h`;
};

// Format pressure
export const formatPressure = (pressure: number): string => {
  return `${pressure} hPa`;
};