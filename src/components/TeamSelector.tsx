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
    navigate(`/teams/${team}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Button 
        onClick={() => handleTeamSelect('cs')}
        className={`px-6 py-3 text-lg font-rajdhani flex items-center justify-between ${
          activeTeam === 'cs' 
            ? 'bg-furia-gold text-black hover:bg-furia-gold/90' 
            : 'bg-furia-darkgray border border-furia-gold/30 hover:bg-furia-darkgray/70'
        }`}
      >
        <span>CS Team</span>
        <ChevronRight className={`ml-2 transition-transform ${activeTeam === 'cs' ? 'rotate-90' : ''}`} />
      </Button>
      
      <Button 
        onClick={() => handleTeamSelect('valorant')}
        className={`px-6 py-3 text-lg font-rajdhani flex items-center justify-between ${
          activeTeam === 'valorant' 
            ? 'bg-furia-gold text-black hover:bg-furia-gold/90' 
            : 'bg-furia-darkgray border border-furia-gold/30 hover:bg-furia-darkgray/70'
        }`}
      >
        <span>Valorant Team</span>
        <ChevronRight className={`ml-2 transition-transform ${activeTeam === 'valorant' ? 'rotate-90' : ''}`} />
      </Button>
      
      <Button 
        onClick={() => handleTeamSelect('kings-league')}
        className={`px-6 py-3 text-lg font-rajdhani flex items-center justify-between ${
          activeTeam === 'kings-league' 
            ? 'bg-furia-gold text-black hover:bg-furia-gold/90' 
            : 'bg-furia-darkgray border border-furia-gold/30 hover:bg-furia-darkgray/70'
        }`}
      >
        <span>Kings League Team</span>
        <ChevronRight className={`ml-2 transition-transform ${activeTeam === 'kings-league' ? 'rotate-90' : ''}`} />
      </Button>
    </div>
  );
};

export default TeamSelector;
