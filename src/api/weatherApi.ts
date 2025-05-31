import axios from 'axios';
import { WeatherData, ForecastData, LocationData } from '../types/weather';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const DEMO_MODE = true;

export const fetchWeatherByCoords = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  if (DEMO_MODE) {
    return mockWeatherData(lat, lon);
  }
  
  const response = await axios.get(
    `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return response.data;
};

export const fetchForecastByCoords = async (
  lat: number,
  lon: number
): Promise<ForecastData> => {
  if (DEMO_MODE) {
    return mockForecastData(lat, lon);
  }
  
  const response = await axios.get(
    `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );
  return response.data;
};

export const searchLocations = async (query: string): Promise<LocationData[]> => {
  if (DEMO_MODE) {
    return mockLocationSearch(query);
  }
  
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
  );
  return response.data;
};

const mockWeatherData = (lat: number, lon: number): WeatherData => {
  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    coord: { lat, lon },
    weather: [
      {
        id: 800,
        main: condition,
        description: condition === 'Clear' ? 'clear sky' : 'scattered clouds',
        icon: condition === 'Clear' ? '01d' : '03d'
      }
    ],
    base: 'stations',
    main: {
      temp: Math.round(25 + Math.random() * 8), // Adjusted for tropical climate
      feels_like: Math.round(26 + Math.random() * 8),
      temp_min: Math.round(23 + Math.random() * 5),
      temp_max: Math.round(28 + Math.random() * 5),
      pressure: 1015,
      humidity: Math.round(65 + Math.random() * 25) // Higher humidity for tropical climate
    },
    visibility: 10000,
    wind: {
      speed: Math.round(1 + Math.random() * 5),
      deg: Math.round(Math.random() * 360)
    },
    clouds: {
      all: condition === 'Clear' ? 0 : Math.round(30 + Math.random() * 70)
    },
    dt: Date.now() / 1000,
    sys: {
      type: 1,
      id: 8954,
      country: 'ID',
      sunrise: Date.now() / 1000 - 21600,
      sunset: Date.now() / 1000 + 21600
    },
    timezone: 25200, // UTC+7 for Western Indonesian Time
    id: 12345,
    name: 'Jakarta',
    cod: 200
  };
};

const mockForecastData = (lat: number, lon: number): ForecastData => {
  const conditions = ['Clear', 'Clouds', 'Rain', 'Thunderstorm'];
  
  const list = Array.from({ length: 7 }, (_, i) => {
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    return {
      dt: date.getTime() / 1000,
      main: {
        temp: Math.round(25 + Math.random() * 8),
        feels_like: Math.round(26 + Math.random() * 8),
        temp_min: Math.round(23 + Math.random() * 5),
        temp_max: Math.round(28 + Math.random() * 5),
        pressure: 1015,
        humidity: Math.round(65 + Math.random() * 25)
      },
      weather: [
        {
          id: 800,
          main: condition,
          description: condition === 'Clear' ? 'clear sky' : 'scattered clouds',
          icon: condition === 'Clear' ? '01d' : '03d'
        }
      ],
      clouds: {
        all: condition === 'Clear' ? 0 : Math.round(30 + Math.random() * 70)
      },
      wind: {
        speed: Math.round(1 + Math.random() * 5),
        deg: Math.round(Math.random() * 360)
      },
      visibility: 10000,
      pop: Math.random(),
      dt_txt: date.toISOString().split('T')[0] + ' 12:00:00'
    };
  });

  return {
    cod: '200',
    message: 0,
    cnt: list.length,
    list,
    city: {
      id: 12345,
      name: 'Jakarta',
      coord: { lat, lon },
      country: 'ID',
      population: 10500000,
      timezone: 25200,
      sunrise: Date.now() / 1000 - 21600,
      sunset: Date.now() / 1000 + 21600
    }
  };
};

const mockLocationSearch = (query: string): Promise<LocationData[]> => {
  const cities = [
    { name: 'Jakarta', lat: -6.2088, lon: 106.8456, country: 'ID', state: 'Jakarta' },
    { name: 'Surabaya', lat: -7.2575, lon: 112.7521, country: 'ID', state: 'East Java' },
    { name: 'Bandung', lat: -6.9175, lon: 107.6191, country: 'ID', state: 'West Java' },
    { name: 'Medan', lat: 3.5952, lon: 98.6722, country: 'ID', state: 'North Sumatra' },
    { name: 'Semarang', lat: -6.9932, lon: 110.4203, country: 'ID', state: 'Central Java' },
    { name: 'Makassar', lat: -5.1477, lon: 119.4327, country: 'ID', state: 'South Sulawesi' },
    { name: 'Palembang', lat: -2.9761, lon: 104.7754, country: 'ID', state: 'South Sumatra' },
    { name: 'Yogyakarta', lat: -7.7956, lon: 110.3695, country: 'ID', state: 'Special Region of Yogyakarta' },
    { name: 'Denpasar', lat: -8.6500, lon: 115.2167, country: 'ID', state: 'Bali' },
    { name: 'Malang', lat: -7.9797, lon: 112.6304, country: 'ID', state: 'East Java' }
  ];
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = cities.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.state.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};