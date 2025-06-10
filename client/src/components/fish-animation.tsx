import { useEffect, useState } from "react";

interface Fish {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color: string;
  secondaryColor: string;
  type: string;
}

export default function FishAnimation() {
  const [fish, setFish] = useState<Fish[]>([]);

  useEffect(() => {
    const createFish = () => {
      const fishTypes = [
        { color: "#FF6B35", secondaryColor: "#FFD23F", type: "clownfish" },
        { color: "#4ECDC4", secondaryColor: "#45B7B8", type: "angelfish" },
        { color: "#FF9F43", secondaryColor: "#FD79A8", type: "guppy" },
        { color: "#5F27CD", secondaryColor: "#00D2D3", type: "tang" },
        { color: "#E74C3C", secondaryColor: "#F39C12", type: "betta" },
        { color: "#2ECC71", secondaryColor: "#27AE60", type: "tetra" }
      ];

      return Array.from({ length: 8 }, (_, i) => {
        const fishType = fishTypes[i % fishTypes.length];
        return {
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          size: 40 + Math.random() * 60,
          color: fishType.color,
          secondaryColor: fishType.secondaryColor,
          type: fishType.type
        };
      });
    };

    setFish(createFish());

    const animateFish = () => {
      setFish(prevFish => 
        prevFish.map(f => {
          let newX = f.x + f.speedX;
          let newY = f.y + f.speedY;
          let newSpeedX = f.speedX;
          let newSpeedY = f.speedY;

          // Bounce off screen edges
          if (newX <= 0 || newX >= window.innerWidth - f.size) {
            newSpeedX = -newSpeedX;
            newX = Math.max(0, Math.min(window.innerWidth - f.size, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight - f.size * 0.6) {
            newSpeedY = -newSpeedY;
            newY = Math.max(0, Math.min(window.innerHeight - f.size * 0.6, newY));
          }

          return {
            ...f,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY
          };
        })
      );
    };

    const interval = setInterval(animateFish, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Fish Animation Layer */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: 1,
          width: '100vw', 
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        {fish.map(f => (
          <div
            key={f.id}
            className="absolute transition-all duration-100 ease-linear"
            style={{
              left: f.x,
              top: f.y,
              transform: f.speedX > 0 ? 'scaleX(-1)' : 'scaleX(1)',
            }}
          >
            {/* Aquarium Fish SVG */}
            <svg
              width={f.size}
              height={f.size * 0.6}
              viewBox="0 0 100 60"
              className="drop-shadow-md opacity-60"
            >
              {/* Fish Body */}
              <ellipse
                cx="50"
                cy="30"
                rx="25"
                ry="15"
                fill={f.color}
                stroke={f.secondaryColor}
                strokeWidth="1"
              />
              
              {/* Fish Tail */}
              <path
                d="M25 30 L10 20 L15 30 L10 40 Z"
                fill={f.secondaryColor}
                stroke={f.color}
                strokeWidth="0.5"
              />
              
              {/* Dorsal Fin */}
              <path
                d="M40 15 Q50 10 60 15 Q55 20 50 22 Q45 20 40 15"
                fill={f.secondaryColor}
                opacity="0.8"
              />
              
              {/* Ventral Fin */}
              <path
                d="M40 45 Q50 50 60 45 Q55 40 50 38 Q45 40 40 45"
                fill={f.secondaryColor}
                opacity="0.8"
              />
              
              {/* Side Fins */}
              <ellipse
                cx="45"
                cy="22"
                rx="6"
                ry="4"
                fill={f.secondaryColor}
                opacity="0.7"
                transform="rotate(-30 45 22)"
              />
              <ellipse
                cx="45"
                cy="38"
                rx="6"
                ry="4"
                fill={f.secondaryColor}
                opacity="0.7"
                transform="rotate(30 45 38)"
              />
              
              {/* Fish Eye */}
              <circle cx="65" cy="26" r="4" fill="white" />
              <circle cx="65" cy="26" r="3" fill="black" />
              <circle cx="66" cy="25" r="1" fill="white" />
              
              {/* Fish Patterns based on type */}
              {f.type === 'clownfish' && (
                <>
                  <ellipse cx="35" cy="30" rx="2" ry="12" fill="white" opacity="0.9" />
                  <ellipse cx="50" cy="30" rx="2" ry="12" fill="white" opacity="0.9" />
                  <ellipse cx="65" cy="30" rx="2" ry="12" fill="white" opacity="0.9" />
                </>
              )}
              
              {f.type === 'angelfish' && (
                <>
                  <path d="M35 20 Q40 30 35 40" stroke={f.secondaryColor} strokeWidth="2" fill="none" opacity="0.7" />
                  <path d="M55 20 Q60 30 55 40" stroke={f.secondaryColor} strokeWidth="2" fill="none" opacity="0.7" />
                </>
              )}
              
              {(f.type === 'guppy' || f.type === 'betta') && (
                <>
                  <circle cx="40" cy="25" r="2" fill={f.secondaryColor} opacity="0.8" />
                  <circle cx="55" cy="22" r="1.5" fill={f.secondaryColor} opacity="0.8" />
                  <circle cx="45" cy="35" r="1.5" fill={f.secondaryColor} opacity="0.8" />
                </>
              )}
              
              {/* Gill Line */}
              <path
                d="M30 22 Q35 30 30 38"
                stroke={f.secondaryColor}
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Floating Bubbles */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-blue-300 opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 8}px`,
              height: `${4 + Math.random() * 8}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Aquatic Background Effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{ zIndex: 0 }}
      >
        <div 
          className="w-full h-full animate-pulse"
          style={{
            background: `
              radial-gradient(ellipse at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, rgba(147, 197, 253, 0.05) 0%, transparent 70%)
            `,
            animationDuration: '8s'
          }}
        />
      </div>
    </>
  );
}