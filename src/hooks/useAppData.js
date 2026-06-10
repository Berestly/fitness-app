import { useState, useEffect, useCallback } from 'react';
import { initialData } from '../data/initialData';

const STORAGE_KEY = 'fitness_app_data';

export function useAppData() {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateData = useCallback((section, newSectionData) => {
    setData(prev => ({ ...prev, [section]: newSectionData }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setData(initialData);
  }, []);

  // Generic CRUD helpers
  const addItem = useCallback((section, arrayPath, newItem) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let target = next[section];
      for (let i = 0; i < arrayPath.length; i++) {
        target = target[arrayPath[i]];
      }
      target.push({ ...newItem, id: `${Date.now()}` });
      return next;
    });
  }, []);

  const editItem = useCallback((section, arrayPath, itemId, updatedItem) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let target = next[section];
      for (let i = 0; i < arrayPath.length; i++) {
        target = target[arrayPath[i]];
      }
      const idx = target.findIndex(x => x.id === itemId);
      if (idx !== -1) target[idx] = { ...target[idx], ...updatedItem };
      return next;
    });
  }, []);

  const deleteItem = useCallback((section, arrayPath, itemId) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      let target = next[section];
      for (let i = 0; i < arrayPath.length; i++) {
        target = target[arrayPath[i]];
      }
      const idx = target.findIndex(x => x.id === itemId);
      if (idx !== -1) target.splice(idx, 1);
      return next;
    });
  }, []);

  return { data, updateData, addItem, editItem, deleteItem, resetToDefaults };
}
