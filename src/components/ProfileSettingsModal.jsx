import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Trash2, MapPin, Phone, Mail, User } from 'lucide-react';
import { Button } from './ui/Button';


export function ProfileSettingsModal({ isOpen, onClose, user, onSave }) {
  const [photo, setPhoto] = useState(user?.avatar || "");
  const fileInputRef = React.useRef(null);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.location ? user.location.split(', ')[1] : '',
    locality: user?.location ? user.location.split(', ')[0] : ''
  });

  useEffect(() => {
    if (user) {
      setPhoto(user.avatar);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.location.split(', ')[1] || '',
        locality: user.location.split(', ')[0] || ''
      });
    }
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ ...formData, avatar: photo });
  };

  const handleRemovePhoto = () => {
    setPhoto('');
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-heading font-bold text-dark">Edit Profile Settings</h2>
            <button 
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
            
            {/* Photo Section */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Profile Photo</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="relative shrink-0">
                  {photo ? (
                    <img src={photo} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-sm border border-gray-200 bg-white" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                      <User size={32} className="text-gray-400" />
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md border-2 border-white pointer-events-none">
                    <Camera size={14} />
                  </div>
                </div>
                
                <div className="flex-1 w-full flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-500">Upload New Photo</p>
                  <div className="flex items-center gap-3">
                    <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline" className="text-sm border-gray-300 py-1.5 h-auto rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/5 hover:border-primary/30">
                      <Camera size={16} /> Choose Image
                    </Button>
                    {photo && (
                      <button type="button" onClick={handleRemovePhoto} className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">Recommended size: 256x256px. Max 2MB.</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handlePhotoUpload} 
                    className="hidden" 
                  />
                </div>
              </div>
            </div>

            <form id="settings-form" onSubmit={handleSave} className="space-y-6">
              
              {/* Personal Details */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Personal Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Contact Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Location</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Locality/Area</label>
                    <input type="text" name="locality" value={formData.locality} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm" />
                  </div>
                </div>
              </div>

            </form>

            {/* Danger Zone */}
            <div className="mt-10 pt-6 border-t border-red-100">
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-wider mb-2">Danger Zone</h3>
              <p className="text-xs text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-red-100">
                <Trash2 size={16} /> Delete Account
              </button>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
            <Button variant="outline" onClick={onClose} className="rounded-xl px-6 font-semibold">Cancel</Button>
            <Button type="submit" form="settings-form" variant="primary" className="rounded-xl px-8 font-bold shadow-md">Save Changes</Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
