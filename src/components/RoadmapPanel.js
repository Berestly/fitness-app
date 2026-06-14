import React, { useState } from 'react';
import Modal from './Modal';

const PHASES = [
  { id: 'basics',       label: 'Basics',       color: '#3b82f6' },
  { id: 'intermediate', label: 'Intermediate', color: '#a855f7' },
  { id: 'lwc-prep',     label: 'LWC Prep',     color: '#f59e0b' },
  { id: 'lwc-oss',      label: 'LWC OSS',      color: '#22c55e' },
];

const STATUS_CONFIG = {
  todo:        { label: 'To Do',       color: '#4b5563', bg: 'rgba(75,85,99,0.15)',     dot: '#6b7280' },
  inprogress:  { label: 'In Progress', color: '#60a5fa', bg: 'rgba(59,130,246,0.12)',   dot: '#3b82f6' },
  done:        { label: 'Done',        color: '#86efac', bg: 'rgba(34,197,94,0.12)',    dot: '#22c55e' },
};

const nodeFields = [
  { key: 'title',       label: 'Title' },
  { key: 'phase',       label: 'Phase (basics / intermediate / lwc-prep / lwc-oss)' },
  { key: 'phaseLabel',  label: 'Phase display label' },
  { key: 'duration',    label: 'Duration (e.g. Week 3–4)' },
  { key: 'description', label: 'Description' },
  { key: 'topics',      label: 'Topics (comma-separated)', type: 'textarea' },
];

