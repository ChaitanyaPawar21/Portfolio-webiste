// src/components/PerformanceSpecs.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useTheme } from './ThemeContext';

const PerformanceSpecs = () => {
  const { darkMode, theme } = useTheme();
  const navigate = useNavigate();

  const skills = [
    {
      category: 'Frontend Fairing',
      items: ['Full-stack','React & Next.js', 'Tailwind CSS'],
      level: 95,
      route: '/frontend-fairing',
      backgroundImage: '/assets/parts/bike.png',
    },
    {
      category: 'Backend Engine',
      items: ['Node.js', 'MongoDB', 'GoLang'],
      level: 10,
      route: '/backend-engine',
      backgroundImage: '/assets/parts/inline.png',
    },
    {
      category: 'DevOps ECU',
      items: [ 'Docker', 'AWS', 'Kubernetes'],
      level: 60,
      route: '/devops-ecu',
      backgroundImage: '/assets/parts/ecu.png',
    },
    {
      category: 'DSA (C++) Torque',
      items: ['Maps & Sets', 'Trees & Graphs', 'Sorting & Searching'],
      level: 30,
      route: '/data-structures',
      backgroundImage: '/assets/parts/torque.png',
    },
  ];

  return (
    <div className={`${theme.border} border-t pt-12`}>
      <h3 className={`text-2xl font-bold mb-8 ${theme.accent}`}>
        PERFORMANCE SPECIFICATIONS 
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill) => (
          <button
            key={skill.category}
            onClick={() => navigate(skill.route)}
            className={`${theme.bgTertiary} p-6 ${theme.border} border ${theme.cardHover} transition-all text-left cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 relative overflow-hidden`}
            style={{
              backgroundImage: `url('${skill.backgroundImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Overlay for background image readability */}
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-base md:text-lg tracking-wider">
                  {skill.category.toUpperCase()}
                </h4>
                <Zap size={20} className={theme.accent} />
              </div>
              <div className="mb-4">
                <div
                  className={`${darkMode ? 'bg-gray-700' : 'bg-gray-300'} h-2 rounded-full overflow-hidden`}
                >
                  <div
                    className={`${
                      darkMode
                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                        : 'bg-gradient-to-r from-orange-600 to-red-600'
                    } h-full transition-all duration-1000`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className={`text-right ${theme.accent} text-sm mt-1 font-bold`}>
                  {skill.level}%
                </div>
              </div>
              <ul className="space-y-2 text-sm text-white">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-start">
                    <span className={`${theme.accent} mr-2`}>▸</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
          </button>
        ))}
      </div>
      <br></br>
      (If bar is less than 50% = skill is still in achieving mode)
    </div>
    
  );
};

export default PerformanceSpecs;