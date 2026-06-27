import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Users, MoreVertical, Image as ImageIcon, Flag, Edit2, LogOut, ThumbsUp, Award, Star, MapPin } from 'lucide-react';
import { Button } from './ui/Button';
import { EditTeamModal } from './EditTeamModal';

export function TeamChatModal({ isOpen, onClose, team, onLeave, onEdit }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load mock messages when a team is opened
  useEffect(() => {
    if (team) {
      setMessages([
        { id: 1, text: `Welcome to ${team.name}!`, sender: "System", time: "Yesterday", isSystem: true },
        { id: 2, text: "Hey team! Are we meeting this weekend for the drive?", sender: "Priya", time: "10:00 AM", isMe: false, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Priya&backgroundColor=f97316&textColor=ffffff", likes: 0, hasLiked: false },
        { id: 3, text: "Yes, let's meet at the usual spot at 9 AM.", sender: "Amit", time: "10:05 AM", isMe: false, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Amit&backgroundColor=8b5cf6&textColor=ffffff", likes: 2, hasLiked: false }
      ]);
    }
  }, [team]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  if (!isOpen || !team) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages([
      ...messages, 
      { 
        id: Date.now(),
        text: newMessage, 
        sender: "Arjun (You)", 
        time: "Just now", 
        isMe: true,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun&backgroundColor=0ea5e9&textColor=ffffff",
        likes: 0,
        hasLiked: false
      }
    ]);
    setNewMessage('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setMessages([...messages, { 
        id: Date.now(),
        image: imageUrl, 
        sender: "Arjun (You)", 
        time: "Just now", 
        isMe: true,
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun&backgroundColor=0ea5e9&textColor=ffffff",
        likes: 0,
        hasLiked: false
      }]);
    }
  };

  const handleShareLocation = () => {
    setMessages([...messages, { 
      id: Date.now(),
      isLocation: true,
      locationName: "Andheri West, Mumbai",
      coordinates: "19.1363° N, 72.8277° E",
      sender: "Arjun (You)", 
      time: "Just now", 
      isMe: true,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun&backgroundColor=0ea5e9&textColor=ffffff",
      likes: 0,
      hasLiked: false
    }]);
  };

  const handleShareProfile = () => {
    setMessages([...messages, { 
      id: Date.now(),
      isProfileCard: true,
      role: "Eco Warrior",
      badge: "Gold Yoddha 🏆",
      location: "Andheri West, Mumbai",
      respects: 0,
      hasRespected: false,
      sender: "Arjun (You)", 
      time: "Just now", 
      isMe: true,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Arjun&backgroundColor=0ea5e9&textColor=ffffff",
      likes: 0,
      hasLiked: false
    }]);
  };

  const handleRespect = (msgId) => {
    setMessages(messages.map(msg => {
      if (msg.id === msgId && msg.isProfileCard) {
        return { ...msg, respects: (msg.respects || 0) + (msg.hasRespected ? -1 : 1), hasRespected: !msg.hasRespected };
      }
      return msg;
    }));
  };

  const handleReport = (msgId) => {
    alert('This message has been reported and sent to the moderators for review.');
  };

  const handleLike = (msgId) => {
    setMessages(messages.map(msg => {
      if (msg.id === msgId) {
        if (msg.hasLiked) {
          return { ...msg, likes: msg.likes - 1, hasLiked: false };
        } else {
          return { ...msg, likes: (msg.likes || 0) + 1, hasLiked: true };
        }
      }
      return msg;
    }));
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center sm:p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => { onClose(); setShowMenu(false); }}
      >
        <EditTeamModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          team={team} 
          onSave={onEdit} 
        />
        
        <motion.div 
          className="bg-white sm:rounded-3xl w-full h-full sm:h-[85vh] sm:max-w-2xl overflow-hidden flex flex-col shadow-2xl relative"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => { e.stopPropagation(); setShowMenu(false); }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 bg-white shadow-sm z-10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <Users size={20} />
              </div>
              <div>
                <h2 className="font-heading font-bold text-dark leading-tight">{team.name}</h2>
                <p className="text-xs text-gray-500">{team.members} Yoddhas • {team.focus}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }} 
                  className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors"
                >
                  <MoreVertical size={20} />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-48 z-[60]">
                    {team.isLeader && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsEditModalOpen(true); setShowMenu(false); }} 
                        className="w-full text-left px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <Edit2 size={16} /> Edit Settings
                      </button>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); onLeave(); setShowMenu(false); }} 
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} /> Leave Team
                    </button>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-dark hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f8f9fa] space-y-4">
            {messages.map((msg) => (
              msg.isSystem ? (
                <div key={msg.id} className="text-center my-6">
                  <span className="bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{msg.text}</span>
                </div>
              ) : (
                <div key={msg.id} className={`flex gap-3 group max-w-[85%] sm:max-w-[75%] ${msg.isMe ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className="shrink-0 pt-1">
                    <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full border border-gray-200 bg-white" />
                  </div>
                  <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-baseline gap-2 mb-1 px-1">
                      <span className="text-xs font-bold text-gray-600">{msg.sender}</span>
                      <span className="text-[10px] text-gray-400 font-semibold">{msg.time}</span>
                    </div>
                    
                    {msg.isProfileCard ? (
                      <div className={`relative p-4 rounded-2xl shadow-sm text-sm border-2 ${msg.isMe ? 'bg-primary/5 text-dark border-primary/20 rounded-tr-sm' : 'bg-white text-dark border-orange-100 rounded-tl-sm'} w-64`}>
                        <div className="flex items-center gap-3 mb-4">
                           <div className="p-2 bg-accent/10 rounded-full">
                             <Award className="text-accent" size={24} />
                           </div>
                           <div>
                             <p className="font-bold text-dark text-base">{msg.sender.replace(' (You)', '')}</p>
                             <p className="text-[10px] font-bold text-accent uppercase tracking-wider">{msg.badge}</p>
                           </div>
                        </div>
                        <div className="space-y-2 mb-4 text-gray-600">
                          <p className="flex items-center gap-2 text-xs font-medium"><Star size={14} className="text-yellow-500" fill="currentColor"/> {msg.role}</p>
                          <p className="flex items-center gap-2 text-xs font-medium"><MapPin size={14} className="text-gray-400"/> {msg.location}</p>
                        </div>
                        <button onClick={() => handleRespect(msg.id)} className={`w-full py-2 rounded-xl text-xs font-bold transition-all transform active:scale-95 ${msg.hasRespected ? 'bg-accent text-white shadow-md' : 'bg-orange-50 text-accent hover:bg-orange-100'}`}>
                          {msg.hasRespected ? 'Respect Given 🤝' : 'Give Respect 🤝'} ({msg.respects})
                        </button>
                      </div>
                    ) : msg.isLocation ? (
                      <div className={`relative p-3 rounded-2xl shadow-sm text-sm border-2 ${msg.isMe ? 'bg-primary/5 border-primary/20 rounded-tr-sm' : 'bg-white border-gray-100 rounded-tl-sm'} w-64`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <MapPin className="text-blue-600" size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-dark text-sm">Live Location</p>
                            <p className="text-[10px] text-gray-500">{msg.sender.replace(' (You)', '')}</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 h-24 rounded-lg w-full mb-2 flex items-center justify-center relative overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" alt="Map" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                          <div className="absolute w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg"></div>
                        </div>
                        <p className="text-xs font-semibold text-gray-700">{msg.locationName}</p>
                        <p className="text-[10px] text-gray-400">{msg.coordinates}</p>
                      </div>
                    ) : msg.image ? (
                      <div className={`relative p-1.5 rounded-2xl shadow-sm ${msg.isMe ? 'bg-primary rounded-tr-sm' : 'bg-white border border-gray-100 rounded-tl-sm'}`}>
                        <img src={msg.image} alt="Shared" className="rounded-xl w-48 sm:w-64 h-auto object-cover" />
                      </div>
                    ) : (
                      <div className={`relative px-4 py-2.5 rounded-2xl shadow-sm text-sm ${msg.isMe ? 'bg-primary text-white rounded-tr-sm' : 'bg-white text-dark border border-gray-100 rounded-tl-sm'}`}>
                        {msg.text}
                        {!msg.isMe && (
                          <div className="absolute -right-[4.5rem] top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleLike(msg.id)} 
                              title="Like to agree" 
                              className={`p-1.5 rounded-full transition-colors ${msg.hasLiked ? 'text-accent bg-orange-50' : 'text-gray-400 hover:text-accent hover:bg-orange-50'}`}
                            >
                              <ThumbsUp size={14} className={msg.hasLiked ? "fill-accent" : ""} />
                            </button>
                            <button 
                              onClick={() => handleReport(msg.id)} 
                              title="Report inappropriate message" 
                              className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Flag size={14} />
                            </button>
                          </div>
                        )}
                        {(msg.likes > 0) && (
                          <div className="absolute -bottom-3 right-2 bg-white border border-gray-100 shadow-sm rounded-full px-1.5 py-0.5 text-[10px] flex items-center gap-1 text-gray-600">
                            <ThumbsUp size={10} className="text-accent fill-accent" /> {msg.likes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 sm:p-5 border-t border-gray-100 bg-white shrink-0">
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
            <form onSubmit={handleSend} className="flex gap-2 items-end">
              <button type="button" onClick={() => fileInputRef.current?.click()} title="Share Photo" className="p-3 text-gray-400 hover:text-primary hover:bg-gray-50 rounded-full transition-colors shrink-0">
                <ImageIcon size={22} />
              </button>
              <button type="button" onClick={handleShareLocation} title="Share Location" className="p-3 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors shrink-0">
                <MapPin size={22} />
              </button>
              <button type="button" onClick={handleShareProfile} title="Share Yoddha Badge" className="p-3 text-accent hover:text-accent hover:bg-orange-50 rounded-full transition-colors shrink-0">
                <Award size={22} />
              </button>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl relative transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..." 
                  className="w-full bg-transparent py-3 px-4 text-sm focus:outline-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={!newMessage.trim()}
                className="p-3 bg-primary text-white hover:bg-[#15805e] disabled:opacity-50 disabled:hover:bg-primary rounded-full transition-colors shadow-md shrink-0 flex items-center justify-center"
              >
                <Send size={20} className="ml-1" />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
