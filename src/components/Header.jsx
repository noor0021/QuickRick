import React from 'react';
import { useSim } from '../context/SimContext';
import { Menu, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const { viewMode, setViewMode, logout } = useSim();

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] p-4 flex justify-between items-center pointer-events-none">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto"
      >
        <button className="bg-white p-3 rounded-full shadow-lg border border-gray-100 text-black">
          <Menu size={24} />
        </button>
      </motion.div>

      {/* Mode Toggle - Integrated into header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-100/80 backdrop-blur-md p-1 rounded-full flex gap-1 pointer-events-auto shadow-sm border border-white/20"
      >
        <button
          onClick={() => setViewMode('passenger')}
          className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${
            viewMode === 'passenger' 
              ? 'bg-white text-black shadow-sm' 
              : 'text-gray-500'
          }`}
        >
          Ride
        </button>
        <button
          onClick={() => setViewMode('driver')}
          className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${
            viewMode === 'driver' 
              ? 'bg-white text-black shadow-sm' 
              : 'text-gray-500'
          }`}
        >
          Drive
        </button>
      </motion.div>

      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="pointer-events-auto flex gap-2"
      >
        <button 
          onClick={logout}
          className="bg-white p-3 rounded-full shadow-lg border border-gray-100 text-black hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
        </button>
      </motion.div>
    </header>
  );
};

export default Header;
