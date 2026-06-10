import React, { useState } from 'react';
import Modal from './Modal';

export default function Overview({ data, onUpdate }) {
  const [modal, setModal] = useState(null);

  const openStat = (stat) => setModal({ type: 'stat', item: stat });
  const openPhase = (phase) => setModal({ type: 'phase', item: phase });

  const saveStat = (values) => {
    const updated = data.stats.map(s => s.id === modal.item.id ? { ...s, ...values } : s);
    onUpdate({ ...data, stats: updated });
  };
  const deleteStat = (id) => onUpdate({ ...data, stats: data.stats.filter(s => s.id !== id) });
  const addStat = (values) => onUpdate({ ...data, stats: [...data.stats, { id: Date.now().toString(), ...values }] });

  const savePhase = (values) => {
    const updated = data.phases.map(p => p.id === modal.item.id ? { ...p, ...values } : p);
    onUpdate({ ...data, phases: updated });
  };
  const deletePhase = (id) => onUpdate({ ...data, phases: data.phases.filter(p => p.id !== id) });

  return (
    <div className="tab-content">
      <section className="section-block">
        <div className="section-title-row">
          <h2>Body stats</h2>
          <button className="btn-add" onClick={() => setModal({ type: 'addStat' })}>+ Add stat</button>
        </div>
        <div className="metric-grid">
          {data.stats.map(s => (
            <div key={s.id} className="metric-card">
              <div className="metric-label">{s.label}</div>
              <div className="metric-value">{s.value}</div>
              <div className="metric-sub">{s.sub}</div>
              <div className="item-actions">
                <button onClick={() => openStat(s)}>Edit</button>
                <button className="del" onClick={() => deleteStat(s.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-title-row">
          <h2>8-week structure</h2>
          <button className="btn-add" onClick={() => setModal({ type: 'addPhase' })}>+ Add phase</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Phase</th><th>Weeks</th><th>Focus</th><th>Calories</th><th>Actions</th></tr></thead>
            <tbody>
              {data.phases.map(p => (
                <tr key={p.id}>
                  <td><span className="badge badge-blue">{p.phase}</span></td>
                  <td>{p.weeks}</td>
                  <td>{p.focus}</td>
                  <td>{p.calories}</td>
                  <td>
                    <button className="tbl-btn" onClick={() => openPhase(p)}>Edit</button>
                    <button className="tbl-btn del" onClick={() => deletePhase(p.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-block">
        <h2>Weekly split</h2>
        <div className="day-grid">
          {data.schedule.map(d => (
            <div key={d.day} className={`day-pill day-${d.type}`}>
              <span className="day-name">{d.day}</span>
              <span className="day-label">{d.label}</span>
            </div>
          ))}
        </div>
        <div className="tip-box">Thursday is steady-state cardio only — 30–40 min brisk walk or light cycle.</div>
      </section>

      {modal?.type === 'stat' && (
        <Modal isOpen title="Edit stat" onClose={() => setModal(null)}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'value', label: 'Value' },
            { key: 'sub', label: 'Subtitle' }
          ]}
          initialValues={modal.item} onSave={saveStat} />
      )}
      {modal?.type === 'addStat' && (
        <Modal isOpen title="Add stat" onClose={() => setModal(null)}
          fields={[
            { key: 'label', label: 'Label' },
            { key: 'value', label: 'Value' },
            { key: 'sub', label: 'Subtitle' }
          ]}
          onSave={addStat} />
      )}
      {modal?.type === 'phase' && (
        <Modal isOpen title="Edit phase" onClose={() => setModal(null)}
          fields={[
            { key: 'phase', label: 'Phase name' },
            { key: 'weeks', label: 'Weeks' },
            { key: 'focus', label: 'Focus' },
            { key: 'calories', label: 'Calories' }
          ]}
          initialValues={modal.item} onSave={savePhase} />
      )}
      {modal?.type === 'addPhase' && (
        <Modal isOpen title="Add phase" onClose={() => setModal(null)}
          fields={[
            { key: 'phase', label: 'Phase name' },
            { key: 'weeks', label: 'Weeks' },
            { key: 'focus', label: 'Focus' },
            { key: 'calories', label: 'Calories' }
          ]}
          onSave={(v) => onUpdate({ ...data, phases: [...data.phases, { id: Date.now().toString(), ...v }] })} />
      )}
    </div>
  );
}
