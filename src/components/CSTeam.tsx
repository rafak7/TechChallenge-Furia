import React from 'react';
import PlayerCard from './PlayerCard';

const CSTeam = () => {
  // Simulated CS players data
  const players = [
    {
      name: "Gabriel Toledo",
      nickname: "FalleN",
      role: "IGL / AWPer",
      image: "https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.15, max: 2 },
        { name: "Headshot %", value: 48, max: 100 },
        { name: "AWP Kills", value: 85, max: 100 },
        { name: "Clutch Rate", value: 6, max: 10 }
      ]
    },
    {
      name: "Kaike Cerato",
      nickname: "KSCERATO",
      role: "Rifler",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.25, max: 2 },
        { name: "Headshot %", value: 65, max: 100 },
        { name: "Opening Kills", value: 70, max: 100 },
        { name: "Clutch Rate", value: 7, max: 10 }
      ]
    },
    {
      name: "Andrei Piovezan",
      nickname: "arT",
      role: "Entry Fragger",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.05, max: 2 },
        { name: "Headshot %", value: 42, max: 100 },
        { name: "Entry Kills", value: 90, max: 100 },
        { name: "Clutch Rate", value: 5, max: 10 }
      ]
    },
    {
      name: "André Abreu",
      nickname: "drop",
      role: "Support",
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.10, max: 2 },
        { name: "Headshot %", value: 55, max: 100 },
        { name: "Utility Damage", value: 80, max: 100 },
        { name: "Clutch Rate", value: 6.5, max: 10 }
      ]
    },
    {
      name: "Rafael Costa",
      nickname: "saffee",
      role: "AWPer",
      image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.20, max: 2 },
        { name: "Headshot %", value: 38, max: 100 },
        { name: "AWP Kills", value: 92, max: 100 },
        { name: "Clutch Rate", value: 7, max: 10 }
      ]
    }
  ];

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-8 text-center">
        <span className="text-furia-gold">CS</span>
        <span className="text-furia-white ml-2">TEAM</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {players.map((player, index) => (
          <div 
            key={index} 
            className="transform transition-all duration-500 hover:z-10" 
            style={{animationDelay: `${index * 100}ms`}}
          >
            <PlayerCard 
              name={player.name}
              nickname={player.nickname}
              role={player.role}
              image={player.image}
              stats={player.stats}
              team="cs"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CSTeam;
