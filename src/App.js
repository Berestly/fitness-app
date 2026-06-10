import React, { useState } from 'react';
import { useAppData } from './hooks/useAppData';
import Overview from './components/Overview';
import Training from './components/Training';
import Nutrition from './components/Nutrition';
import HairCare from './components/HairCare';
import AIPanel from './components/AIPanel';
import './App.css';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'training', label: 'Training' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'haircare', label: 'Hair care' }
];

export default function App() {
  const { data, updateData, resetToDefaults } = useAppData();
  const [activeTab, setActiveTab] = useState('overview');
  const [showReset, setShowReset] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <Overview data={data.overview} onUpdate={d => updateData('overview', d)} />;
      case 'training': return <Training data={data.training} onUpdate={d => updateData('training', d)} />;
      case 'nutrition': return <Nutrition data={data.nutrition} onUpdate={d => updateData('nutrition', d)} />;
      case 'haircare': return <HairCare data={data.hairCare} onUpdate={d => updateData('hairCare', d)} />;
      default: return null;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="app-logo">💪</span>
          <div>
            <h1 className="app-title">8-Week Cutting Program</h1>
            <p className="app-subtitle">72.2 kg · 23% body fat · PPL split</p>
          </div>
        </div>
        <button className="btn-reset" onClick={() => setShowReset(true)}>Reset to defaults</button>
      </header>

      <div className="app-body">
        <main className="main-panel">
          <nav className="tab-nav">
            {TABS.map(t => (
              <button
                key={t.id}
                className={`tab-btn${activeTab === t.id ? ' active' : ''}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="tab-area">
            {renderTab()}
          </div>
        </main>

        <aside className="ai-sidebar">
          <AIPanel appData={data} onApplyEdit={(section, update) => updateData(section, update)} />
        </aside>
      </div>

      {showReset && (
        <div className="modal-overlay" onClick={() => setShowReset(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span>Reset to defaults?</span>
              <button className="modal-close" onClick={() => setShowReset(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                This will erase all your edits and restore the original program data. This cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowReset(false)}>Cancel</button>
              <button className="btn-save" style={{ background: '#b91c1c' }} onClick={() => { resetToDefaults(); setShowReset(false); }}>
                Yes, reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
