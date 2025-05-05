import React from 'react';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TeamSelectorProps {
  activeTeam: string | null;
}

const TeamSelector = ({ activeTeam }: TeamSelectorProps) => {
  const navigate = useNavigate();

  const handleTeamSelect = (team: string) => {
    if (team !== activeTeam) {
      navigate(`/teams/${team}`);
    }
  };

  const teams = [
    { id: 'cs', name: 'CS Team' },
    { id: 'valorant', name: 'Valorant Team' },
    { id: 'kings-league', name: 'Kings League Team' }
  ];

  return (
    <div>
      <h3 className="text-xl text-center text-furia-gold mb-4 font-rajdhani">Navegue entre nossos times profissionais</h3>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {teams.map((team) => (
          <Button 
            key={team.id}
            onClick={() => handleTeamSelect(team.id)}
            className={`px-6 py-3 text-lg font-rajdhani flex items-center justify-between transition-all duration-300 ${
              activeTeam === team.id 
                ? 'bg-furia-gold text-black hover:bg-furia-gold/90 shadow-lg shadow-furia-gold/30 transform scale-105' 
                : 'bg-furia-darkgray border border-furia-gold/30 hover:bg-furia-darkgray/70 hover:border-furia-gold'
            }`}
          >
            <span>{team.name}</span>
            <ChevronRight className={`ml-2 transition-transform duration-300 ${activeTeam === team.id ? 'rotate-90' : ''}`} />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TeamSelector;
