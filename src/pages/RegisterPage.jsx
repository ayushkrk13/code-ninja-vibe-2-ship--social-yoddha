import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ConfettiCelebration } from '../components/ConfettiCelebration';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { InteractiveAvatar } from '../components/InteractiveAvatar';
import { SocialLogins } from '../components/SocialLogins';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [celebrate, setCelebrate] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleFinish = (e) => {
    e.preventDefault();
    setCelebrate(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2500);
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-gray-900 pt-16 pb-24" onMouseMove={handleMouseMove}>
      <Link to="/" className="absolute top-6 left-6 z-50 text-white font-heading font-bold text-xl flex items-center gap-2 hover:scale-105 transition-transform drop-shadow-md bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-6 h-6 object-contain" /> Social Yoddha
      </Link>

      <div 
        className="absolute inset-0 z-0 bg-cover bg-center blur-md opacity-40 fixed"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1920&q=80)' }}
      />
      
      <ConfettiCelebration trigger={celebrate} mode="full" />

      {celebrate && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
           <img src="/hero.png" alt="Hero Thumbs Up" className="h-64 object-contain animate-bounce drop-shadow-2xl mb-8" onError={(e) => { e.target.src="https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=400&q=80" }} />
           <h1 className="text-5xl font-heading font-extrabold text-white text-center px-4 animate-pulse">
             🎉 Jai Yoddha! You are now a Social Yoddha!
           </h1>
        </div>
      )}

      <Card className="w-full max-w-[500px] z-10 shadow-2xl relative bg-white rounded-3xl overflow-visible border-t-8 border-t-primary mx-4">
        <div className="absolute -top-20 left-0 right-0">
           <InteractiveAvatar isPasswordFocused={isPasswordFocused} mousePosition={mousePosition} />
        </div>
        
        <div className="h-2 w-full bg-gray-100 overflow-hidden mt-14">
          <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${(step / 3) * 100}%` }} />
        </div>
        
        <CardContent className="p-8 pt-6">
          <h2 className="text-3xl font-heading font-bold text-dark mb-6 text-center">
            {step === 1 && "Who are you?"}
            {step === 2 && "Your Area"}
            {step === 3 && "Take the Oath"}
          </h2>

          <form onSubmit={step === 3 ? handleFinish : handleNext} className="space-y-5">
            {step === 1 && (
              <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input type="text" required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all" placeholder="Arjun Kumar" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input type="email" required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all" placeholder="yoddha@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    required 
                    className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all" 
                    placeholder="••••••••" 
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                  <input type="text" required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Locality/Area</label>
                  <input type="text" required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all" placeholder="Andheri West" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Local Zone</label>
                  <select required className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all">
                    <option value="">Select Zone...</option>
                    <option value="north">North Zone</option>
                    <option value="south">South Zone</option>
                    <option value="east">East Zone</option>
                    <option value="west">West Zone</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="space-y-6">
                <div className="bg-sky-50 p-6 rounded-xl border border-sky-200 shadow-inner relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-sky-400"></div>
                  <p className="text-lg font-serif italic text-dark text-center leading-relaxed relative z-10">
                    "I pledge to be the eyes and ears of my community. I will report truthfully, act with integrity, and strive to leave my surroundings better than I found them. Jai Hind! Jai Yoddha!"
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <input type="checkbox" required className="mt-1 w-5 h-5 accent-primary cursor-pointer" id="pledge" />
                  <label htmlFor="pledge" className="text-gray-700 font-medium cursor-pointer">I pledge to report truthfully and act with integrity for my community.</label>
                </div>
              </motion.div>
            )}

            <div className="pt-2 flex justify-between gap-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="w-1/3 rounded-xl font-bold">
                  Back
                </Button>
              )}
              <Button type="submit" variant="primary" className="flex-1 py-4 text-lg rounded-xl shadow-md hover:shadow-lg font-bold">
                {step === 3 ? "I am ready!" : "Continue →"}
              </Button>
            </div>
            
            {step === 1 && <SocialLogins />}
            
            <div className="text-center mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Already a Yoddha? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {/* Quote Strip */}
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur py-4 px-6 text-center shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-200 z-40">
        <p className="italic text-gray-700 font-medium max-w-2xl mx-auto text-sm md:text-base">
          "Ever since joining, our society has resolved 12 water logging issues." — Amit, Delhi
        </p>
      </div>
    </div>
  );
}
