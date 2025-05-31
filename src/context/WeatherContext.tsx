import React, { createContext, useState, useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { 
  WeatherData, 
  ForecastData, 
  LocationData, 
  WeatherContextType 
} from '../types/weather';
import { 
  fetchWeatherByCoords, 
  fetchForecastByCoords,
  searchLocations 
} from '../api/weatherApi';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data based on selected location
  const { 
    data: currentWeather,
    isLoading: isLoadingWeather,
    error: weatherError
  } = useQuery<WeatherData, Error>(
    ['weather', location?.lat, location?.lon],
    () => fetchWeatherByCoords(location!.lat, location!.lon),
    { 
      enabled: !!location,
      onError: (err) => setError(`Error fetching weather: ${err.message}`)
    }
  );

  // Fetch forecast data based on selected location
  const { 
    data: forecast,
    isLoading: isLoadingForecast,
    error: forecastError
  } = useQuery<ForecastData, Error>(
    ['forecast', location?.lat, location?.lon],
    () => fetchForecastByCoords(location!.lat, location!.lon),
    { 
      enabled: !!location,
      onError: (err) => setError(`Error fetching forecast: ${err.message}`)
    }
  );

  // Search for locations based on query
  const { 
    data: locations,
    isLoading: isLoadingLocations
  } = useQuery<LocationData[], Error>(
    ['locations', searchQuery],
    () => searchLocations(searchQuery),
    { 
      enabled: searchQuery.length > 2,
      onSuccess: (data) => setSearchResults(data),
      onError: (err) => setError(`Error searching locations: ${err.message}`)
    }
  );

  // Get user's current location
  const useCurrentLocation = () => {
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            name: 'Current Location',
            lat: latitude,
            lon: longitude,
            country: '',
            state: ''
          });
        },
        (err) => {
          setError(`Geolocation error: ${err.message}`);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  // Select a location from search results
  const selectLocation = (location: LocationData) => {
    setLocation(location);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Try to get user's location when component mounts
  useEffect(() => {
    useCurrentLocation();
  }, []);

  const isLoading = isLoadingWeather || isLoadingForecast;

  const value = {
    currentWeather,
    forecast,
    isLoading,
    error,
    location,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectLocation,
    useCurrentLocation
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};