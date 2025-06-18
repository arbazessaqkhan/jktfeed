import { Link } from "wouter";
import { Mail, Phone, MessageCircle, Facebook, Instagram, Twitter } from "lucide-react";
import { FaPinterest } from "react-icons/fa";
import logoImage from "@assets/rect5_1750246217514.png";

export default function Footer() {

  return (
    <footer className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-950 text-white py-12 overflow-hidden">
      {/* Aquarium Background Effects */}
      <div className="absolute inset-0 opacity-60">
        {/* Deep Water Background */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-600/20 via-blue-800/30 to-blue-950/40"></div>
        
        {/* Animated Water Ripples */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-400/5 to-transparent animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/3 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Aquarium Sand Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-amber-700/70 via-yellow-600/60 to-amber-800/70"></div>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-900/50 via-amber-800/40 to-amber-900/50"></div>
        
        {/* Scattered Rocks and Stones */}
        <div className="absolute bottom-2 left-10 w-12 h-6 bg-gradient-to-t from-gray-600/80 to-gray-500/60 rounded-full transform rotate-12 shadow-lg"></div>
        <div className="absolute bottom-1 left-20 w-8 h-4 bg-gradient-to-t from-slate-700/75 to-slate-600/55 rounded-full transform -rotate-6 shadow-md"></div>
        <div className="absolute bottom-3 right-16 w-14 h-7 bg-gradient-to-t from-stone-600/80 to-stone-500/60 rounded-full transform rotate-8 shadow-lg"></div>
        <div className="absolute bottom-1 right-32 w-7 h-3.5 bg-gradient-to-t from-gray-700/75 to-gray-600/55 rounded-full transform -rotate-12 shadow-md"></div>
        <div className="absolute bottom-2 left-1/3 w-10 h-5 bg-gradient-to-t from-slate-600/80 to-slate-500/60 rounded-full transform rotate-15 shadow-lg"></div>
        <div className="absolute bottom-1 right-1/4 w-6 h-3 bg-gradient-to-t from-stone-700/75 to-stone-600/55 rounded-full transform -rotate-8 shadow-md"></div>
        
        {/* Aquatic Plants - Tall Seaweed */}
        <div className="absolute bottom-0 left-0 w-4 h-32 bg-gradient-to-t from-green-700/90 via-green-600/70 to-green-500/40 rounded-t-full transform rotate-8 animate-pulse shadow-lg" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-0 left-4 w-3 h-36 bg-gradient-to-t from-emerald-700/85 via-emerald-600/65 to-emerald-500/35 rounded-t-full transform rotate-12 animate-pulse shadow-md" style={{animationDelay: '1s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-0 left-8 w-3.5 h-28 bg-gradient-to-t from-green-600/80 via-green-500/60 to-green-400/30 rounded-t-full transform rotate-6 animate-pulse shadow-lg" style={{animationDelay: '2s', animationDuration: '4.5s'}}></div>
        
        <div className="absolute bottom-0 right-0 w-5 h-34 bg-gradient-to-t from-green-800/90 via-green-700/70 to-green-600/40 rounded-t-full transform -rotate-10 animate-pulse shadow-lg" style={{animationDelay: '0.5s', animationDuration: '4.2s'}}></div>
        <div className="absolute bottom-0 right-6 w-3 h-30 bg-gradient-to-t from-emerald-800/85 via-emerald-700/65 to-emerald-600/35 rounded-t-full transform -rotate-15 animate-pulse shadow-md" style={{animationDelay: '1.5s', animationDuration: '4.8s'}}></div>
        
        {/* Coral Formations */}
        <div className="absolute bottom-4 left-16 w-10 h-12 bg-gradient-to-t from-orange-600/80 via-orange-500/60 to-pink-500/40 rounded-t-xl transform rotate-3 animate-pulse shadow-lg" style={{animationDelay: '3s', animationDuration: '6s'}}></div>
        <div className="absolute bottom-3 right-20 w-8 h-10 bg-gradient-to-t from-red-600/75 via-pink-500/55 to-orange-400/35 rounded-t-lg transform -rotate-5 animate-pulse shadow-md" style={{animationDelay: '4s', animationDuration: '5.5s'}}></div>
        <div className="absolute bottom-5 left-1/2 w-6 h-8 bg-gradient-to-t from-purple-600/70 via-pink-500/50 to-orange-400/30 rounded-t-md transform rotate-8 animate-pulse shadow-lg" style={{animationDelay: '2.5s', animationDuration: '5.8s'}}></div>
        
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
        
        {/* Swimming Fish - Large and Visible */}
        <div className="absolute top-8 left-0 w-12 h-6 opacity-85">
          <div className="fish-swim-right">
            <svg viewBox="0 0 24 12" className="w-12 h-6 fill-cyan-400 drop-shadow-lg">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="18" cy="6" r="1.5" className="fill-black/40"/>
              <path d="M16 6 L18 5 L20 6 L18 7 Z" className="fill-cyan-200"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-16 right-0 w-10 h-5 opacity-80">
          <div className="fish-swim-left">
            <svg viewBox="0 0 24 12" className="w-10 h-5 fill-blue-400 transform scale-x-[-1] drop-shadow-lg">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="6" cy="6" r="1.2" className="fill-black/40"/>
              <path d="M4 6 L6 5 L8 6 L6 7 Z" className="fill-blue-200"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-24 left-1/3 w-8 h-4 opacity-90">
          <div className="fish-swim-right-slow">
            <svg viewBox="0 0 24 12" className="w-8 h-4 fill-teal-400 drop-shadow-lg">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="18" cy="6" r="1" className="fill-black/40"/>
              <path d="M16 6 L18 5 L20 6 L18 7 Z" className="fill-teal-200"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-12 right-1/4 w-7 h-3.5 opacity-85">
          <div className="fish-swim-left-slow">
            <svg viewBox="0 0 24 12" className="w-7 h-3.5 fill-cyan-500 transform scale-x-[-1] drop-shadow-lg">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="6" cy="6" r="1" className="fill-black/40"/>
              <path d="M4 6 L6 5 L8 6 L6 7 Z" className="fill-cyan-200"/>
            </svg>
          </div>
        </div>
        
        {/* Tropical Fish - Vibrant Colors */}
        <div className="absolute top-20 left-1/4 w-10 h-5 opacity-90">
          <div className="fish-swim-right">
            <svg viewBox="0 0 24 12" className="w-10 h-5 fill-yellow-400 drop-shadow-lg">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="18" cy="6" r="1.2" className="fill-black/40"/>
              <path d="M16 6 L18 5 L20 6 L18 7 Z" className="fill-yellow-200"/>
              <path d="M8 4 L12 6 L8 8" className="fill-orange-400"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-28 right-1/3 w-9 h-4.5 opacity-85">
          <div className="fish-swim-left-slow">
            <svg viewBox="0 0 24 12" className="w-9 h-4.5 fill-orange-400 transform scale-x-[-1] drop-shadow-lg">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="6" cy="6" r="1.1" className="fill-black/40"/>
              <path d="M4 6 L6 5 L8 6 L6 7 Z" className="fill-orange-200"/>
              <path d="M16 4 L12 6 L16 8" className="fill-red-400"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-14 left-2/3 w-8 h-4 opacity-90">
          <div className="fish-swim-right-slow">
            <svg viewBox="0 0 24 12" className="w-8 h-4 fill-pink-400 drop-shadow-lg">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="18" cy="6" r="1" className="fill-black/40"/>
              <path d="M16 6 L18 5 L20 6 L18 7 Z" className="fill-pink-200"/>
              <path d="M8 4 L12 6 L8 8" className="fill-purple-400"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Aquarium Glass Effect & Light Rays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-950/15"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent animate-pulse" style={{animationDelay: '3s', animationDuration: '8s'}}></div>
      
      {/* Enhanced Underwater Scene */}
      <div className="absolute inset-0 opacity-30">
        {/* Large Rock Formations */}
        <div className="absolute bottom-0 left-12 w-16 h-12 bg-gradient-to-t from-gray-700/60 via-gray-600/50 to-gray-500/40 rounded-t-3xl transform rotate-6 shadow-2xl"></div>
        <div className="absolute bottom-0 right-24 w-20 h-16 bg-gradient-to-t from-slate-800/65 via-slate-700/55 to-slate-600/45 rounded-t-full transform -rotate-8 shadow-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-12 h-10 bg-gradient-to-t from-stone-700/60 via-stone-600/50 to-stone-500/40 rounded-t-2xl transform rotate-12 shadow-xl"></div>
        
        {/* Coral Reef Formations */}
        <div className="absolute bottom-4 left-28 w-10 h-14 bg-gradient-to-t from-orange-700/50 via-orange-600/40 to-pink-500/30 rounded-t-3xl transform rotate-5 shadow-lg animate-pulse" style={{animationDelay: '2s', animationDuration: '7s'}}></div>
        <div className="absolute bottom-3 right-32 w-8 h-12 bg-gradient-to-t from-red-700/45 via-pink-600/35 to-orange-500/25 rounded-t-2xl transform -rotate-8 shadow-lg animate-pulse" style={{animationDelay: '3.5s', animationDuration: '6.5s'}}></div>
        <div className="absolute bottom-5 left-2/5 w-6 h-10 bg-gradient-to-t from-purple-700/40 via-pink-600/30 to-orange-500/20 rounded-t-xl transform rotate-15 shadow-md animate-pulse" style={{animationDelay: '1.5s', animationDuration: '8s'}}></div>
        <div className="absolute bottom-2 right-2/5 w-7 h-9 bg-gradient-to-t from-violet-700/45 via-purple-600/35 to-pink-500/25 rounded-t-lg transform -rotate-12 shadow-md animate-pulse" style={{animationDelay: '4s', animationDuration: '6s'}}></div>
        
        {/* Branching Coral */}
        <div className="absolute bottom-6 left-40 w-12 h-8 bg-gradient-to-r from-orange-600/40 via-red-500/30 to-pink-400/20 rounded-full transform rotate-20 shadow-lg animate-pulse" style={{animationDelay: '5s', animationDuration: '9s'}}></div>
        <div className="absolute bottom-4 right-40 w-10 h-6 bg-gradient-to-l from-purple-600/35 via-pink-500/25 to-orange-400/15 rounded-full transform -rotate-25 shadow-lg animate-pulse" style={{animationDelay: '6s', animationDuration: '7.5s'}}></div>
        
        {/* Sea Anemones */}
        <div className="absolute bottom-1 left-36 w-6 h-4 bg-gradient-to-t from-green-600/40 via-teal-500/30 to-cyan-400/20 rounded-full transform rotate-10 animate-pulse" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-2 right-36 w-5 h-3 bg-gradient-to-t from-blue-600/35 via-purple-500/25 to-pink-400/15 rounded-full transform -rotate-15 animate-pulse" style={{animationDelay: '4.5s', animationDuration: '6.5s'}}></div>
        
        {/* Underwater Vegetation */}
        <div className="absolute bottom-1 left-48 w-14 h-8 bg-gradient-to-t from-green-600/35 via-green-500/25 to-transparent rounded-t-full transform rotate-25 animate-pulse plant-sway" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-2 right-48 w-12 h-6 bg-gradient-to-t from-emerald-600/30 via-emerald-500/20 to-transparent rounded-t-3xl transform -rotate-30 animate-pulse plant-sway" style={{animationDelay: '2.5s', animationDuration: '4.5s'}}></div>
        <div className="absolute bottom-1 left-3/5 w-10 h-5 bg-gradient-to-t from-green-500/25 via-green-400/15 to-transparent rounded-t-2xl transform rotate-35 animate-pulse plant-sway" style={{animationDelay: '3.8s', animationDuration: '3.8s'}}></div>
        <div className="absolute bottom-2 right-3/5 w-8 h-4 bg-gradient-to-t from-teal-500/30 via-teal-400/20 to-transparent rounded-t-xl transform -rotate-40 animate-pulse plant-sway" style={{animationDelay: '5.2s', animationDuration: '4.2s'}}></div>
        
        {/* Starfish on Rocks */}
        <div className="absolute bottom-3 left-44 w-4 h-4 bg-gradient-to-br from-orange-600/50 to-red-500/40 rounded-full transform rotate-45 animate-pulse" style={{animationDelay: '7s', animationDuration: '10s'}}></div>
        <div className="absolute bottom-4 right-44 w-3 h-3 bg-gradient-to-br from-purple-600/45 to-pink-500/35 rounded-full transform rotate-30 animate-pulse" style={{animationDelay: '8.5s', animationDuration: '11s'}}></div>
        
        {/* Additional Swimming Fish - Tropical Varieties */}
        <div className="absolute top-32 left-0 w-7 h-3.5 opacity-55">
          <div className="fish-swim-right">
            <svg viewBox="0 0 24 12" className="w-7 h-3.5 fill-yellow-400/45">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="18" cy="6" r="1" className="fill-black/20"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-36 right-0 w-6 h-3 opacity-60">
          <div className="fish-swim-left-slow">
            <svg viewBox="0 0 24 12" className="w-6 h-3 fill-emerald-400/50 transform scale-x-[-1]">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="6" cy="6" r="1" className="fill-black/20"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-26 left-1/5 w-5 h-2.5 opacity-65">
          <div className="fish-swim-right-slow">
            <svg viewBox="0 0 24 12" className="w-5 h-2.5 fill-violet-400/55">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="18" cy="6" r="0.8" className="fill-black/25"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-30 right-1/5 w-4.5 h-2.2 opacity-70">
          <div className="fish-swim-left">
            <svg viewBox="0 0 24 12" className="w-4.5 h-2.2 fill-rose-400/60 transform scale-x-[-1]">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
              <circle cx="6" cy="6" r="0.8" className="fill-black/25"/>
            </svg>
          </div>
        </div>
        
        {/* School of Small Fish */}
        <div className="absolute top-18 left-2/3 w-3 h-1.5 opacity-50">
          <div className="fish-swim-right">
            <svg viewBox="0 0 24 12" className="w-3 h-1.5 fill-cyan-300/40">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        <div className="absolute top-19 left-2/3 w-2.5 h-1.2 opacity-45">
          <div className="fish-swim-right" style={{animationDelay: '0.2s'}}>
            <svg viewBox="0 0 24 12" className="w-2.5 h-1.2 fill-cyan-300/35">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        <div className="absolute top-20 left-2/3 w-2.8 h-1.4 opacity-50">
          <div className="fish-swim-right" style={{animationDelay: '0.4s'}}>
            <svg viewBox="0 0 24 12" className="w-2.8 h-1.4 fill-cyan-300/40">
              <path d="M2 6 L8 2 L16 6 L8 10 Z M16 6 L20 4 L22 6 L20 8 Z"/>
            </svg>
          </div>
        </div>
        
        {/* Jellyfish */}
        <div className="absolute top-10 left-1/4 w-8 h-12 opacity-40">
          <div className="animate-pulse" style={{animationDelay: '2s', animationDuration: '6s'}}>
            <svg viewBox="0 0 16 20" className="w-8 h-12 fill-pink-300/30">
              <ellipse cx="8" cy="6" rx="6" ry="4"/>
              <path d="M4 10 Q4 16 6 18 M8 10 Q8 17 8 19 M12 10 Q12 16 10 18" stroke="currentColor" strokeWidth="0.5" fill="none" className="stroke-pink-300/25"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-6 right-1/3 w-6 h-9 opacity-35">
          <div className="animate-pulse" style={{animationDelay: '4s', animationDuration: '7s'}}>
            <svg viewBox="0 0 16 20" className="w-6 h-9 fill-cyan-300/25">
              <ellipse cx="8" cy="5" rx="5" ry="3"/>
              <path d="M5 8 Q5 14 7 16 M8 8 Q8 15 8 17 M11 8 Q11 14 9 16" stroke="currentColor" strokeWidth="0.4" fill="none" className="stroke-cyan-300/20"/>
            </svg>
          </div>
        </div>
        
        {/* Sea Urchins */}
        <div className="absolute bottom-1 left-52 w-3 h-3 opacity-50">
          <div className="bg-purple-700/40 rounded-full animate-pulse" style={{animationDelay: '6s', animationDuration: '8s'}}>
            <div className="absolute inset-0 bg-gradient-radial from-purple-600/30 to-transparent rounded-full"></div>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-52 w-2.5 h-2.5 opacity-45">
          <div className="bg-violet-700/35 rounded-full animate-pulse" style={{animationDelay: '7.5s', animationDuration: '9s'}}>
            <div className="absolute inset-0 bg-gradient-radial from-violet-600/25 to-transparent rounded-full"></div>
          </div>
        </div>
        
        {/* Floating Plankton/Particles */}
        <div className="absolute top-8 left-1/6 w-1 h-1 bg-green-400/30 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-22 right-1/8 w-0.5 h-0.5 bg-cyan-400/25 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '5s'}}></div>
        <div className="absolute top-15 left-3/4 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-bounce" style={{animationDelay: '5s', animationDuration: '6s'}}></div>
        <div className="absolute top-25 right-3/4 w-0.8 h-0.8 bg-teal-400/30 rounded-full animate-bounce" style={{animationDelay: '2.5s', animationDuration: '4.5s'}}></div>
        
        {/* Water Current Lines */}
        <div className="absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent animate-pulse" style={{animationDelay: '4s', animationDuration: '12s'}}></div>
        <div className="absolute top-28 left-0 w-full h-0.3 bg-gradient-to-r from-transparent via-blue-400/8 to-transparent animate-pulse" style={{animationDelay: '8s', animationDuration: '15s'}}></div>
        
        {/* Additional Coral Details */}
        <div className="absolute bottom-1 left-60 w-4 h-3 bg-gradient-to-t from-orange-500/30 via-yellow-400/20 to-transparent rounded-full transform rotate-45 animate-pulse" style={{animationDelay: '9s', animationDuration: '11s'}}></div>
        <div className="absolute bottom-2 right-60 w-3.5 h-2.5 bg-gradient-to-t from-red-500/25 via-pink-400/15 to-transparent rounded-full transform -rotate-30 animate-pulse" style={{animationDelay: '10s', animationDuration: '12s'}}></div>
      </div>
      
      {/* Content Backdrop for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/60 to-blue-950/80"></div>
      
      {/* Text Content Background */}
      <div className="absolute inset-x-0 top-0 bottom-0 bg-black/20 backdrop-blur-[1px]"></div>
      
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
