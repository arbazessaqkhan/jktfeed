import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
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
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-30">
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
              <SheetContent className="bg-white flex flex-col">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Mobile navigation menu with site links</SheetDescription>
                
                <div className="flex flex-col space-y-4 mt-8 flex-grow">
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
                
                {/* Animated Sea Scene at Bottom */}
                <div className="mt-auto -mx-6 -mb-6">
                  <svg width="100%" height="120" viewBox="0 0 300 120" className="opacity-90" preserveAspectRatio="none" style={{display: 'block'}}>
                    {/* Water Body - Full Width */}
                    <rect x="0" y="30" width="300" height="90" fill="#4a90e2" opacity="0.8"/>
                    <rect x="0" y="35" width="300" height="85" fill="#3b7dd8" opacity="0.6"/>
                    
                    {/* Seabed - Full Width */}
                    <rect x="0" y="90" width="300" height="30" fill="#f4d03f"/>
                    
                    {/* Rocks and Coral across seabed */}
                    <circle cx="30" cy="100" r="5" fill="#999"/>
                    <circle cx="80" cy="105" r="4" fill="#bbb"/>
                    <circle cx="150" cy="102" r="6" fill="#888"/>
                    <circle cx="220" cy="98" r="4.5" fill="#aaa"/>
                    <circle cx="270" cy="104" r="3.5" fill="#999"/>
                    
                    {/* Starfish */}
                    <g transform="translate(110, 100)">
                      <path d="M0,-4 L1.5,-1 L4,0 L1.5,1 L0,4 L-1.5,1 L-4,0 L-1.5,-1 Z" fill="#ff6b6b" className="animate-pulse"/>
                      <circle cx="0" cy="0" r="1" fill="#e74c3c"/>
                    </g>
                    
                    {/* Octopus */}
                    <g transform="translate(200, 105)" className="hover:scale-110 transition-transform">
                      <ellipse cx="0" cy="0" rx="6" ry="4" fill="#8e44ad"/>
                      <circle cx="-2" cy="-1" r="0.5" fill="#000"/>
                      <circle cx="2" cy="-1" r="0.5" fill="#000"/>
                      <path d="M-4,2 Q-6,6 -4,8" stroke="#8e44ad" strokeWidth="1" fill="none" className="seaweed-sway"/>
                      <path d="M-1,3 Q-2,7 0,9" stroke="#8e44ad" strokeWidth="1" fill="none" className="seaweed-sway" style={{animationDelay: '0.5s'}}/>
                      <path d="M1,3 Q2,7 0,9" stroke="#8e44ad" strokeWidth="1" fill="none" className="seaweed-sway" style={{animationDelay: '1s'}}/>
                      <path d="M4,2 Q6,6 4,8" stroke="#8e44ad" strokeWidth="1" fill="none" className="seaweed-sway" style={{animationDelay: '1.5s'}}/>
                    </g>
                    
                    {/* Seaweed across the sea */}
                    <path d="M20 90 Q17 80 20 70 Q23 60 20 50" stroke="#2ecc71" strokeWidth="2" fill="none" className="seaweed-sway"/>
                    <path d="M70 90 Q73 75 70 60 Q67 50 70 40" stroke="#27ae60" strokeWidth="2" fill="none" className="seaweed-sway" style={{animationDelay: '1s'}}/>
                    <path d="M130 90 Q127 78 130 66 Q133 55 130 45" stroke="#2ecc71" strokeWidth="2" fill="none" className="seaweed-sway" style={{animationDelay: '2s'}}/>
                    <path d="M200 90 Q203 75 200 60 Q197 48 200 38" stroke="#27ae60" strokeWidth="2" fill="none" className="seaweed-sway" style={{animationDelay: '0.5s'}}/>
                    <path d="M250 90 Q247 80 250 68 Q253 58 250 48" stroke="#2ecc71" strokeWidth="2" fill="none" className="seaweed-sway" style={{animationDelay: '1.5s'}}/>
                    
                    {/* Main Swimming Trout Fish - positioned inside water */}
                    <g className="fish-swim-right" transform="translate(0, 45)">
                      <ellipse cx="0" cy="0" rx="12" ry="5" fill="#ff9999" transform="rotate(-5 0 0)"/>
                      <ellipse cx="-2" cy="0" rx="10" ry="4" fill="#ffb3b3" transform="rotate(-5 -2 0)"/>
                      <circle cx="-7" cy="-2" r="1" fill="#cc6666"/>
                      <circle cx="2" cy="2" r="1" fill="#cc6666"/>
                      <circle cx="7" cy="-2" r="1.5" fill="#000"/>
                      <path d="M-12 0 L-18 -4 L-18 4 Z" fill="#ff9999"/>
                    </g>
                    
                    <g className="fish-swim-left" style={{animationDelay: '2s'}} transform="translate(0, 55)">
                      <ellipse cx="0" cy="0" rx="14" ry="6" fill="#8b7355" transform="rotate(10 0 0)"/>
                      <ellipse cx="2" cy="0" rx="12" ry="5" fill="#a0845c" transform="rotate(10 2 0)"/>
                      <circle cx="-5" cy="-2" r="1.2" fill="#654321"/>
                      <circle cx="3" cy="2" r="1" fill="#654321"/>
                      <circle cx="10" cy="-1" r="1.5" fill="#000"/>
                      <path d="M-14 0 L-22 -4 L-22 4 Z" fill="#8b7355"/>
                    </g>
                    
                    {/* Small School of Fish - swimming mid-water */}
                    <g className="fish-school-right" style={{animationDelay: '4s'}} transform="translate(0, 40)">
                      <ellipse cx="0" cy="0" rx="6" ry="2.5" fill="#4ecdc4"/>
                      <circle cx="4" cy="0" r="0.8" fill="#000"/>
                      <path d="M-6 0 L-9 -2 L-9 2 Z" fill="#4ecdc4"/>
                    </g>
                    
                    <g className="fish-school-right" style={{animationDelay: '4.2s'}} transform="translate(0, 42)">
                      <ellipse cx="0" cy="0" rx="5" ry="2" fill="#95e1d3"/>
                      <circle cx="3" cy="0" r="0.6" fill="#000"/>
                      <path d="M-5 0 L-7 -1.5 L-7 1.5 Z" fill="#95e1d3"/>
                    </g>
                    
                    <g className="fish-school-right" style={{animationDelay: '4.4s'}} transform="translate(0, 38)">
                      <ellipse cx="0" cy="0" rx="4" ry="1.8" fill="#6ac4aa"/>
                      <circle cx="2.5" cy="0" r="0.5" fill="#000"/>
                      <path d="M-4 0 L-6 -1 L-6 1 Z" fill="#6ac4aa"/>
                    </g>
                    
                    {/* Large Predator Fish - deep water */}
                    <g className="big-fish-slow" style={{animationDelay: '6s'}} transform="translate(0, 65)">
                      <ellipse cx="0" cy="0" rx="20" ry="8" fill="#2c3e50"/>
                      <ellipse cx="3" cy="0" rx="17" ry="6" fill="#34495e"/>
                      <circle cx="12" cy="-2" r="2" fill="#000"/>
                      <path d="M-20 0 L-28 -5 L-28 5 Z" fill="#2c3e50"/>
                      <path d="M0 8 L-3 12 L3 12 Z" fill="#2c3e50"/>
                    </g>
                    
                    {/* Animated Bubbles - positioned inside water */}
                    <circle cx="40" cy="50" r="1.5" fill="#ffffff" opacity="0.7" className="bubble-float"/>
                    <circle cx="90" cy="45" r="1" fill="#ffffff" opacity="0.5" className="bubble-float" style={{animationDelay: '1s'}}/>
                    <circle cx="160" cy="52" r="1.8" fill="#ffffff" opacity="0.6" className="bubble-float" style={{animationDelay: '2s'}}/>
                    <circle cx="230" cy="48" r="1.2" fill="#ffffff" opacity="0.8" className="bubble-float" style={{animationDelay: '0.5s'}}/>
                    <circle cx="280" cy="55" r="1" fill="#ffffff" opacity="0.4" className="bubble-float" style={{animationDelay: '1.5s'}}/>
                    <circle cx="120" cy="60" r="0.8" fill="#ffffff" opacity="0.6" className="bubble-float" style={{animationDelay: '3s'}}/>
                    <circle cx="200" cy="65" r="1.3" fill="#ffffff" opacity="0.5" className="bubble-float" style={{animationDelay: '2.5s'}}/>
                    
                    {/* Additional Marine Life - positioned correctly on seabed */}
                    <g transform="translate(180, 98)">
                      <path d="M0 0 L-4 -1.5 L-3 -4 L0 -2.5 L3 -4 L4 -1.5 L2.5 0 L4 1.5 L3 4 L0 2.5 L-3 4 L-4 1.5 Z" fill="#f39c12" stroke="#e67e22" strokeWidth="0.5" className="animate-pulse"/>
                      <circle cx="0" cy="0" r="1" fill="#e67e22"/>
                    </g>
                    
                    {/* Moving Boats */}
                    <g className="boat-sail-right">
                      <ellipse cx="0" cy="0" rx="25" ry="6" fill="#8b4513"/>
                      <ellipse cx="0" cy="-2" rx="23" ry="4" fill="#a0522d"/>
                      <rect x="-8" y="-8" width="16" height="6" rx="2" fill="#654321"/>
                      <rect x="-6" y="-6" width="12" height="3" fill="#8b4513"/>
                      <line x1="0" y1="-8" x2="0" y2="-20" stroke="#654321" strokeWidth="1.5"/>
                      <path d="M2 -18 Q12 -15 10 -10 Q8 -12 2 -8" fill="#e6e6e6" stroke="#ccc" strokeWidth="0.5"/>
                      <path d="M25 0 Q30 2 35 0" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.6"/>
                    </g>
                    
                    <g className="boat-sail-left" style={{animationDelay: '8s'}}>
                      <ellipse cx="0" cy="0" rx="20" ry="5" fill="#654321"/>
                      <ellipse cx="0" cy="-1.5" rx="18" ry="3" fill="#8b4513"/>
                      <rect x="-6" y="-6" width="12" height="4" rx="1" fill="#5d4e37"/>
                      <line x1="0" y1="-6" x2="0" y2="-15" stroke="#5d4e37" strokeWidth="1"/>
                      <path d="M-2 -14 Q-8 -12 -6 -8 Q-4 -10 -2 -6" fill="#f0f0f0" stroke="#ddd" strokeWidth="0.5"/>
                      <path d="M-20 0 Q-25 1 -30 0" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.5"/>
                    </g>
                    
                    <g className="fishing-boat" style={{animationDelay: '12s'}}>
                      <ellipse cx="0" cy="0" rx="18" ry="4" fill="#2c3e50"/>
                      <rect x="-10" y="-5" width="20" height="3" rx="1" fill="#34495e"/>
                      <circle cx="-5" cy="-3" r="1" fill="#e74c3c"/>
                      <circle cx="5" cy="-3" r="1" fill="#f39c12"/>
                      <path d="M18 0 Q22 1 26 0" stroke="#ffffff" strokeWidth="0.6" fill="none" opacity="0.4"/>
                    </g>
                  </svg>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
