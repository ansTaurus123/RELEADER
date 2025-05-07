import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavbarProps {
  isLoggedIn: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Navbar({ 
  isLoggedIn, 
  activeSection,
  onSectionChange 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleNavigation = (section: string) => {
    onSectionChange(section);
    setIsMenuOpen(false);
  };
  
  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "therapists", label: "Therapists" },
    { id: "communities", label: "Communities" },
    { id: "analytics", label: "Analytics" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-300 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">R</span>
            </div>
            <span className="text-2xl font-semibold text-neutral-800">realeader</span>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className={`font-medium px-3 py-2 rounded-md transition-all ${
                  activeSection === item.id 
                    ? "text-primary-500" 
                    : "text-neutral-600 hover:bg-primary-50"
                }`}
                onClick={() => onSectionChange(item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <Button className="hidden md:block" variant="outline">
                Dashboard
              </Button>
            ) : (
              <Button 
                className="hidden md:block" 
                variant="outline"
                onClick={() => console.log("Login clicked")}
              >
                Log In
              </Button>
            )}
            
            <Button onClick={() => console.log("Get Started clicked")}>
              Get Started
            </Button>
            
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`} 
                      className={`font-medium px-3 py-2 rounded-md transition-all ${
                        activeSection === item.id 
                          ? "text-primary-500" 
                          : "text-neutral-600 hover:bg-primary-50"
                      }`}
                      onClick={() => handleNavigation(item.id)}
                    >
                      {item.label}
                    </a>
                  ))}
                  
                  {!isLoggedIn && (
                    <Button 
                      variant="outline"
                      onClick={() => console.log("Login clicked")}
                      className="mt-4"
                    >
                      Log In
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
