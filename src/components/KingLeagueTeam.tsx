import React from 'react';
import PlayerCard from './PlayerCard';

interface KingsPlayer {
  name: string;
  nickname: string;
  role: string;
  country: string;
  countryCode: string;
  image: string;
  stats: { name: string; value: number; max: number | null }[];
  isWildcard?: boolean;
  mvpJogo?: number;
}

const KingLeagueTeam = () => {
  // Dados reais da equipe Kings League da FURIA
  const players: KingsPlayer[] = [
    {
      name: "Carlos Eduardo",
      nickname: "Treinador",
      role: "Treinador",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-lipao.webp",
      stats: []
    },
    {
      name: "Guilherme Monagatti",
      nickname: "#9",
      role: "Atacante",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-guilherme.webp",
      stats: [
        { name: "Jogos", value: 7, max: null },
        { name: "Gols", value: 0, max: null },
        { name: "Assist.", value: 0, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    },
    {
      name: "Caio Gatroca",
      nickname: "#3",
      role: "Meia",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-caio.webp",
      stats: [
        { name: "Jogos", value: 2, max: null },
        { name: "Gols", value: 0, max: null },
        { name: "Assist.", value: 0, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    },
    {
      name: "Murillo Donato",
      nickname: "#8",
      role: "Atacante",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-murillo.webp",
      stats: [
        { name: "Jogos", value: 7, max: null },
        { name: "Gols", value: 4, max: null },
        { name: "Assist.", value: 1, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    },
    {
      name: "Ryan Lima",
      nickname: "#77",
      role: "Atacante",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-ryan.webp",
      stats: [
        { name: "Jogos", value: 8, max: null },
        { name: "Gols", value: 1, max: null },
        { name: "Assist.", value: 1, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    },
    {
      name: "Matheus Ayosa",
      nickname: "#1",
      role: "Goleiro",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-matheus.webp",
      stats: [
        { name: "Jogos", value: 3, max: null },
        { name: "Gols sofridos", value: 6, max: null },
        { name: "Proporção", value: 2.00, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    },
    {
      name: "João Pelegrini",
      nickname: "#22",
      role: "Defesa",
      country: "Brazil",
      countryCode: "BR",
        image: "/images/players-kings/kings-joao.webp",
      stats: [
        { name: "Jogos", value: 8, max: null },
        { name: "Gols", value: 1, max: null },
        { name: "Assist.", value: 0, max: null },
        { name: "Amarelos", value: 2, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    },
    {
      name: "Gabriel Pastuch",
      nickname: "#7",
      role: "Atacante",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-gabriel.webp",
      stats: [
        { name: "Jogos", value: 1, max: null },
        { name: "Gols", value: 0, max: null },
        { name: "Assist.", value: 0, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    },
    {
      name: "Victor Hugo",
      nickname: "#33",
      role: "Goleiro",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-victor.webp",
      stats: [
        { name: "Jogos", value: 6, max: null },
        { name: "Gols sofridos", value: 14, max: null },
        { name: "Proporção", value: 2.33, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    },
    {
      name: "Matheus Dedo",
      nickname: "#14",
      role: "Meia",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-dedo.webp",
      stats: [
        { name: "Jogos", value: 8, max: null },
        { name: "Gols", value: 1, max: null },
        { name: "Assist.", value: 5, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ]
    }
  ];

  // Jogadores Wildcard
  const wildcardPlayers: KingsPlayer[] = [
    {
      name: "Jeffinho",
      nickname: "#12",
      role: "Meia",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-jeffinho.webp",
      stats: [
        { name: "Jogos", value: 8, max: null },
        { name: "Gols", value: 5, max: null },
        { name: "Assist.", value: 3, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ],
      isWildcard: true
    },
    {
      name: "Lipão",
      nickname: "#10",
      role: "Atacante",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-lipao.webp",
      stats: [
        { name: "Jogos", value: 8, max: null },
        { name: "Gols", value: 7, max: null },
        { name: "Assist.", value: 5, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ],
      isWildcard: true
    },
    {
      name: "Leleti",
      nickname: "#11",
      role: "Atacante",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-leleti.webp",
      stats: [
        { name: "Jogos", value: 8, max: null },
        { name: "Gols", value: 14, max: null },
        { name: "Assist.", value: 6, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ],
      isWildcard: true,
      // mvpJogo: 4
    },
    {
      name: "Andrey Batata",
      nickname: "#5",
      role: "Meia",
      country: "Brazil",
      countryCode: "BR",
      image: "/images/players-kings/kings-andrey.webp",
      stats: [
        { name: "Jogos", value: 0, max: null },
        { name: "Gols", value: 0, max: null },
        { name: "Assist.", value: 0, max: null },
        { name: "Amarelos", value: 0, max: null },
        { name: "Vermelhos", value: 0, max: null }
      ],
      isWildcard: true
    }
  ];

  // Adicionar médias de rating dos jogadores
  const playerRatings: Record<string, number | null> = {
    "Carlos Eduardo": null, // Treinador não tem rating
    "Guilherme Monagatti": 81,
    "Caio Gatroca": 78,
    "Murillo Donato": 80,
    "Ryan Lima": 75,
    "Matheus Ayosa": 78,
    "João Pelegrini": 73,
    "Gabriel Pastuch": 78,
    "Victor Hugo": 79,
    "Matheus Dedo": 73,
    // Wildcards
    "Jeffinho": 79,
    "Lipão": null,
    "Leleti": null,
    "Andrey Batata": 78
  };

  // Combinar jogadores regulares e wildcards
  const allPlayers = [...players, ...wildcardPlayers];

  return (
    <div className="animate-fade-in">
      <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-8 text-center">
        <span className="text-furia-gold">KINGS LEAGUE</span>
        <span className="text-furia-white ml-2">TEAM</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allPlayers.map((player, index) => (
          <div 
            key={index} 
            className="transform transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10" 
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
              team="kings"
              rating={playerRatings[player.name]}
              isWildcard={player.isWildcard}
              mvpJogo={player.mvpJogo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KingLeagueTeam;
