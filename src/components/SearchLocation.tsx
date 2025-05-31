import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { Search, MapPin, X } from 'lucide-react';

const SearchLocation: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults,
    selectLocation,
    useCurrentLocation
  } = useWeather();
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleSelectLocation = (location: any) => {
    selectLocation(location);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handleClearInput = () => {
    setSearchQuery('');
    setIsDropdownOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a city..."
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full py-2 pl-10 pr-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
        />
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" 
        />
        
        {searchQuery && (
          <button
            onClick={handleClearInput}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>
      
      <button
        onClick={useCurrentLocation}
        className="mt-2 flex items-center text-white/60 hover:text-white text-sm transition-colors"
      >
        <MapPin size={16} className="mr-1" />
        Use my current location
      </button>
      
      <AnimatePresence>
        {isDropdownOpen && searchResults.length > 0 && (
          <motion.div
            ref={dropdownRef}
            className="absolute mt-1 w-full bg-slate-800/95 backdrop-blur-md rounded-lg shadow-lg z-10 overflow-hidden border border-white/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {searchResults.map((location, index) => (
                <motion.li
                  key={`${location.name}-${location.country}-${index}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <button
                    onClick={() => handleSelectLocation(location)}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 text-white transition-colors"
                  >
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-blue-400" />
                      <div>
                        <span className="font-medium">{location.name}</span>
                        {location.state && (
                          <span className="ml-1 text-white/70">{location.state},</span>
                        )}
                        <span className="ml-1 text-white/70">{location.country}</span>
                      </div>
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchLocation;