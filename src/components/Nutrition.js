import React, { useState } from 'react';
import Modal from './Modal';

export default function Nutrition({ data, onUpdate }) {
  const [modal, setModal] = useState(null);

  const crudFor = (arrayKey, fields, title) => ({
    add: (values) => onUpdate({ ...data, [arrayKey]: [...data[arrayKey], { id: Date.now().toString(), ...values }] }),
    edit: (id, values) => onUpdate({ ...data, [arrayKey]: data[arrayKey].map(x => x.id === id ? { ...x, ...values } : x) }),
    del: (id) => onUpdate({ ...data, [arrayKey]: data[arrayKey].filter(x => x.id !== id) }),
    fields, title
  });

  const ps = crudFor('proteinSources', [
    { key: 'food', label: 'Food' }, { key: 'amount', label: 'Amount' },
    { key: 'protein', label: 'Protein' }, { key: 'calories', label: 'Calories' }
  ], 'Protein source');

  const rp = crudFor('ricePortions', [
    { key: 'meal', label: 'Meal' }, { key: 'gymDay', label: 'Gym day portion' },
    { key: 'restDay', label: 'Rest day portion' }, { key: 'notes', label: 'Notes' }
  ], 'Rice/dosa item');

  const mp = crudFor('mealPlan', [
    { key: 'time', label: 'Time' }, { key: 'meal', label: 'Meal description' },
    { key: 'protein', label: 'Protein' }, { key: 'calories', label: 'Calories' }
  ], 'Meal');

  const oil = crudFor('oils', [
    { key: 'item', label: 'Food item' }, { key: 'limit', label: 'Daily limit' }, { key: 'tip', label: 'Tip' }
  ], 'Oil/fat item');

  return (
    <div className="tab-content">
      {/* Protein Sources */}
      <section className="section-block">
        <div className="section-title-row">
          <h2>Current protein intake</h2>
          <button className="btn-add" onClick={() => setModal({ key: 'ps', type: 'add' })}>+ Add</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Food</th><th>Amount</th><th>Protein</th><th>Calories</th><th></th></tr></thead>
            <tbody>
              {data.proteinSources.map(r => (
                <tr key={r.id}>
                  <td>{r.food}</td><td>{r.amount}</td><td>{r.protein}</td><td>{r.calories}</td>
                  <td>
                    <button className="tbl-btn" onClick={() => setModal({ key: 'ps', type: 'edit', item: r })}>Edit</button>
                    <button className="tbl-btn del" onClick={() => ps.del(r.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="tip-box">You need ~160 g total protein. Add a 2nd scoop of whey, dal (1 cup = ~18 g), or paneer (100 g = ~18 g).</div>
      </section>

      {/* Rice & Dosa */}
      <section className="section-block">
        <div className="section-title-row">
          <h2>Rice & dosa portions</h2>
          <button className="btn-add" onClick={() => setModal({ key: 'rp', type: 'add' })}>+ Add</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Meal</th><th>Gym day</th><th>Rest/cardio day</th><th>Notes</th><th></th></tr></thead>
            <tbody>
              {data.ricePortions.map(r => (
                <tr key={r.id}>
                  <td>{r.meal}</td><td>{r.gymDay}</td><td>{r.restDay}</td><td>{r.notes}</td>
                  <td>
                    <button className="tbl-btn" onClick={() => setModal({ key: 'rp', type: 'edit', item: r })}>Edit</button>
                    <button className="tbl-btn del" onClick={() => rp.del(r.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Meal Plan */}
      <section className="section-block">
        <div className="section-title-row">
          <h2>Full day meal plan</h2>
          <button className="btn-add" onClick={() => setModal({ key: 'mp', type: 'add' })}>+ Add meal</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Time</th><th>Meal</th><th>Protein</th><th>Calories</th><th></th></tr></thead>
            <tbody>
              {data.mealPlan.map(r => (
                <tr key={r.id}>
                  <td>{r.time}</td><td>{r.meal}</td><td>{r.protein}</td><td>{r.calories}</td>
                  <td>
                    <button className="tbl-btn" onClick={() => setModal({ key: 'mp', type: 'edit', item: r })}>Edit</button>
                    <button className="tbl-btn del" onClick={() => mp.del(r.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Oils */}
      <section className="section-block">
        <div className="section-title-row">
          <h2>Fat & oil guide</h2>
          <button className="btn-add" onClick={() => setModal({ key: 'oil', type: 'add' })}>+ Add</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Item</th><th>Daily limit</th><th>Tip</th><th></th></tr></thead>
            <tbody>
              {data.oils.map(r => (
                <tr key={r.id}>
                  <td>{r.item}</td><td>{r.limit}</td><td>{r.tip}</td>
                  <td>
                    <button className="tbl-btn" onClick={() => setModal({ key: 'oil', type: 'edit', item: r })}>Edit</button>
                    <button className="tbl-btn del" onClick={() => oil.del(r.id)}>Del</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modals */}
      {modal && (() => {
        const cruds = { ps, rp, mp, oil };
        const c = cruds[modal.key];
        return (
          <Modal isOpen title={`${modal.type === 'add' ? 'Add' : 'Edit'} ${c.title}`}
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
