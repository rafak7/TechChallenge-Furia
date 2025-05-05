import React, { useState } from 'react';

interface Stat {
  name: string;
  value: number;
  max: number | null;
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
  rating?: number | null;
  isWildcard?: boolean;
  mvpJogo?: number;
}

const PlayerCard = ({ name, nickname, role, country, countryCode, image, stats, team, rating, isWildcard, mvpJogo }: PlayerCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Background colors based on team
  const getBgClass = () => {
    switch (team) {
      case 'cs':
        return 'from-gray-900 to-gray-800';
      case 'valorant':
        return 'from-gray-900 to-gray-800';
      case 'king':
      case 'kings':
        return isWildcard ? 'from-black to-black' : 'from-black to-gray-900';
      default:
        return 'from-gray-900 to-gray-800';
    }
  };

  // Define cor baseada no rating
  const getRatingColor = () => {
    if (!rating) return 'bg-gray-700';
    if (rating >= 85) return 'bg-green-600';
    if (rating >= 80) return 'bg-orange-400';
    if (rating >= 75) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Verificar se é um card de Kings League
  const isKingsLeague = team === 'kings' || team === 'king';

  // Se for Kings League, usamos o layout horizontal
  if (isKingsLeague) {
    return (
      <div className="player-card w-full">
        <div className={`relative bg-black rounded-lg overflow-hidden ${isWildcard ? 'border-amber-500 border-2' : 'border-furia-gold/30 border'}`}>
          {/* Ícone Wildcard */}
          {isWildcard && (
            <div className="absolute top-2 right-2 z-30">
              <div 
                className="bg-amber-500 p-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center cursor-pointer relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {showTooltip && (
                  <div className="absolute top-full right-0 mt-2 bg-amber-500 text-black text-xs font-bold px-3 py-2 rounded shadow-lg whitespace-nowrap z-50">
                    Jogador Wildcard
                    <div className="absolute -top-1 right-3 w-2 h-2 bg-amber-500 transform rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Layout horizontal para Kings League */}
          <div className="flex">
            {/* Foto e informações do jogador */}
            <div className="w-1/3 relative">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={image} 
                  alt={nickname}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-2">
                <div className="text-white font-bold">{nickname}</div>
                <div className="text-gray-300 text-xs">{role}</div>
              </div>
            </div>
            
            {/* Estatísticas */}
            <div className="w-2/3 p-4">
              {/* Botão de role no canto */}
              <div className="absolute top-2 right-12 bg-amber-500 px-2 py-1 rounded-sm">
                <span className="text-xs font-bold text-black">{role}</span>
              </div>
              
              {/* Estatísticas em grid */}
              <div className="grid grid-cols-5 gap-2 text-center mt-8">
                {stats.slice(0, 5).map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="text-xs text-gray-400 mb-1">{stat.name}</div>
                    <div className="text-white font-bold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Decoração para Wildcards */}
          {isWildcard && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  // Layout original para outros times
  return (
    <div className={`player-card w-full max-w-xs mx-auto`}>
      <div className={`relative bg-gradient-to-b ${getBgClass()} p-6 ${isWildcard ? 'border-amber-500/30 border' : ''}`}>
        {/* Ícone Wildcard */}
        {isWildcard && (
          <div className="absolute top-2 right-2 z-30">
            <div 
              className="bg-amber-500 p-1.5 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center cursor-pointer relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {showTooltip && (
                <div className="absolute top-full right-0 mt-2 bg-amber-500 text-black text-xs font-bold px-3 py-2 rounded shadow-lg whitespace-nowrap z-50">
                  Jogador Wildcard
                  <div className="absolute -top-1 right-3 w-2 h-2 bg-amber-500 transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Efeitos decorativos para Kings League */}
        {isKingsLeague && !isWildcard && (
          <>
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-furia-gold/50"></div>
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-furia-gold/50"></div>
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-furia-gold/50"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-furia-gold/50"></div>
          </>
        )}
        
        {/* Efeitos decorativos para Wildcards */}
        {isWildcard && (
          <>
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-amber-500/20 to-transparent opacity-50"></div>
            <div className="absolute bottom-20 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-xl"></div>
          </>
        )}
        
        {/* Player Image */}
        <div className={`aspect-[3/4] overflow-hidden relative mb-4 ${isKingsLeague ? 'aspect-square' : ''}`}>
          {!isWildcard && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          )}
          <img 
            src={image} 
            alt={nickname}
            className={`w-full h-full object-cover ${isKingsLeague ? 'object-center' : 'object-top'} transform hover:scale-105 transition-transform duration-700`}
          />
          <div className="absolute bottom-0 left-0 w-full p-4 z-20">
            <span className={`${isKingsLeague ? 'text-white' : 'text-furia-gold'} bg-black/50 px-2 py-1 text-xs uppercase font-bold`}>{role}</span>
          </div>
          
          {/* País e bandeira - posicionada no topo à esquerda se tiver rating */}
          {!isKingsLeague && countryCode && (
            <div className={`absolute top-0 ${rating !== undefined && rating !== null ? 'left-0' : 'right-0'} m-3 z-20`}>
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

          {/* Rating (para Kings League) */}
          {rating !== undefined && rating !== null && (
            <div className="absolute top-0 right-0 m-3 z-20">
              <div className={`flex items-center justify-center ${getRatingColor()} w-10 h-10 rounded-sm font-rajdhani`}>
                <span className="text-base font-bold text-white">{rating}</span>
              </div>
            </div>
          )}
          
          {/* MVP Jogo (para Kings League wildcard) */}
          {mvpJogo && (
            <div className="absolute bottom-12 left-4 z-20">
              <div className="flex items-center bg-red-600 px-2 py-1 rounded-sm">
                <span className="text-xs font-bold text-white mr-1">MVP Jogo</span>
                <span className="text-xs font-bold text-white">{mvpJogo}</span>
              </div>
            </div>
          )}
        </div>

        {/* Player Info */}
        <div className={`mb-6 ${isKingsLeague ? 'text-center' : ''}`}>
          <h3 className={`text-2xl font-bold text-furia-white mb-1 ${isKingsLeague ? 'font-rajdhani' : ''}`}>{nickname}</h3>
          <p className="text-sm text-gray-400">
            {name}
            {country && !countryCode && <span className="ml-2 text-xs text-gray-500">({country})</span>}
          </p>
        </div>
        
        {/* Stats */}
        {stats.length > 0 && (
          <div className={`space-y-4 ${isKingsLeague ? 'grid grid-cols-2 gap-x-4 gap-y-2 space-y-0' : ''}`}>
            {stats.map((stat, index) => (
              <div key={index} className={isKingsLeague ? 'flex justify-between items-center' : ''}>
                {isKingsLeague ? (
                  <>
                    <span className="text-xs uppercase font-bold">{stat.name}</span>
                    <span className="text-furia-gold text-xs font-bold">{stat.value}</span>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="uppercase font-bold">{stat.name}</span>
                      <span className="text-furia-gold">{stat.value}{stat.max ? `/${stat.max}` : ''}</span>
                    </div>
                    <div className="stat-bar">
                      <div 
                        className="stat-bar-fill" 
                        style={{ width: `${stat.max ? (stat.value / stat.max) * 100 : 100}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
