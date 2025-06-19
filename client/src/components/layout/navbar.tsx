import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Shop", href: "/shop" },
    { label: "Feeding Guide", href: "/feeding-guide" },
    { label: "Team", href: "/team" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 hover-glow click-ripple smooth-transition">
              <h1 className="text-2xl font-bold text-primary">JK Trout Feed</h1>
              <p className="text-xs text-neutral -mt-1 fade-in">GREEN GLOBE AGAIN</p>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.slice(0, -1).map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover-glow click-ripple btn-bounce smooth-transition ${
                    location === item.href 
                      ? "text-primary bg-blue-50 pulse-bg" 
                      : "text-neutral hover:text-primary"
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/contact">
                <Button className={`${
                  location === "/contact" 
                    ? "bg-secondary text-white" 
                    : "bg-primary text-white hover:bg-secondary"
                }`}>
                  Contact
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="relative overflow-hidden bg-gradient-to-b from-blue-900/95 via-blue-800/90 to-blue-950/95 border-blue-700/50">
                {/* Aquarium Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Underwater Coral and Rocks */}
                  <div className="absolute bottom-0 left-0 w-16 h-20 bg-gradient-to-t from-orange-600/40 via-orange-500/30 to-transparent rounded-t-3xl transform rotate-12"></div>
                  <div className="absolute bottom-0 right-4 w-12 h-16 bg-gradient-to-t from-red-600/30 via-red-500/20 to-transparent rounded-t-2xl transform -rotate-6"></div>
                  
                  {/* Seaweed */}
                  <div className="absolute bottom-0 left-8 w-2 h-24 bg-gradient-to-t from-green-700/50 via-green-600/40 to-green-500/20 rounded-t-full transform -rotate-12 seaweed-sway"></div>
                  <div className="absolute bottom-0 right-12 w-1.5 h-20 bg-gradient-to-t from-green-600/40 via-green-500/30 to-green-400/15 rounded-t-full transform rotate-8 seaweed-sway" style={{animationDelay: '1s'}}></div>
                  
                  {/* Floating Bubbles */}
                  <div className="bubble-float absolute bottom-20 left-6 w-2 h-2 bg-white/20 rounded-full"></div>
                  <div className="bubble-float absolute bottom-16 right-8 w-1.5 h-1.5 bg-white/15 rounded-full" style={{animationDelay: '2s'}}></div>
                  <div className="bubble-float absolute bottom-24 left-16 w-1 h-1 bg-white/25 rounded-full" style={{animationDelay: '4s'}}></div>
                  
                  {/* Swimming Fish */}
                  <div className="absolute bottom-32 left-0 w-6 h-3 fish-swim-right" style={{animationDelay: '1s'}}>
                    <svg viewBox="0 0 24 12" className="w-6 h-3 fill-yellow-400/60">
                      <path d="M2 6 Q8 2 16 6 Q20 6 22 8 L20 10 Q16 8 8 10 Q2 8 2 6 Z" />
                      <circle cx="18" cy="6" r="1" className="fill-black/40" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-40 right-0 w-5 h-2.5 fish-swim-left" style={{animationDelay: '3s'}}>
                    <svg viewBox="0 0 24 12" className="w-5 h-2.5 fill-blue-400/60 transform scale-x-[-1]">
                      <path d="M2 6 Q8 2 16 6 Q20 6 22 8 L20 10 Q16 8 8 10 Q2 8 2 6 Z" />
                      <circle cx="18" cy="6" r="1" className="fill-black/40" />
                    </svg>
                  </div>
                  
                  {/* Water Caustics Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-400/5 water-caustics"></div>
                </div>
                
                {/* Content with backdrop for readability */}
                <div className="relative z-10 bg-black/30 backdrop-blur-sm rounded-lg p-4 mt-8">
                  <div className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-left px-3 py-2 transition-colors rounded-md ${
                          location === item.href 
                            ? "text-white font-semibold bg-blue-600/40" 
                            : "text-blue-100 hover:text-white hover:bg-blue-700/30"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
