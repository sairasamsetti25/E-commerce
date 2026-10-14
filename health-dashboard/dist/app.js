import { state, saveState, firstName } from './js/state.js';
import { calculateMetrics } from './js/calculations.js';
import { createUI } from './js/ui.js';
import { createFoodFeature } from './js/food.js';

const body = document.body;
const overlay = document.querySelector('#overlay');
const modalBackdrop = document.querySelector('#modal-backdrop');
const ui = createUI({ body, overlay, modalBackdrop, toast: document.querySelector('#toast') });
let waterEntry = 250;

const food = createFoodFeature({ updateDashboard, closeDialog: ui.closeDialog, showToast: ui.showToast });

function updateDashboard() {
  const metrics = calculateMetrics(state);
  const waterPercent = Math.min(100, Math.round((state.waterMl / state.waterGoalMl) * 100));
  const rangeLabels = { D: 'today', W: 'this week', M: 'this month' };
  document.querySelector('#first-name').textContent = firstName();
  document.querySelector('.profile-copy strong').textContent = state.profileName || 'Create your profile';
  document.querySelector('.profile-copy small').textContent = state.profileName ? state.profileGoal : 'Set up your profile';
  document.querySelector('.water-visual strong').innerHTML = `${(state.waterMl / 1000).toFixed(1)}<span>L</span>`;
  document.querySelector('.water-visual small').textContent = `${waterPercent}% of ${(state.waterGoalMl / 1000).toFixed(1)} L ${rangeLabels[state.selectedRange] || 'today'} · 250 ml per glass`;
  document.querySelector('.progress-line span').style.width = `${waterPercent}%`;
  document.querySelector('.progress-line').setAttribute('aria-valuenow', String(waterPercent));
  document.querySelector('#water-percent').textContent = waterPercent;
  document.querySelector('#water-remaining').textContent = state.waterMl >= state.waterGoalMl ? 'Goal reached' : `${(state.waterGoalMl - state.waterMl).toLocaleString()} ml`;
  document.querySelector('#water-glasses').textContent = Math.round(state.waterMl / 250);
  document.querySelector('#water-goal-glasses').textContent = Math.round(state.waterGoalMl / 250);
  document.querySelector('#water-goal-select').value = String(state.waterGoalMl);
  document.querySelector('#bmi-value').textContent = metrics.bmi.toFixed(1);
  document.querySelector('#bmi-category').textContent = metrics.category;
  document.querySelector('#bmi-marker').style.left = `${Math.min(96, Math.max(4, ((metrics.bmi - 15) / 25) * 100))}%`;
  document.querySelector('#calorie-maintain').textContent = `${metrics.maintain.toLocaleString()} kcal maintain`;
  document.querySelector('#modal-bmi').textContent = metrics.bmi.toFixed(1);
  document.querySelector('#modal-bmi-category').textContent = metrics.category;
  document.querySelector('#body-surface').textContent = metrics.surface.toFixed(2);
  document.querySelector('#modal-bmr').textContent = metrics.bmr.toLocaleString();
  document.querySelector('#calorie-lose').textContent = `${metrics.lose.toLocaleString()} kcal`;
  document.querySelector('#calorie-maintain-modal').textContent = `${metrics.maintain.toLocaleString()} kcal`;
  document.querySelector('#calorie-gain').textContent = `${metrics.gain.toLocaleString()} kcal`;
  const planButton = document.querySelector('#start-plan');
  planButton.innerHTML = state.planComplete ? 'Routine complete <span aria-hidden="true">✓</span>' : 'Start plan <span aria-hidden="true">→</span>';
  planButton.classList.toggle('is-complete', state.planComplete);
  document.querySelector('.hero-card .status-pill').innerHTML = state.planComplete ? '<span class="status-dot"></span> Completed today' : '<span class="status-dot"></span> Today’s focus';
  document.querySelector('.movement-copy strong').innerHTML = `${state.movementDone} <span>of 4</span>`;
  document.querySelectorAll('.week-dots span').forEach((dot, index) => dot.classList.toggle('done', index < state.movementDone));
  document.querySelector('#profile-name').value = state.profileName;
  document.querySelector('#profile-age').value = state.profileAge;
  document.querySelector('#profile-sex').value = state.profileSex;
  document.querySelector('#profile-height').value = state.profileHeight;
  document.querySelector('#profile-weight').value = state.profileWeight;
  document.querySelector('#profile-activity').value = state.profileActivity;
  document.querySelector('#profile-goal').value = state.profileGoal;
  document.querySelectorAll('[data-setting]').forEach((button) => { const enabled = Boolean(state[button.dataset.setting]); button.classList.toggle('is-on', enabled); button.setAttribute('aria-checked', String(enabled)); });
  document.querySelectorAll('[data-range]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.range === state.selectedRange)));
  const insightButton = document.querySelector('#save-insight');
  insightButton.textContent = state.insightSaved ? 'Note saved ✓' : 'Save note →';
  insightButton.classList.toggle('is-complete', state.insightSaved);
  food.renderFoodLog();
}

function addWater(amount) { state.waterMl += Number(amount); saveState(); updateDashboard(); const remaining = Math.max(0, state.waterGoalMl - state.waterMl); ui.showToast(remaining ? `${amount} ml added. ${remaining.toLocaleString()} ml left today.` : 'Water goal reached for today.'); }

document.querySelector('#open-menu').addEventListener('click', () => { body.classList.add('menu-open'); overlay.hidden = false; });
document.querySelector('#close-menu').addEventListener('click', ui.closeMenu);
overlay.addEventListener('click', ui.closeMenu);
document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', (event) => { ui.closeMenu(); const modal = item.dataset.modal; if (modal) { event.preventDefault(); ui.openDialog(modal, item); } if (item.id === 'notifications-link') { event.preventDefault(); ui.showToast('You have two gentle reminders waiting.'); } }));
document.querySelectorAll('[data-modal]').forEach((button) => button.addEventListener('click', () => ui.openDialog(button.dataset.modal, button)));
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', ui.closeDialog));
modalBackdrop.addEventListener('click', ui.closeDialog);

document.querySelector('#upgrade-button').addEventListener('click', (event) => ui.openDialog('upgrade-modal', event.currentTarget));
document.querySelector('#profile-button').addEventListener('click', (event) => ui.openDialog('profile-modal', event.currentTarget));
document.querySelector('#view-plan').addEventListener('click', (event) => ui.openDialog('plan-modal', event.currentTarget));
document.querySelector('#start-plan').addEventListener('click', () => { if (state.planComplete) { ui.showToast('This routine is already complete for today.'); return; } ui.openDialog('plan-modal', document.querySelector('#start-plan')); });
document.querySelector('#complete-plan').addEventListener('click', () => { state.planComplete = true; saveState(); updateDashboard(); ui.closeDialog(); ui.showToast('Nice work. Your evening routine is complete.'); });
document.querySelectorAll('.plan-option').forEach((button) => button.addEventListener('click', () => { state.selectedPlan = button.dataset.plan; document.querySelectorAll('.plan-option').forEach((option) => option.classList.toggle('selected', option === button)); }));
document.querySelector('#choose-plan').addEventListener('click', () => { saveState(); ui.closeDialog(); ui.showToast(`${state.selectedPlan} plan selected. Billing will be added later.`); });

document.querySelectorAll('[data-quick-water]').forEach((button) => button.addEventListener('click', () => addWater(button.dataset.quickWater)));
document.querySelectorAll('[data-water-amount]').forEach((button) => button.addEventListener('click', () => { waterEntry = Number(button.dataset.waterAmount); document.querySelector('#water-entry').textContent = waterEntry; }));
document.querySelector('#water-goal-select').addEventListener('change', (event) => { state.waterGoalMl = Number(event.target.value); saveState(); updateDashboard(); ui.showToast(`Daily water goal set to ${Math.round(state.waterGoalMl / 250)} glasses.`); });
document.querySelector('#add-water').addEventListener('click', () => { waterEntry = Math.min(1000, waterEntry + 250); document.querySelector('#water-entry').textContent = waterEntry; });
document.querySelector('#remove-water').addEventListener('click', () => { waterEntry = Math.max(250, waterEntry - 250); document.querySelector('#water-entry').textContent = waterEntry; });
document.querySelector('#save-water').addEventListener('click', () => { addWater(waterEntry); ui.closeDialog(); waterEntry = 250; document.querySelector('#water-entry').textContent = waterEntry; });

document.querySelectorAll('[data-sleep]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-sleep]').forEach((option) => option.classList.toggle('selected', option === button)); document.querySelector('#sleep-feedback-copy').textContent = `${button.dataset.sleep} noted. This will inform a future demo insight.`; ui.showToast(`Sleep feedback saved: ${button.dataset.sleep}.`); }));
document.querySelectorAll('[data-movement]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-movement]').forEach((option) => option.classList.toggle('selected', option === button)); state.movementDone = Math.min(4, state.movementDone + 1); saveState(); updateDashboard(); document.querySelector('#movement-feedback-copy').textContent = `${button.dataset.movement} added to today’s movement plan.`; ui.showToast('Movement plan updated.'); }));
document.querySelector('#open-movement').addEventListener('click', (event) => ui.openDialog('movement-modal', event.currentTarget));

