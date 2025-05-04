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
        <div className="mt-32">
          <h3 className="text-2xl md:text-3xl font-rajdhani font-bold mb-14 text-center text-furia-gold">
            NOSSOS VALORES
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-black/40 p-8 rounded-lg border border-furia-gold/20 hover:border-furia-gold/50 transition-all">
              <h4 className="text-xl font-bold mb-5 text-furia-gold">EXCELÊNCIA</h4>
              <p className="text-gray-300">Buscamos constantemente superar limites, com metodologia e dedicação para alcançar o mais alto nível em tudo o que fazemos.</p>
            </div>
            
            <div className="bg-black/40 p-8 rounded-lg border border-furia-gold/20 hover:border-furia-gold/50 transition-all">
              <h4 className="text-xl font-bold mb-5 text-furia-gold">PAIXÃO</h4>
              <p className="text-gray-300">A paixão pelo que fazemos é nosso combustível diário. Defendemos nossas cores com orgulho e comprometimento.</p>
            </div>
            
            <div className="bg-black/40 p-8 rounded-lg border border-furia-gold/20 hover:border-furia-gold/50 transition-all">
              <h4 className="text-xl font-bold mb-5 text-furia-gold">INOVAÇÃO</h4>
              <p className="text-gray-300">Estamos sempre na vanguarda, adotando novas tecnologias e abordagens para revolucionar o cenário competitivo.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFuria;
