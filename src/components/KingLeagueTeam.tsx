import React from 'react';
import PlayerCard from './PlayerCard';

const KingLeagueTeam = () => {
  // Simulated Kings League players data
  const players = [
    {
      name: "Carlos Ferreira",
      nickname: "Fenômeno",
      role: "Atacante",
      image: "https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "Gols", value: 18, max: 30 },
        { name: "Assistências", value: 6, max: 20 },
        { name: "Finalizações", value: 82, max: 100 },
        { name: "Dribles", value: 8, max: 10 }
      ]
    },
    {
      name: "Rodrigo Santos",
      nickname: "Maestro",
      role: "Meio-Campo",
      image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "Gols", value: 7, max: 30 },
        { name: "Assistências", value: 15, max: 20 },
        { name: "Passes", value: 95, max: 100 },
        { name: "Precisão", value: 9, max: 10 }
      ]
    },
    {
      name: "Pedro Alves",
      nickname: "Muralha",
      role: "Defensor",
      image: "https://images.unsplash.com/photo-1639747280804-dd2d6b3d88ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "Desarmes", value: 24, max: 30 },
        { name: "Interceptações", value: 19, max: 20 },
        { name: "Duelos Ganhos", value: 85, max: 100 },
        { name: "Posicionamento", value: 9.2, max: 10 }
      ]
    },
    {
      name: "Felipe Martins",
      nickname: "Pantera",
      role: "Atacante",
      image: "https://images.unsplash.com/photo-1610271340738-726e199f0258?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "Gols", value: 21, max: 30 },
        { name: "Assistências", value: 4, max: 20 },
        { name: "Finalizações", value: 88, max: 100 },
        { name: "Velocidade", value: 9.5, max: 10 }
      ]
    },
    {
      name: "Lucas Gonçalves",
      nickname: "Paredão",
      role: "Goleiro",
      image: "https://images.unsplash.com/photo-1597004897768-c223ef4270cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      stats: [
        { name: "Defesas", value: 26, max: 30 },
        { name: "Jogos sem sofrer gols", value: 12, max: 20 },
        { name: "Saídas de gol", value: 75, max: 100 },
        { name: "Reflexos", value: 9.4, max: 10 }
      ]
    }
  ];

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-8 text-center">
        <span className="text-furia-gold">KINGS LEAGUE</span>
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
              team="kings"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KingLeagueTeam;
