import React, { useState } from 'react';
import Modal from './Modal';

const WEEKS = ['1-2', '3-4', '5-6', '7-8'];
const DAYS = ['push', 'pull', 'legs'];
const PHASE_LABELS = { '1-2': 'Phase 1', '3-4': 'Phase 1', '5-6': 'Phase 2', '7-8': 'Phase 2' };
const PHASE_TIPS = {
  '1-2': 'Rest 90 sec between sets. Focus on form — no ego lifting yet.',
  '3-4': 'Rest 75 sec. If top of rep range feels easy with 2 reps in reserve, add weight.',
  '5-6': 'Rest 2 min on compounds, 60 sec on isolation. RPE 8 — last 2 reps should be tough.',
  '7-8': 'Rest 2–3 min on heavy compounds. Week 8 = test week — attempt small PRs.'
};

const exFields = [
  { key: 'name', label: 'Exercise name' },
  { key: 'sets', label: 'Sets × Reps (e.g. 4×8)' },
  { key: 'target', label: 'Target / Weight' },
  { key: 'note', label: 'Note' }
];

export default function Training({ data, onUpdate }) {
  const [week, setWeek] = useState('1-2');
  const [day, setDay] = useState('push');
  const [modal, setModal] = useState(null);

  const exercises = data[day][week] || [];

  const saveEx = (values) => {
    const list = exercises.map(e => e.id === modal.item.id ? { ...e, ...values } : e);
    const updated = { ...data, [day]: { ...data[day], [week]: list } };
    onUpdate(updated);
  };

  const addEx = (values) => {
    const list = [...exercises, { id: Date.now().toString(), ...values }];
    onUpdate({ ...data, [day]: { ...data[day], [week]: list } });
  };

  const deleteEx = (id) => {
    const list = exercises.filter(e => e.id !== id);
    onUpdate({ ...data, [day]: { ...data[day], [week]: list } });
  };

  return (
    <div className="tab-content">
      <div className="selector-row">
        {WEEKS.map(w => (
          <button key={w} className={`sel-btn${week === w ? ' active' : ''}`} onClick={() => setWeek(w)}>
            Weeks {w} · {PHASE_LABELS[w]}
          </button>
        ))}
      </div>

      <div className="selector-row day-selector">
        {DAYS.map(d => (
          <button key={d} className={`sel-btn day-sel${day === d ? ' active' : ''}`} onClick={() => setDay(d)}>
            {d.charAt(0).toUpperCase() + d.slice(1)} day
          </button>
        ))}
      </div>

      <div className="phase-indicator">
        <span className={`phase-dot ${PHASE_LABELS[week] === 'Phase 1' ? 'p1' : 'p2'}`}></span>
        <span className="phase-label">{PHASE_LABELS[week]} — {PHASE_LABELS[week] === 'Phase 1' ? 'Foundation' : 'Intensification'}</span>
      </div>

      <div className="card">
        <div className="card-title-row">
          <span className="card-title">🏋 {data[day].label}</span>
          <button className="btn-add" onClick={() => setModal({ type: 'add' })}>+ Add exercise</button>
        </div>

        <div className="exercise-list">
          {exercises.map((ex, i) => (
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
          {exercises.length === 0 && <div className="empty-state">No exercises yet. Add one above.</div>}
        </div>
      </div>

      <div className="tip-box">{PHASE_TIPS[week]}</div>

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
