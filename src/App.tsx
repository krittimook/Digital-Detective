import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { MissionsHubPage } from './pages/MissionsHubPage';
import { Mission1ImageDetective } from './pages/missions/Mission1ImageDetective';
import { Mission2ImagePuzzle } from './pages/missions/Mission2ImagePuzzle';
import { Mission3ScamDecoder } from './pages/missions/Mission3ScamDecoder';
import { Mission4PrivacyGuardian } from './pages/missions/Mission4PrivacyGuardian';
import { Mission5MasterChallenge } from './pages/missions/Mission5MasterChallenge';
import { KnowledgePage } from './pages/KnowledgePage';
import { StatsPage } from './pages/StatsPage';
import { loadUserStats } from './utils/storage';
import { MissionId, UserStats } from './types/game';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userStats, setUserStats] = useState<UserStats>(loadUserStats());

  const refreshStats = () => {
    setUserStats(loadUserStats());
  };

  useEffect(() => {
    refreshStats();
  }, [currentTab]);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEnterWebsite = () => {
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartMission = (missionId: MissionId) => {
    setCurrentTab(missionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5FF] text-[#241B35]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onEnterWebsite={handleEnterWebsite}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        
        {/* 1. Welcome Homepage (Welcome & Information Only) */}
        {currentTab === 'home' && (
          <HomePage
            onEnterWebsite={handleEnterWebsite}
          />
        )}

        {/* 2. Main Application: Dashboard */}
        {currentTab === 'dashboard' && (
          <DashboardPage
            userStats={userStats}
            onNavigate={handleNavigate}
            onStartMission={handleStartMission}
          />
        )}

        {/* 3. Main Application: Missions Hub */}
        {currentTab === 'missions' && (
          <MissionsHubPage
            userStats={userStats}
            onStartMission={handleStartMission}
            onNavigateToKnowledge={() => handleNavigate('knowledge')}
          />
        )}

        {/* 4. The 5 Playable Missions */}
        {currentTab === 'mission-1' && (
          <Mission1ImageDetective
            onReturnToMissions={() => handleNavigate('missions')}
            onNavigateToKnowledge={() => handleNavigate('knowledge')}
          />
        )}

        {currentTab === 'mission-2' && (
          <Mission2ImagePuzzle
            onReturnToMissions={() => handleNavigate('missions')}
            onNavigateToKnowledge={() => handleNavigate('knowledge')}
          />
        )}

        {currentTab === 'mission-3' && (
          <Mission3ScamDecoder
            onReturnToMissions={() => handleNavigate('missions')}
            onNavigateToKnowledge={() => handleNavigate('knowledge')}
          />
        )}

        {currentTab === 'mission-4' && (
          <Mission4PrivacyGuardian
            onReturnToMissions={() => handleNavigate('missions')}
            onNavigateToKnowledge={() => handleNavigate('knowledge')}
          />
        )}

        {currentTab === 'mission-5' && (
          <Mission5MasterChallenge
            onReturnToMissions={() => handleNavigate('missions')}
            onNavigateToKnowledge={() => handleNavigate('knowledge')}
          />
        )}

        {/* 5. Main Application: Knowledge Center */}
        {currentTab === 'knowledge' && (
          <KnowledgePage />
        )}

        {/* 6. Main Application: Statistics */}
        {currentTab === 'stats' && (
          <StatsPage
            userStats={userStats}
            onStatsUpdated={(updated) => setUserStats(updated)}
            onStartMission={handleStartMission}
          />
        )}

      </main>

      {/* Application Footer (Shown in the main application area) */}
      {currentTab !== 'home' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}
