import { useEffect, useState } from "react";

interface Fish {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  direction: number;
  color: string;
  stripeColor: string;
  fishType: string;
}

export default function FishAnimation() {
  const [fish, setFish] = useState<Fish[]>([]);

  useEffect(() => {
    // Initialize fish with better performance
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    // Aquarium fish colors and patterns
    const aquariumColors = [
      { body: "#FF6B35", stripes: "#FFD23F", name: "orange-clownfish" },
      { body: "#4ECDC4", stripes: "#45B7B8", name: "turquoise-angelfish" },
      { body: "#FF9F43", stripes: "#FD79A8", name: "gold-guppy" },
      { body: "#5F27CD", stripes: "#00D2D3", name: "purple-tang" },
      { body: "#E74C3C", stripes: "#F39C12", name: "red-betta" },
      { body: "#2ECC71", stripes: "#27AE60", name: "green-tetra" }
    ];

    const initialFish: Fish[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      speed: 0.2 + Math.random() * 0.4,
      size: 50 + Math.random() * 60,
      direction: Math.random() * Math.PI * 2,
      color: aquariumColors[i % aquariumColors.length].body,
      stripeColor: aquariumColors[i % aquariumColors.length].stripes,
      fishType: aquariumColors[i % aquariumColors.length].name
    }));

    setFish(initialFish);

    const animateFish = () => {
      setFish(prevFish => 
        prevFish.map(f => {
          let newX = f.x + Math.cos(f.direction) * f.speed;
          let newY = f.y + Math.sin(f.direction) * f.speed;
          let newDirection = f.direction;

          // Bounce off edges with screen boundaries
          const maxWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
          const maxHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
          
          if (newX <= 0 || newX >= maxWidth) {
            newDirection = Math.PI - f.direction;
            newX = Math.max(0, Math.min(maxWidth, newX));
          }
          if (newY <= 0 || newY >= maxHeight) {
            newDirection = -f.direction;
            newY = Math.max(0, Math.min(maxHeight, newY));
          }

          // Occasionally change direction randomly (less frequent for smoother movement)
          if (Math.random() < 0.001) {
            newDirection = Math.random() * Math.PI * 2;
          }

          return {
            ...f,
            x: newX,
            y: newY,
            direction: newDirection
          };
        })
      );
    };

    const interval = setInterval(animateFish, 100); // Slower animation frame rate for smoother movement
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" style={{ minHeight: '100vh' }}>
      {fish.map(f => (
        <div
          key={f.id}
          className="absolute transition-transform duration-75 ease-linear"
          style={{
            left: f.x,
            top: f.y,
            transform: `rotate(${f.direction}rad)`,
          }}
        >
          <svg
            width={f.size}
            height={f.size * 0.6}
            viewBox="0 0 120 72"
            className="drop-shadow-lg"
          >
            {/* Main fish body with gradient */}
            <defs>
              <radialGradient id={`fishGradient-${f.id}`} cx="0.5" cy="0.3">
                <stop offset="0%" stopColor={f.color} stopOpacity="0.9" />
                <stop offset="70%" stopColor={f.color} stopOpacity="0.7" />
                <stop offset="100%" stopColor={f.stripeColor} stopOpacity="0.6" />
              </radialGradient>
              <linearGradient id={`finGradient-${f.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={f.stripeColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={f.color} stopOpacity="0.6" />
              </linearGradient>
            </defs>
            
            {/* Fish body - more realistic shape */}
            <ellipse
              cx="50"
              cy="36"
              rx="30"
              ry="15"
              fill={`url(#fishGradient-${f.id})`}
              stroke={f.stripeColor}
              strokeWidth="0.5"
            />
            
            {/* Fish stripes/patterns */}
            {f.fishType.includes('clownfish') && (
              <>
                <ellipse cx="35" cy="36" rx="3" ry="12" fill="white" opacity="0.8" />
                <ellipse cx="50" cy="36" rx="3" ry="12" fill="white" opacity="0.8" />
                <ellipse cx="65" cy="36" rx="3" ry="12" fill="white" opacity="0.8" />
              </>
            )}
            
            {f.fishType.includes('angelfish') && (
              <>
                <path d="M25 36 Q35 28 45 36 Q35 44 25 36" fill={f.stripeColor} opacity="0.6" />
                <path d="M55 36 Q65 28 75 36 Q65 44 55 36" fill={f.stripeColor} opacity="0.6" />
              </>
            )}
            
            {/* Fish tail - forked design */}
            <path
              d="M20 36 L8 24 L12 36 L8 48 Z"
              fill={`url(#finGradient-${f.id})`}
              stroke={f.stripeColor}
              strokeWidth="0.5"
            />
            
            {/* Dorsal fin */}
            <path
              d="M40 21 Q50 15 60 21 Q55 24 50 25 Q45 24 40 21"
              fill={`url(#finGradient-${f.id})`}
              opacity="0.8"
            />
            
            {/* Ventral fin */}
            <path
              d="M40 51 Q50 57 60 51 Q55 48 50 47 Q45 48 40 51"
              fill={`url(#finGradient-${f.id})`}
              opacity="0.8"
            />
            
            {/* Pectoral fins */}
            <ellipse
              cx="42"
              cy="28"
              rx="8"
              ry="5"
              fill={f.stripeColor}
              opacity="0.7"
              transform="rotate(-20 42 28)"
            />
            <ellipse
              cx="42"
              cy="44"
              rx="8"
              ry="5"
              fill={f.stripeColor}
              opacity="0.7"
              transform="rotate(20 42 44)"
            />
            
            {/* Fish eye with reflection */}
            <circle
              cx="68"
              cy="32"
              r="4"
              fill="white"
            />
            <circle
              cx="68"
              cy="32"
              r="3"
              fill="black"
            />
            <circle
              cx="69"
              cy="31"
              r="1"
              fill="white"
            />
            
            {/* Gill line */}
            <path
              d="M25 28 Q30 36 25 44"
              stroke={f.stripeColor}
              strokeWidth="1"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
      
      {/* Enhanced Floating bubbles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-blue-300 opacity-25 bubble-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`, // Start below viewport
              width: `${6 + Math.random() * 12}px`,
              height: `${6 + Math.random() * 12}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Aquatic plant-like elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`plant-${i}`}
            className="absolute bottom-0 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              height: `${50 + Math.random() * 100}px`,
              width: '3px',
              background: 'linear-gradient(to top, rgba(34, 197, 94, 0.4), transparent)',
              transform: `rotate(${-5 + Math.random() * 10}deg)`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Flowing water effect */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full bg-gradient-to-r from-blue-500 via-transparent to-green-500 animate-pulse"
          style={{
            background: `
              radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(147, 197, 253, 0.05) 0%, transparent 70%)
            `,
            animationDuration: '8s'
          }}
        />
      </div>
    </div>
  );
}