import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamSelector from '@/components/TeamSelector';
import CSTeam from '@/components/CSTeam';
import ValorantTeam from '@/components/ValorantTeam';
import KingLeagueTeam from '@/components/KingLeagueTeam';

// Banner images para cada time
const teamBanners = {
  cs: '/images/cs2.webp',
  valorant: '/images/valorant.jpg',
  'kings-league': '/images/kings.webp',
};

// Dados dos times
const teamData = {
  cs: {
    title: "Counter-Strike",
    subtitle: "Campeões Mundiais",
    description: "Nossa equipe de Counter-Strike é reconhecida mundialmente por sua agressividade característica e estratégias inovadoras. Campeã de diversos torneios internacionais, a linha de CS da FURIA continua levando o Brasil ao topo da cena competitiva.",
    achievements: [
      "BLAST Premier: Fall 2023",
      "ESL Pro League Season 16",
      "IEM Rio Major 2022",
      "ESEA Season 36: Premier Division"
    ]
  },
  valorant: {
    title: "Valorant",
    subtitle: "Ascensão Meteórica",
    description: "A equipe de Valorant da FURIA tem se destacado rapidamente na cena competitiva do shooter tático da Riot Games. Com talentos emergentes e veteranos experientes, o time busca conquistar seu espaço entre os melhores do mundo.",
    achievements: [
      "VCT 2023: Americas League",
      "Valorant Champions Tour 2022: Brasil",
      "Red Bull Campus Clutch 2022",
      "VCT 2021: Brazil Stage 3"
    ]
  },
  'kings-league': {
    title: "Kings League",
    subtitle: "Nova Dinastia",
    description: "Nossa nova divisão para a Kings League representa a expansão da FURIA para novos horizontes. Com um elenco de jogadores talentosos, estamos prontos para dominar esta inovadora competição e conquistar mais um título para nossa história.",
    achievements: [
      "Kings League: Season 1 Playoffs",
      "Queens League: Inaugural Cup",
      "Barcelona Cup 2023",
      "America vs Europe Championship"
    ]
  }
};

