import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, AlertTriangle, Users, TrendingUp, Sparkles } from 'lucide-react';
import { NewspaperBackground } from '../components/NewspaperBackground';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const testimonials = [
  { id: 1, name: "Priya M.", role: "Mumbai", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Priya&backgroundColor=f97316&textColor=ffffff", text: "Social Yoddha transformed my neighborhood. We fixed 3 streetlights in one week!" },
  { id: 2, name: "Amit S.", role: "Delhi", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Amit&backgroundColor=8b5cf6&textColor=ffffff", text: "The transparency is amazing. I love seeing my reports turn into real action." },
  { id: 3, name: "Neha R.", role: "Bangalore", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Neha&backgroundColor=ec4899&textColor=ffffff", text: "I finally feel like my voice matters. It's empowering to connect with other Yoddhas." },
  { id: 4, name: "Ravi K.", role: "Pune", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Ravi&backgroundColor=eab308&textColor=ffffff", text: "A fantastic initiative. The community teams feature helped me meet great volunteers." },
];

export default function LandingPage() {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), 1500); // slightly longer delay for newspaper assembly
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-dark font-body relative overflow-x-hidden">
      {/* Navbar Overlay */}
      <nav className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-white/80 backdrop-blur-md shadow-sm">
        <div className="text-2xl font-heading font-bold text-primary flex items-center gap-2">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Social Yoddha" className="w-10 h-10 object-contain" /> Social Yoddha
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-dark hover:bg-gray-100 font-semibold">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" className="font-bold">Register</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center">
        <NewspaperBackground />
        
        <div className="z-10 text-center mt-20 pointer-events-none px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={showSubtitle ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-accent mb-6 font-semibold tracking-wide text-sm shadow-sm border border-orange-200">
              <Sparkles size={16} /> Be the change you want to see
            </div>
            
            <h1 className="text-6xl md:text-[5.5rem] leading-tight font-heading font-extrabold mb-6 text-dark drop-shadow-sm">
              <span className="text-primary">Samaj Ka</span> <span className="text-accent">Yoddha</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-dark/80 mb-6 max-w-2xl mx-auto font-medium">
              Report. Unite. Fix. Together we build a better society.
            </p>
            
            <p className="text-base md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Every citizen has the power to spark real change. Stop ignoring the broken streetlights, the dying saplings, and the potholed roads. Voice your concerns, assemble a team, and track the impact. 
              <br/><br/>
              <strong>Because a true hero isn't born with superpowers—they choose to take action.</strong>
            </p>

            <div className="pointer-events-auto">
              <Link to="/register">
                <Button size="lg" variant="accent" className="text-xl px-10 py-7 rounded-full shadow-[0_0_20px_rgba(232,93,4,0.3)] hover:shadow-[0_0_30px_rgba(232,93,4,0.5)] border-2 border-white/50 hover:scale-105 transition-all duration-300">
                  Become a Yoddha →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 z-10 text-primary"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={48} />
        </motion.div>
      </section>

      {/* Why Yoddha Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative bg-background">
        <h2 className="text-4xl font-heading font-bold text-center mb-16 text-primary">Why Join the Movement?</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <Card className="group relative overflow-hidden border-t-4 border-t-accent hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl hover:brightness-105">
            <div className="absolute inset-0 bg-gradient-to-t from-accent to-accent/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
            <CardContent className="pt-8 flex flex-col items-center text-center relative z-10 transition-colors duration-500 group-hover:text-white">
              <div className="bg-accent/10 group-hover:bg-white/20 p-4 rounded-full mb-6 transition-colors duration-500">
                <AlertTriangle size={32} className="text-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">Report Issues Instantly</h3>
              <p className="text-dark/70 group-hover:text-white/90 mb-4 transition-colors duration-500">See a pothole, a dying tree, or a stray in need? Snap a photo and log it with precise geolocation in seconds.</p>
              <p className="text-dark/70 group-hover:text-white/90 transition-colors duration-500">Your reports are instantly visible to the community and routed to relevant local groups for action.</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-t-4 border-t-primary hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl hover:brightness-105">
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
            <CardContent className="pt-8 flex flex-col items-center text-center relative z-10 transition-colors duration-500 group-hover:text-white">
              <div className="bg-primary/10 group-hover:bg-white/20 p-4 rounded-full mb-6 transition-colors duration-500">
                <Users size={32} className="text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">Yoddhas Unite</h3>
              <p className="text-dark/70 group-hover:text-white/90 mb-4 transition-colors duration-500">No hero works alone. Form local teams, rally neighbors, and tackle community issues together.</p>
              <p className="text-dark/70 group-hover:text-white/90 transition-colors duration-500">From weekend cleanup drives to mass watering campaigns, community strength is our superpower.</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-t-4 border-t-sky hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-xl hover:brightness-105">
            <div className="absolute inset-0 bg-gradient-to-t from-sky-500 to-sky-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
            <CardContent className="pt-8 flex flex-col items-center text-center relative z-10 transition-colors duration-500 group-hover:text-white">
              <div className="bg-sky/10 group-hover:bg-white/20 p-4 rounded-full mb-6 transition-colors duration-500">
                <TrendingUp size={32} className="text-sky-500 group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">Track Real Change</h3>
              <p className="text-dark/70 group-hover:text-white/90 mb-4 transition-colors duration-500">Watch your impact grow. Track issue resolution from 'Open' to 'Fixed' with before-and-after evidence.</p>
              <p className="text-dark/70 group-hover:text-white/90 transition-colors duration-500">Earn points, climb the leaderboard, and hold local authorities accountable through radical transparency.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Ticker */}
      <div className="w-full bg-primary text-white py-4 overflow-hidden border-y-4 border-hero">
        <motion.div 
          className="whitespace-nowrap flex gap-12 font-heading font-bold text-xl"
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <span>3,241 issues resolved this month</span>
          <span>•</span>
          <span>12,890 active Yoddhas</span>
          <span>•</span>
          <span>847 trees saved</span>
          <span>•</span>
          <span>1,203 animals helped</span>
          <span>•</span>
          <span>3,241 issues resolved this month</span>
          <span>•</span>
          <span>12,890 active Yoddhas</span>
        </motion.div>
      </div>

      {/* Newsletter Strip */}
      <section className="bg-[#eaf5f1] py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Daily Yoddha Dispatch</h2>
          <p className="text-lg text-dark/80 mb-8">Get the most inspiring community fixes delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email" className="px-6 py-3 rounded-full border border-gray-300 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
            <Button variant="primary" className="rounded-full px-8 py-3 h-auto whitespace-nowrap">Join the Movement</Button>
          </div>
        </div>
      </section>

      {/* Testimonials Swipe */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-primary">Voices of the Yoddhas</h2>
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 gap-6 snap-x snap-mandatory no-scrollbar">
            {testimonials.map((t) => (
              <Card key={t.id} className="group relative overflow-hidden snap-center shrink-0 w-80 md:w-96 shadow-md border-t-4 border-t-hero hover:-translate-y-1 transition-all duration-500 hover:shadow-xl hover:brightness-105">
                <div className="absolute inset-0 bg-gradient-to-t from-hero to-hero/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
                <CardContent className="pt-8 relative z-10 flex flex-col h-full transition-colors duration-500">
                  <div className="flex text-hero mb-4 group-hover:text-white drop-shadow-sm transition-colors duration-500">⭐⭐⭐⭐⭐</div>
                  <p className="text-dark/80 italic mb-6 group-hover:text-dark transition-colors duration-500 font-medium">"{t.text}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-gray-200 border-2 border-transparent group-hover:border-dark transition-colors duration-500 shadow-sm">
                      <img src={t.avatar} alt={t.name} className="rounded-full w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-dark">{t.name}</p>
                      <p className="text-xs text-gray-500 group-hover:text-dark/80 transition-colors duration-500 font-medium">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">Connect With Us</h2>
          <p className="text-lg text-gray-600 mb-10">Have an idea or want to collaborate? Send us a message.</p>
          <form className="space-y-5 text-left bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm" onSubmit={(e) => { e.preventDefault(); alert('Message sent! Thank you.'); }}>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input type="text" required className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" required className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea required rows="4" className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow" placeholder="How can we help?"></textarea>
            </div>
            <Button type="submit" variant="primary" className="w-full py-4 text-lg rounded-xl shadow-md hover:shadow-lg">Send Message</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b1b1a] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-2xl font-heading font-bold text-primary flex items-center gap-2 mb-6">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Social Yoddha" className="w-10 h-10 object-contain" /> Social Yoddha
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering citizens to build a better society, one report at a time. Report, unite, and fix your community.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-xl mb-6 text-white border-b-2 border-primary pb-2 inline-block">Contact Details</h3>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm flex items-center gap-2 justify-center md:justify-start">
                <span className="text-lg">📍</span> Mumbai, Maharashtra, India
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-2 justify-center md:justify-start">
                <span className="text-lg">✉️</span> connect@socialyoddha.in
              </p>
              <p className="text-gray-400 text-sm flex items-center gap-2 justify-center md:justify-start">
                <span className="text-lg">📞</span> +91 98765 43210
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-xl mb-6 text-hero border-b-2 border-hero pb-2 inline-block">Credits</h3>
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 w-full max-w-xs">
              <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Ideation & Admin</p>
              <p className="text-primary text-2xl font-heading font-black tracking-wide drop-shadow-md">
                Ayush Kr Raunak
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © 2026 Social Yoddha. All rights reserved.
        </div>
      </footer>
      
      {/* Sticky Bottom Bar (Mobile) */}
      <div className="md:hidden fixed bottom-0 w-full bg-white p-4 border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50 text-center">
         <Link to="/register">
           <Button variant="accent" className="w-full text-lg font-bold rounded-full">Report an Issue</Button>
         </Link>
      </div>
    </div>
  );
}
