import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import MotorcyclePortfolio from './MotorcyclePortfolio';
import FrontendFairingPage from './components/certification/frontend';
import BackendEnginePage from './components/certification/backend';
import DevOpsECUPage from './components/certification/DevOps';
import DataStructuresPage from './components/certification/dsa';
import ProfileSelector from './components/profile/ProfileSelector';

function App() {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    // Check if profile was previously selected
    const savedProfileId = localStorage.getItem('selectedProfileId');
    const savedProfileData = localStorage.getItem('selectedProfileData');
    
    if (savedProfileId && savedProfileData) {
      setCurrentProfile(JSON.parse(savedProfileData));
      setProfileLoaded(true);
    }
  }, []);

  const handleProfileSelected = (profile) => {
    setCurrentProfile(profile);
    setProfileLoaded(true);
  };

  const handleSwitchProfile = () => {
    localStorage.removeItem('selectedProfileId');
    localStorage.removeItem('selectedProfileData');
    setProfileLoaded(false);
    setCurrentProfile(null);
  };

  // Show profile selector if no profile loaded
  if (!profileLoaded) {
    return <ProfileSelector onProfileSelected={handleProfileSelected} />;
  }

  // Show main portfolio once profile is selected
  return (
    <ThemeProvider currentProfile={currentProfile}>
      <Router>
        {/* Profile Switcher Button - Optional */}
        <button
          onClick={handleSwitchProfile}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 text-white"
          title={`Viewing as ${currentProfile.name}`}
        >
          <div 
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: currentProfile.colorScheme }}
          />
          <span className="text-sm font-medium">{currentProfile.name}</span>
        </button>

        <Routes>
          <Route path="/" element={<MotorcyclePortfolio profile={currentProfile} />} />
          <Route path="/frontend-fairing" element={<FrontendFairingPage />} />
          <Route path="/backend-engine" element={<BackendEnginePage />} />
          <Route path="/devops-ecu" element={<DevOpsECUPage />} />
          <Route path="/data-structures" element={<DataStructuresPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;