import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import FeatureHighlights from '../components/FeatureHighlights';
import CTAButtons from '../components/CTAButtons';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';
const HomePage = () => {
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();

  
  const handleCTAClick = (route)=>{
    if(isAuthenticated){
      navigate(route);
    }
    else{
      navigate('/signin')
    }
  }
  return (
    <>
      <HeroSection />
      <FeatureHighlights />
      {/* <CTAButtons /> */}
      <CTAButtons onCTAClick={handleCTAClick} />
      <Footer />
    </>
  );
};

export default HomePage;
