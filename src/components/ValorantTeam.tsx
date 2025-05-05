import React from 'react';
import PlayerCard from './PlayerCard';

const ValorantTeam = () => {
  // Dados atualizados do time de Valorant da FURIA
  const players = [
    {
      name: "Khalil Schmidt Faour Auad",
      nickname: "khalil",
      role: "Duelist",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-valorant/valorant-khalil.jpg",
      stats: [
        { name: "K/D Ratio", value: 1.22, max: 2 },
        { name: "Headshot %", value: 58, max: 100 },
        { name: "First Bloods", value: 76, max: 100 },
        { name: "Ace Rate", value: 8, max: 10 }
      ]
    },
    {
      name: "Ilan Eloy",
      nickname: "havoc",
      role: "Controller",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-valorant/valorant-havoc.jpg",
      stats: [
        { name: "K/D Ratio", value: 1.15, max: 2 },
        { name: "Utility Usage", value: 92, max: 100 },
        { name: "Zone Control", value: 88, max: 100 },
        { name: "Clutch Rate", value: 7.5, max: 10 }
      ]
    },
    {
      name: "Olavo Marcelo",
      nickname: "heat",
      role: "Initiator",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-valorant/valorant-heat.jpg",
      stats: [
        { name: "K/D Ratio", value: 1.28, max: 2 },
        { name: "Recon Efficiency", value: 85, max: 100 },
        { name: "Kill Assists", value: 87, max: 100 },
        { name: "Clutch Rate", value: 7.8, max: 10 }
      ]
    },
    {
      name: "Rafael Lima",
      nickname: "raafa",
      role: "Sentinel",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-valorant/valorant-raafa.jpg",
      stats: [
        { name: "K/D Ratio", value: 1.12, max: 2 },
        { name: "Site Defense", value: 90, max: 100 },
        { name: "Trap Kills", value: 78, max: 100 },
        { name: "Clutch Rate", value: 7.2, max: 10 }
      ]
    },
    {
      name: "Luis Henrique",
      nickname: "pryze",
      role: "IGL / Flex",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-valorant/valorant-pryze.jpg",
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
              country={player.country}
              countryCode={player.countryCode}
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
