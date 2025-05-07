import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  const platformLinks = [
    { title: "Features", href: "#features" },
    { title: "Therapist Network", href: "#therapists" },
    { title: "Communities", href: "#communities" },
    { title: "Resources", href: "#" },
    { title: "Pricing", href: "#" }
  ];
  
  const companyLinks = [
    { title: "About Us", href: "#" },
    { title: "Careers", href: "#" },
    { title: "Press", href: "#" },
    { title: "Contact", href: "#" },
    { title: "Investors", href: "#" }
  ];
  
  const legalLinks = [
    { title: "Privacy Policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Cookie Policy", href: "#" },
    { title: "HIPAA Compliance", href: "#" },
    { title: "Security", href: "#" }
  ];
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#" },
    { icon: <Twitter className="h-5 w-5" />, href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#" },
    { icon: <Instagram className="h-5 w-5" />, href: "#" }
  ];

  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <motion.div 
              className="flex items-center space-x-3 mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-primary-500 font-semibold text-lg">R</span>
              </div>
              <span className="text-2xl font-semibold text-white">realeader</span>
            </motion.div>
            <p className="text-neutral-400 mb-4">
              Revolutionizing mental health support with AI-driven solutions, expert guidance, and community connection.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="text-neutral-400 hover:text-white transition-all"
                  aria-label={`Social media link ${i+1}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {platformLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-neutral-400 hover:text-white transition-all">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-neutral-400 hover:text-white transition-all">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-neutral-400 hover:text-white transition-all">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-700 text-center text-neutral-500 text-sm">
          <p>&copy; 2025 Realeader Group. All rights reserved.</p>
          <p className="mt-2">Powered by Qdrant Vector Search and Groq API for AI-driven mental health support.</p>
        </div>
      </div>
    </footer>
  );
}
