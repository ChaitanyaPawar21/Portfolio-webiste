// src/components/Navbar.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

const Navbar = ({ activeSection, setActiveSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, theme, setShowThemeSelector } = useTheme();

  const navItems = ['GARAGE', 'BUILD SHEET', 'CUSTOM BUILDS', 'ROAD HISTORY', 'PIT STOP'];
  const navSections = ['garage', 'buildsheet', 'builds', 'history', 'contact'];

  return (
    <nav
      className={`fixed top-0 w-full ${theme.border}/90 backdrop-blur-sm z-40 ${theme.border} border-b`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-16 lg:px-18">
        <div className="flex items-center justify-between h-16">
          <div className={`text-2xl font-bold ${theme.accent} flex items-center gap-2`}>
            <img 
              src='/assets/bikes/logoWhite.png'
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
            rapt0r
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setShowThemeSelector(true)}

            className={`hidden md:flex items-center gap-2 ${theme.bgTertiary} ${theme.border} border px-4 py-2 ${theme.textSecondary} hover:${theme.accent} transition-all`}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            <span className="text-sm font-semibold">CHANGE RIDE</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, idx) => (
              <button
                key={item}
                onClick={() => setActiveSection(navSections[idx])}
                className={`${theme.textSecondary} ${theme.accent.replace(
                  'text-',
                  'hover:text-'
                )} transition-colors font-semibold tracking-wider text-sm`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${theme.textSecondary}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden ${theme.bgSecondary} ${theme.border} border-t`}>
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => setShowThemeSelector(true)}
              className={`flex items-center gap-2 w-full ${theme.bgTertiary} ${theme.border} border px-4 py-2 ${theme.textSecondary}`}
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              <span className="text-sm font-semibold">CHANGE RIDE</span>
            </button>
            {navItems.map((item, idx) => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(navSections[idx]);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left ${theme.textSecondary} ${theme.accent.replace(
                  'text-',
                  'hover:text-'
                )} transition-colors font-semibold tracking-wider text-sm py-2`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired
};

export default Navbar;