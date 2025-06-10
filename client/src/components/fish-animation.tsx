import { useEffect, useState } from "react";

interface Fish {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  direction: number;
  color: string;
}

export default function FishAnimation() {
  const [fish, setFish] = useState<Fish[]>([]);

  useEffect(() => {
    // Initialize fish with better performance
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    const initialFish: Fish[] = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * screenWidth,
      y: Math.random() * screenHeight,
      speed: 0.2 + Math.random() * 0.4, // Much slower movement
      size: 50 + Math.random() * 60, // Larger fish
      direction: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? "rgba(59, 130, 246, 0.18)" : 
             i % 3 === 1 ? "rgba(16, 185, 129, 0.18)" : "rgba(34, 197, 94, 0.18)"
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
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
            viewBox="0 0 100 60"
            className="drop-shadow-sm"
          >
            {/* Fish body */}
            <ellipse
              cx="40"
              cy="30"
              rx="25"
              ry="12"
              fill={f.color}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
            />
            {/* Fish tail */}
            <path
              d="M15 30 L5 20 L5 40 Z"
              fill={f.color}
              stroke="rgba(59, 130, 246, 0.2)"
              strokeWidth="1"
            />
            {/* Fish fins */}
            <ellipse
              cx="35"
              cy="20"
              rx="8"
              ry="4"
              fill={f.color}
              opacity="0.8"
            />
            <ellipse
              cx="35"
              cy="40"
              rx="8"
              ry="4"
              fill={f.color}
              opacity="0.8"
            />
            {/* Fish eye */}
            <circle
              cx="55"
              cy="28"
              r="3"
              fill="rgba(255, 255, 255, 0.9)"
            />
            <circle
              cx="56"
              cy="27"
              r="1.5"
              fill="rgba(0, 0, 0, 0.8)"
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