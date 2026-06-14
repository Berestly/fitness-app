import React, { useState, useRef, useEffect } from 'react';
import { useAppData } from './hooks/useAppData';
import WorkoutPanel from './components/WorkoutPanel';
import RoadmapPanel from './components/RoadmapPanel';
import StatisticsPanel from './components/StatisticsPanel';
import LoginPage from './components/LoginPage';
import AdminPanel from './components/AdminPanel';
import './App.css';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('fitness_app_current_user');
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const {
    state,
    activeRoutine, setActiveRoutine,
    getRoutine, updateRoutineExercises,
    roadmap, updateRoadmap, updateNodeStatus, updateNode, addRoadmapNode, deleteRoadmapNode,
    resetToDefaults,
    workoutStats, recordWorkoutCheckIn, clearWorkoutCheckIns,
  } = useAppData(currentUser);

  const [showReset, setShowReset] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const printRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('fitness_app_current_user');
    setCurrentUser(null);
    setIsAdmin(false);
  };

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#fff' }}>Loading...</div>;
  }

  if (!currentUser) {
    return <LoginPage onLoginSuccess={setCurrentUser} onAdminMode={() => setIsAdmin(true)} />;
  }

  if (isAdmin) {
    return <AdminPanel onBack={() => setIsAdmin(false)} />;
  }

  const handlePrint = () => {
    setPdfLoading(true);
    setTimeout(() => {
      window.print();
      setPdfLoading(false);
    }, 200);
  };

  return (
    <div className="app" ref={printRef}>
      <header className="app-header no-print">
        <div className="header-left">
          <span className="app-logo">⚡</span>
          <div>
            <h1 className="app-title">My 2-Month Plan</h1>
            <p className="app-subtitle">Workout routine · TypeScript roadmap · streak tracking</p>
          </div>
        </div>
        <div className="header-actions">
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px', marginRight: '15px' }}>
            👤 {currentUser}
          </span>
          <button className="btn-header-action" onClick={handlePrint} disabled={pdfLoading}>
            {pdfLoading ? 'Preparing...' : '↓ Save as PDF'}
          </button>
          <button className="btn-header-action danger" onClick={() => setShowReset(true)}>Reset</button>
          <button className="btn-header-action" onClick={handleLogout} style={{ background: 'rgba(139, 92, 246, 0.2)', color: 'rgba(139, 92, 246, 0.9)' }}>Logout</button>
        </div>
      </header>

      <div className="app-body">
        <WorkoutPanel
          activeRoutine={activeRoutine}
          setActiveRoutine={setActiveRoutine}
          getRoutine={getRoutine}
          updateRoutineExercises={updateRoutineExercises}
        />
        <RoadmapPanel
          roadmap={roadmap}
          updateRoadmap={updateRoadmap}
          updateNodeStatus={updateNodeStatus}
          updateNode={updateNode}
          addRoadmapNode={addRoadmapNode}
          deleteRoadmapNode={deleteRoadmapNode}
        />
        <StatisticsPanel
          state={state}
          stats={workoutStats}
          onCheckInToday={recordWorkoutCheckIn}
          onClearHistory={clearWorkoutCheckIns}
        />
      </div>

      {showReset && (
        <div className="modal-overlay" onClick={() => setShowReset(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>Reset everything?</span>
              <button className="modal-close" onClick={() => setShowReset(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                This will reset all workout edits and roadmap progress back to defaults. Cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowReset(false)}>Cancel</button>
              <button className="btn-save" style={{ background: '#b91c1c' }}
                onClick={() => { resetToDefaults(); setShowReset(false); }}>
                Yes, reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
