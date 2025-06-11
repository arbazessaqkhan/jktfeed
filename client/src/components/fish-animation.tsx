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
  isEating: boolean;
  eatingTimer: number;
  targetFeedX?: number;
  targetFeedY?: number;
  mouthOpen: boolean;
  huntingMode: boolean;
}

interface FeedParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  isBeingEaten: boolean;
}

export default function FishAnimation() {
  const [fish, setFish] = useState<Fish[]>([]);
  const [feedParticles, setFeedParticles] = useState<FeedParticle[]>([]);

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

      return Array.from({ length: 6 }, (_, i) => {
        const fishType = fishTypes[i % fishTypes.length];
        return {
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3,
          size: 20 + Math.random() * 40,
          color: fishType.color,
          secondaryColor: fishType.secondaryColor,
          type: fishType.type,
          isEating: false,
          eatingTimer: 0,
          mouthOpen: false,
          huntingMode: false
        };
      });
    };

    setFish(createFish());

    // Create feed particles randomly - feed naturally sinks and floats
    const createFeedParticles = () => {
      const newParticles: FeedParticle[] = [];
      for (let i = 0; i < 4; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * (window.innerHeight * 0.7), // Feed mostly in upper/middle areas
          size: 2 + Math.random() * 3,
          opacity: 0.8 + Math.random() * 0.2,
          isBeingEaten: false
        });
      }
      setFeedParticles(newParticles);
    };

    createFeedParticles();

    const animateFish = () => {
      setFish(prevFish => 
        prevFish.map(f => {
          let newX = f.x;
          let newY = f.y;
          let newSpeedX = f.speedX;
          let newSpeedY = f.speedY;
          let newIsEating = f.isEating;
          let newEatingTimer = f.eatingTimer;
          let newMouthOpen = f.mouthOpen;
          let newHuntingMode = f.huntingMode;
          let newTargetFeedX = f.targetFeedX;
          let newTargetFeedY = f.targetFeedY;

          // Find nearest feed particle for realistic hunting behavior
          let nearestFeed: FeedParticle | null = null;
          let nearestDistance = Infinity;
          
          feedParticles.forEach(particle => {
            if (!particle.isBeingEaten) {
              const distance = Math.sqrt(
                Math.pow(f.x + f.size/2 - particle.x, 2) + 
                Math.pow(f.y + f.size/2 - particle.y, 2)
              );
              if (distance < nearestDistance && distance < f.size * 2.5) {
                nearestDistance = distance;
                nearestFeed = particle;
              }
            }
          });

          // Hunting behavior - fish actively seek food
          if (nearestFeed && !newIsEating) {
            newHuntingMode = true;
            newTargetFeedX = nearestFeed.x;
            newTargetFeedY = nearestFeed.y;
            
            // Calculate direction to food
            const dx = nearestFeed.x - (f.x + f.size/2);
            const dy = nearestFeed.y - (f.y + f.size/2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 0) {
              // Move towards food with realistic speed
              const huntingSpeed = 4;
              newSpeedX = (dx / distance) * huntingSpeed;
              newSpeedY = (dy / distance) * huntingSpeed;
            }
            
            // Open mouth when approaching food
            if (nearestDistance < f.size * 1.2) {
              newMouthOpen = true;
            }
            
            // Eat the food when close enough
            if (nearestDistance < f.size/2 + 8) {
              newIsEating = true;
              newEatingTimer = 40; // Extended eating animation
              newMouthOpen = false;
              newHuntingMode = false;
              
              // Mark particle as eaten
              setFeedParticles(prevParticles => 
                prevParticles.map(particle => {
                  if (particle.id === nearestFeed!.id) {
                    return { ...particle, isBeingEaten: true, opacity: 0 };
                  }
                  return particle;
                })
              );
            }
          } else if (!newIsEating) {
            // Normal swimming behavior when not hunting
            newHuntingMode = false;
            newMouthOpen = false;
            
            // Slow down when not hunting
            newSpeedX *= 0.98;
            newSpeedY *= 0.98;
            
            // Add some randomness to movement
            if (Math.random() < 0.05) {
              newSpeedX += (Math.random() - 0.5) * 0.5;
              newSpeedY += (Math.random() - 0.5) * 0.5;
            }
          }

          // Apply movement
          newX += newSpeedX;
          newY += newSpeedY;

          // Bounce off screen edges
          if (newX <= 0 || newX >= window.innerWidth - f.size) {
            newSpeedX = -newSpeedX * 0.8; // Reduce speed on bounce
            newX = Math.max(0, Math.min(window.innerWidth - f.size, newX));
            newHuntingMode = false;
          }
          if (newY <= 0 || newY >= window.innerHeight - f.size * 0.6) {
            newSpeedY = -newSpeedY * 0.8;
            newY = Math.max(0, Math.min(window.innerHeight - f.size * 0.6, newY));
            newHuntingMode = false;
          }

          // Handle eating animation timer
          if (newEatingTimer > 0) {
            newEatingTimer--;
            // Mouth movements during eating
            newMouthOpen = Math.floor(newEatingTimer / 8) % 2 === 0;
          } else {
            newIsEating = false;
            newMouthOpen = false;
          }

          return {
            ...f,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            isEating: newIsEating,
            eatingTimer: newEatingTimer,
            targetFeedX: newTargetFeedX,
            targetFeedY: newTargetFeedY,
            mouthOpen: newMouthOpen,
            huntingMode: newHuntingMode
          };
        })
      );

      // Remove eaten particles and add new ones occasionally
      setFeedParticles(prevParticles => {
        let filtered = prevParticles.filter(p => !p.isBeingEaten);
        
        // Add new particles occasionally - simulate natural feeding
        if (Math.random() < 0.008 && filtered.length < 6) {
          filtered.push({
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight * 0.6), // Feed naturally floats near surface
            size: 3 + Math.random() * 4,
            opacity: 0.8 + Math.random() * 0.2,
            isBeingEaten: false
          });
        }
        
        return filtered;
      });
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
          zIndex: 9999,
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
              transform: f.speedX > 0 ? 'scaleX(1)' : 'scaleX(-1)',
            }}
          >
            {/* Aquarium Fish SVG */}
            <svg
              width={f.size}
              height={f.size * 0.6}
              viewBox="0 0 100 60"
              className={`drop-shadow-sm transition-all duration-300 ${
                f.isEating ? 'opacity-50 scale-105' : 
                f.huntingMode ? 'opacity-35 scale-102' : 
                'opacity-25 scale-100'
              }`}
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
              
              {/* Fish Mouth - animated based on eating state */}
              {f.mouthOpen ? (
                <ellipse 
                  cx="75" 
                  cy="30" 
                  rx="3" 
                  ry="2" 
                  fill="rgba(0,0,0,0.6)" 
                  className="animate-pulse"
                />
              ) : (
                <path 
                  d="M75 30 Q77 28 79 30" 
                  stroke="rgba(0,0,0,0.4)" 
                  strokeWidth="1" 
                  fill="none"
                />
              )}
              
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

      {/* Feed Particles */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9997 }}
      >
        {feedParticles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-amber-500 transition-opacity duration-300"
            style={{
              left: particle.x,
              top: particle.y,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity * 0.4,
              boxShadow: '0 0 2px rgba(245, 158, 11, 0.3)'
            }}
          />
        ))}
      </div>
    </>
  );
}