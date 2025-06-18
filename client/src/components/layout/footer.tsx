import { Link } from "wouter";
import { Mail, Phone, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import logoImage from "@assets/rect5_1750246217514.png";

export default function Footer() {

  return (
    <footer className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 text-white py-12 overflow-hidden">
      {/* Aquarium Background Effects */}
      <div className="absolute inset-0 opacity-20">
        {/* Water Ripple Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-400/10 to-transparent animate-pulse"></div>
        
        {/* Floating Bubbles */}
        <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-white/25 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-0 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-0 left-1/6 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-2.5 h-2.5 bg-white/15 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
        <div className="absolute bottom-0 right-1/6 w-1 h-1 bg-white/35 rounded-full animate-bounce" style={{animationDelay: '2.5s', animationDuration: '3.2s'}}></div>
        
        {/* Seaweed/Kelp Effects */}
        <div className="absolute bottom-0 left-0 w-8 h-32 bg-gradient-to-t from-green-600/40 via-green-500/30 to-transparent rounded-t-full transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-6 h-24 bg-gradient-to-t from-green-700/30 via-green-600/20 to-transparent rounded-t-full transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-0 left-1/5 w-4 h-20 bg-gradient-to-t from-green-500/25 via-green-400/15 to-transparent rounded-t-full transform rotate-6 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Sand Bottom Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-800/20 via-amber-700/15 to-amber-800/20"></div>
        
        {/* Swimming Fish */}
        <div className="absolute top-8 left-0 w-6 h-3 opacity-60">
          <div className="fish-swim-right">
            <svg viewBox="0 0 24 12" className="w-6 h-3 fill-cyan-300/40">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-16 right-0 w-5 h-2.5 opacity-50">
          <div className="fish-swim-left">
            <svg viewBox="0 0 24 12" className="w-5 h-2.5 fill-blue-300/40 transform scale-x-[-1]">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-24 left-1/3 w-4 h-2 opacity-70">
          <div className="fish-swim-right-slow">
            <svg viewBox="0 0 24 12" className="w-4 h-2 fill-teal-300/50">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-12 right-1/4 w-3 h-1.5 opacity-60">
          <div className="fish-swim-left-slow">
            <svg viewBox="0 0 24 12" className="w-3 h-1.5 fill-cyan-400/40 transform scale-x-[-1]">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Aquarium Glass Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-950/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">JK Trout Feed</h3>
            <p className="text-blue-200 mb-4">GREEN GLOBE AGAIN</p>
            <p className="text-blue-100 mb-6">
              Advanced manufacturing facility producing premium trout feed with superior nutritional profiles and proven results in aquaculture.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@jktroutfeed.com" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Email Us">
                <Mail className="w-6 h-6" />
              </a>
              <a href="tel:+91-123-456-7890" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Call Us">
                <Phone className="w-6 h-6" />
              </a>
              
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Facebook">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Instagram">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors hover-glow click-ripple btn-bounce" title="Pinterest">
                <FaPinterest className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/feeding-guide" className="hover:text-white transition-colors">Feeding Guide</Link></li>
              <li><Link href="/team" className="hover:text-white transition-colors">Team</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="/feeding-guide#calculator" className="hover:text-white transition-colors">Feeding Calculator</a></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Technical Specifications</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Quality Assurance</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Product Catalog</a></li>
              <li>
                <a 
                  href="https://wa.me/923369976123" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover-glow"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <p className="text-blue-200 text-sm">&copy; 2024 JK Trout Feed. All rights reserved.</p>
          <div className="flex items-center text-blue-200 text-sm">
            <span className="mr-2">Designed by</span>
            <a href="https://www.quantafons.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity mr-1">
              <img src={logoImage} alt="QuantaFONS" className="h-4 w-auto inline-block" />
            </a>
            <a href="https://www.quantafons.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-100 transition-colors">
              QuantaFONS
            </a>
          </div>
          <p className="text-blue-200 text-sm">Manufacturing Excellence in Kashmir</p>
        </div>
      </div>
    </footer>
  );
}
