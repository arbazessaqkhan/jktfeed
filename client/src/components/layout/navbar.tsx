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
                  <svg width="180" height="120" viewBox="0 0 180 120" className="opacity-80">
                    {/* Aquarium Tank */}
                    <rect x="15" y="30" width="150" height="75" rx="8" fill="#e6f3ff" stroke="#4a90e2" strokeWidth="4"/>
                    
                    {/* Water Level */}
                    <rect x="18" y="33" width="144" height="69" rx="5" fill="#b3d9ff" opacity="0.7"/>
                    
                    {/* Sand/Gravel */}
                    <rect x="18" y="87" width="144" height="15" rx="3" fill="#f4d03f"/>
                    
                    {/* Small Rocks */}
                    <circle cx="35" cy="95" r="4" fill="#a6a6a6"/>
                    <circle cx="50" cy="97" r="3" fill="#bfbfbf"/>
                    <circle cx="135" cy="96" r="3.5" fill="#999"/>
                    
                    {/* Seaweed */}
                    <path d="M30 87 Q27 75 30 63 Q33 51 30 39" stroke="#2ecc71" strokeWidth="3" fill="none"/>
                    <path d="M142 87 Q145 72 142 57 Q139 45 142 36" stroke="#27ae60" strokeWidth="3" fill="none"/>
                    
                    {/* Trout Fish 1 - Rainbow Trout */}
                    <ellipse cx="60" cy="60" rx="12" ry="5" fill="#ff9999" transform="rotate(-10 60 60)"/>
                    <ellipse cx="58" cy="60" rx="10" ry="4" fill="#ffb3b3" transform="rotate(-10 58 60)"/>
                    {/* Trout spots */}
                    <circle cx="55" cy="58" r="1" fill="#cc6666"/>
                    <circle cx="62" cy="62" r="1" fill="#cc6666"/>
                    <circle cx="58" cy="64" r="0.8" fill="#cc6666"/>
                    {/* Eye */}
                    <circle cx="65" cy="58" r="1.5" fill="#000"/>
                    {/* Tail */}
                    <path d="M48 60 L42 56 L42 64 Z" fill="#ff9999"/>
                    {/* Fins */}
                    <path d="M60 66 L58 70 L62 70 Z" fill="#ff9999"/>
                    
                    {/* Trout Fish 2 - Brown Trout */}
                    <ellipse cx="105" cy="75" rx="14" ry="6" fill="#8b7355" transform="rotate(15 105 75)"/>
                    <ellipse cx="107" cy="75" rx="12" ry="5" fill="#a0845c" transform="rotate(15 107 75)"/>
                    {/* Trout spots */}
                    <circle cx="100" cy="73" r="1.2" fill="#654321"/>
                    <circle cx="108" cy="77" r="1" fill="#654321"/>
                    <circle cx="104" cy="79" r="0.9" fill="#654321"/>
                    <circle cx="112" cy="74" r="1.1" fill="#654321"/>
                    {/* Eye */}
                    <circle cx="115" cy="73" r="1.5" fill="#000"/>
                    {/* Tail */}
                    <path d="M92 75 L85 71 L85 79 Z" fill="#8b7355"/>
                    {/* Fins */}
                    <path d="M105 82 L103 87 L107 87 Z" fill="#8b7355"/>
                    
                    {/* Bubbles */}
                    <circle cx="45" cy="52" r="2" fill="#ffffff" opacity="0.8"/>
                    <circle cx="52" cy="42" r="1.5" fill="#ffffff" opacity="0.6"/>
                    <circle cx="120" cy="48" r="1.8" fill="#ffffff" opacity="0.7"/>
                    <circle cx="75" cy="45" r="1.2" fill="#ffffff" opacity="0.5"/>
                    
                    {/* Aquarium Stand */}
                    <rect x="8" y="105" width="164" height="12" rx="3" fill="#8b4513"/>
                    <rect x="8" y="114" width="164" height="3" fill="#654321"/>
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
