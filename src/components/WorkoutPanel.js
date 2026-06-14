import React, { useState } from 'react';
import Modal from './Modal';
import { ROUTINE_TEMPLATES } from '../data/initialData';

const DAY_COLORS = {
  blue:   { bg: 'rgba(59,130,246,0.12)',  text: '#60a5fa',  border: 'rgba(59,130,246,0.25)' },
  teal:   { bg: 'rgba(20,184,166,0.12)',  text: '#2dd4bf',  border: 'rgba(20,184,166,0.25)' },
  purple: { bg: 'rgba(168,85,247,0.12)', text: '#c084fc', border: 'rgba(168,85,247,0.25)' },
  amber:  { bg: 'rgba(245,158,11,0.12)',  text: '#fbbf24',  border: 'rgba(245,158,11,0.25)' },
};

const exFields = [
  { key: 'name',   label: 'Exercise name' },
  { key: 'sets',   label: 'Sets × Reps (e.g. 4×8)' },
  { key: 'target', label: 'Target / Weight progression' },
  { key: 'note',   label: 'Note (optional)' },
];

export default function WorkoutPanel({
  activeRoutine, setActiveRoutine, getRoutine, updateRoutineExercises
}) {
  const routine = getRoutine(activeRoutine);
  const dayKeys = Object.keys(routine.days);
  const [activeDay, setActiveDay] = useState(dayKeys[0]);
  const [activePhase, setActivePhase] = useState(routine.phases[0].id);
  const [modal, setModal] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // When routine changes, reset selections
  const handleRoutineChange = (id) => {
    setActiveRoutine(id);
    const r = ROUTINE_TEMPLATES[id];
    const days = Object.keys(r.days);
    setActiveDay(days[0]);
    setActivePhase(r.phases[0].id);
    setShowSettings(false);
  };

  const currentExercises = (routine.exercises?.[activeDay]?.[activePhase]) || [];
  const currentPhase = routine.phases.find(p => p.id === activePhase);

  const saveEx = (values) => {
    const list = currentExercises.map(e => e.id === modal.item.id ? { ...e, ...values } : e);
    updateRoutineExercises(activeRoutine, activeDay, activePhase, list);
  };

  const addEx = (values) => {
    const list = [...currentExercises, { id: `e-${Date.now()}`, ...values }];
    updateRoutineExercises(activeRoutine, activeDay, activePhase, list);
  };

  const deleteEx = (id) => {
    const list = currentExercises.filter(e => e.id !== id);
    updateRoutineExercises(activeRoutine, activeDay, activePhase, list);
  };

  return (
    <div className="panel workout-panel">
      {/* Panel header */}
      <div className="panel-header">
        <div className="panel-header-left">
          <span className="panel-icon">🏋️</span>
          <div>
            <div className="panel-title">Workout Routine</div>
            <div className="panel-subtitle">{routine.name} · {routine.description}</div>
          </div>
        </div>
        <button className={`icon-btn ${showSettings ? 'active' : ''}`} onClick={() => setShowSettings(s => !s)} title="Settings">
          ⚙️
        </button>
      </div>

      {/* Settings dropdown */}
      {showSettings && (
        <div className="settings-panel">
          <div className="settings-label">Select routine</div>
          <div className="routine-list">
            {Object.values(ROUTINE_TEMPLATES).map(r => (
              <button
                key={r.id}
                className={`routine-option ${activeRoutine === r.id ? 'active' : ''}`}
                onClick={() => handleRoutineChange(r.id)}
              >
                <div className="routine-option-name">{r.name}</div>
                <div className="routine-option-desc">{r.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="panel-body">
        {/* Week schedule strip */}
        <div className="schedule-strip">
          {routine.schedule.map((d, i) => {
            const dayInfo = routine.days[d];
            const col = dayInfo ? DAY_COLORS[dayInfo.color] : null;
            const isRest = !dayInfo;
            return (
              <div
                key={i}
                className="schedule-cell"
                style={col ? { background: col.bg, color: col.text, borderColor: col.border } : {}}
              >
                <span className="sched-day-num">D{i + 1}</span>
                <span className="sched-day-name">{isRest ? 'Rest' : d.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>

        {/* Phase selector */}
        <div className="selector-row">
          {routine.phases.map(ph => (
            <button
              key={ph.id}
              className={`sel-btn${activePhase === ph.id ? ' active' : ''}`}
              onClick={() => setActivePhase(ph.id)}
            >
              {ph.label} · {ph.weeks}
            </button>
          ))}
        </div>

        {/* Day selector */}
        <div className="selector-row">
          {dayKeys.map(d => {
            const col = DAY_COLORS[routine.days[d]?.color] || {};
            const isActive = activeDay === d;
            return (
              <button
                key={d}
                className="sel-btn day-sel"
                style={isActive ? { background: col.bg, color: col.text, borderColor: col.border } : {}}
                onClick={() => setActiveDay(d)}
              >
                {d}
              </button>
            );
          })}
        </div>

        {/* Exercises card */}
        <div className="card">
          <div className="card-title-row">
            <span className="card-title">{routine.days[activeDay]?.label}</span>
            <button className="btn-add" onClick={() => setModal({ type: 'add' })}>+ Add</button>
          </div>
          <div className="exercise-list">
            {currentExercises.map((ex, i) => (
              <div key={ex.id} className="exercise-row">
                <div className="ex-left">
                  <div className="ex-name">{i + 1}. {ex.name}</div>
                  <div className="ex-detail">{ex.sets}{ex.note ? ` · ${ex.note}` : ''}</div>
                </div>
                <div className="ex-right">
                  <div className="ex-target">{ex.target}</div>
                  <div className="ex-actions">
                    <button onClick={() => setModal({ type: 'edit', item: ex })}>Edit</button>
                    <button className="del" onClick={() => deleteEx(ex.id)}>Del</button>
                  </div>
                </div>
              </div>
            ))}
            {currentExercises.length === 0 && (
              <div className="empty-state">No exercises yet — hit "+ Add" to add one.</div>
            )}
          </div>
        </div>

        {currentPhase && (
          <div className="tip-box">💡 {currentPhase.tip}</div>
        )}
      </div>

      {modal?.type === 'edit' && (
        <Modal isOpen title="Edit exercise" onClose={() => setModal(null)}
          fields={exFields} initialValues={modal.item} onSave={saveEx} />
      )}
      {modal?.type === 'add' && (
        <Modal isOpen title="Add exercise" onClose={() => setModal(null)}
          fields={exFields} onSave={addEx} />
      )}
    </div>
  );
}
