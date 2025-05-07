import { motion } from "framer-motion";
import { 
  Brain, 
  MessageCircle, 
  GraduationCap, 
  PillIcon, 
  ListTodo, 
  Building2, 
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="text-primary-500" />,
      title: "AI-Powered Matching",
      description: "Advanced algorithms analyze your needs and preferences to connect you with the perfect therapist, ensuring personalized care."
    },
    {
      icon: <MessageCircle className="text-primary-500" />,
      title: "Community Support",
      description: "Join topic-based group chats and forums to share experiences, receive peer support, and build meaningful connections."
    },
    {
      icon: <GraduationCap className="text-primary-500" />,
      title: "Educational Resources",
      description: "Access a vast library of expert-curated articles, videos, and exercises to enhance your mental health knowledge and skills."
    },
    {
      icon: <PillIcon className="text-primary-500" />,
      title: "Medication Support",
      description: "Track prescriptions, receive reminders, and get information about your medications with our pharmacy integration system."
    },
    {
      icon: <ListTodo className="text-primary-500" />,
      title: "Productivity Tools",
      description: "Organize tasks, set goals, and track progress with our integrated productivity system designed for mental well-being."
    },
    {
      icon: <Building2 className="text-primary-500" />,
      title: "Corporate Wellness",
      description: "Comprehensive solutions for organizations looking to support employee mental health and improve workplace well-being."
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1, 
        duration: 0.5 
      } 
    })
  };

  return (
    <section id="features" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary-100 text-primary-700 border-none px-6 py-1.5 text-sm font-medium mb-4">
            Revolutionary Platform
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Comprehensive Mental Health Support</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Combining AI technology, expert guidance, and community support in one integrated platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 hover:scale-[1.03] transition-all duration-300"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">{feature.title}</h3>
              <p className="text-neutral-600 mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-primary-500 font-medium cursor-pointer group">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Technology Spotlight */}
        <div className="bg-neutral-50 rounded-2xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <Badge variant="outline" className="bg-primary-100 text-primary-700 border-none px-4 py-1 text-sm font-medium mb-4 w-fit">
                Technology Spotlight
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-4">Powered by Advanced AI</h3>
              <p className="text-neutral-600 mb-6">
                Our platform leverages cutting-edge AI technologies to deliver personalized mental health support:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-neutral-700"><span className="font-medium">Qdrant Vector Search</span> analyzes user profiles and therapist expertise for precise matching</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-neutral-700"><span className="font-medium">Groq API</span> powers our therapy conversations with nuanced understanding and personalized responses</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-neutral-700"><span className="font-medium">Privacy-First Encryption</span> ensures all user data and conversations remain secure and confidential</p>
                  </div>
                </li>
              </ul>
              <Button size="lg" className="w-fit">
                Explore Our Technology
              </Button>
            </div>
            <div className="bg-neutral-100 p-8 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=500" 
                alt="AI-powered therapy matching visualization" 
                className="rounded-xl shadow-md max-w-full h-auto object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
