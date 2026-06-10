import React, { useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_DATA, WEEK_BLOCKS, DAY_TYPES, SCHEDULE } from './data';
import './App.css';

// ─── STORAGE ─────────────────────────────────────────────────────────────────
const STORE = 'fittrack_v2';
function loadData(userId) {
  try {
    const raw = localStorage.getItem(`${STORE}_${userId}`);
    return raw ? { ...INITIAL_DATA, ...JSON.parse(raw) } : INITIAL_DATA;
  } catch { return INITIAL_DATA; }
}
function saveData(userId, data) {
  localStorage.setItem(`${STORE}_${userId}`, JSON.stringify(data));
}

// ─── AUTH (mock Google – real Google needs Firebase/OAuth) ───────────────────
function AuthScreen({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mode, setMode] = useState('login'); // login | signup
  const [error, setError] = useState('');

  const users = JSON.parse(localStorage.getItem('fittrack_users') || '{}');

  const handleGoogle = () => {
    // Simulate Google login with a demo account
    const demoId = 'google_demo_user';
    if (!users[demoId]) {
      users[demoId] = { id: demoId, name: 'Demo User', email: 'demo@gmail.com', avatar: 'D', provider: 'google' };
      localStorage.setItem('fittrack_users', JSON.stringify(users));
    }
    localStorage.setItem('fittrack_session', demoId);
    onLogin(users[demoId]);
  };

  const handleSubmit = () => {
    setError('');
    if (!email.trim()) { setError('Email required'); return; }
    const id = 'user_' + email.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');

    if (mode === 'signup') {
      if (!name.trim()) { setError('Name required'); return; }
      if (users[id]) { setError('Account exists. Please sign in.'); return; }
      const user = { id, name: name.trim(), email: email.trim(), avatar: name.trim()[0].toUpperCase(), provider: 'email' };
      users[id] = user;
      localStorage.setItem('fittrack_users', JSON.stringify(users));
      localStorage.setItem('fittrack_session', id);
      onLogin(user);
    } else {
      if (!users[id]) { setError('No account found. Please sign up.'); return; }
      localStorage.setItem('fittrack_session', id);
      onLogin(users[id]);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-logo">💪</div>
        <h1 className="auth-title">FitTrack</h1>
        <p className="auth-sub">Your 8-week cutting program</p>

        <button className="btn-google" onClick={handleGoogle}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>

        <div className="auth-divider"><span>or</span></div>

        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Sign in</button>
          <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Sign up</button>
        </div>

        {mode === 'signup' && (
          <input className="auth-input" placeholder="Your name" value={name}
            onChange={e => setName(e.target.value)} />
        )}
        <input className="auth-input" placeholder="Email address" type="email" value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()} />

        {error && <div className="auth-error">{error}</div>}

        <button className="btn-auth-submit" onClick={handleSubmit}>
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </button>

        <p className="auth-note">Your data is stored privately per account on this device.</p>
      </div>
    </div>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────
function Modal({ isOpen, title, onClose, children }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ProgressRing({ value, max, color, size = 56 }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#2a2a2a" strokeWidth="4" />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth="4" strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
    </svg>
  );
}

function StatCard({ stat }) {
  const trendIcon = stat.trend === 'down' ? '↓' : stat.trend === 'up' ? '↑' : '→';
  const trendColor = stat.trend === 'down' ? '#22c55e' : stat.trend === 'up' ? '#3b82f6' : '#666';
  return (
    <div className="stat-card">
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-body">
        <div className="stat-label">{stat.label}</div>
        <div className="stat-value">{stat.value}<span className="stat-unit"> {stat.unit}</span></div>
        {stat.change && (
          <div className="stat-change" style={{ color: trendColor }}>
            {trendIcon} {stat.change} {stat.unit}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── OVERVIEW TAB ────────────────────────────────────────────────────────────
function OverviewTab({ data, onUpdate }) {
  const totalProtein = data.nutrition?.proteinSources?.reduce((s, x) => s + (x.protein || 0), 0) || 0;
  const targetProt = data.nutrition?.dailyTarget?.protein || 160;
  const targetCal = data.nutrition?.dailyTarget?.calories || 1980;
  const totalCal = data.nutrition?.mealPlan?.reduce((s, x) => s + (x.calories || 0), 0) || 0;
  const currentWeek = data.profile?.currentWeek || 1;
  const weekBlock = currentWeek <= 2 ? '1-2' : currentWeek <= 4 ? '3-4' : currentWeek <= 6 ? '5-6' : '7-8';
  const phase = currentWeek <= 4 ? 1 : 2;

  const todayIdx = new Date().getDay(); // 0=Sun
  const scheduleMap = [6, 0, 1, 2, 3, 4, 5]; // Sun=6 in our SCHEDULE
  const todaySchedule = SCHEDULE[todayIdx === 0 ? 6 : todayIdx - 1];

  return (
    <div className="tab-content">
      {/* Hero bar */}
      <div className="hero-bar">
        <div className="hero-week">
          <div className="hero-week-num">Week {currentWeek}</div>
          <div className="hero-week-label">of 8 · Phase {phase}</div>
        </div>
        <div className="hero-progress-track">
          <div className="hero-progress-fill" style={{ width: `${(currentWeek / 8) * 100}%` }} />
        </div>
        <div className="hero-pct">{Math.round((currentWeek / 8) * 100)}%</div>
      </div>

      {/* Today's plan */}
      <div className="today-card">
        <div className="today-left">
          <div className="today-label">Today</div>
          <div className={`today-type type-${todaySchedule?.type}`}>
            {todaySchedule?.type === 'push' ? '🏋 Push Day' :
             todaySchedule?.type === 'pull' ? '🤸 Pull Day' :
             todaySchedule?.type === 'legs' ? '🦵 Legs Day' :
             todaySchedule?.type === 'cardio' ? '🏃 Cardio' : '😴 Rest Day'}
          </div>
          <div className="today-sub">
            {todaySchedule?.type === 'push' ? 'Chest · Shoulders · Triceps' :
             todaySchedule?.type === 'pull' ? 'Back · Biceps · Rear Delts' :
             todaySchedule?.type === 'legs' ? 'Quads · Hamstrings · Glutes' :
             todaySchedule?.type === 'cardio' ? '30–40 min brisk walk or cycle' :
             'Recover, eat well, sleep 8h'}
          </div>
        </div>
        <div className="today-right">
          <div className="today-week-block">Wk {weekBlock}</div>
        </div>
      </div>

      {/* Macro rings */}
      <div className="macro-row">
        <div className="macro-card">
          <ProgressRing value={totalCal} max={targetCal} color="#f59e0b" size={64} />
          <div className="macro-info">
            <div className="macro-val">{totalCal} <span>/ {targetCal}</span></div>
            <div className="macro-label">Calories</div>
          </div>
        </div>
        <div className="macro-card">
          <ProgressRing value={totalProtein} max={targetProt} color="#3b82f6" size={64} />
          <div className="macro-info">
            <div className="macro-val">{totalProtein}g <span>/ {targetProt}g</span></div>
            <div className="macro-label">Protein</div>
          </div>
        </div>
        <div className="macro-card">
          <ProgressRing value={currentWeek} max={8} color="#22c55e" size={64} />
          <div className="macro-info">
            <div className="macro-val">{currentWeek} <span>/ 8</span></div>
            <div className="macro-label">Weeks done</div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="section-header">Body Stats</div>
      <div className="stats-grid">
        {data.overview.stats.map(s => <StatCard key={s.id} stat={s} />)}
      </div>

      {/* Weekly schedule */}
      <div className="section-header">This Week</div>
      <div className="week-strip">
        {SCHEDULE.map((s, i) => {
          const isToday = i === (new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
          return (
            <div key={s.day} className={`week-day week-${s.type}${isToday ? ' today' : ''}`}>
              <span className="wd-day">{s.day}</span>
              <span className="wd-type">{s.type.charAt(0).toUpperCase() + s.type.slice(1)}</span>
            </div>
          );
        })}
      </div>

      {/* Phase timeline */}
      <div className="section-header">Program Phases</div>
      {data.overview.phases.map(p => (
        <div key={p.id} className={`phase-card phase-${p.badge}`}>
          <div className="phase-left">
            <div className="phase-name">{p.phase}</div>
            <div className="phase-weeks">{p.weeks}</div>
          </div>
          <div className="phase-right">
            <div className="phase-focus">{p.focus}</div>
            <div className="phase-cal">{p.calories}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TRAINING TAB ────────────────────────────────────────────────────────────
function TrainingTab({ data, onUpdate }) {
  const [week, setWeek] = useState('1-2');
  const [day, setDay] = useState('push');
  const [completedSets, setCompletedSets] = useState({});

  const exercises = data.training[day][week] || [];
  const dayInfo = data.training[day];
  const phase = week === '1-2' || week === '3-4' ? 1 : 2;

  const totalSets = exercises.reduce((s, e) => s + parseInt(e.sets || 0), 0);
  const doneSets = Object.values(completedSets).filter(Boolean).length;

  const toggleSet = (exId, setIdx) => {
    const key = `${exId}_${setIdx}`;
    setCompletedSets(p => ({ ...p, [key]: !p[key] }));
  };

  const phaseTips = {
    '1-2': 'Rest 90 sec · Focus on form · Record technique on phone · No ego lifting',
    '3-4': 'Rest 75 sec · Add weight if 2 reps left in tank at top of rep range',
    '5-6': 'Rest 2 min compounds · 60 sec isolation · RPE 8 — last 2 reps hard',
    '7-8': 'Rest 2–3 min heavy · Week 8 = test week, attempt small PRs',
  };

  const dayEmoji = { push: '🏋', pull: '🤸', legs: '🦵' };

  return (
    <div className="tab-content">
      {/* Week selector */}
      <div className="selector-group">
        <div className="selector-label">Week block</div>
        <div className="selector-pills">
          {WEEK_BLOCKS.map(w => (
            <button key={w} className={`pill${week === w ? ' active' : ''}`}
              onClick={() => { setWeek(w); setCompletedSets({}); }}>
              Wk {w}
              <span className={`pill-phase ph${w === '1-2' || w === '3-4' ? '1' : '2'}`}>
                P{w === '1-2' || w === '3-4' ? '1' : '2'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Day selector */}
      <div className="day-tabs">
        {DAY_TYPES.map(d => (
          <button key={d} className={`day-tab day-tab-${d}${day === d ? ' active' : ''}`}
            onClick={() => { setDay(d); setCompletedSets({}); }}>
            <span className="dt-icon">{dayEmoji[d]}</span>
            <span className="dt-label">{data.training[d].label}</span>
            <span className="dt-muscle">{data.training[d].muscle}</span>
          </button>
        ))}
      </div>

      {/* Session header */}
      <div className="session-header">
        <div className="session-info">
          <div className="session-phase-dot" style={{ background: phase === 1 ? '#3b82f6' : '#f59e0b' }} />
          <span className="session-phase">Phase {phase} — {phase === 1 ? 'Foundation' : 'Intensification'}</span>
        </div>
        <div className="session-progress">
          <div className="sp-text">{doneSets}/{totalSets} sets</div>
          <div className="sp-bar"><div className="sp-fill" style={{ width: `${totalSets ? (doneSets/totalSets)*100 : 0}%` }} /></div>
        </div>
      </div>

      {/* Exercise list */}
      <div className="exercise-list">
        {exercises.map((ex, i) => {
          const setsCount = parseInt(ex.sets || 3);
          const exDone = Array.from({ length: setsCount }, (_, si) => completedSets[`${ex.id}_${si}`]).filter(Boolean).length;
          const allDone = exDone === setsCount;
          return (
            <div key={ex.id} className={`ex-card${allDone ? ' ex-done' : ''}`}>
              <div className="ex-header">
                <div className="ex-num">{i + 1}</div>
                <div className="ex-info">
                  <div className="ex-name">{ex.name}</div>
                  {ex.note && <div className="ex-note">{ex.note}</div>}
                </div>
                <div className="ex-target-badge">{ex.target}</div>
              </div>
              <div className="ex-sets-row">
                <div className="ex-spec">{ex.sets} × {ex.reps}</div>
                <div className="set-trackers">
                  {Array.from({ length: setsCount }).map((_, si) => (
                    <button key={si}
                      className={`set-dot${completedSets[`${ex.id}_${si}`] ? ' done' : ''}`}
                      onClick={() => toggleSet(ex.id, si)}>
                      {completedSets[`${ex.id}_${si}`] ? '✓' : si + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="tip-box">💡 {phaseTips[week]}</div>
    </div>
  );
}

// ─── NUTRITION TAB ────────────────────────────────────────────────────────────
function NutritionTab({ data, onUpdate }) {
  const targets = data.nutrition.dailyTarget;
  const totalProtein = data.nutrition.proteinSources.reduce((s, x) => s + (x.protein || 0), 0);
  const totalCal = data.nutrition.mealPlan.reduce((s, x) => s + (x.calories || 0), 0);

  const macros = [
    { label: 'Calories', current: totalCal, target: targets.calories, unit: 'kcal', color: '#f59e0b' },
    { label: 'Protein', current: totalProtein, target: targets.protein, unit: 'g', color: '#3b82f6' },
    { label: 'Carbs', current: targets.carbs, target: targets.carbs, unit: 'g', color: '#a855f7' },
    { label: 'Fat', current: targets.fat, target: targets.fat, unit: 'g', color: '#ef4444' },
  ];

  return (
    <div className="tab-content">
      {/* Macro overview */}
      <div className="section-header">Daily Targets</div>
      <div className="macro-bars">
        {macros.map(m => (
          <div key={m.label} className="macro-bar-row">
            <div className="mb-label">{m.label}</div>
            <div className="mb-track">
              <div className="mb-fill" style={{ width: `${Math.min((m.current / m.target) * 100, 100)}%`, background: m.color }} />
            </div>
            <div className="mb-val" style={{ color: m.color }}>{m.current}<span>/{m.target}{m.unit}</span></div>
          </div>
        ))}
      </div>

      {/* Protein sources */}
      <div className="section-header">Protein Sources</div>
      <div className="nutr-cards">
        {data.nutrition.proteinSources.map(p => (
          <div key={p.id} className="nutr-card">
            <div className="nutr-food">{p.food}</div>
            <div className="nutr-amount">{p.amount}</div>
            <div className="nutr-stats">
              <span className="nutr-prot">{p.protein}g protein</span>
              <span className="nutr-cal">{p.calories} kcal</span>
            </div>
          </div>
        ))}
      </div>
      <div className="tip-box">💡 Current protein from listed sources: ~{totalProtein}g. Target: {targets.protein}g. Consider adding a 2nd whey scoop, dal (1 cup = ~18g), or paneer (100g = ~18g).</div>

      {/* Meal plan timeline */}
      <div className="section-header">Daily Meal Plan</div>
      <div className="meal-timeline">
        {data.nutrition.mealPlan.map((m, i) => (
          <div key={m.id} className="meal-row">
            <div className="meal-time">{m.time}</div>
            <div className="meal-dot-col"><div className="meal-dot" />{i < data.nutrition.mealPlan.length - 1 && <div className="meal-line" />}</div>
            <div className="meal-content">
              <div className="meal-name">{m.meal}</div>
              <div className="meal-macros">
                <span>{m.protein}g protein</span>
                <span>{m.calories} kcal</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rice portions */}
      <div className="section-header">Rice & Dosa Guide</div>
      <div className="rice-grid">
        {data.nutrition.ricePortions.map(r => (
          <div key={r.id} className="rice-card">
            <div className="rice-meal">{r.meal}</div>
            <div className="rice-cols">
              <div className="rice-col gym"><span className="rice-badge gym">Gym</span>{r.gymDay}</div>
              <div className="rice-col rest"><span className="rice-badge rest">Rest</span>{r.restDay}</div>
            </div>
            {r.notes && <div className="rice-note">{r.notes}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HAIR CARE TAB ────────────────────────────────────────────────────────────
function HairCareTab({ data }) {
  const dayIdx = new Date().getDay(); // 0=Sun
  const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const today = dayNames[dayIdx];
  const todayRoutine = data.hairCare.routine.find(r =>
    r.day === today || (r.day === 'Other days' && !['Monday','Wednesday','Friday'].includes(today))
  );

  return (
    <div className="tab-content">
      {/* Today's hair tip */}
      {todayRoutine && (
        <div className="hair-today">
          <div className="hair-today-label">Today's routine ({today})</div>
          <div className="hair-today-action">{todayRoutine.action}</div>
          <div className="hair-today-product">{todayRoutine.product}</div>
        </div>
      )}

      {/* Stats row */}
      <div className="hair-stats-row">
        {[
          { label: 'Condition', value: 'Dry Scalp', icon: '💧' },
          { label: 'Products', value: '2 Shampoos', icon: '🧴' },
          { label: 'Wash freq.', value: '2–3×/week', icon: '🚿' },
        ].map(s => (
          <div key={s.label} className="hair-stat">
            <div className="hair-stat-icon">{s.icon}</div>
            <div className="hair-stat-val">{s.value}</div>
            <div className="hair-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly schedule */}
      <div className="section-header">Weekly Routine</div>
      <div className="hair-routine-list">
        {data.hairCare.routine.map(r => (
          <div key={r.id} className={`hair-routine-row${r.day === today ? ' today' : ''}`}>
            <div className="hrr-day">{r.day}</div>
            <div className="hrr-detail">
              <div className="hrr-action">{r.action}</div>
              <div className="hrr-product">{r.product}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Do/Don't */}
      <div className="dos-donts">
        <div className="dd-col">
          <div className="dd-header do">✓ Do</div>
          {data.hairCare.dos.map((d, i) => (
            <div key={i} className="dd-item do-item">✓ {d}</div>
          ))}
        </div>
        <div className="dd-col">
          <div className="dd-header dont">✗ Avoid</div>
          {data.hairCare.donts.map((d, i) => (
            <div key={i} className="dd-item dont-item">✗ {d}</div>
          ))}
        </div>
      </div>

      <div className="tip-box">💡 After gym on non-wash days: rinse with plain water + gentle finger-scrub to remove sweat without stripping oils. Sweat buildup = dandruff trigger.</div>
    </div>
  );
}

// ─── SETTINGS PANEL ──────────────────────────────────────────────────────────
function SettingsPanel({ data, onUpdate, user, onLogout, onClose }) {
  const [tab, setTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({ ...data.profile });
  const [saved, setSaved] = useState(false);

  const saveProfile = () => {
    onUpdate('profile', { ...data.profile, ...profileForm,
      weight: parseFloat(profileForm.weight) || data.profile.weight,
      bodyFat: parseFloat(profileForm.bodyFat) || data.profile.bodyFat,
      currentWeek: parseInt(profileForm.currentWeek) || data.profile.currentWeek,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const [exForm, setExForm] = useState({ day: 'push', week: '1-2', name: '', sets: '', reps: '', target: '', note: '' });
  const addExercise = () => {
    if (!exForm.name.trim()) return;
    const newEx = { id: Date.now().toString(), name: exForm.name, sets: exForm.sets, reps: exForm.reps, target: exForm.target, note: exForm.note, done: false };
    const list = [...(data.training[exForm.day][exForm.week] || []), newEx];
    onUpdate('training', { ...data.training, [exForm.day]: { ...data.training[exForm.day], [exForm.week]: list } });
    setExForm(p => ({ ...p, name: '', sets: '', reps: '', target: '', note: '' }));
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };

  const [mealForm, setMealForm] = useState({ time: '', meal: '', protein: '', calories: '' });
  const addMeal = () => {
    if (!mealForm.meal.trim()) return;
    const newM = { id: Date.now().toString(), ...mealForm, protein: parseInt(mealForm.protein)||0, calories: parseInt(mealForm.calories)||0 };
    onUpdate('nutrition', { ...data.nutrition, mealPlan: [...data.nutrition.mealPlan, newM] });
    setMealForm({ time: '', meal: '', protein: '', calories: '' });
    setSaved(true); setTimeout(() => setSaved(false), 1500);
  };

  const removeExercise = (day, week, id) => {
    const list = data.training[day][week].filter(e => e.id !== id);
    onUpdate('training', { ...data.training, [day]: { ...data.training[day], [week]: list } });
  };
  const removeMeal = (id) => {
    onUpdate('nutrition', { ...data.nutrition, mealPlan: data.nutrition.mealPlan.filter(m => m.id !== id) });
  };

  const tabs = [
    { id: 'profile', label: '👤 Profile' },
    { id: 'training', label: '🏋 Training' },
    { id: 'nutrition', label: '🥗 Nutrition' },
    { id: 'account', label: '⚙️ Account' },
  ];

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <span className="settings-title">Settings</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="settings-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`stab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
        </div>
        <div className="settings-body">
          {tab === 'profile' && (
            <div className="settings-section">
              <div className="settings-form">
                {[
                  { key: 'name', label: 'Display name', type: 'text' },
                  { key: 'weight', label: 'Body weight (kg)', type: 'number' },
                  { key: 'bodyFat', label: 'Body fat %', type: 'number' },
                  { key: 'currentWeek', label: 'Current program week (1–8)', type: 'number' },
                ].map(f => (
                  <div key={f.key} className="sf-field">
                    <label>{f.label}</label>
                    <input type={f.type} value={profileForm[f.key] || ''} onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))} />
                  </div>
                ))}
                <button className={`btn-save-form${saved ? ' saved' : ''}`} onClick={saveProfile}>
                  {saved ? '✓ Saved' : 'Save profile'}
                </button>
              </div>
            </div>
          )}

          {tab === 'training' && (
            <div className="settings-section">
              <div className="sf-subheader">Add exercise</div>
              <div className="settings-form">
                <div className="sf-row">
                  <div className="sf-field">
                    <label>Day</label>
                    <select value={exForm.day} onChange={e => setExForm(p => ({ ...p, day: e.target.value }))}>
                      {DAY_TYPES.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="sf-field">
                    <label>Week block</label>
                    <select value={exForm.week} onChange={e => setExForm(p => ({ ...p, week: e.target.value }))}>
                      {WEEK_BLOCKS.map(w => <option key={w} value={w}>Weeks {w}</option>)}
                    </select>
                  </div>
                </div>
                <div className="sf-field"><label>Exercise name</label><input value={exForm.name} onChange={e => setExForm(p => ({ ...p, name: e.target.value }))} /></div>
                <div className="sf-row">
                  <div className="sf-field"><label>Sets</label><input value={exForm.sets} onChange={e => setExForm(p => ({ ...p, sets: e.target.value }))} placeholder="4" /></div>
                  <div className="sf-field"><label>Reps</label><input value={exForm.reps} onChange={e => setExForm(p => ({ ...p, reps: e.target.value }))} placeholder="8" /></div>
                </div>
                <div className="sf-field"><label>Target / Weight</label><input value={exForm.target} onChange={e => setExForm(p => ({ ...p, target: e.target.value }))} /></div>
                <div className="sf-field"><label>Note (optional)</label><input value={exForm.note} onChange={e => setExForm(p => ({ ...p, note: e.target.value }))} /></div>
                <button className={`btn-save-form${saved ? ' saved' : ''}`} onClick={addExercise}>{saved ? '✓ Added' : 'Add exercise'}</button>
              </div>

              <div className="sf-subheader" style={{ marginTop: '1.5rem' }}>Manage exercises</div>
              {DAY_TYPES.map(d => WEEK_BLOCKS.map(w => {
                const exs = data.training[d][w];
                if (!exs?.length) return null;
                return (
                  <div key={`${d}-${w}`} className="manage-group">
                    <div className="mg-header">{d} · Wk {w}</div>
                    {exs.map(e => (
                      <div key={e.id} className="mg-row">
                        <span>{e.name} ({e.sets}×{e.reps})</span>
                        <button className="btn-remove" onClick={() => removeExercise(d, w, e.id)}>Remove</button>
                      </div>
                    ))}
                  </div>
                );
              }))}
            </div>
          )}

          {tab === 'nutrition' && (
            <div className="settings-section">
              <div className="sf-subheader">Daily targets</div>
              <div className="settings-form">
                {['calories', 'protein', 'carbs', 'fat'].map(k => (
                  <div key={k} className="sf-field">
                    <label>{k.charAt(0).toUpperCase() + k.slice(1)} target</label>
                    <input type="number" value={data.nutrition.dailyTarget[k]} onChange={e => onUpdate('nutrition', { ...data.nutrition, dailyTarget: { ...data.nutrition.dailyTarget, [k]: parseInt(e.target.value)||0 } })} />
                  </div>
                ))}
              </div>

              <div className="sf-subheader" style={{ marginTop: '1.5rem' }}>Add meal</div>
              <div className="settings-form">
                <div className="sf-field"><label>Time</label><input value={mealForm.time} onChange={e => setMealForm(p => ({ ...p, time: e.target.value }))} placeholder="7:00 AM" /></div>
                <div className="sf-field"><label>Meal description</label><input value={mealForm.meal} onChange={e => setMealForm(p => ({ ...p, meal: e.target.value }))} /></div>
                <div className="sf-row">
                  <div className="sf-field"><label>Protein (g)</label><input type="number" value={mealForm.protein} onChange={e => setMealForm(p => ({ ...p, protein: e.target.value }))} /></div>
                  <div className="sf-field"><label>Calories</label><input type="number" value={mealForm.calories} onChange={e => setMealForm(p => ({ ...p, calories: e.target.value }))} /></div>
                </div>
                <button className={`btn-save-form${saved ? ' saved' : ''}`} onClick={addMeal}>{saved ? '✓ Added' : 'Add meal'}</button>
              </div>

              <div className="sf-subheader" style={{ marginTop: '1.5rem' }}>Manage meals</div>
              {data.nutrition.mealPlan.map(m => (
                <div key={m.id} className="mg-row">
                  <span>{m.time} — {m.meal}</span>
                  <button className="btn-remove" onClick={() => removeMeal(m.id)}>Remove</button>
                </div>
              ))}
            </div>
          )}

          {tab === 'account' && (
            <div className="settings-section">
              <div className="account-card">
                <div className="acc-avatar">{user.avatar}</div>
                <div className="acc-info">
                  <div className="acc-name">{user.name}</div>
                  <div className="acc-email">{user.email}</div>
                  <div className="acc-provider">via {user.provider}</div>
                </div>
              </div>
              <button className="btn-logout" onClick={onLogout}>Sign out</button>
              <div className="danger-zone">
                <div className="sf-subheader" style={{ color: '#ef4444' }}>Danger zone</div>
                <button className="btn-danger" onClick={() => { if (window.confirm('Reset all data to defaults?')) { onUpdate('_RESET_', null); } }}>
                  Reset all program data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── AI PANEL ─────────────────────────────────────────────────────────────────
function AIPanel({ data, user, onClose }) {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(`fittrack_apikey_${user.id}`) || '');
  const [connected, setConnected] = useState(() => !!localStorage.getItem(`fittrack_apikey_${user.id}`));
  const [keyInput, setKeyInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi ${user.name?.split(' ')[0] || 'there'}! 👋 I'm your AI fitness coach. Ask me anything about your program — workouts, nutrition, recovery, or what to tweak.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const connect = () => {
    if (!keyInput.startsWith('sk-ant-')) { setErr('Key must start with sk-ant-'); return; }
    localStorage.setItem(`fittrack_apikey_${user.id}`, keyInput);
    setApiKey(keyInput); setConnected(true); setErr('');
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true); setErr('');
    try {
      const ctx = `User: ${user.name}, ${data.profile?.weight}kg, ${data.profile?.bodyFat}% fat, Week ${data.profile?.currentWeek}/8. Program: PPL split, 1980kcal/day, 160g protein target. South Indian diet (rice, dosa, idli). Hair: dry scalp.`;
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: 'claude-opus-4-5', max_tokens: 800,
          system: `You are a personal fitness coach AI in a fitness tracking app. Context: ${ctx}. Be concise, practical, friendly. Use occasional emojis. Max 3–4 short paragraphs.`,
          messages: messages.slice(1).concat({ role: 'user', content: input }).map(m => ({ role: m.role, content: m.content }))
        })
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || 'API error'); }
      const d = await res.json();
      setMessages(p => [...p, { role: 'assistant', content: d.content[0]?.text || 'No response.' }]);
    } catch (e) { setErr(e.message); }
    finally { setLoading(false); }
  };

  const chips = ['What should I eat post-workout?', 'How do I add 5kg to my bench?', 'Is my protein intake enough?', 'Hair wash tips for gym days?'];

  return (
    <div className="ai-drawer">
      <div className="ai-drawer-header">
        <div className="ai-drawer-title">
          <span className="ai-icon">🤖</span>
          <div>
            <div className="ai-title-text">AI Coach</div>
            {connected && <div className="ai-connected">● Connected</div>}
          </div>
        </div>
        <button className="modal-close" onClick={onClose}>✕</button>
      </div>

      {!connected ? (
        <div className="ai-connect-screen">
          <div className="ai-connect-icon">🤖</div>
          <h3>Connect Claude AI</h3>
          <p>Enter your Anthropic API key to chat with Claude about your program.</p>
          <a href="https://console.anthropic.com/account/keys" target="_blank" rel="noopener noreferrer">Get API key →</a>
          <input className="ai-key-input" type="password" placeholder="sk-ant-api03-..." value={keyInput}
            onChange={e => setKeyInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && connect()} />
          {err && <div className="ai-err">{err}</div>}
          <button className="btn-connect" onClick={connect}>Connect</button>
          <p className="ai-key-note">Key stored locally in your browser only.</p>
        </div>
      ) : (
        <>
          <div className="ai-chips">
            {chips.map(c => <button key={c} className="ai-chip" onClick={() => setInput(c)}>{c}</button>)}
          </div>
          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg-${m.role}`}>
                {m.role === 'assistant' && <div className="ai-msg-avatar">🤖</div>}
                <div className="ai-msg-bubble">{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="ai-msg ai-msg-assistant">
                <div className="ai-msg-avatar">🤖</div>
                <div className="ai-msg-bubble ai-typing"><span/><span/><span/></div>
              </div>
            )}
            {err && <div className="ai-err" style={{margin:'8px 12px'}}>{err}</div>}
            <div ref={bottomRef} />
          </div>
          <div className="ai-input-row">
            <textarea className="ai-input" value={input} rows={2} placeholder="Ask your coach..."
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
            <button className="btn-ai-send" onClick={send} disabled={loading || !input.trim()}>↑</button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'training', label: 'Training', icon: '🏋' },
  { id: 'nutrition', label: 'Nutrition', icon: '🥗' },
  { id: 'haircare', label: 'Hair Care', icon: '💆' },
];

export default function App() {
  const [user, setUser] = useState(() => {
    const sid = localStorage.getItem('fittrack_session');
    if (!sid) return null;
    const users = JSON.parse(localStorage.getItem('fittrack_users') || '{}');
    return users[sid] || null;
  });
  const [data, setData] = useState(() => user ? loadData(user.id) : INITIAL_DATA);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAI, setShowAI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const updateData = useCallback((section, val) => {
    if (section === '_RESET_') {
      setData(INITIAL_DATA);
      if (user) saveData(user.id, INITIAL_DATA);
      return;
    }
    setData(prev => {
      const next = { ...prev, [section]: val };
      if (user) saveData(user.id, next);
      return next;
    });
  }, [user]);

  const handleLogin = (u) => {
    setUser(u);
    setData(loadData(u.id));
  };

  const handleLogout = () => {
    localStorage.removeItem('fittrack_session');
    setUser(null);
    setShowSettings(false);
  };

  if (!user) return <AuthScreen onLogin={handleLogin} />;

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <div className="app-logo-mark">💪</div>
          <div className="app-brand">
            <div className="app-name">FitTrack</div>
            <div className="app-tagline">Week {data.profile?.currentWeek || 1} of 8 · {data.profile?.weight || 72.2}kg</div>
          </div>
        </div>
        <div className="header-right">
          <button className={`header-btn ai-btn${showAI ? ' active' : ''}`} onClick={() => { setShowAI(v => !v); setShowSettings(false); }}>
            <span>🤖</span> AI Coach
          </button>
          <button className={`header-btn${showSettings ? ' active' : ''}`} onClick={() => { setShowSettings(v => !v); setShowAI(false); }}>
            ⚙️
          </button>
          <button className="user-avatar-btn" onClick={() => { setShowSettings(v => !v); setShowAI(false); }}>
            {user.avatar}
          </button>
        </div>
      </header>

      {/* Tab nav */}
      <nav className="bottom-nav">
        {TABS.map(t => (
          <button key={t.id} className={`bnav-btn${activeTab === t.id ? ' active' : ''}`}
            onClick={() => setActiveTab(t.id)}>
            <span className="bnav-icon">{t.icon}</span>
            <span className="bnav-label">{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Main content */}
      <main className="app-main">
        {activeTab === 'overview' && <OverviewTab data={data} onUpdate={updateData} />}
        {activeTab === 'training' && <TrainingTab data={data} onUpdate={updateData} />}
        {activeTab === 'nutrition' && <NutritionTab data={data} onUpdate={updateData} />}
        {activeTab === 'haircare' && <HairCareTab data={data} onUpdate={updateData} />}
      </main>

      {/* AI Drawer overlay */}
      {showAI && (
        <div className="drawer-overlay" onClick={() => setShowAI(false)}>
          <div onClick={e => e.stopPropagation()}>
            <AIPanel data={data} user={user} onClose={() => setShowAI(false)} />
          </div>
        </div>
      )}

      {/* Settings Panel overlay */}
      {showSettings && (
        <SettingsPanel data={data} onUpdate={updateData} user={user}
          onLogout={handleLogout} onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}