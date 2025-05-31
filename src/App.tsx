import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/layout/Header';
import WeatherDashboard from './components/WeatherDashboard';
import Footer from './components/layout/Footer';
import { WeatherProvider } from './context/WeatherContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <WeatherDashboard />
          </main>
          <Footer />
        </div>
      </WeatherProvider>
    </QueryClientProvider>
  );
}

export default App;