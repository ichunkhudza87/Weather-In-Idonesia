import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <motion.div
      className="bg-red-500/20 rounded-lg p-4 flex items-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AlertTriangle className="text-red-300 mr-3 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="font-medium text-white mb-1">Error</h3>
        <p className="text-white/80">{message}</p>
        <p className="text-white/80 mt-2">
          Please try again or check your connection.
        </p>
      </div>
    </motion.div>
  );
};

export default ErrorMessage;