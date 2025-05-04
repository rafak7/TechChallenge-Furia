import React, { useEffect } from 'react';
import Header from '@/components/Header';
import AboutFuria from '@/components/AboutFuria';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to section when clicking on navigation links
    const scrollToSection = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 120,
            behavior: 'smooth'
          });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', scrollToSection as EventListener));

    return () => {
      links.forEach(link => link.removeEventListener('click', scrollToSection as EventListener));
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-furia-black">
      <Header />
      
      {/* Hero Section */}
      <div 
        className="pt-32 relative"
        style={{
          backgroundImage: 'url("/images/garras-1.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black opacity-80"></div>
        
        <div className="container mx-auto px-6 py-24 md:py-40 flex flex-col items-center text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-rajdhani font-bold mb-10 tracking-tight relative">
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes goldPulse {
                  0% { opacity: 0.4; }
                  50% { opacity: 0.8; }
                  100% { opacity: 0.4; }
                }
                @keyframes shimmer {
                  0% { background-position: -100% 0; }
                  100% { background-position: 200% 0; }
                }
              `
            }} />
            <span 
              style={{
                background: 'linear-gradient(to right, #FFFFFF, #D4AF37, #FFD700, #B8860B, #D4AF37)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite',
                display: 'inline-block',
                padding: '0 20px',
                position: 'relative',
                zIndex: 2
              }}
            >
              FURIA
            </span>
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,215,0,0) 70%)',
                filter: 'blur(10px)',
                animation: 'goldPulse 2s infinite',
                zIndex: 1
              }}
            ></span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-14 text-gray-300">
            Uma das maiores organizações de esports do Brasil, com times competindo em 
            diversos jogos e representando o país internacionalmente.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <a href="#about" className="btn-primary text-lg px-8 py-4">Sobre a FURIA</a>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="mt-16">
        <AboutFuria />
      </main>
      
      <div className="py-12"></div>
      
      <Footer />
    </div>
  );
};

export default Index;
