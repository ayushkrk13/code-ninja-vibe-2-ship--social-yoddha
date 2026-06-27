import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpCircle, MessageCircle, MapPin } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';

export function IssueDetailModal({ isOpen, onClose, issue }) {
  // Use a local state for upvotes to allow interaction
  const [upvotes, setUpvotes] = useState(issue?.upvotes || 0);
  const [hasVoted, setHasVoted] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(issue?.commentsList || []);

  // Update state when issue changes (if opened multiple times)
  React.useEffect(() => {
    if (issue) {
      setUpvotes(issue.upvotes);
      setComments(issue.commentsList || []);
      setHasVoted(false);
      setCommentText('');
    }
  }, [issue]);

  if (!isOpen || !issue) return null;

  const handleVote = () => {
    if (!hasVoted) {
      setUpvotes(prev => prev + 1);
      setHasVoted(true);
    } else {
      setUpvotes(prev => prev - 1);
      setHasVoted(false);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, { author: 'Arjun (You)', text: commentText, time: 'Just now' }]);
    setCommentText('');
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Image */}
          <div className="relative h-64 w-full bg-gray-100 shrink-0">
            <img src={issue.image} alt="Issue" className="w-full h-full object-cover" />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-md transition-colors shadow-sm"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-4 flex gap-2">
              <Badge variant={issue.status === 'Fixed' ? 'success' : 'warning'} className="shadow-lg backdrop-blur-md border border-white/20">
                {issue.status}
              </Badge>
              <Badge variant="outline" className="bg-white/90 shadow-lg text-dark border-none font-bold">
                {issue.category}
              </Badge>
            </div>
          </div>

          {/* Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-gray-50">
            <h2 className="text-2xl font-heading font-bold text-dark mb-2 leading-tight">{issue.title}</h2>
            <div className="flex flex-wrap items-center gap-1 text-gray-500 text-sm mb-6 font-medium">
              <MapPin size={16} className="text-primary shrink-0" />
              <span>{issue.location}</span>
              <span className="mx-1">•</span>
              <span>Reported by <span className="text-dark font-bold">{issue.reporter}</span></span>
            </div>

            {/* Work Progress Timeline */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                Work Progress Report
              </h3>
              <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-white shadow-sm"></div>
                  <p className="text-sm font-bold text-dark">Issue Reported & Verified</p>
                  <p className="text-xs text-gray-500 mt-0.5">2 days ago by {issue.reporter}</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent ring-4 ring-white shadow-sm"></div>
                  <p className="text-sm font-bold text-dark">Assigned to Local Ward / NGO</p>
                  <p className="text-xs text-gray-500 mt-0.5">1 day ago</p>
                </div>
                <div className={`relative pl-6 ${issue.status === 'Open' ? 'opacity-40' : ''}`}>
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ring-4 ring-white shadow-sm ${issue.status !== 'Open' ? 'bg-primary' : 'bg-gray-300'}`}></div>
                  <p className="text-sm font-bold text-dark">Work In Progress</p>
                  {issue.status !== 'Open' && <p className="text-xs text-gray-500 mt-0.5">Currently active</p>}
                </div>
                <div className={`relative pl-6 ${issue.status === 'Fixed' ? '' : 'opacity-40'}`}>
                  <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ring-4 ring-white shadow-sm ${issue.status === 'Fixed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <p className="text-sm font-bold text-dark">Resolution Verified</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={handleVote}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all shadow-sm ${hasVoted ? 'bg-orange-100 text-accent border border-orange-200 scale-105' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:scale-105'}`}
              >
                <ArrowUpCircle size={20} className={hasVoted ? 'fill-accent/20' : ''} />
                {upvotes} Upvotes
              </button>
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold bg-white border border-gray-200 text-gray-600 shadow-sm cursor-default">
                <MessageCircle size={20} />
                {comments.length} Comments
              </div>
            </div>

            {/* Comments Section */}
            <div>
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Community Discussion</h3>
              
              <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share an update or comment..." 
                  className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-shadow"
                />
                <Button type="submit" variant="primary" className="rounded-xl px-6 font-bold">Post</Button>
              </form>

              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3 transition-all hover:border-gray-200">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-white shadow-sm ${c.author.includes('Arjun') ? 'bg-primary text-white' : 'bg-gray-100 text-dark'}`}>
                      {c.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-dark text-sm">{c.author}</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{c.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && <p className="text-sm text-gray-500 text-center italic py-6 bg-white rounded-xl border border-dashed border-gray-200">No comments yet. Be the first to start the discussion!</p>}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
