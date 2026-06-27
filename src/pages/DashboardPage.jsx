import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Home, Map as MapIcon, PlusCircle, Users, User, TreePine, Dog, Droplets, Zap, Trash2, ShieldAlert } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ReportIssueModal } from '../components/ReportIssueModal';
import { IssueDetailModal } from '../components/IssueDetailModal';
import { ShareBadgeModal } from '../components/ShareBadgeModal';

const trendingIssues = [
  {
    id: 1,
    title: 'Fallen tree blocking the main road near Metro station',
    category: 'Trees & Plants',
    icon: TreePine,
    color: 'text-green-600',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80',
    status: 'In Progress',
    location: 'Andheri West Metro',
    reporter: 'Ravi K.',
    upvotes: 24,
    commentsList: [
      { author: 'BMC Ward K/W', text: 'Team dispatched, will be cleared by evening.', time: '2 hours ago' },
      { author: 'Priya M.', text: 'Thank goodness, traffic was horrible this morning!', time: '1 hour ago' }
    ]
  },
  {
    id: 2,
    title: 'Pack of aggressive stray dogs near market',
    category: 'Stray Animals',
    icon: Dog,
    color: 'text-orange-600',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=400&q=80',
    status: 'Open',
    location: 'Lokhandwala Market',
    reporter: 'Amit S.',
    upvotes: 45,
    commentsList: [
      { author: 'Yoddha Rescue Team', text: 'We are sending a volunteer to assess the situation. Please do not approach them without food.', time: '5 hours ago' }
    ]
  },
  {
    id: 3,
    title: 'Severe waterlogging under the flyover',
    category: 'Water',
    icon: Droplets,
    color: 'text-blue-600',
    image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80',
    status: 'In Progress',
    location: 'JVLR Junction',
    reporter: 'Neha R.',
    upvotes: 89,
    commentsList: [
      { author: 'Sunil T.', text: 'Happens every monsoon. Needs a permanent fix.', time: '1 day ago' },
      { author: 'BMC Helpdesk', text: 'Pumping machines installed. Water receding.', time: '4 hours ago' }
    ]
  }
];

