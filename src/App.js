// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import MotorcyclePortfolio from './MotorcyclePortfolio';
import FrontendFairingPage from './components/certification/frontend';
import BackendEnginePage from './components/certification/backend';
import DevOpsECUPage from './components/certification/DevOps';
import DataStructuresPage from './components/certification/dsa';
import ProfileSelector from './components/profile/ProfileSelector';
import AdminTerminal from './components/admin/AdminTerminal';

function App() {
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);

  const handleProfileSelected = (profile) => {
    // Save selection first so a reload (if any) keeps state
    localStorage.setItem('selectedProfileId', profile.id || '');
    localStorage.setItem('selectedProfileData', JSON.stringify(profile));

    setCurrentProfile(profile);
    setProfileLoaded(true);

    // route selection using react-router (no full reload)
    if (profile.name === 'Admin') {
      setRedirectPath('/admin');
    } else if (profile.name === 'Recruiter') {
      setRedirectPath('/recruiter');
    } else if (profile.name === 'Stalker') {
      setRedirectPath('/stalker');
    } else {
      setRedirectPath('/'); // default home
    }
  };

  const handleSwitchProfile = () => {
    localStorage.removeItem('selectedProfileId');
    localStorage.removeItem('selectedProfileData');
    setProfileLoaded(false);
    setCurrentProfile(null);
    setRedirectPath(null);
  };

  const handleOpenFile = (path) => {
    console.log('Opening file:', path);
  };

  const handleOpenSection = (path) => {
    console.log('Opening section:', path);
  };

  return (
    <Router>
      {/* If no profile selected, show selector (still inside Router so we can Navigate later) */}
      {!profileLoaded && <ProfileSelector onProfileSelected={handleProfileSelected} />}

      {/* When we set redirectPath after selecting, perform a client-side navigation */}
      {profileLoaded && redirectPath && <Navigate to={redirectPath} replace={true} />}

      {/* If profile is loaded and is admin-specific UI */}
      {profileLoaded && currentProfile && currentProfile.id === 'profile-1' && (
        <div className="relative">
          <button
            onClick={handleSwitchProfile}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-green-500 text-green-400 font-mono"
            title={`Viewing as ${currentProfile.name}`}
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: currentProfile.colorScheme }}
            />
            <span className="text-sm font-medium">{currentProfile.name}</span>
          </button>

          <AdminTerminal
            fileTreeUrl="/file-tree.json"
            onOpenFile={handleOpenFile}
            onOpenSection={handleOpenSection}
          />
        </div>
      )}

      {/* Main app routes for all other profiles */}
      {profileLoaded && !(currentProfile && currentProfile.id === 'profile-1') && (
        <ThemeProvider currentProfile={currentProfile}>
          {/* Profile Switcher Button */}
          <button
            onClick={handleSwitchProfile}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 text-white"
            title={`Viewing as ${currentProfile?.name}`}
          >
            <div
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: currentProfile?.colorScheme }}
            />
            <span className="text-sm font-medium">{currentProfile?.name}</span>
          </button>

          <Routes>
            <Route path="/" element={<MotorcyclePortfolio profile={currentProfile} />} />
            <Route path="/frontend-fairing" element={<FrontendFairingPage />} />
            <Route path="/backend-engine" element={<BackendEnginePage />} />
            <Route path="/devops-ecu" element={<DevOpsECUPage />} />
            <Route path="/data-structures" element={<DataStructuresPage />} />
            <Route path="/admin" element={<MotorcyclePortfolio profile={currentProfile} />} />
            <Route path="/recruiter" element={<MotorcyclePortfolio profile={currentProfile} />} />
            <Route path="/stalker" element={<MotorcyclePortfolio profile={currentProfile} />} />
            {/* fallback: in case user visits unknown route */}
            <Route path="*" element={<MotorcyclePortfolio profile={currentProfile} />} />
          </Routes>
        </ThemeProvider>
      )}
    </Router>
  );
}

export default App;
