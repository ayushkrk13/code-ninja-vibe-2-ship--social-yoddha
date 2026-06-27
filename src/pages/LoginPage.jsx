import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ConfettiCelebration } from '../components/ConfettiCelebration';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { InteractiveAvatar } from '../components/InteractiveAvatar';
import { SocialLogins } from '../components/SocialLogins';

export default function LoginPage() {
  const [celebrate, setCelebrate] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setCelebrate(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
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
        className="absolute inset-0 z-0 bg-cover bg-center blur-sm opacity-50 fixed"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1920&q=80)' }}
      />
      
      <ConfettiCelebration trigger={celebrate} mode="edges" />

      {celebrate && (
        <div className="absolute top-10 z-50 bg-white px-6 py-4 rounded-xl shadow-lg border-l-4 border-primary animate-bounce">
          <p className="text-lg font-bold text-primary">Jai Yoddha! Welcome back, User 🎉</p>
        </div>
      )}

      <Card className="w-full max-w-[440px] z-10 border-t-8 border-t-primary shadow-2xl relative bg-white rounded-3xl overflow-visible mx-4">
        
        <div className="absolute -top-20 left-0 right-0">
           <InteractiveAvatar isPasswordFocused={isPasswordFocused} mousePosition={mousePosition} />
        </div>

        <CardHeader className="text-center pt-16 pb-2">
          <CardTitle className="text-3xl text-dark font-heading font-bold flex items-center justify-center gap-2">Welcome back! <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-8 h-8 object-contain" /></CardTitle>
          <p className="text-gray-500 mt-2">Log in to track your community impact.</p>
        </CardHeader>
        
        <CardContent className="px-8 pb-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input 
                type="email" 
                required 
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
                placeholder="yoddha@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <input 
                type="password" 
                required 
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all"
                placeholder="••••••••"
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
              />
            </div>
            <div className="text-right">
              <a href="#" className="text-sm text-primary font-medium hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" variant="accent" className="w-full py-4 text-lg font-bold rounded-xl mt-4 shadow-md hover:shadow-lg">
              Enter the Mission →
            </Button>
          </form>
          
          <SocialLogins />
          
        </CardContent>
        <CardFooter className="justify-center pb-8 border-t border-gray-100 pt-6">
          <p className="text-gray-600">
            New here? <Link to="/register" className="text-primary font-bold hover:underline">Register as a Yoddha</Link>
          </p>
        </CardFooter>
      </Card>

      {/* Quote Strip */}
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur py-4 px-6 text-center shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-200 z-40">
        <p className="italic text-gray-700 font-medium max-w-2xl mx-auto text-sm md:text-base">
          "Being a Yoddha means taking responsibility for my neighborhood. Last week we fixed 3 streetlights!" — Priya M., Mumbai
        </p>
      </div>
    </div>
  );
}
