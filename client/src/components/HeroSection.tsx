import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface HeroSectionProps {
  onStartMatching: () => void;
}

export default function HeroSection({ onStartMatching }: HeroSectionProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const statsData = [
    { value: "94%", label: "User satisfaction" },
    { value: "10k+", label: "Registered therapists" },
    { value: "65%", label: "Improved outcomes" },
    { value: "24/7", label: "AI support available" }
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-background text-foreground pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <motion.div 
            className="lg:col-span-6 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              AI-Powered <span className="text-primary">Mental Health</span> Support Platform
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Revolutionizing mental health care with AI-driven therapist matching, community support, and personalized growth journeys.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <Button
                size="lg" 
                className="px-8 py-6"
                onClick={onStartMatching}
              >
                Try Therapist Matching
              </Button>
              <Button
                size="lg"
                variant="outline" 
                className="px-8 py-6"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})
                }}
              >
                Explore Features
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Check className="h-5 w-5 text-accent" />
              <span>Trusted by 200+ universities and organizations worldwide</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="mt-12 lg:mt-0 lg:col-span-6 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&h=800" 
              alt="People connecting through digital therapy" 
              className="rounded-2xl shadow-xl max-w-full h-auto object-cover" 
            />
          </motion.div>
        </div>
      </div>
      
      {/* Stats Bar */}
      <div className="bg-card border-t border-b border-border mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
