import React, { useState } from 'react';
import { Settings, Shield, Award, MapPin, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProfileSettingsModal } from '../components/ProfileSettingsModal';
import { ShareBadgeModal } from '../components/ShareBadgeModal';
import { AnalyticsModal } from '../components/AnalyticsModal';

export default function ProfilePage() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [analyticsModalConfig, setAnalyticsModalConfig] = useState({ isOpen: false, title: '', type: '' });
  const [user, setUser] = useState({
    name: 'Arjun Kumar',
    location: 'Andheri West, Mumbai',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Arjun&backgroundColor=0ea5e9&textColor=ffffff',
    email: 'arjun.k@example.com',
    phone: '+91 98765 43210'
  });

  const handleSaveSettings = (newUserData) => {
    setUser({ ...user, ...newUserData, location: `${newUserData.locality}, ${newUserData.city}` });
    setIsSettingsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <ProfileSettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={() => setIsSettingsModalOpen(false)} 
        user={user}
        onSave={handleSaveSettings}
      />
      <ShareBadgeModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
        user={user} 
      />
      <AnalyticsModal 
        isOpen={analyticsModalConfig.isOpen}
        title={analyticsModalConfig.title}
        type={analyticsModalConfig.type}
        onClose={() => setAnalyticsModalConfig({ ...analyticsModalConfig, isOpen: false })}
      />

      {/* Header Profile Section */}
      <div className="bg-white px-4 pt-8 pb-6 shadow-sm border-b border-gray-100">
        <div className="max-w-3xl mx-auto relative">
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-dark hover:bg-gray-100 transition-colors bg-gray-50 rounded-full cursor-pointer"
          >
            <Settings size={20} />
          </button>
          
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full bg-green-100 border-4 border-white shadow-lg object-cover" />
              <div className="absolute -bottom-2 -right-2 bg-hero text-white p-1.5 rounded-full shadow-md border-2 border-white" title="Gold Yoddha">
                <Shield size={16} />
              </div>
            </div>
            
            <h1 className="text-2xl font-heading font-bold text-dark flex items-center gap-2 justify-center">
              {user.name} <Badge variant="warning" className="ml-2 text-[10px]">Gold Yoddha</Badge>
            </h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
              <MapPin size={14} /> {user.location}
            </p>
            <p className="text-gray-400 text-xs mt-2 flex items-center justify-center gap-1">
              <Calendar size={12} /> Yoddha since Jan 2026
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        
        {/* PROGRESS NUDGE */}
        <Card className="bg-gradient-to-r from-primary to-[#15805e] text-white border-none shadow-md overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <CardContent className="p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">Keep going, Hero! 💪</h3>
              <p className="text-white/80 text-sm">You're 60 points away from the Platinum Rank.</p>
            </div>
            <div className="w-full sm:w-1/3">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Gold</span>
                <span>Platinum</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-hero rounded-full w-[80%]"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:border-primary/40 hover:-translate-y-1 transition-all"
            onClick={() => setAnalyticsModalConfig({ isOpen: true, title: 'Reports Submitted', type: 'reports' })}
          >
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 font-medium mb-1">Reports Submitted</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-dark">12</span>
                <span className="text-xs text-green-600 flex items-center"><ArrowUpRight size={12} /> +2 this week</span>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:border-primary/40 hover:-translate-y-1 transition-all"
            onClick={() => setAnalyticsModalConfig({ isOpen: true, title: 'Issues Resolved', type: 'issues' })}
          >
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 font-medium mb-1">Issues Resolved</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">8</span>
                <Badge variant="secondary" className="text-[10px]">High Impact</Badge>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:border-hero/40 hover:-translate-y-1 transition-all"
            onClick={() => setAnalyticsModalConfig({ isOpen: true, title: 'Yoddha Score', type: 'score' })}
          >
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 font-medium mb-1">Yoddha Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-hero">1,240</span>
                <span className="text-xs text-gray-400">pts</span>
              </div>
            </CardContent>
          </Card>
          <Card 
            className="bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:border-sky-500/40 hover:-translate-y-1 transition-all"
            onClick={() => setAnalyticsModalConfig({ isOpen: true, title: 'Teams Formed', type: 'teams' })}
          >
            <CardContent className="p-4">
              <p className="text-sm text-gray-500 font-medium mb-1">Teams Formed</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-sky-600">3</span>
                <div className="flex -space-x-2 ml-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 border border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-300 border border-white"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BADGES & ACHIEVEMENTS */}
        <section>
          <h2 className="text-lg font-heading font-bold text-dark mb-4">Badges & Achievements</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {[
              { label: 'First Report', color: 'bg-blue-100 text-blue-600', active: true },
              { label: 'Tree Saver', color: 'bg-green-100 text-green-600', active: true },
              { label: 'Animal Rescuer', color: 'bg-orange-100 text-orange-600', active: true },
              { label: 'Team Leader', color: 'bg-purple-100 text-purple-600', active: false },
              { label: '100 Reports', color: 'bg-red-100 text-red-600', active: false },
            ].map((badge, i) => (
              <div key={i} className={`flex flex-col items-center min-w-[80px] p-3 rounded-xl border ${badge.active ? 'border-gray-200 bg-white' : 'border-dashed border-gray-200 bg-gray-50 opacity-60'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${badge.active ? badge.color : 'bg-gray-200 text-gray-400'}`}>
                  <Award size={24} />
                </div>
                <span className="text-[10px] font-semibold text-center leading-tight">{badge.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SOCIAL SHARE NUDGE */}
        <section>
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="w-full animate-rainbow text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3 border-2 border-white/50"
          >
            <span className="text-xl">✨</span>
            Showcase your Yoddha journey socially with badge!
            <span className="text-xl">🌟</span>
          </button>
        </section>

        {/* RECENT ACTIVITY TIMELINE */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-heading font-bold text-dark">Activity Timeline</h2>
            <Button variant="ghost" size="sm" className="text-primary h-auto py-1">View all</Button>
          </div>
          <Card className="bg-white">
            <CardContent className="p-0">
              <div className="relative pl-8 pr-4 py-6 space-y-8">
                {/* Timeline Line */}
                <div className="absolute left-4 top-8 bottom-8 w-px bg-gray-200"></div>
                
                {[
                  { title: 'Reported an injured stray dog', time: '2 hours ago', type: 'report', icon: '🐕' },
                  { title: 'Joined team "Green Andheri"', time: 'Yesterday', type: 'team', icon: '👥' },
                  { title: 'Issue resolved: Pothole fixed', time: '3 days ago', type: 'resolve', icon: <CheckCircle2 size={16} className="text-primary"/> },
                  { title: 'Upvoted 5 community reports', time: '1 week ago', type: 'vote', icon: '👍' },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                       {/* dot inner */}
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-dark">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}
