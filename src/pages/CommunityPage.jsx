import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Users, MessageCircle, Plus } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CreateTeamModal } from '../components/CreateTeamModal';
import { TeamChatModal } from '../components/TeamChatModal';

export default function CommunityPage() {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Green Andheri Drive', members: 124, focus: 'Environment', active: true, isLeader: true },
    { id: 2, name: 'Stray Helpers West', members: 89, focus: 'Animals', active: false },
    { id: 3, name: 'Clean Streets Brigade', members: 210, focus: 'Sanitation', active: false },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeChatTeam, setActiveChatTeam] = useState(null);

  const handleJoin = (teamId) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return { ...team, active: true, members: team.members + 1 };
      }
      return team;
    }));
  };

  const handleCreateTeam = (newTeam) => {
    const teamWithId = { ...newTeam, id: Date.now(), isLeader: true };
    setTeams([teamWithId, ...teams]);
  };

  const handleLeaveTeam = () => {
    if (!activeChatTeam) return;
    setTeams(teams.map(team => {
      if (team.id === activeChatTeam.id) {
        return { ...team, active: false, members: team.members - 1 };
      }
      return team;
    }));
    setActiveChatTeam(null);
  };

  const handleEditTeam = (updatedTeam) => {
    setTeams(teams.map(team => team.id === updatedTeam.id ? updatedTeam : team));
    setActiveChatTeam(updatedTeam);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <CreateTeamModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreateTeam} 
      />
      
      <TeamChatModal 
        isOpen={!!activeChatTeam} 
        onClose={() => setActiveChatTeam(null)} 
        team={activeChatTeam} 
        onLeave={handleLeaveTeam}
        onEdit={handleEditTeam}
      />

      <div className="bg-white px-4 py-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <Link to="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-gray-100 text-dark transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-heading font-bold text-dark">Community Teams</h1>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-dark">Active in your area</h2>
          <Button onClick={() => setIsCreateModalOpen(true)} variant="outline" size="sm" className="font-bold flex items-center gap-1 shadow-sm">
            <Plus size={16} /> Create Team
          </Button>
        </div>

        <div className="space-y-4">
          {teams.map((team) => (
            <Card key={team.id} className="hover:border-primary/50 transition-all hover:shadow-md border-transparent hover:border-gray-200">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${team.active ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-gray-100 text-gray-400'}`}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark leading-snug">{team.name}</h3>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-0.5">{team.members} Yoddhas • {team.focus}</p>
                  </div>
                </div>
                {team.active ? (
                  <Button onClick={() => setActiveChatTeam(team)} size="sm" variant="outline" className="text-gray-600 gap-2 font-bold shadow-sm border-gray-200 hover:bg-gray-50 hover:text-primary">
                    <MessageCircle size={16}/> Chat
                  </Button>
                ) : (
                  <Button onClick={() => handleJoin(team.id)} size="sm" variant="primary" className="font-bold shadow-md px-6">
                    Join
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
