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
                
                {/* Cartoonish Aquarium at Bottom */}
                <div className="mt-auto mb-4 flex justify-center">
                  <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-80">
                    {/* Aquarium Tank */}
                    <rect x="10" y="20" width="100" height="50" rx="5" fill="#e6f3ff" stroke="#4a90e2" strokeWidth="3"/>
                    
                    {/* Water Level */}
                    <rect x="12" y="22" width="96" height="46" rx="3" fill="#b3d9ff" opacity="0.7"/>
                    
                    {/* Sand/Gravel */}
                    <rect x="12" y="58" width="96" height="10" rx="2" fill="#f4d03f"/>
                    
                    {/* Small Rocks */}
                    <circle cx="25" cy="63" r="3" fill="#a6a6a6"/>
                    <circle cx="35" cy="65" r="2" fill="#bfbfbf"/>
                    <circle cx="90" cy="64" r="2.5" fill="#999"/>
                    
                    {/* Seaweed */}
                    <path d="M20 58 Q18 50 20 42 Q22 34 20 26" stroke="#2ecc71" strokeWidth="2" fill="none"/>
                    <path d="M95 58 Q97 48 95 38 Q93 30 95 24" stroke="#27ae60" strokeWidth="2" fill="none"/>
                    
                    {/* Fish */}
                    <ellipse cx="40" cy="40" rx="6" ry="3" fill="#ff6b6b" transform="rotate(-15 40 40)"/>
                    <circle cx="43" cy="39" r="1" fill="#000"/>
                    <path d="M34 40 L30 38 L30 42 Z" fill="#ff6b6b"/>
                    
                    <ellipse cx="70" cy="50" rx="5" ry="2.5" fill="#4ecdc4" transform="rotate(20 70 50)"/>
                    <circle cx="72" cy="49" r="0.8" fill="#000"/>
                    <path d="M65 50 L62 48 L62 52 Z" fill="#4ecdc4"/>
                    
                    {/* Bubbles */}
                    <circle cx="30" cy="35" r="1.5" fill="#ffffff" opacity="0.8"/>
                    <circle cx="35" cy="28" r="1" fill="#ffffff" opacity="0.6"/>
                    <circle cx="80" cy="32" r="1.2" fill="#ffffff" opacity="0.7"/>
                    
                    {/* Aquarium Stand */}
                    <rect x="5" y="70" width="110" height="8" rx="2" fill="#8b4513"/>
                    <rect x="5" y="76" width="110" height="2" fill="#654321"/>
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
