import React, { useState } from 'react';
import { useSim } from '../context/SimContext';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, ArrowLeft } from 'lucide-react';

const Login = () => {
  const { login } = useSim();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');

  const handleNext = () => {
    if (step === 1 && phone.length >= 10) {
      setStep(2);
    } else if (step === 2) {
      login(phone);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-white text-black flex flex-col">
      <div className="p-6">
        {step === 2 && (
          <button onClick={() => setStep(1)} className="mb-8">
            <ArrowLeft size={24} />
          </button>
        )}
        
        <div className="mt-12 mb-12">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
            <span className="text-white text-2xl font-bold">Q</span>
          </div>
          <h1 className="text-2xl font-semibold mb-2">
            {step === 1 ? "Enter your mobile number" : "Enter the 4-digit code"}
          </h1>
          <p className="text-gray-500 text-sm">
            {step === 1 
              ? "We'll send a code to verify your phone" 
              : `Sent to +91 ${phone}`}
          </p>
        </div>

        <div className="relative">
          {step === 1 ? (
            <div className="flex items-center gap-4 border-b-2 border-gray-100 pb-2 focus-within:border-black transition-colors">
              <div className="flex items-center gap-2 font-medium">
                <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5" />
                <span>+91</span>
              </div>
              <input
                autoFocus
                type="tel"
                placeholder="00000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 text-xl outline-none"
                maxLength={10}
              />
            </div>
          ) : (
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <input
                  key={i}
                  autoFocus={i === 1}
                  type="text"
                  maxLength={1}
                  className="w-12 h-14 bg-gray-100 rounded-lg text-center text-2xl font-semibold focus:bg-gray-200 outline-none transition-colors"
                  placeholder="•"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto p-6 flex justify-between items-center bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 max-w-[200px]">
          By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from QuickRick and its affiliates to the number provided.
        </p>
        <button
          onClick={handleNext}
          disabled={step === 1 && phone.length < 10}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
            phone.length >= 10 ? 'bg-black text-white shadow-xl scale-110' : 'bg-gray-200 text-gray-400'
          }`}
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default Login;
