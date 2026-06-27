import React from 'react';
import { motion } from 'framer-motion';

const clippings = [
  { id: 1, src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80", title: "Local Park Restored", angle: -12, x: "10vw", y: "15vh", delay: 0.2 },
  { id: 2, src: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&q=80", title: "Stray Dogs Rescued", angle: 8, x: "70vw", y: "10vh", delay: 0.6 },
  { id: 3, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80", title: "Road Potholes Fixed", angle: -5, x: "20vw", y: "60vh", delay: 1.0 },
  { id: 4, src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400&q=80", title: "Water Drive Success", angle: 15, x: "65vw", y: "55vh", delay: 1.4 },
  { id: 5, src: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80", title: "Community Cleanup", angle: -8, x: "40vw", y: "30vh", delay: 1.8 },
];

export function NewspaperBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#eef3f0] opacity-50 pointer-events-none">
      {clippings.map((clip) => (
        <motion.div
          key={clip.id}
          className="absolute p-3 bg-[#fdfbf7] shadow-2xl border border-gray-300 w-48 md:w-64"
          style={{
            // Give it a slightly ragged/torn paper edge look using border-radius irregularities
            borderRadius: '2px 5px 3px 4px',
          }}
          initial={{ 
            opacity: 0, 
            scale: 0.2, 
            rotate: Math.random() * 360 - 180,
            x: '50vw',
            y: '100vh' // Start scrambled from the bottom
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: clip.angle,
            x: clip.x,
            y: clip.y
          }}
          transition={{ 
            duration: 2.5, 
            delay: clip.delay, 
            type: 'spring', 
            stiffness: 40, 
            damping: 12 
          }}
        >
          <div className="border-2 border-dark/10 p-1">
            <img 
              src={clip.src} 
              alt="News" 
              className="w-full h-32 md:h-40 object-cover sepia-[.3] contrast-125" 
            />
            <p className="mt-3 text-xs md:text-sm font-heading font-black text-dark text-center uppercase tracking-widest border-b-2 border-dark pb-1">
              {clip.title}
            </p>
            <p className="text-[9px] md:text-[11px] font-serif text-dark/80 mt-2 leading-snug text-justify line-clamp-3">
              Citizens came together yesterday to resolve long-standing issues in the neighborhood. This act of unity proves that when we assemble as a community, real change happens.
            </p>
          </div>
        </motion.div>
      ))}
      
      {/* Subtle overlay to blend the newspaper items into the background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
    </div>
  );
}