document.querySelector('#profile-form').addEventListener('submit', (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); state.profileName = String(form.get('profile-name') || '').trim(); state.profileGoal = String(form.get('profile-goal')); state.profileAge = Number(form.get('profile-age')) || 32; state.profileSex = String(form.get('profile-sex')); state.profileHeight = Number(form.get('profile-height')) || 178; state.profileWeight = Number(form.get('profile-weight')) || 71; state.profileActivity = Number(form.get('profile-activity')) || 1.55; if (!state.profileName) { ui.showToast('Add your name to create a profile.'); document.querySelector('#profile-name').focus(); return; } saveState(); updateDashboard(); ui.closeDialog(); ui.showToast(`Welcome, ${firstName()}. Your metrics are updated.`); });
document.querySelectorAll('[data-setting]').forEach((button) => button.addEventListener('click', () => { state[button.dataset.setting] = !state[button.dataset.setting]; updateDashboard(); }));
document.querySelector('#save-settings').addEventListener('click', () => { saveState(); ui.closeDialog(); ui.showToast('Privacy settings saved.'); });
document.querySelector('#save-insight').addEventListener('click', () => { state.insightSaved = true; saveState(); updateDashboard(); ui.showToast('Carewell note saved for today.'); });
document.querySelectorAll('[data-range]').forEach((button) => button.addEventListener('click', () => { state.selectedRange = button.dataset.range; saveState(); updateDashboard(); ui.showToast(`Hydration view changed to ${button.textContent === 'D' ? 'today' : button.textContent === 'W' ? 'this week' : 'this month'}.`); }));
document.querySelector('#food-search-form').addEventListener('submit', (event) => { event.preventDefault(); const query = document.querySelector('#food-search').value.trim(); if (query) food.searchFoods(query); });

const search = document.querySelector('#metric-search');
search.addEventListener('input', (event) => { const query = event.target.value.trim().toLowerCase(); const cards = [...document.querySelectorAll('.card')]; cards.forEach((card) => { card.hidden = Boolean(query) && !card.textContent.toLowerCase().includes(query); }); ui.showToast(query ? `${cards.filter((card) => !card.hidden).length} matching metric cards.` : 'Showing all metric cards.'); });
window.addEventListener('keydown', (event) => { if (ui.hasOpenDialog()) { if (event.key === 'Escape') ui.closeDialog(); ui.cycleDialogFocus(event); return; } if (event.key === '/' && document.activeElement !== search) { event.preventDefault(); search.focus(); } if (event.key === 'Escape') ui.closeMenu(); });

updateDashboard();
if (!state.profileName) window.setTimeout(() => ui.openDialog('profile-modal', document.querySelector('#profile-button')), 450);
