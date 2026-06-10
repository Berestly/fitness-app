import React, { useState, useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, fields, initialValues, onSave }) {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (isOpen) {
      const init = {};
      fields.forEach(f => { init[f.key] = initialValues?.[f.key] || ''; });
      setValues(init);
    }
  }, [isOpen, fields, initialValues]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span>{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {fields.map(f => (
            <div key={f.key} className="modal-field">
              <label>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  value={values[f.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                  rows={3}
                />
              ) : (
                <input
                  type="text"
                  value={values[f.key] || ''}
                  onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                  placeholder={f.placeholder || ''}
                />
              )}
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-save" onClick={() => { onSave(values); onClose(); }}>Save</button>
        </div>
      </div>
    </div>
  );
}
