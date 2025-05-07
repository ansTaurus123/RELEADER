import { motion } from "framer-motion";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TherapistNetwork() {
  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      title: "Clinical Psychologist • Anxiety Specialist",
      available: true,
      availabilityText: "Available",
      rating: 4.8,
      reviews: 387,
      description: "Specializes in evidence-based approaches for anxiety, depression, and academic stress. Experienced with young adults and professionals.",
      tags: ["Anxiety", "Depression", "Academic Stress"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      title: "Licensed Therapist • Performance Coach",
      available: true,
      availabilityText: "Available",
      rating: 4.1,
      reviews: 219,
      description: "Combines cognitive behavioral techniques with performance psychology to help clients achieve their academic and career goals.",
      tags: ["Performance", "Motivation", "Career"]
    },
    {
      id: 3,
      name: "Dr. Lisa Martinez",
      photo: "https://images.unsplash.com/photo-1618835962148-cf177563c6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
      title: "Clinical Psychologist • Trauma Specialist",
      available: false,
      availabilityText: "Limited",
      rating: 4.6,
      reviews: 305,
      description: "Experienced in treating complex trauma, PTSD, and stress-related disorders using evidence-based therapeutic approaches.",
      tags: ["Trauma", "PTSD", "Resilience"]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (
    <section id="therapists" className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Global Network of Qualified Therapists</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Access a diverse community of licensed professionals specializing in various mental health areas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {therapists.map((therapist, i) => (
            <motion.div 
              key={therapist.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:scale-[1.03] transition-all duration-300"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
            >
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={therapist.photo}
                  alt={therapist.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-1">{therapist.name}</h3>
                    <p className="text-neutral-600 text-sm">{therapist.title}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`flex items-center px-2 py-1 rounded-full ${
                      therapist.available 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : "bg-amber-100 text-amber-800 border-amber-200"
                    }`}
                  >
                    <span className={`h-2 w-2 ${therapist.available ? "bg-green-500" : "bg-amber-500"} rounded-full mr-1`}></span>
                    <span className="text-xs">{therapist.availabilityText}</span>
                  </Badge>
                </div>
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(Math.floor(therapist.rating))].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                    {(therapist.rating % 1) > 0 && <StarHalf className="h-4 w-4 fill-current" />}
                  </div>
                  <span className="text-sm text-neutral-500 ml-1">{therapist.rating} ({therapist.reviews} reviews)</span>
                </div>
                <div className="mb-4">
                  <p className="text-neutral-700 text-sm">
                    {therapist.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {therapist.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline"
                      className="bg-primary-100 text-primary-800 border-none"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full">
                  View Profile
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center">
          <Button variant="outline" size="lg" className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50">
            Explore All Therapists
          </Button>
        </div>
      </div>
    </section>
  );
}
