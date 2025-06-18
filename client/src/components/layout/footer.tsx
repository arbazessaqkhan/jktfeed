import { Link } from "wouter";
import { Mail, Phone, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import logoImage from "@assets/rect5_1750246217514.png";

export default function Footer() {

  return (
    <footer className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 text-white py-12 overflow-hidden">
      {/* Aquarium Background Effects */}
      <div className="absolute inset-0 opacity-25">
        {/* Deep Water Background */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 via-blue-800/30 to-blue-950/40"></div>
        
        {/* Animated Water Ripples */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-400/5 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/3 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Aquarium Sand Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-amber-700/30 via-yellow-600/25 to-amber-800/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-900/20 via-amber-800/15 to-amber-900/20"></div>
        
        {/* Scattered Rocks and Stones */}
        <div className="absolute bottom-2 left-10 w-8 h-4 bg-gradient-to-t from-gray-600/40 to-gray-500/30 rounded-full transform rotate-12"></div>
        <div className="absolute bottom-1 left-20 w-6 h-3 bg-gradient-to-t from-slate-700/35 to-slate-600/25 rounded-full transform -rotate-6"></div>
        <div className="absolute bottom-3 right-16 w-10 h-5 bg-gradient-to-t from-stone-600/40 to-stone-500/30 rounded-full transform rotate-8"></div>
        <div className="absolute bottom-1 right-32 w-5 h-2.5 bg-gradient-to-t from-gray-700/35 to-gray-600/25 rounded-full transform -rotate-12"></div>
        <div className="absolute bottom-2 left-1/3 w-7 h-3.5 bg-gradient-to-t from-slate-600/40 to-slate-500/30 rounded-full transform rotate-15"></div>
        <div className="absolute bottom-1 right-1/4 w-4 h-2 bg-gradient-to-t from-stone-700/35 to-stone-600/25 rounded-full transform -rotate-8"></div>
        
        {/* Aquatic Plants - Tall Seaweed */}
        <div className="absolute bottom-0 left-0 w-3 h-24 bg-gradient-to-t from-green-700/50 via-green-600/40 to-green-500/20 rounded-t-full transform rotate-8 animate-pulse" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-0 left-4 w-2 h-28 bg-gradient-to-t from-emerald-700/45 via-emerald-600/35 to-emerald-500/15 rounded-t-full transform rotate-12 animate-pulse" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-0 left-8 w-2.5 h-20 bg-gradient-to-t from-green-600/40 via-green-500/30 to-green-400/10 rounded-t-full transform rotate-6 animate-pulse" style={{animationDelay: '2s', animationDuration: '4.5s'}}></div>
        
        <div className="absolute bottom-0 right-0 w-3.5 h-26 bg-gradient-to-t from-green-800/50 via-green-700/40 to-green-600/20 rounded-t-full transform -rotate-10 animate-pulse" style={{animationDelay: '0.5s', animationDuration: '4.2s'}}></div>
        <div className="absolute bottom-0 right-6 w-2 h-22 bg-gradient-to-t from-emerald-800/45 via-emerald-700/35 to-emerald-600/15 rounded-t-full transform -rotate-15 animate-pulse" style={{animationDelay: '1.5s', animationDuration: '4.8s'}}></div>
        
        {/* Coral Formations */}
        <div className="absolute bottom-3 left-16 w-6 h-8 bg-gradient-to-t from-orange-600/40 via-orange-500/30 to-pink-500/20 rounded-t-xl transform rotate-3 animate-pulse" style={{animationDelay: '3s', animationDuration: '6s'}}></div>
        <div className="absolute bottom-2 right-20 w-5 h-6 bg-gradient-to-t from-red-600/35 via-pink-500/25 to-orange-400/15 rounded-t-lg transform -rotate-5 animate-pulse" style={{animationDelay: '4s', animationDuration: '5.5s'}}></div>
        <div className="absolute bottom-4 left-1/2 w-4 h-5 bg-gradient-to-t from-purple-600/30 via-pink-500/20 to-orange-400/10 rounded-t-md transform rotate-8 animate-pulse" style={{animationDelay: '2.5s', animationDuration: '5.8s'}}></div>
        
        {/* Small Aquatic Plants */}
        <div className="absolute bottom-1 left-24 w-8 h-6 bg-gradient-to-t from-green-600/35 via-green-500/25 to-transparent rounded-t-3xl transform rotate-20 animate-pulse" style={{animationDelay: '1.2s', animationDuration: '3.8s'}}></div>
        <div className="absolute bottom-2 right-28 w-6 h-4 bg-gradient-to-t from-emerald-600/30 via-emerald-500/20 to-transparent rounded-t-2xl transform -rotate-25 animate-pulse" style={{animationDelay: '2.8s', animationDuration: '4.2s'}}></div>
        <div className="absolute bottom-1 left-2/3 w-5 h-3 bg-gradient-to-t from-green-500/25 via-green-400/15 to-transparent rounded-t-xl transform rotate-30 animate-pulse" style={{animationDelay: '3.5s', animationDuration: '3.5s'}}></div>
        
        {/* Floating Bubbles - More Variety */}
        <div className="absolute bottom-4 left-1/5 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute bottom-6 left-2/5 w-1.5 h-1.5 bg-white/35 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-8 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-5 left-1/6 w-1.5 h-1.5 bg-white/35 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-7 right-1/4 w-2.5 h-2.5 bg-white/25 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
        <div className="absolute bottom-9 right-1/6 w-1 h-1 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '2.5s', animationDuration: '3.2s'}}></div>
        <div className="absolute bottom-3 left-3/5 w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '4.8s'}}></div>
        <div className="absolute bottom-10 right-2/5 w-2 h-2 bg-white/25 rounded-full animate-bounce" style={{animationDelay: '4s', animationDuration: '3.8s'}}></div>
        
        {/* Swimming Fish - More Diverse */}
        <div className="absolute top-8 left-0 w-6 h-3 opacity-60">
          <div className="fish-swim-right">
            <svg viewBox="0 0 24 12" className="w-6 h-3 fill-cyan-300/50">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-16 right-0 w-5 h-2.5 opacity-55">
          <div className="fish-swim-left">
            <svg viewBox="0 0 24 12" className="w-5 h-2.5 fill-blue-300/45 transform scale-x-[-1]">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-24 left-1/3 w-4 h-2 opacity-65">
          <div className="fish-swim-right-slow">
            <svg viewBox="0 0 24 12" className="w-4 h-2 fill-teal-300/55">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-12 right-1/4 w-3 h-1.5 opacity-70">
          <div className="fish-swim-left-slow">
            <svg viewBox="0 0 24 12" className="w-3 h-1.5 fill-cyan-400/50 transform scale-x-[-1]">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        {/* Additional Colorful Fish */}
        <div className="absolute top-20 left-1/4 w-5 h-2.5 opacity-60">
          <div className="fish-swim-right">
            <svg viewBox="0 0 24 12" className="w-5 h-2.5 fill-yellow-300/45">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-28 right-1/3 w-4 h-2 opacity-50">
          <div className="fish-swim-left-slow">
            <svg viewBox="0 0 24 12" className="w-4 h-2 fill-orange-300/40 transform scale-x-[-1]">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-14 left-2/3 w-3.5 h-1.8 opacity-65">
          <div className="fish-swim-right-slow">
            <svg viewBox="0 0 24 12" className="w-3.5 h-1.8 fill-pink-300/50">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Aquarium Glass Effect & Light Rays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-950/15"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
      
      {/* Content Backdrop for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/40 to-blue-950/60"></div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
