import React from 'react';
import PlayerCard from './PlayerCard';

const CSTeam = () => {
  // Dados atualizados do time da FURIA
  const players = [
    {
      name: "Gabriel Toledo",
      nickname: "FalleN",
      role: "IGL / AWPer",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-cs/furia-fallen.webp",
      stats: [
        { name: "K/D Ratio", value: 1.15, max: 2 },
        { name: "Headshot %", value: 48, max: 100 },
        { name: "AWP Kills", value: 85, max: 100 },
        { name: "Clutch Rate", value: 6, max: 10 }
      ]
    },
    {
      name: "Yuri Santos",
      nickname: "yuurih",
      role: "Rifler",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-cs/furia-yurih.webp",
      stats: [
        { name: "K/D Ratio", value: 1.22, max: 2 },
        { name: "Headshot %", value: 62, max: 100 },
        { name: "Opening Kills", value: 75, max: 100 },
        { name: "Clutch Rate", value: 7.5, max: 10 }
      ]
    },
    {
      name: "Mareks Gaļinskis",
      nickname: "YEKINDAR",
      role: "Entry Fragger",
      country: "Latvia",
      countryCode: "LV",
      image: "/images/players-cs/furia-yekindar.webp",
      stats: [
        { name: "K/D Ratio", value: 1.18, max: 2 },
        { name: "Headshot %", value: 52, max: 100 },
        { name: "Entry Kills", value: 92, max: 100 },
        { name: "Clutch Rate", value: 6.8, max: 10 }
      ]
    },
    {
      name: "Kaike Cerato",
      nickname: "KSCERATO",
      role: "Rifler",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-cs/furia-ks.webp",
      stats: [
        { name: "K/D Ratio", value: 1.25, max: 2 },
        { name: "Headshot %", value: 65, max: 100 },
        { name: "Impact Rating", value: 82, max: 100 },
        { name: "Clutch Rate", value: 7, max: 10 }
      ]
    },
    {
      name: "Danil Golubenko",
      nickname: "molodoy",
      role: "Support",
      country: "Kazakhstan",
      countryCode: "KZ",
      image: "/images/players-cs/furia-molodoy.webp",
      stats: [
        { name: "K/D Ratio", value: 1.10, max: 2 },
        { name: "Headshot %", value: 48, max: 100 },
        { name: "Utility Damage", value: 78, max: 100 },
        { name: "Clutch Rate", value: 6.2, max: 10 }
      ]
    }
  ];

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-6 md:mb-8 text-center">
        <span className="text-furia-gold">CS</span>
        <span className="text-furia-white ml-2">TEAM</span>
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
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
              country={player.country}
              countryCode={player.countryCode}
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
