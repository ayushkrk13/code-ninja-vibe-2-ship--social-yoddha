import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

export function ConfettiCelebration({ trigger, mode = 'edges' }) {
  useEffect(() => {
    if (!trigger) return;

    const colors = ['#1D9E75', '#F4A800', '#E85D04', '#ffffff'];

    if (mode === 'edges') {
      const end = Date.now() + 1.5 * 1000;
      
      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } else if (mode === 'burst') {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors
      });
    } else if (mode === 'full') {
        const duration = 2000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });
    
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            } else {
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: colors
                });
            }
        }());
    }
  }, [trigger, mode]);

  return null;
}
