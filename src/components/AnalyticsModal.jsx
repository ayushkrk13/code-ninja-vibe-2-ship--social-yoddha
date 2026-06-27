import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Activity, FileText, Users, Award } from 'lucide-react';
import { Button } from './ui/Button';

export function AnalyticsModal({ isOpen, onClose, title, type }) {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (type) {
      case 'reports':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold">Total Reports</p>
                <p className="text-2xl font-bold text-dark">12</p>
              </div>
              <FileText className="text-blue-500 opacity-20" size={48} />
            </div>
            <div className="h-40 flex items-end gap-2 pt-4">
              {/* Dummy Chart */}
              {[3, 5, 2, 8, 4, 12].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-100 rounded-t-md hover:bg-blue-200 transition-colors relative group">
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}
                  </div>
                  <div className="bg-blue-500 rounded-t-md w-full" style={{ height: `${(h/12)*100}%` }}></div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400 font-medium">Last 6 Months</p>
          </div>
        );
      case 'issues':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold">Issues Resolved</p>
                <p className="text-2xl font-bold text-dark">8</p>
              </div>
              <Activity className="text-green-500 opacity-20" size={48} />
            </div>
            <div className="space-y-2 mt-4">
              {['Pothole fixed on MG Road', 'Streetlight repaired', 'Garbage cleared at Sector 4'].map((issue, i) => (
                <div key={i} className="p-3 bg-white border border-gray-100 rounded-lg flex items-center justify-between shadow-sm">
                  <span className="text-sm font-semibold text-gray-700">{issue}</span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">Resolved</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'score':
        return (
          <div className="space-y-4 text-center">
            <Award className="text-yellow-500 mx-auto" size={64} />
            <h3 className="text-3xl font-bold text-dark">1,240 <span className="text-lg text-gray-400">pts</span></h3>
            <p className="text-sm text-gray-500">You are in the top 5% of Yoddhas in Mumbai!</p>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-100 mt-4 text-left">
              <h4 className="font-bold text-yellow-800 text-sm mb-2">How to earn more?</h4>
              <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
                <li>Submit verified reports (+50 pts)</li>
                <li>Join a community drive (+100 pts)</li>
                <li>Get upvotes on your reports (+5 pts/vote)</li>
              </ul>
            </div>
          </div>
        );
      case 'teams':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold">Active Teams</p>
                <p className="text-2xl font-bold text-dark">3</p>
              </div>
              <Users className="text-purple-500 opacity-20" size={48} />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {['Green Andheri', 'Mumbai Animal Rescue', 'Clean Beach Drive'].map((team, i) => (
                <div key={i} className="p-3 bg-white border border-gray-100 rounded-lg shadow-sm text-center">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-800">{team}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-3xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-heading font-bold text-dark flex items-center gap-2">
              <TrendingUp size={20} className="text-primary" /> {title} Analytics
            </h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            {renderContent()}
          </div>
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <Button variant="outline" onClick={onClose} className="rounded-xl font-semibold">Close</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