function NodeCard({ node, onStatusCycle, onEdit, onDelete, onToggleExpand, expanded }) {
  const sc = STATUS_CONFIG[node.status] || STATUS_CONFIG.todo;
  const phase = PHASES.find(p => p.id === node.phase);

  return (
    <div
      className="roadmap-node"
      style={{ borderLeft: `3px solid ${phase?.color || '#444'}` }}
    >
      <div className="rnode-header" onClick={onToggleExpand}>
        <div className="rnode-left">
          <span className="rnode-phase-dot" style={{ background: phase?.color || '#444' }}></span>
          <div>
            <div className="rnode-title">{node.title}</div>
            <div className="rnode-meta">{node.duration} · {node.phaseLabel}</div>
          </div>
        </div>
        <div className="rnode-right">
          <button
            className="status-pill"
            style={{ background: sc.bg, color: sc.color }}
            onClick={e => { e.stopPropagation(); onStatusCycle(); }}
          >
            <span className="status-dot" style={{ background: sc.dot }}></span>
            {sc.label}
          </button>
          <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div className="rnode-body">
          {node.description && (
            <p className="rnode-desc">{node.description}</p>
          )}

          {node.topics && node.topics.length > 0 && (
            <div className="rnode-topics">
              {(Array.isArray(node.topics) ? node.topics : node.topics.split(',').map(t => t.trim())).map((t, i) => (
                <span key={i} className="topic-chip">{t}</span>
              ))}
            </div>
          )}

          {node.resources && node.resources.length > 0 && (
            <div className="rnode-resources">
              <div className="rnode-resources-label">Resources</div>
              {node.resources.map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                  ↗ {r.label}
                </a>
              ))}
            </div>
          )}

          <div className="rnode-actions">
            <button className="tbl-btn" onClick={onEdit}>Edit</button>
            <button className="tbl-btn del" onClick={onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function RoadmapPanel({ roadmap, updateRoadmap, updateNodeStatus, updateNode, addRoadmapNode, deleteRoadmapNode }) {
  const [expandedNodes, setExpandedNodes] = useState({});
  const [modal, setModal] = useState(null);
  const [filterPhase, setFilterPhase] = useState('all');

  const toggleExpand = (id) => setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));

  const cycleStatus = (node) => {
    const order = ['todo', 'inprogress', 'done'];
    const next = order[(order.indexOf(node.status) + 1) % order.length];
    updateNodeStatus(node.id, next);
  };

  const saveNode = (values) => {
    const topics = typeof values.topics === 'string'
      ? values.topics.split(',').map(t => t.trim()).filter(Boolean)
      : values.topics;
    if (modal.type === 'add') {
      addRoadmapNode({ ...values, topics, status: 'todo', resources: [] });
    } else {
      updateNode(modal.item.id, { ...values, topics });
    }
  };

  const filtered = filterPhase === 'all'
    ? roadmap.nodes
    : roadmap.nodes.filter(n => n.phase === filterPhase);

  // Progress stats
  const total = roadmap.nodes.length;
  const done = roadmap.nodes.filter(n => n.status === 'done').length;
  const inprog = roadmap.nodes.filter(n => n.status === 'inprogress').length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <div className="panel roadmap-panel">
      <div className="panel-header">
        <div className="panel-header-left">
          <span className="panel-icon">🗺️</span>
          <div>
            <div className="panel-title">{roadmap.title}</div>
            <div className="panel-subtitle">{roadmap.subtitle}</div>
          </div>
        </div>
        <button className="icon-btn btn-add-node" onClick={() => setModal({ type: 'add' })}>+</button>
      </div>

      <div className="panel-body">
        {/* Progress bar */}
        <div className="progress-section">
          <div className="progress-stats">
            <span>{done}/{total} complete</span>
            <span>{inprog} in progress</span>
            <span style={{ color: '#86efac', fontWeight: 600 }}>{pct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }}></div>
          </div>
        </div>

        {/* Phase filter */}
        <div className="selector-row phase-filter">
          <button className={`sel-btn${filterPhase === 'all' ? ' active' : ''}`} onClick={() => setFilterPhase('all')}>All</button>
          {PHASES.map(ph => (
            <button
              key={ph.id}
              className={`sel-btn${filterPhase === ph.id ? ' active' : ''}`}
              style={filterPhase === ph.id ? { background: `${ph.color}22`, color: ph.color, borderColor: `${ph.color}55` } : {}}
              onClick={() => setFilterPhase(ph.id)}
            >
              {ph.label}
            </button>
          ))}
        </div>

        {/* Phase legend */}
        <div className="phase-legend">
          {PHASES.map(ph => {
            const count = roadmap.nodes.filter(n => n.phase === ph.id && n.status === 'done').length;
            const total2 = roadmap.nodes.filter(n => n.phase === ph.id).length;
            return (
              <div key={ph.id} className="legend-item">
                <span className="legend-dot" style={{ background: ph.color }}></span>
                <span className="legend-label">{ph.label}</span>
                <span className="legend-count">{count}/{total2}</span>
              </div>
            );
          })}
        </div>

        {/* Nodes grouped by phase */}
        {PHASES.filter(ph => filterPhase === 'all' || filterPhase === ph.id).map(ph => {
          const nodes = filtered.filter(n => n.phase === ph.id);
          if (nodes.length === 0) return null;
          return (
            <div key={ph.id} className="phase-group">
              <div className="phase-group-header">
                <span className="phase-group-dot" style={{ background: ph.color }}></span>
                <span className="phase-group-label" style={{ color: ph.color }}>{ph.label}</span>
                <div className="phase-group-line" style={{ background: `${ph.color}33` }}></div>
              </div>
              {nodes.map(node => (
                <NodeCard
                  key={node.id}
                  node={node}
                  expanded={!!expandedNodes[node.id]}
                  onToggleExpand={() => toggleExpand(node.id)}
                  onStatusCycle={() => cycleStatus(node)}
                  onEdit={() => setModal({ type: 'edit', item: node })}
                  onDelete={() => deleteRoadmapNode(node.id)}
                />
              ))}
            </div>
          );
        })}

        <div className="tip-box">Click any node to expand. Click the status badge to cycle: To Do → In Progress → Done</div>
      </div>

      {modal && (
        <Modal
          isOpen
          title={modal.type === 'add' ? 'Add roadmap node' : 'Edit node'}
          onClose={() => setModal(null)}
          fields={nodeFields}
          initialValues={modal.item ? {
            ...modal.item,
            topics: Array.isArray(modal.item.topics) ? modal.item.topics.join(', ') : modal.item.topics,
          } : {}}
          onSave={saveNode}
        />
      )}
    </div>
  );
}
