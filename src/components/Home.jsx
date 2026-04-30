import React, { useState } from 'react';
import { useSim } from '../context/SimContext';
import GoogleMap from './GoogleMap';
import Header from './Header';
import Controls from './Controls';
import { Search, Clock, Home as HomeIcon, Briefcase, MapPin, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const { viewMode } = useSim();
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="relative h-full w-full flex flex-col bg-white">
      {/* Header - Always on top */}
      <Header />

      {/* Map Layer - Behind UI */}
      <div className={`absolute inset-0 z-0 transition-all duration-500 ${isSearching ? 'opacity-20' : 'opacity-100'}`}>
        <GoogleMap />
      </div>

      {/* Main UI Overlay */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        
        {/* Top Spacer to push content down */}
        <div className="flex-1"></div>

        {/* Home Screen Content */}
        <AnimatePresence mode="wait">
          {!isSearching ? (
            <motion.div
              key="default-home"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="p-4 space-y-4 pointer-events-auto"
            >
              {/* Quick Actions Card */}
              <div className="bg-white rounded-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.1)] p-6 space-y-6">
                
                {/* Search Bar */}
                <button 
                  onClick={() => setIsSearching(true)}
                  className="w-full bg-gray-100 h-14 rounded-full flex items-center px-5 gap-3 hover:bg-gray-200 transition-colors"
                >
                  <Search size={20} className="text-black" />
                  <span className="text-xl font-medium text-gray-700">Where to?</span>
                  <div className="ml-auto flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm text-sm">
                    <Clock size={14} />
                    <span>Now</span>
                  </div>
                </button>

                {/* Categories */}
                <div className="flex justify-between items-center px-2">
                  {[
                    { label: 'Ride', icon: '🚗', color: 'bg-blue-50' },
                    { label: 'Package', icon: '📦', color: 'bg-green-50' },
                    { label: 'Intercity', icon: '🏙️', color: 'bg-orange-50' },
                    { label: 'Reserve', icon: '🗓️', color: 'bg-purple-50' }
                  ].map((cat, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-sm hover:scale-105 transition-transform cursor-pointer`}>
                        {cat.icon}
                      </div>
                      <span className="text-xs font-semibold">{cat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Suggestions */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <HomeIcon size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Home</h4>
                      <p className="text-xs text-gray-500">Koramangala 4th Block</p>
                    </div>
                    <div className="ml-auto text-gray-300">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-xl">
                    <div className="bg-gray-100 p-2 rounded-full text-gray-600">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Work</h4>
                      <p className="text-xs text-gray-500">RMZ Ecoworld, Outer Ring Road</p>
                    </div>
                    <div className="ml-auto text-gray-300">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="search-view"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="absolute inset-0 bg-white z-[100] p-6 pointer-events-auto"
            >
              <div className="flex items-center gap-4 mb-8">
                <button onClick={() => setIsSearching(false)} className="p-2 -ml-2">
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-xl font-bold">Plan your ride</h2>
              </div>

              <div className="space-y-4 relative">
                <div className="absolute left-4 top-5 bottom-5 w-0.5 bg-gray-200 z-0"></div>
                
                <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl relative z-10">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                  <input 
                    className="bg-transparent flex-1 outline-none font-medium" 
                    defaultValue="Current Location" 
                  />
                </div>

                <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-xl relative z-10 border-2 border-black">
                  <div className="w-2.5 h-2.5 bg-black"></div>
                  <input 
                    autoFocus
                    className="bg-transparent flex-1 outline-none font-medium" 
                    placeholder="Where to?" 
                  />
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Recent Places</h3>
                {[
                  { name: 'Indiranagar Metro Station', sub: 'Binnamangala, Stage 1' },
                  { name: 'Phoenix Marketcity', sub: 'Whitefield Main Road' },
                  { name: 'Kempegowda Airport', sub: 'Devanahalli, Bengaluru' }
                ].map((place, i) => (
                  <div key={i} className="flex items-center gap-4 cursor-pointer">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <MapPin size={20} className="text-gray-600" />
                    </div>
                    <div className="border-b border-gray-100 flex-1 pb-4">
                      <h4 className="font-semibold text-sm">{place.name}</h4>
                      <p className="text-xs text-gray-500">{place.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Original Controls (Signal Demand) - Only shown if not searching and in Passenger mode */}
        {!isSearching && <Controls />}
      </div>
    </div>
  );
};

// Removed internal component definitions

export default Home;
