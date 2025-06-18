interface ProductCardProps {
  stage: string;
  number: string;
  description: string;
  protein: string;
  size: string;
  energy: string;
  bgColor: string;
  iconColor: string;
}

export default function ProductCard({
  stage,
  number,
  description,
  protein,
  size,
  energy,
  bgColor,
  iconColor
}: ProductCardProps) {
  return (
    <div className={`bg-gradient-to-br ${bgColor} p-8 rounded-xl shadow-lg hover-lift hover-tilt click-ripple smooth-transition`}>
      <div className="text-center">
        <div className={`${iconColor} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover-rotate float-gentle`}>
          <span className="text-xl font-bold">{number}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2 hover-wiggle" style={{ color: iconColor.includes('primary') ? 'hsl(207, 90%, 28%)' : iconColor.includes('secondary') ? 'hsl(145, 38%, 33%)' : 'hsl(172, 66%, 50%)' }}>
          {stage}
        </h3>
        <p className="text-neutral mb-4">{description}</p>
        <div className="text-left space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Protein:</span>
            <span className="font-bold" style={{ color: iconColor.includes('primary') ? 'hsl(207, 90%, 28%)' : iconColor.includes('secondary') ? 'hsl(145, 38%, 33%)' : 'hsl(172, 66%, 50%)' }}>
              {protein}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Size:</span>
            <span className="font-bold" style={{ color: iconColor.includes('primary') ? 'hsl(207, 90%, 28%)' : iconColor.includes('secondary') ? 'hsl(145, 38%, 33%)' : 'hsl(172, 66%, 50%)' }}>
              {size}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Energy:</span>
            <span className="font-bold" style={{ color: iconColor.includes('primary') ? 'hsl(207, 90%, 28%)' : iconColor.includes('secondary') ? 'hsl(145, 38%, 33%)' : 'hsl(172, 66%, 50%)' }}>
              {energy}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
