import React, { useEffect } from 'react';

const AboutFuria = () => {
  // Adicionar a keyframe animation ao carregar o componente
  useEffect(() => {
    // Cria um elemento de estilo
    const styleEl = document.createElement('style');
    // Define a animação
    const animationCss = `
      @keyframes logoScale {
        0% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.1);
          opacity: 0.8;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .animate-logo-pulse {
        animation: logoScale 2s infinite ease-in-out;
      }
    `;
    styleEl.textContent = animationCss;
    // Adiciona ao head
    document.head.appendChild(styleEl);
    
    // Limpa ao desmontar o componente
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <section id="about" className="py-28 bg-gradient-to-b from-black to-furia-darkgray relative">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-furia-gold/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-furia-gold/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="section-title mb-20">
          <span className="text-furia-white">SOBRE A </span>
          <span className="text-furia-gold">FURIA</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-8 text-furia-gold">
              Elite do esport brasileiro no cenário mundial
            </h3>
            
            <p className="text-lg mb-8 text-gray-300">
              Fundada em 2017, a FURIA transformou-se em uma potência do esport brasileiro com presença global. 
              Nossa missão vai além das competições: representamos a paixão e a garra do Brasil nos maiores palcos 
              internacionais.
            </p>
            
            <p className="text-lg mb-10 text-gray-300">
              Combinamos metodologia científica, inovação tecnológica e desenvolvimento humano para formar 
              equipes de alto desempenho. Nossos atletas não são apenas jogadores - são embaixadores 
              de uma nova era nos esportes eletrônicos.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-5 bg-black/50 border border-furia-gold/30 rounded-lg transform hover:scale-105 transition-transform">
                <span className="text-3xl font-bold text-furia-gold">15+</span>
                <p className="text-sm mt-2">Campeonatos</p>
              </div>
              <div className="text-center p-5 bg-black/50 border border-furia-gold/30 rounded-lg transform hover:scale-105 transition-transform">
                <span className="text-3xl font-bold text-furia-gold">3</span>
                <p className="text-sm mt-2">Modalidades</p>
              </div>
              <div className="text-center p-5 bg-black/50 border border-furia-gold/30 rounded-lg transform hover:scale-105 transition-transform">
                <span className="text-3xl font-bold text-furia-gold">5M+</span>
                <p className="text-sm mt-2">Fãs</p>
              </div>
              <div className="text-center p-5 bg-black/50 border border-furia-gold/30 rounded-lg transform hover:scale-105 transition-transform">
                <span className="text-3xl font-bold text-furia-gold">25+</span>
                <p className="text-sm mt-2">Atletas</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-64 h-64 md:w-96 md:h-96 relative group">
              {/* Efeito de brilho pulsante */}
              <div className="w-full h-full bg-gradient-to-br from-furia-gold/30 to-transparent absolute rounded-full animate-pulse" 
                   style={{animationDuration: '3s'}}></div>
              
              {/* Círculos decorativos */}
              <div className="absolute inset-0 border-2 border-furia-gold/30 rounded-full animate-spin-slow" 
                   style={{animationDuration: '15s'}}></div>
              <div className="absolute inset-4 border border-furia-gold/20 rounded-full animate-reverse-spin" 
                   style={{animationDuration: '20s'}}></div>
              
              {/* Logo central */}
              <div className="w-full h-full flex items-center justify-center bg-black border-4 border-furia-gold rounded-full overflow-hidden z-10 relative group-hover:border-white transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
                <img 
                  src="/images/logo_furia.png" 
                  alt="Logo FURIA" 
                  className="w-3/4 h-3/4 object-contain z-10 group-hover:scale-110 transition-transform duration-500 animate-logo-pulse"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Seção de valores */}
        <div className="mt-32 relative">
          {/* Elementos decorativos de fundo */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-furia-gold/5 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-furia-gold/5 rounded-full filter blur-3xl"></div>
          
          <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-16 text-center text-furia-gold relative inline-block w-full">
            <span className="relative z-10">NOSSOS VALORES</span>
            <div className="absolute -bottom-4 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-furia-gold to-transparent transform -translate-x-1/2"></div>
            <div className="absolute -bottom-4 left-1/2 w-16 h-1 bg-furia-gold transform -translate-x-1/2 animate-pulse" style={{animationDuration: '2s'}}></div>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-br from-black/80 to-black/40 p-10 rounded-lg border-l-4 border-furia-gold shadow-lg hover:shadow-furia-gold/20 transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-furia-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-furia-gold/5 rounded-full -mt-10 -mr-10"></div>
              
              <div className="bg-furia-gold/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-furia-gold/20 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-furia-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              
              <h4 className="text-2xl font-bold mb-5 text-furia-gold">EXCELÊNCIA</h4>
              <p className="text-gray-300 relative z-10 leading-relaxed">
                Não jogamos apenas para participar — dominamos para redefinir. 
                Nossa metodologia científica e treinamento intensivo transformam talento em supremacia competitiva. 
                Cada detalhe, cada segundo, cada decisão nos aproxima da perfeição que perseguimos incansavelmente.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-black/80 to-black/40 p-10 rounded-lg border-l-4 border-furia-gold shadow-lg hover:shadow-furia-gold/20 transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-furia-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-furia-gold/5 rounded-full -mt-10 -mr-10"></div>
              
              <div className="bg-furia-gold/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-furia-gold/20 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-furia-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              
              <h4 className="text-2xl font-bold mb-5 text-furia-gold">PAIXÃO</h4>
              <p className="text-gray-300 relative z-10 leading-relaxed">
                Nossa chama interior queima com intensidade feroz. 
                É esse fogo que transforma obstáculos em combustível para nossa ascensão. 
                Cada competição carrega o peso de nossa nação, cada vitória celebra a garra brasileira que corre em nossas veias digital e emocionalmente.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-black/80 to-black/40 p-10 rounded-lg border-l-4 border-furia-gold shadow-lg hover:shadow-furia-gold/20 transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-furia-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-furia-gold/5 rounded-full -mt-10 -mr-10"></div>
              
              <div className="bg-furia-gold/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-furia-gold/20 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-furia-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h4 className="text-2xl font-bold mb-5 text-furia-gold">INOVAÇÃO</h4>
              <p className="text-gray-300 relative z-10 leading-relaxed">
                Revolucionamos enquanto outros imitam. 
                Nossa visão disruptiva quebra paradigmas e reescreve as regras do jogo. 
                Combinamos tecnologia de ponta, estratégia visionária e audácia criativa para forjar um legado que não apenas acompanha o futuro — nós o criamos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFuria;