export default function DashboardPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportCategory, setReportCategory] = useState('');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openReportModal = (category = '') => {
    setReportCategory(category);
    setIsReportModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <ReportIssueModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)} 
        initialCategory={reportCategory}
      />
      <IssueDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        issue={selectedIssue}
      />
      <ShareBadgeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        user={{ name: 'Arjun Kumar', location: 'Andheri West, Mumbai' }}
      />

      {/* Top Nav */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-heading font-bold text-primary flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" /> <span className="hidden sm:inline">Social Yoddha</span>
        </Link>
        <div className="flex-1 max-w-xl mx-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search issues, areas, teams..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <Link to="/profile/123" className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-full pr-3 p-1 transition-colors">
            <img src="https://api.dicebear.com/7.x/initials/svg?seed=Arjun&backgroundColor=0ea5e9&textColor=ffffff" alt="Avatar" className="w-8 h-8 rounded-full bg-gray-200 object-cover" />
            <span className="text-sm font-medium hidden md:inline">Arjun</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 pt-6 space-y-8">
        
        {/* HERO SECTION */}
        <section>
          <h1 className="text-2xl font-heading font-bold text-dark mb-1">Namaste, Arjun! 🌱</h1>
          <p className="text-gray-600 mb-6">Your area (Andheri West) has <span className="font-semibold text-accent">3 open issues</span>.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Reports Submitted', value: '12' },
              { label: 'Issues Resolved', value: '8' },
              { label: 'Yoddha Score', value: '1,240' },
              { label: 'Teams Joined', value: '3' },
            ].map((stat, i) => (
              <Card key={i} className="bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <span className="text-3xl font-bold text-primary mb-1">{stat.value}</span>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="w-full animate-rainbow text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3 border-2 border-white/50"
            >
              <span className="text-xl">✨</span>
              Showcase your Yoddha journey socially with badge!
              <span className="text-xl">🌟</span>
            </button>
          </div>
        </section>

        {/* ISSUE CATEGORIES */}
        <section>
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 gap-3 no-scrollbar snap-x">
            {[
              { icon: TreePine, label: 'Trees & Plants', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: Dog, label: 'Stray Animals', color: 'text-orange-600', bg: 'bg-orange-50' },
              { icon: Droplets, label: 'Water', color: 'text-blue-600', bg: 'bg-blue-50' },
              { icon: Zap, label: 'Electrical', color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { icon: Trash2, label: 'Cleanliness', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: ShieldAlert, label: 'Hazard', color: 'text-red-600', bg: 'bg-red-50' },
            ].map((cat, i) => (
              <button onClick={() => openReportModal(cat.label)} key={i} className="snap-start flex items-center gap-2 bg-white border border-gray-100 rounded-full px-4 py-2 shadow-sm whitespace-nowrap hover:bg-gray-50 transition-colors">
                <div className={`${cat.bg} p-1.5 rounded-full`}>
                  <cat.icon size={16} className={cat.color} />
                </div>
                <span className="text-sm font-medium text-gray-700">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* HIGHLIGHTED HELP BUTTONS */}
        <section className="grid md:grid-cols-2 gap-6">
          <Card className="overflow-hidden border-2 border-orange-100 shadow-[0_4px_20px_-4px_rgba(232,93,4,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(232,93,4,0.15)] transition-all">
            <div className="h-2 w-full bg-gradient-to-r from-orange-400 to-accent"></div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img src="/stray.png" alt="Stray Animals" className="w-20 h-20 rounded-xl object-cover shadow-sm bg-orange-50" onError={(e) => { e.target.src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=200&q=80" }} />
                <div>
                  <h3 className="text-xl font-heading font-bold text-dark mb-2">Help Stray Animals 🐕</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Hundreds of stray dogs and cats in our neighborhoods go without food, water, and medical care. Become their voice.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button onClick={() => openReportModal('Stray Animals')} variant="accent" size="sm" className="flex-1 whitespace-nowrap">Report Injured Animal</Button>
                <Link to="/map" className="flex-1"><Button variant="outline" size="sm" className="w-full whitespace-nowrap">Find Local Shelter</Button></Link>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-2 border-green-100 shadow-[0_4px_20px_-4px_rgba(29,158,117,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(29,158,117,0.15)] transition-all">
            <div className="h-2 w-full bg-gradient-to-r from-green-400 to-primary"></div>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <img src="/plants.png" alt="Plants and Trees" className="w-20 h-20 rounded-xl object-cover shadow-sm bg-green-50" onError={(e) => { e.target.src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=200&q=80" }} />
                <div>
                  <h3 className="text-xl font-heading font-bold text-dark mb-2">Save Our Plants & Trees 🌿</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Trees and plants around us are drying up — with care and reporting, we can reverse this. Every leaf counts.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button onClick={() => openReportModal('Trees & Plants')} variant="primary" size="sm" className="flex-1 whitespace-nowrap">Report Dying Tree</Button>
                <Link to="/community" className="flex-1"><Button variant="outline" size="sm" className="w-full whitespace-nowrap">Request Watering Drive</Button></Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* TRENDING IN YOUR AREA */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-heading font-bold text-dark">Trending in Andheri West</h2>
            <Link to="/map" className="text-sm font-medium text-primary hover:underline">View on Map</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trendingIssues.map((issue) => (
              <Card 
                key={issue.id} 
                onClick={() => { setSelectedIssue(issue); setIsDetailModalOpen(true); }}
                className="flex flex-col h-full bg-white hover:border-primary/40 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] cursor-pointer group"
              >
                <div className="relative h-36 w-full bg-gray-100 rounded-t-2xl overflow-hidden">
                  <img src={issue.image} alt={issue.title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out" />
                  <Badge variant={issue.status === 'Fixed' ? 'success' : issue.status === 'Open' ? 'error' : 'warning'} className="absolute top-3 right-3 backdrop-blur-md bg-white/95 shadow-sm border-none font-bold">
                    {issue.status}
                  </Badge>
                </div>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`p-1.5 rounded-md bg-opacity-10 ${issue.color.replace('text', 'bg')}`}>
                      <issue.icon size={14} className={issue.color} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${issue.color}`}>{issue.category}</span>
                  </div>
                  <h3 className="font-bold text-dark leading-snug mb-3 group-hover:text-primary transition-colors">{issue.title}</h3>
                  <div className="mt-auto pt-4 flex items-center justify-between text-xs font-bold text-gray-500 border-t border-gray-50">
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md text-gray-600">
                      👍 {issue.upvotes} <span className="hidden sm:inline">upvotes</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md text-gray-600">
                      💬 {issue.commentsList.length} <span className="hidden sm:inline">comments</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </div>

      {/* Persistent Bottom Nav (Mobile First) */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 px-6 py-2 pb-safe">
        <div className="flex justify-between items-center max-w-md mx-auto relative">
          <Link to="/dashboard" className="flex flex-col items-center p-2 text-primary">
            <Home size={24} className="mb-1" />
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link to="/map" className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <MapIcon size={24} className="mb-1" />
            <span className="text-[10px] font-medium">Map</span>
          </Link>
          
          {/* Center Floating Report Button */}
          <div className="relative -top-6">
            <button onClick={() => openReportModal('')} className="bg-gradient-to-b from-accent to-[#c74c03] text-white p-4 rounded-full shadow-[0_8px_20px_rgba(232,93,4,0.4)] hover:scale-105 transition-transform">
              <PlusCircle size={32} />
            </button>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-accent">Report</span>
          </div>
          
          <Link to="/community" className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Users size={24} className="mb-1" />
            <span className="text-[10px] font-medium">Community</span>
          </Link>
          <Link to="/profile/123" className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <User size={24} className="mb-1" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
