import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MatchingDemo from "@/components/MatchingDemo";
import ChatInterface from "@/components/ChatInterface";
import FeaturesSection from "@/components/FeaturesSection";
import TherapistNetwork from "@/components/TherapistNetwork";
import CommunitySection from "@/components/CommunitySection";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showMatchingScreen, setShowMatchingScreen] = useState(false);
  const [matchingProgress, setMatchingProgress] = useState(0);
  const [showChat, setShowChat] = useState(false);
  
  const updateActiveSection = (section: string) => {
    setActiveSection(section);
  };
  
  const startMatching = () => {
    setShowMatchingScreen(true);
    document.getElementById('matching-demo')?.scrollIntoView({behavior: 'smooth'});
  };
  
  const toggleChat = (visible: boolean) => {
    setShowChat(visible);
  };

  return (
    <div className="bg-neutral-50 text-neutral-800 min-h-screen">
      <Navbar 
        isLoggedIn={isLoggedIn} 
        activeSection={activeSection} 
        onSectionChange={updateActiveSection} 
      />

      <main>
        <HeroSection onStartMatching={startMatching} />
        
        <MatchingDemo 
          showMatchingScreen={showMatchingScreen}
          matchingProgress={matchingProgress}
          setMatchingProgress={setMatchingProgress}
          onStartChat={() => toggleChat(true)}
        />
        
        {showChat && (
          <ChatInterface 
            showChat={showChat} 
            onClose={() => toggleChat(false)} 
          />
        )}

        <FeaturesSection />
        
        <TherapistNetwork />
        
        <CommunitySection />
        
        <AnalyticsDashboard />
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
