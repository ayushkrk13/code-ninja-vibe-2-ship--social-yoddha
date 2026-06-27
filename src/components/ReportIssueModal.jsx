import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, MapPin } from 'lucide-react';
import { ConfettiCelebration } from './ConfettiCelebration';

const themeConfig = {
  'Trees & Plants': { bg: 'bg-green-900/70', modalBorder: 'border-green-500', button: 'bg-green-600 hover:bg-green-700 shadow-green-500/30', ring: 'focus:ring-green-500', iconBg: 'bg-green-50', smoke: 'bg-green-500' },
  'Stray Animals': { bg: 'bg-orange-900/70', modalBorder: 'border-orange-500', button: 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/30', ring: 'focus:ring-orange-500', iconBg: 'bg-orange-50', smoke: 'bg-orange-500' },
  'Water': { bg: 'bg-blue-900/70', modalBorder: 'border-blue-500', button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30', ring: 'focus:ring-blue-500', iconBg: 'bg-blue-50', smoke: 'bg-blue-500' },
  'Electrical': { bg: 'bg-yellow-900/70', modalBorder: 'border-yellow-500', button: 'bg-yellow-600 hover:bg-yellow-700 shadow-yellow-500/30', ring: 'focus:ring-yellow-500', iconBg: 'bg-yellow-50', smoke: 'bg-yellow-500' },
  'Cleanliness': { bg: 'bg-emerald-900/70', modalBorder: 'border-emerald-500', button: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/30', ring: 'focus:ring-emerald-500', iconBg: 'bg-emerald-50', smoke: 'bg-emerald-500' },
  'Hazard': { bg: 'bg-red-900/70', modalBorder: 'border-red-500', button: 'bg-red-600 hover:bg-red-700 shadow-red-500/30', ring: 'focus:ring-red-500', iconBg: 'bg-red-50', smoke: 'bg-red-500' },
  default: { bg: 'bg-black/70', modalBorder: 'border-transparent', button: 'bg-[#1D9E75] hover:bg-[#15805e] shadow-green-500/30', ring: 'focus:ring-[#1D9E75]', iconBg: 'bg-gray-50', smoke: 'bg-gray-400' }
};

export function ReportIssueModal({ isOpen, onClose, initialCategory = '' }) {
  const [step, setStep] = useState(1);
  const [celebrate, setCelebrate] = useState(false);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory || '');
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const theme = themeConfig[category] || themeConfig.default;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCelebrate(true);
    setTimeout(() => {
      setCelebrate(false);
      setStep(1);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md transition-colors duration-500 ${theme.bg}`}>
        {/* Animated Smoke Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-[10%] left-[20%] w-72 h-72 ${theme.smoke} rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-pulse transition-colors duration-1000`}></div>
          <div className={`absolute bottom-[10%] right-[20%] w-96 h-96 ${theme.smoke} rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse transition-colors duration-1000`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] ${theme.smoke} rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse transition-colors duration-1000`} style={{ animationDelay: '2s' }}></div>
        </div>

        <ConfettiCelebration trigger={celebrate} mode="burst" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative border-t-4 transition-colors duration-500 ${theme.modalBorder} z-10`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
            <h2 className="text-xl font-heading font-bold text-dark">Report an Issue</h2>
            <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {!celebrate ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select 
                    className={`w-full p-3 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-shadow ${theme.ring}`} 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category...</option>
                    <option value="Trees & Plants">Trees & Plants</option>
                    <option value="Stray Animals">Stray Animals</option>
                    <option value="Water">Water</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Cleanliness">Cleanliness</option>
                    <option value="Hazard">Hazard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="text" className={`w-full p-3 pl-10 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-shadow ${theme.ring}`} placeholder="Fetching current location..." defaultValue="Andheri West, Mumbai" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo Evidence</label>
                  <div className={`border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 cursor-pointer transition-colors ${theme.iconBg} hover:opacity-80`}>
                    <Camera size={32} className="mb-2 text-gray-400" />
                    <span className="text-sm font-medium">Tap to take photo</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className={`w-full p-3 border border-gray-200 rounded-lg focus:ring-2 outline-none transition-shadow ${theme.ring}`} rows="3" placeholder="Describe the issue..."></textarea>
                </div>

                <button type="submit" className={`w-full py-4 rounded-xl text-lg mt-4 font-bold text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${theme.button}`}>
                  Submit Report
                </button>
              </form>
            ) : (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-dark mb-2">Report Submitted!</h3>
                <p className="text-gray-600">Thank you, Yoddha. The relevant authorities and local teams have been notified.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
