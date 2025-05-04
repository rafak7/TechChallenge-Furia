import React from 'react';
import PlayerCard from './PlayerCard';

const ValorantTeam = () => {
  // Simulated Valorant players data
  const players = [
    {
      name: "Agustin Lozano",
      nickname: "Nozwerr",
      role: "Duelist",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.22, max: 2 },
        { name: "Headshot %", value: 58, max: 100 },
        { name: "First Bloods", value: 76, max: 100 },
        { name: "Ace Rate", value: 8, max: 10 }
      ]
    },
    {
      name: "Gabriel Amaral",
      nickname: "qck",
      role: "Controller",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.15, max: 2 },
        { name: "Utility Usage", value: 92, max: 100 },
        { name: "Zone Control", value: 88, max: 100 },
        { name: "Clutch Rate", value: 7.5, max: 10 }
      ]
    },
    {
      name: "Marina Sampaio",
      nickname: "mari",
      role: "Initiator",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.10, max: 2 },
        { name: "Recon Efficiency", value: 85, max: 100 },
        { name: "Kill Assists", value: 90, max: 100 },
        { name: "Clutch Rate", value: 6, max: 10 }
      ]
    },
    {
      name: "Matheus Almeida",
      nickname: "Mazin",
      role: "Sentinel",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.05, max: 2 },
        { name: "Site Defense", value: 95, max: 100 },
        { name: "Trap Kills", value: 78, max: 100 },
        { name: "Clutch Rate", value: 7.8, max: 10 }
      ]
    },
    {
      name: "Daniel Flatery",
      nickname: "DPH",
      role: "IGL / Flex",
      image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "K/D Ratio", value: 1.18, max: 2 },
        { name: "Team Support", value: 96, max: 100 },
        { name: "Strat Adaptations", value: 92, max: 100 },
        { name: "Clutch Rate", value: 8.2, max: 10 }
      ]
    }
  ];

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-8 text-center">
        <span className="text-furia-gold">VALORANT</span>
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
              team="valorant"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ValorantTeam;
