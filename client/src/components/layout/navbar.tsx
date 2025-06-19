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
                
                {/* Sea Scene at Bottom */}
                <div className="mt-auto mb-0">
                  <svg width="100%" height="120" viewBox="0 0 300 120" className="opacity-90" preserveAspectRatio="none">
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
                    
                    {/* Seaweed across the sea */}
                    <path d="M20 90 Q17 80 20 70 Q23 60 20 50" stroke="#2ecc71" strokeWidth="2" fill="none"/>
                    <path d="M70 90 Q73 75 70 60 Q67 50 70 40" stroke="#27ae60" strokeWidth="2" fill="none"/>
                    <path d="M130 90 Q127 78 130 66 Q133 55 130 45" stroke="#2ecc71" strokeWidth="2" fill="none"/>
                    <path d="M200 90 Q203 75 200 60 Q197 48 200 38" stroke="#27ae60" strokeWidth="2" fill="none"/>
                    <path d="M250 90 Q247 80 250 68 Q253 58 250 48" stroke="#2ecc71" strokeWidth="2" fill="none"/>
                    
                    {/* Trout Fish Swimming */}
                    <g transform="translate(50, 60)">
                      <ellipse cx="0" cy="0" rx="12" ry="5" fill="#ff9999" transform="rotate(-5 0 0)"/>
                      <ellipse cx="-2" cy="0" rx="10" ry="4" fill="#ffb3b3" transform="rotate(-5 -2 0)"/>
                      <circle cx="-7" cy="-2" r="1" fill="#cc6666"/>
                      <circle cx="2" cy="2" r="1" fill="#cc6666"/>
                      <circle cx="7" cy="-2" r="1.5" fill="#000"/>
                      <path d="M-12 0 L-18 -4 L-18 4 Z" fill="#ff9999"/>
                    </g>
                    
                    <g transform="translate(180, 70)">
                      <ellipse cx="0" cy="0" rx="14" ry="6" fill="#8b7355" transform="rotate(10 0 0)"/>
                      <ellipse cx="2" cy="0" rx="12" ry="5" fill="#a0845c" transform="rotate(10 2 0)"/>
                      <circle cx="-5" cy="-2" r="1.2" fill="#654321"/>
                      <circle cx="3" cy="2" r="1" fill="#654321"/>
                      <circle cx="10" cy="-1" r="1.5" fill="#000"/>
                      <path d="M-14 0 L-22 -4 L-22 4 Z" fill="#8b7355"/>
                    </g>
                    
                    <g transform="translate(120, 55)">
                      <ellipse cx="0" cy="0" rx="10" ry="4" fill="#4ecdc4" transform="rotate(-15 0 0)"/>
                      <circle cx="-3" cy="-1" r="0.8" fill="#2c9fb3"/>
                      <circle cx="5" cy="-1" r="1" fill="#000"/>
                      <path d="M-10 0 L-15 -3 L-15 3 Z" fill="#4ecdc4"/>
                    </g>
                    
                    {/* Bubbles throughout water */}
                    <circle cx="40" cy="50" r="1.5" fill="#ffffff" opacity="0.7"/>
                    <circle cx="90" cy="45" r="1" fill="#ffffff" opacity="0.5"/>
                    <circle cx="160" cy="52" r="1.8" fill="#ffffff" opacity="0.6"/>
                    <circle cx="230" cy="48" r="1.2" fill="#ffffff" opacity="0.8"/>
                    <circle cx="280" cy="55" r="1" fill="#ffffff" opacity="0.4"/>
                    
                    {/* Boat on Water Surface */}
                    <g transform="translate(60, 25)">
                      {/* Boat Hull */}
                      <ellipse cx="0" cy="0" rx="25" ry="6" fill="#8b4513"/>
                      <ellipse cx="0" cy="-2" rx="23" ry="4" fill="#a0522d"/>
                      
                      {/* Boat Cabin */}
                      <rect x="-8" y="-8" width="16" height="6" rx="2" fill="#654321"/>
                      <rect x="-6" y="-6" width="12" height="3" fill="#8b4513"/>
                      
                      {/* Mast */}
                      <line x1="0" y1="-8" x2="0" y2="-20" stroke="#654321" strokeWidth="1.5"/>
                      
                      {/* Sail */}
                      <path d="M2 -18 Q12 -15 10 -10 Q8 -12 2 -8" fill="#e6e6e6" stroke="#ccc" strokeWidth="0.5"/>
                      
                      {/* Water wake */}
                      <path d="M25 0 Q30 2 35 0" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.6"/>
                      <path d="M25 2 Q32 4 38 2" stroke="#ffffff" strokeWidth="0.8" fill="none" opacity="0.4"/>
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
