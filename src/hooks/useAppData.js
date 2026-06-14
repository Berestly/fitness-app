import { useState, useEffect, useCallback, useMemo } from 'react';
import { initialAppState, ROUTINE_TEMPLATES } from '../data/initialData';

function getStorageKey(username) {
  return username ? `fitness_app_v3_${username}` : 'fitness_app_v3';
}

function formatDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateKey(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function diffInDays(left, right) {
  const start = new Date(left.getFullYear(), left.getMonth(), left.getDate());
  const end = new Date(right.getFullYear(), right.getMonth(), right.getDate());
  return Math.round((start - end) / 86400000);
}

function computeWorkoutStats(checkIns) {
  const uniqueDates = [...new Set(checkIns)].sort();
  const todayKey = formatDateKey();
  const dateSet = new Set(uniqueDates);

  let currentStreak = 0;
  for (let cursor = parseDateKey(todayKey); dateSet.has(formatDateKey(cursor)); cursor.setDate(cursor.getDate() - 1)) {
    currentStreak += 1;
  }

  let bestStreak = 0;
  let streak = 0;
  let previousDate = null;

  uniqueDates.forEach((dateKey) => {
    const currentDate = parseDateKey(dateKey);
    if (previousDate && diffInDays(currentDate, previousDate) === 1) {
      streak += 1;
    } else {
      streak = 1;
    }
    bestStreak = Math.max(bestStreak, streak);
    previousDate = currentDate;
  });

  const lastCheckIn = uniqueDates[uniqueDates.length - 1] || null;
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  const monthlyCount = uniqueDates.filter((dateKey) => parseDateKey(dateKey) >= startOfMonth).length;

  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date();
    day.setDate(day.getDate() - (6 - index));
    const dateKey = formatDateKey(day);
    return {
      label: day.toLocaleDateString(undefined, { weekday: 'short' }),
      dateKey,
      checkedIn: dateSet.has(dateKey),
    };
  });

  return {
    totalCheckIns: uniqueDates.length,
    currentStreak,
    bestStreak,
    monthlyCount,
    lastCheckIn,
    last7Days,
    todayKey,
  };
}

export function useAppData(currentUser) {
  const STORAGE_KEY = getStorageKey(currentUser);
  
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : {};
      return {
        ...initialAppState,
        ...parsed,
        workoutCheckIns: parsed.workoutCheckIns || [],
      };
    } catch {
      return initialAppState;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const workoutStats = useMemo(() => computeWorkoutStats(state.workoutCheckIns || []), [state.workoutCheckIns]);

  const setActiveRoutine = useCallback((id) => {
    setState(prev => ({ ...prev, activeRoutine: id }));
  }, []);

  // Get the current routine (merged with any user edits)
  const getRoutine = useCallback((id) => {
    const base = ROUTINE_TEMPLATES[id];
    const userEdits = state.userRoutines[id] || {};
    return { ...base, ...userEdits };
  }, [state.userRoutines]);

  const updateRoutineExercises = useCallback((routineId, dayKey, phaseId, exercises) => {
    setState(prev => ({
      ...prev,
      userRoutines: {
        ...prev.userRoutines,
        [routineId]: {
          ...(prev.userRoutines[routineId] || {}),
          exercises: {
            ...((prev.userRoutines[routineId] || {}).exercises || ROUTINE_TEMPLATES[routineId].exercises),
            [dayKey]: {
              ...((prev.userRoutines[routineId]?.exercises || ROUTINE_TEMPLATES[routineId].exercises)[dayKey] || {}),
              [phaseId]: exercises,
            },
          },
        },
      },
    }));
  }, []);

  const updateRoadmap = useCallback((newRoadmap) => {
    setState(prev => ({ ...prev, roadmap: newRoadmap }));
  }, []);

  const updateNodeStatus = useCallback((nodeId, status) => {
    setState(prev => ({
      ...prev,
      roadmap: {
        ...prev.roadmap,
        nodes: prev.roadmap.nodes.map(n => n.id === nodeId ? { ...n, status } : n),
      },
    }));
  }, []);

  const updateNode = useCallback((nodeId, updates) => {
    setState(prev => ({
      ...prev,
      roadmap: {
        ...prev.roadmap,
        nodes: prev.roadmap.nodes.map(n => n.id === nodeId ? { ...n, ...updates } : n),
      },
    }));
  }, []);

  const addRoadmapNode = useCallback((node) => {
    setState(prev => ({
      ...prev,
      roadmap: {
        ...prev.roadmap,
        nodes: [...prev.roadmap.nodes, { ...node, id: `node-${Date.now()}` }],
      },
    }));
  }, []);

  const deleteRoadmapNode = useCallback((nodeId) => {
    setState(prev => ({
      ...prev,
      roadmap: {
        ...prev.roadmap,
        nodes: prev.roadmap.nodes.filter(n => n.id !== nodeId),
      },
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setState(initialAppState);
  }, []);

  const recordWorkoutCheckIn = useCallback((date = new Date()) => {
    const dateKey = formatDateKey(date);
    setState(prev => {
      if ((prev.workoutCheckIns || []).includes(dateKey)) {
        return prev;
      }
      return {
        ...prev,
        workoutCheckIns: [...(prev.workoutCheckIns || []), dateKey].sort(),
      };
    });
  }, []);

  const clearWorkoutCheckIns = useCallback(() => {
    setState(prev => ({
      ...prev,
      workoutCheckIns: [],
    }));
  }, []);

  return {
    state,
    activeRoutine: state.activeRoutine,
    setActiveRoutine,
    getRoutine,
    updateRoutineExercises,
    roadmap: state.roadmap,
    updateRoadmap,
    updateNodeStatus,
    updateNode,
    addRoadmapNode,
    deleteRoadmapNode,
    resetToDefaults,
    workoutStats,
    recordWorkoutCheckIn,
    clearWorkoutCheckIns,
  };
}
