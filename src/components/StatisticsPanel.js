import React from 'react';
import { ROUTINE_TEMPLATES } from '../data/initialData';

function formatDateLabel(dateKey) {
  if (!dateKey) {
    return 'No check-ins yet';
  }

  const [year, month, day] = dateKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function StatCard({ label, value, detail }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {detail && <div className="stat-detail">{detail}</div>}
    </div>
  );
}

export default function StatisticsPanel({ state, stats, onCheckInToday, onClearHistory }) {
  const activeRoutine = state.activeRoutine;
  const lastCheckInText = stats.lastCheckIn ? formatDateLabel(stats.lastCheckIn) : 'No activity yet';
  const routineLabel = ROUTINE_TEMPLATES[activeRoutine]?.name || activeRoutine || 'Routine';

  return (
    <div className="panel stats-panel">
      <div className="panel-header">
        <div className="panel-header-left">
          <span className="panel-icon">📊</span>
          <div>
            <div className="panel-title">Statistics</div>
            <div className="panel-subtitle">Streaks, consistency, and recent activity</div>
          </div>
        </div>
        <button className="icon-btn" onClick={() => onCheckInToday()} title="Log today's workout">
          +
        </button>
      </div>

      <div className="panel-body">
        <div className="stats-hero">
          <div className="stats-hero-kicker">Current routine</div>
          <div className="stats-hero-title">{routineLabel}</div>
          <div className="stats-hero-copy">
            Log a workout each day you train. The streak updates from the saved check-ins.
          </div>
        </div>

        <div className="stats-grid">
          <StatCard label="Current streak" value={`${stats.currentStreak} day${stats.currentStreak === 1 ? '' : 's'}`} detail="Consecutive logged workout days" />
          <StatCard label="Best streak" value={`${stats.bestStreak} day${stats.bestStreak === 1 ? '' : 's'}`} detail="Your longest active run" />
          <StatCard label="This month" value={`${stats.monthlyCount}`} detail="Check-ins in the current month" />
          <StatCard label="Total check-ins" value={`${stats.totalCheckIns}`} detail={`Last log: ${lastCheckInText}`} />
        </div>

        <div className="stats-section">
          <div className="stats-section-title">Last 7 days</div>
          <div className="activity-strip">
            {stats.last7Days.map(day => (
              <div key={day.dateKey} className={`activity-day${day.checkedIn ? ' active' : ''}`}>
                <span className="activity-day-label">{day.label}</span>
                <span className="activity-day-dot" />
              </div>
            ))}
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-section-title">How it works</div>
          <div className="stats-copy">
            Press the plus button after a training day. The app stores the date locally in your browser and uses it to calculate streaks.
          </div>
        </div>

        <div className="stats-actions">
          <button className="btn-stats-action" onClick={() => onCheckInToday()}>Mark today done</button>
          <button className="btn-stats-action secondary" onClick={() => onClearHistory()}>Clear log</button>
        </div>
      </div>
    </div>
  );
}
