import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, MapPin, Target } from 'lucide-react';
import { Button } from './ui/Button';

export function CreateTeamModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    focus: 'Environment',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    
    onCreate({
      name: formData.name,
      focus: formData.focus,
      members: 1,
      active: true // Auto join team you create
    });
    
    setFormData({ name: '', focus: 'Environment', description: '' });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
            <h2 className="text-xl font-heading font-bold text-dark flex items-center gap-2">
              <Users size={20} className="text-primary" /> Create New Team
            </h2>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <form id="create-team-form" onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Team Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Lokhandwala Cleaners" 
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" 
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Focus Area</label>
                <div className="relative">
                  <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <select 
                    value={formData.focus} 
                    onChange={(e) => setFormData({...formData, focus: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="Environment">Environment</option>
                    <option value="Animals">Animals</option>
                    <option value="Sanitation">Sanitation</option>
                    <option value="Civic Issues">Civic Issues</option>
                    <option value="Safety">Safety</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description (Optional)</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="What is your team's mission?" 
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm resize-none h-24"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="rounded-xl px-6 font-semibold">Cancel</Button>
            <Button type="submit" form="create-team-form" variant="primary" className="rounded-xl px-8 font-bold shadow-md">Create Team</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
