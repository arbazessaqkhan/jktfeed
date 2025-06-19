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
              <SheetContent className="bg-white">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">Mobile navigation menu with site links</SheetDescription>
                
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
