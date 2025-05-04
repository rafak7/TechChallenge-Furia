
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FanSection from '@/components/FanSection';

const Fan = () => {
  return (
    <div className="flex flex-col min-h-screen bg-furia-black">
      <Header />
      
      <main className="flex-grow pt-24">
        <FanSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Fan;
