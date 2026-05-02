import React from 'react';
import { useSim } from '../context/SimContext';
import { Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const { viewMode, setViewMode, logout, user } = useSim();

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          QuickRick
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setViewMode('passenger')}
            className={`text-sm font-medium transition-colors ${viewMode === 'passenger' ? 'text-black' : 'text-gray-500 hover:text-black'}`}
          >
            Ride
          </button>
          <button 
            onClick={() => setViewMode('driver')}
            className={`text-sm font-medium transition-colors ${viewMode === 'driver' ? 'text-black' : 'text-gray-500 hover:text-black'}`}
          >
            Drive
          </button>
          <button className="text-sm font-medium text-gray-500 hover:text-black transition-colors">About</button>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <button className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors">
            <User size={18} />
            <span>{user?.phone || 'Account'}</span>
            <ChevronDown size={14} />
          </button>
          
          <button 
            onClick={logout}
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-zinc-800 transition-colors shadow-sm"
          >
            Sign out
          </button>

          <button className="md:hidden p-2 text-black">
            <Menu size={24} />
          </button>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
