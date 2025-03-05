import React, { useState, useEffect } from 'react';

interface StarFieldProps {
  stars?: Array<{
    x: number;
    y: number;
    size: number;
    delay: number;
  }>;
}

const StarField: React.FC<StarFieldProps> = ({ stars: propStars }) => {
  const [stars, setStars] = useState<Array<{
    x: number;
    y: number;
    size: number;
    delay: number;
  }>>(propStars || []);

  useEffect(() => {
    if (propStars) {
      setStars(propStars);
      return;
    }

    const generateStars = () => {
      const newStars = Array.from({ length: 400 }, () => ({
        x: Math.random() * 150 - 25,
        y: Math.random() * 150 - 25,
        size: Math.random() * 0.3 + 0.1,
        delay: Math.random() * 3
      }));
      setStars(newStars);
    };

    generateStars();
    window.addEventListener('resize', generateStars);
    return () => window.removeEventListener('resize', generateStars);
  }, [propStars]);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default StarField;
