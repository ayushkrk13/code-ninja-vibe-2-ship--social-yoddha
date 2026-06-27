import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Award } from 'lucide-react';
import { Button } from './ui/Button';

export function ShareBadgeModal({ isOpen, onClose, user }) {
  const [shareText, setShareText] = useState(`I'm proud to be a Gold Yoddha making a difference in ${user?.location || 'my community'}! Join me on Social Yoddha. 🦸‍♂️🌿`);

  if (!isOpen) return null;

  const handleShare = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    const url = encodeURIComponent('https://social-yoddha.vercel.app');
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodedText}`;
        break;
      case 'instagram':
        alert('Instagram sharing requires copying the image. For now, text copied to clipboard!');
        navigator.clipboard.writeText(shareText);
        return;
      default:
        navigator.clipboard.writeText(`${shareText} ${url}`);
        alert('Copied to clipboard!');
        return;
    }
    
    window.open(shareUrl, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
        >
          <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-primary/10 to-green-100">
            <h3 className="font-heading font-bold flex items-center gap-2 text-dark">
              <Share2 size={18} className="text-primary" /> Share Your Journey
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full text-gray-500">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-5 space-y-4">
            <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-6 rounded-xl text-center border-2 border-yellow-300 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-xl -mr-10 -mt-10"></div>
              <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-md mb-3 border-4 border-yellow-400">
                <Award size={40} className="text-yellow-500" />
              </div>
              <h4 className="font-bold text-xl text-orange-800">Gold Yoddha</h4>
              <p className="text-orange-700 text-sm font-semibold">{user?.name}</p>
              <p className="text-orange-600/80 text-xs mt-1">1,240 pts • {user?.location}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Custom Message</label>
              <textarea 
                value={shareText}
                onChange={(e) => setShareText(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none h-24 bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <Button onClick={() => handleShare('twitter')} variant="outline" className="flex items-center justify-center gap-2 border-blue-200 hover:bg-blue-50 hover:text-blue-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </Button>
              <Button onClick={() => handleShare('facebook')} variant="outline" className="flex items-center justify-center gap-2 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.969h-1.515c-1.491 0-1.956.93-1.956 1.886v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
                Facebook
              </Button>
              <Button onClick={() => handleShare('instagram')} variant="outline" className="flex items-center justify-center gap-2 border-pink-200 hover:bg-pink-50 hover:text-pink-600">
                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ig-grad-share" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f09433" />
                      <stop offset="0.25" stopColor="#e6683c" />
                      <stop offset="0.5" stopColor="#dc2743" />
                      <stop offset="0.75" stopColor="#cc2366" />
                      <stop offset="1" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#ig-grad-share)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.395a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
                </svg>
                Insta
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
