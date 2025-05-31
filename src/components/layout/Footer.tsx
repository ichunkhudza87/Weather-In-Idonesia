import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white/80 py-4 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm">
        <p>
          © {new Date().getFullYear()} WeatherNow. All rights reserved.
        </p>
        <p className="mt-1">
          Weather data provided for demonstration purposes. In a production app, connect to a real weather API.
        </p>
      </div>
    </footer>
  );
};

export default Footer;