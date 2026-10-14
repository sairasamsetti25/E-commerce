import { defaultState, storageKey } from './config.js';

export function readState() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
}

export const state = { ...defaultState, ...readState() };
if (!Array.isArray(state.foodLog)) state.foodLog = [];

export function saveState() { localStorage.setItem(storageKey, JSON.stringify(state)); }
export function firstName() { return state.profileName.trim().split(/\s+/)[0] || 'there'; }
