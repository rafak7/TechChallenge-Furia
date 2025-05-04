import React from 'react';

interface Stat {
  name: string;
  value: number;
  max: number;
}

interface PlayerCardProps {
  name: string;
  nickname: string;
  role: string;
  country?: string;
  countryCode?: string;
  image: string;
  stats: Stat[];
  team: 'cs' | 'valorant' | 'king' | 'kings';
}

const PlayerCard = ({ name, nickname, role, country, countryCode, image, stats, team }: PlayerCardProps) => {
  // Background colors based on team
  const getBgClass = () => {
    switch (team) {
      case 'cs':
        return 'from-gray-900 to-gray-800';
      case 'valorant':
        return 'from-gray-900 to-gray-800';
      case 'king':
      case 'kings':
        return 'from-gray-900 to-gray-800';
      default:
        return 'from-gray-900 to-gray-800';
    }
  };

  return (
    <div className={`player-card w-full max-w-xs mx-auto`}>
      <div className={`relative bg-gradient-to-b ${getBgClass()} p-6`}>
        {/* Player Image */}
        <div className="aspect-[3/4] overflow-hidden relative mb-4">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <img 
            src={image} 
            alt={nickname}
            className="w-full h-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 w-full p-4 z-20">
            <span className="text-furia-gold bg-black/50 px-2 py-1 text-xs uppercase font-bold">{role}</span>
          </div>
          
          {/* País e bandeira */}
          {countryCode && (
            <div className="absolute top-0 right-0 m-3 z-20">
              <div className="flex items-center bg-black/70 px-2 py-1 rounded-sm">
                <img 
                  src={`https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`} 
                  alt={country} 
                  className="mr-1 w-4 h-3"
                />
                <span className="text-xs text-white">{country}</span>
              </div>
            </div>
          )}
        </div>

        {/* Player Info */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-furia-white mb-1">{nickname}</h3>
          <p className="text-sm text-gray-400">
            {name}
            {country && !countryCode && <span className="ml-2 text-xs text-gray-500">({country})</span>}
          </p>
        </div>
        
        {/* Stats */}
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="flex justify-between text-xs mb-1">
                <span className="uppercase font-bold">{stat.name}</span>
                <span className="text-furia-gold">{stat.value}/{stat.max}</span>
              </div>
              <div className="stat-bar">
                <div 
                  className="stat-bar-fill" 
                  style={{ width: `${(stat.value / stat.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
