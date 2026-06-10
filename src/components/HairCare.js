import React, { useState } from 'react';
import Modal from './Modal';

export default function HairCare({ data, onUpdate }) {
  const [modal, setModal] = useState(null);

  const crudFor = (key, fields) => ({
    add: (v) => onUpdate({ ...data, [key]: [...data[key], { id: Date.now().toString(), ...v }] }),
    edit: (id, v) => onUpdate({ ...data, [key]: data[key].map(x => x.id === id ? { ...x, ...v } : x) }),
    del: (id) => onUpdate({ ...data, [key]: data[key].filter(x => x.id !== id) }),
    fields
  });

  const routineC = crudFor('routine', [
    { key: 'day', label: 'Day' }, { key: 'action', label: 'Action' }, { key: 'product', label: 'Product / Notes' }
  ]);
  const dosC = crudFor('dos', [{ key: 'text', label: 'Do item', type: 'textarea' }]);
  const dontsC = crudFor('donts', [{ key: 'text', label: 'Avoid item', type: 'textarea' }]);

  return (
    <div className="tab-content">
      <div className="metric-grid">
        {data.stats.map(s => (
          <div key={s.id} className="metric-card">
            <div className="metric-label">{s.label}</div>
            <div className="metric-value">{s.value}</div>
            <div className="metric-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      <section className="section-block">
        <div className="section-title-row">
          <h2>Weekly routine</h2>
          <button className="btn-add" onClick={() => setModal({ k: 'routine', type: 'add' })}>+ Add day</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Day</th><th>Action</th><th>Product / Notes</th><th></th></tr></thead>
            <tbody>
              {data.routine.map(r => (
                <tr key={r.id}>
                  <td>{r.day}</td><td>{r.action}</td><td>{r.product}</td>
                  <td>
                    <button className="tbl-btn" onClick={() => setModal({ k: 'routine', type: 'edit', item: r })}>Edit</button>
                    <button className="tbl-btn del" onClick={() => routineC.del(r.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="dos-donts-grid">
        <section className="section-block">
          <div className="section-title-row">
            <h2 className="h2-green">What to do ✓</h2>
            <button className="btn-add" onClick={() => setModal({ k: 'dos', type: 'add' })}>+ Add</button>
          </div>
          {data.dos.map(d => (
            <div key={d.id} className="list-item do-item">
              <span>✓ {d.text}</span>
              <div className="list-item-actions">
                <button onClick={() => setModal({ k: 'dos', type: 'edit', item: d })}>Edit</button>
                <button className="del" onClick={() => dosC.del(d.id)}>Del</button>
              </div>
            </div>
          ))}
        </section>

        <section className="section-block">
          <div className="section-title-row">
            <h2 className="h2-red">What to avoid ✗</h2>
            <button className="btn-add" onClick={() => setModal({ k: 'donts', type: 'add' })}>+ Add</button>
          </div>
          {data.donts.map(d => (
            <div key={d.id} className="list-item dont-item">
              <span>✗ {d.text}</span>
              <div className="list-item-actions">
                <button onClick={() => setModal({ k: 'donts', type: 'edit', item: d })}>Edit</button>
                <button className="del" onClick={() => dontsC.del(d.id)}>Del</button>
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="tip-box">After gym sessions on non-wash days, rinse with plain water and scrub scalp gently — removes sweat without stripping oils. Sweat accumulation is a key dandruff trigger.</div>

      {modal && (() => {
        const c = { routine: routineC, dos: dosC, donts: dontsC }[modal.k];
        return (
          <Modal isOpen title={`${modal.type === 'add' ? 'Add' : 'Edit'} item`}
            onClose={() => setModal(null)} fields={c.fields}
            initialValues={modal.item}
            onSave={(v) => {
              if (modal.type === 'add') c.add(v);
              else c.edit(modal.item.id, v);
              setModal(null);
            }} />
        );
      })()}
    </div>
  );
}
