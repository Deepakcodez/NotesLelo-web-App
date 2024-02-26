import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Alert = ({ msg ,setmsg,  type}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setmsg(null)
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="alert"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1, type: "spring" }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          role="alert"
          className={`absolute top-3 right-5 rounded border-s-4 ${type === "error" ? 'border-red-500' : type === 'warning' ? 'border-yellow-500' : ''} ${type === "error" ? 'bg-red-50' : type === 'warning' ? 'bg-yellow-50' : ''} p-4`}
          >
       <div className={`flex items-center gap-2 ${type === "error" ? 'text-red-800' : type === "warning" ? 'text-yellow-500' : ''}`}>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            <strong className="block font-medium">Something went wrong</strong>
          </div>
          <p className={`mt-2 text-sm ${type === "error" ? 'text-red-700' : type === 'warning' ? 'text-yellow-700' : ''}`}>{msg}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
