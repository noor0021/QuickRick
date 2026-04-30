import React from 'react';
import { useSim } from '../context/SimContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, AlertCircle, Info, Navigation2 } from 'lucide-react';

const Controls = () => {
  const { viewMode, addDemand, demands, autos } = useSim();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] p-6 flex flex-col items-center pointer-events-none">
      <AnimatePresence mode="wait">
        {viewMode === 'passenger' ? (
          <motion.div
            key="passenger-controls"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="flex flex-col items-center gap-4 w-full max-w-md pointer-events-auto"
          >
            {/* Quick Signal Pill */}
            <button
              onClick={addDemand}
              className="group bg-black text-white font-bold py-4 px-8 rounded-full shadow-2xl transition-all active:scale-95 flex items-center gap-3"
            >
              <Navigation2 size={20} className="fill-white" />
              <span>Signal for Rickshaw</span>
            </button>
            
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 shadow-sm">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                {autos.length} rickshaws active nearby
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="driver-controls"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="flex flex-col items-center gap-4 w-full max-w-md pointer-events-auto"
          >
            <div className="bg-white p-6 rounded-[2rem] w-full border border-gray-100 shadow-2xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Live Demand</span>
                  <span className="text-2xl font-bold text-black">{demands.length} Signals</span>
                </div>
                <div className="bg-red-50 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold text-red-600">High Demand</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl">
                <AlertCircle className="text-black" size={18} />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Head towards <b>Indiranagar</b>. More signals detected there.
                </p>
              </div>

              <button className="w-full bg-black text-white font-bold py-4 rounded-2xl">
                Go Online
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Controls;
