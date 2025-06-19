import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
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
              <SheetContent className="relative overflow-hidden bg-white">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                
                {/* Animated Seabed at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
                  {/* Sandy Ocean Floor */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-yellow-200/40 via-yellow-100/30 to-transparent"></div>
                  
                  {/* Coral Formations */}
                  <div className="absolute bottom-0 left-4 w-8 h-12 bg-gradient-to-t from-orange-400/50 via-orange-300/40 to-transparent rounded-t-full transform rotate-12"></div>
                  <div className="absolute bottom-0 right-8 w-6 h-10 bg-gradient-to-t from-red-400/40 via-red-300/30 to-transparent rounded-t-2xl transform -rotate-8"></div>
                  <div className="absolute bottom-0 left-1/3 w-5 h-8 bg-gradient-to-t from-pink-400/40 via-pink-300/30 to-transparent rounded-t-xl transform rotate-6"></div>
                  
                  {/* Seaweed/Kelp */}
                  <div className="absolute bottom-0 left-12 w-1.5 h-16 bg-gradient-to-t from-green-600/60 via-green-500/50 to-green-400/20 rounded-t-full transform -rotate-12 seaweed-sway"></div>
                  <div className="absolute bottom-0 right-16 w-1 h-12 bg-gradient-to-t from-green-500/50 via-green-400/40 to-green-300/15 rounded-t-full transform rotate-8 seaweed-sway" style={{animationDelay: '1.5s'}}></div>
                  <div className="absolute bottom-0 left-2/3 w-1.5 h-14 bg-gradient-to-t from-emerald-600/50 via-emerald-500/40 to-emerald-400/20 rounded-t-full transform rotate-15 seaweed-sway" style={{animationDelay: '3s'}}></div>
                  
                  {/* Small Fish Swimming */}
                  <div className="absolute bottom-8 left-0 w-4 h-2 fish-swim-right" style={{animationDelay: '2s'}}>
                    <svg viewBox="0 0 16 8" className="w-4 h-2 fill-blue-500/60">
                      <path d="M2 4 Q6 2 12 4 Q14 4 15 5 L14 6 Q12 5 6 6 Q2 5 2 4 Z" />
                      <circle cx="12" cy="4" r="0.5" className="fill-black/50" />
                    </svg>
                  </div>
                  
                  <div className="absolute bottom-12 right-0 w-3 h-1.5 fish-swim-left" style={{animationDelay: '4s'}}>
                    <svg viewBox="0 0 16 8" className="w-3 h-1.5 fill-yellow-500/60 transform scale-x-[-1]">
                      <path d="M2 4 Q6 2 12 4 Q14 4 15 5 L14 6 Q12 5 6 6 Q2 5 2 4 Z" />
                      <circle cx="12" cy="4" r="0.5" className="fill-black/50" />
                    </svg>
                  </div>
                  
                  {/* Floating Bubbles */}
                  <div className="bubble-float absolute bottom-10 left-8 w-1.5 h-1.5 bg-blue-300/30 rounded-full"></div>
                  <div className="bubble-float absolute bottom-6 right-12 w-1 h-1 bg-blue-400/25 rounded-full" style={{animationDelay: '2s'}}></div>
                  <div className="bubble-float absolute bottom-14 left-1/2 w-1 h-1 bg-cyan-300/30 rounded-full" style={{animationDelay: '3s'}}></div>
                </div>
                
                {/* Navigation Content */}
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-left px-3 py-2 transition-colors ${
                        location === item.href 
                          ? "text-primary font-semibold" 
                          : "text-neutral hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
