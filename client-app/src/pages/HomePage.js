import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureHighlights from '../components/FeatureHighlights';
import CTAButtons from '../components/CTAButtons';
import Footer from '../components/Footer';


const HomePage = () => {

    return (
      <>
        <HeroSection />
        <FeatureHighlights />
        <CTAButtons />
        <Footer />
      </>
    );
  };
export default HomePage;