const Teams = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [activeTeam, setActiveTeam] = useState(teamId || null);
  const [loading, setLoading] = useState(false);
  
  // Atualizar o estado quando o teamId mudar
  useEffect(() => {
    if (teamId) {
      setActiveTeam(teamId);
      // Simular carregamento de dados
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setActiveTeam(null);
      setLoading(false);
    }
  }, [teamId]);

  const renderTeamContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-furia-gold"></div>
        </div>
      );
    }
    
    switch (teamId) {
      case 'cs':
        return <div className="animate-fade-in"><CSTeam /></div>;
      case 'valorant':
        return <div className="animate-fade-in"><ValorantTeam /></div>;
      case 'kings-league':
        return <div className="animate-fade-in"><KingLeagueTeam /></div>;
      default:
        return null;
    }
  };

  const currentTeam = teamId ? teamData[teamId] : null;

  // Renderizar página inicial quando nenhum time for selecionado
  const renderTeamsOverview = () => {
    return (
      <div className="w-full py-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-rajdhani font-bold text-furia-gold mb-6">
            Conheça Nossas Equipes
          </h2>
          <p className="text-xl text-furia-white/80 max-w-3xl mx-auto">
            A FURIA é uma organização multi-gaming com times de ponta em diversos esports. 
            Selecione uma de nossas equipes acima para conhecer mais sobre nossos jogadores e suas conquistas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          {/* Card de CS */}
          <div 
            className="team-card relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() => navigate('/teams/cs')}
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div 
              className="aspect-[16/9] bg-cover bg-center h-[280px]" 
              style={{ backgroundImage: `url(${teamBanners.cs})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-3xl font-bold text-furia-gold mb-3">Counter-Strike</h3>
                <p className="text-furia-white/90 text-lg mb-6">
                  Nossa equipe principal com cinco títulos internacionais
                </p>
                <button className="text-sm uppercase tracking-wider font-bold bg-transparent text-furia-gold px-5 py-2.5 border border-furia-gold hover:bg-furia-gold hover:text-black transition-all duration-200 flex items-center group">
                  Ver Time 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Card de Valorant */}
          <div 
            className="team-card relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() => navigate('/teams/valorant')}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div 
              className="aspect-[16/9] bg-cover bg-center h-[280px]" 
              style={{ backgroundImage: `url(${teamBanners.valorant})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-3xl font-bold text-furia-gold mb-3">Valorant</h3>
                <p className="text-furia-white/90 text-lg mb-6">
                  Nossos ágeis competidores no shooter tático da Riot Games
                </p>
                <button className="text-sm uppercase tracking-wider font-bold bg-transparent text-furia-gold px-5 py-2.5 border border-furia-gold hover:bg-furia-gold hover:text-black transition-all duration-200 flex items-center group">
                  Ver Time 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Card de Kings League */}
          <div 
            className="team-card relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() => navigate('/teams/kings-league')}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div 
              className="aspect-[16/9] bg-cover bg-center h-[280px]" 
              style={{ backgroundImage: `url(${teamBanners['kings-league']})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 w-full p-8">
                <h3 className="text-3xl font-bold text-furia-gold mb-3">Kings League</h3>
                <p className="text-furia-white/90 text-lg mb-6">
                  Nossa nova equipe na revolucionária competição da Europa
                </p>
                <button className="text-sm uppercase tracking-wider font-bold bg-transparent text-furia-gold px-5 py-2.5 border border-furia-gold hover:bg-furia-gold hover:text-black transition-all duration-200 flex items-center group">
                  Ver Time 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-furia-black">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        {teamId ? (
          <div 
            className="relative h-[45vh] md:h-[55vh] bg-cover bg-center" 
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, ${teamId === 'cs' ? '0.4' : teamId === 'valorant' ? '0.45' : '0.5'}), rgba(0, 0, 0, 0.7)), url(${teamBanners[teamId] || '/images/banner_furia.jpg'})`,
              backgroundPosition: teamId === 'cs' ? 'center 15%' : teamId === 'valorant' ? 'center 30%' : teamId === 'kings-league' ? 'center 25%' : 'center center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-furia-black to-transparent opacity-90"></div>
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16">
              <div className="relative z-10">
                <h1 
                  className="text-4xl md:text-6xl font-rajdhani font-bold text-furia-gold mb-2"
                  data-aos="fade-up" 
                  data-aos-delay="100"
                >
                  {currentTeam?.title || 'Times FURIA'}
                </h1>
                <p 
                  className="text-xl md:text-2xl text-furia-white font-semibold mb-4"
                  data-aos="fade-up" 
                  data-aos-delay="200"
                >
                  {currentTeam?.subtitle}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="relative h-[40vh] md:h-[70vh]" 
            style={{ 
              backgroundColor: '#000000',
              backgroundImage: 'none'
            }}
          >
            <div className="container mx-auto px-4 h-full flex items-center justify-center">
              {renderTeamsOverview()}
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-10">
          {/* Exibir seletor de times apenas quando um time estiver selecionado */}
          {teamId && (
            <div className="mb-12">
              <TeamSelector activeTeam={activeTeam} />
            </div>
          )}
          
          {currentTeam ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 animate-fade-in">
              <div className="md:col-span-2" data-aos="fade-up" data-aos-delay="100">
                <h2 className="text-2xl font-bold text-furia-white mb-4">Sobre o Time</h2>
                <p className="text-furia-white/80 text-lg mb-6">
                  {currentTeam.description}
                </p>
                <div className="bg-furia-darkgray border-l-4 border-furia-gold p-4">
                  <p className="text-furia-white/90 italic">
                    "A FURIA está construindo uma dinastia no {currentTeam.title}, com jogadores excepcionais e um estilo de jogo único. Estamos apenas começando nossa jornada."
                  </p>
                  <p className="text-right text-furia-gold mt-2">- André Akkari, Co-Fundador</p>
                </div>
              </div>
              
              <div data-aos="fade-up" data-aos-delay="200">
                <h2 className="text-2xl font-bold text-furia-white mb-4">Conquistas</h2>
                <ul className="space-y-3">
                  {currentTeam.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-furia-gold flex-shrink-0 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-furia-white/80">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            null
          )}
          
          {/* Team Players */}
          {teamId && (
            <div className="mt-6" data-aos="fade-up" data-aos-delay="300">
              {renderTeamContent()}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Teams;
