import React, { useState, useRef } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import config from '../config';

interface NavButtonProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  modes?: string[];
  isNew?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ title, description, icon, path, modes, isNew }) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [hoverStyle, setHoverStyle] = useState({});
  const { setIsLoading } = useApp();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setHoverStyle({
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverStyle({});
    setIsHovered(false);
  };

  const handleClick = () => {
    try {
      if (config.app.showLoadingIndicators) {
        setIsLoading(true);
        
        // Simulate loading for demo purposes
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
      
      // Scroll to top when navigating
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`relative group ${config.app.same_button_size ? 'h-full' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={path}
        onClick={handleClick}
        className={`block ${config.app.same_button_size ? 'h-full' : ''}`}
      >
        <div
          ref={buttonRef}
          className={`relative overflow-hidden rounded-2xl bg-white/0 backdrop-blur-lg transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-xl p-6 min-h-[120px] flex flex-col items-center justify-center gap-2 group ${config.app.same_button_size ? 'h-full' : ''}`}
          style={hoverStyle}
          onMouseMove={handleMouseMove}
        >
          <div className="relative z-10 flex flex-col items-center gap-2 text-white/90">
            <span className="text-xl font-semibold flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
              {icon}
              {title}
              <ExternalLink className="w-4 h-4" />
            </span>
            <p className="text-sm text-center text-sky-100 opacity-80">{description}</p>
            {isNew && (
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                NIEUW!
              </span>
            )}
            {modes && config.app.display_bekijk_leermethoden && (
              <div className="flex items-center gap-1 text-sky-200 text-sm mt-1">
                <ChevronDown className="w-4 h-4" />
                Bekijk leermethoden
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {modes && isHovered && config.app.display_bekijk_leermethoden && (
        <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-xl overflow-hidden shadow-lg">
          <div className="p-4">
            <ul className="space-y-2">
              {modes.map((mode, index) => (
                <li
                  key={index}
                  className="text-sm text-sky-100 hover:text-white transition-colors duration-200 flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                  {mode}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavButton;
