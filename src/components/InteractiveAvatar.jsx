import React from 'react';
import { motion } from 'framer-motion';

export function InteractiveAvatar({ isPasswordFocused, mousePosition }) {
  // Calculate relative eye movement based on mouse position
  // Clamp values between -1 and 1
  const xMove = Math.max(-1, Math.min(1, mousePosition.x));
  const yMove = Math.max(-1, Math.min(1, mousePosition.y));

  return (
    <div className="relative w-32 h-32 mx-auto mb-6 z-20">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary to-[#0f6b4e] rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 border-white"
        animate={{ scale: isPasswordFocused ? 0.95 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Face */}
        <div className="relative w-20 h-20 bg-[#fdfbf7] rounded-full shadow-inner">
          {/* Left Eye */}
          <motion.div 
            className="absolute top-5 left-3 w-4 h-6 bg-dark rounded-full overflow-hidden"
            animate={isPasswordFocused ? { scaleY: 0.1 } : { x: xMove * 4, y: yMove * 4 }}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 right-1" />
          </motion.div>
          {/* Right Eye */}
          <motion.div 
            className="absolute top-5 right-3 w-4 h-6 bg-dark rounded-full overflow-hidden"
            animate={isPasswordFocused ? { scaleY: 0.1 } : { x: xMove * 4, y: yMove * 4 }}
          >
             <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 right-1" />
          </motion.div>
          
          {/* Mouth */}
          <motion.div 
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-4 border-b-4 border-dark rounded-full"
            animate={isPasswordFocused ? { scaleX: 0.3, borderRadius: '50%', y: -2 } : { scaleX: 1, y: 0 }}
          />

          {/* Cheeks */}
          <motion.div className="absolute top-9 left-1 w-3 h-2 bg-pink-300 rounded-full blur-[1px] opacity-60" animate={isPasswordFocused ? { opacity: 0.2 } : { opacity: 0.6 }} />
          <motion.div className="absolute top-9 right-1 w-3 h-2 bg-pink-300 rounded-full blur-[1px] opacity-60" animate={isPasswordFocused ? { opacity: 0.2 } : { opacity: 0.6 }} />
        </div>
      </motion.div>

      {/* Hands covering eyes */}
      <motion.div 
        className="absolute top-10 left-2 w-10 h-12 bg-accent rounded-full border-4 border-white z-10 origin-bottom-left shadow-md"
        initial={{ rotate: -120, opacity: 0, x: -10 }}
        animate={isPasswordFocused ? { rotate: 20, opacity: 1, y: -5, x: 5 } : { rotate: -120, opacity: 0, x: -10 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="w-1 h-3 bg-white/30 absolute top-2 left-2 rounded-full"></div>
      </motion.div>
      <motion.div 
        className="absolute top-10 right-2 w-10 h-12 bg-accent rounded-full border-4 border-white z-10 origin-bottom-right shadow-md"
        initial={{ rotate: 120, opacity: 0, x: 10 }}
        animate={isPasswordFocused ? { rotate: -20, opacity: 1, y: -5, x: -5 } : { rotate: 120, opacity: 0, x: 10 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="w-1 h-3 bg-white/30 absolute top-2 right-2 rounded-full"></div>
      </motion.div>
    </div>
  );
}
