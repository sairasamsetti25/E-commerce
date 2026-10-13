const body = document.body;
const overlay = document.querySelector('#overlay');
const modalBackdrop = document.querySelector('#modal-backdrop');
const toast = document.querySelector('#toast');
const storageKey = 'carewell-demo-state-v1';
const defaultState = {
  waterMl: 1600,
  planComplete: false,
  movementDone: 3,
  profileName: 'Alex Rivera',
  profileGoal: 'Better sleep',
  reminders: true,
  insights: true,
  selectedRange: 'D',
  selectedPlan: 'Monthly',
};

let state = { ...defaultState, ...readState() };
let toastTimer;
let lastFocusedElement = null;
let activeDialog = null;

function readState() {
  try { return JSON.parse(localStorage.getItem(storageKey)) || {}; } catch { return {}; }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
}

function closeMenu() {
  body.classList.remove('menu-open');
  overlay.hidden = true;
}

function updateDashboard() {
  const waterValue = document.querySelector('.water-visual strong');
  const progress = document.querySelector('.progress-line span');
  const waterCopy = document.querySelector('.water-visual small');
  const waterPercent = Math.min(100, Math.round((state.waterMl / 2200) * 100));
  const rangeLabels = { D: 'today', W: 'this week', M: 'this month' };
  waterValue.innerHTML = `${(state.waterMl / 1000).toFixed(1)}<span>L</span>`;
  waterCopy.textContent = `${waterPercent}% of 2.2 L ${rangeLabels[state.selectedRange] || 'today'}`;
  progress.style.width = `${waterPercent}%`;

  const planButton = document.querySelector('#start-plan');
  planButton.innerHTML = state.planComplete ? 'Routine complete <span aria-hidden="true">✓</span>' : 'Start plan <span aria-hidden="true">→</span>';
  planButton.classList.toggle('is-complete', state.planComplete);
  document.querySelector('.hero-card .status-pill').innerHTML = state.planComplete ? '<span class="status-dot"></span> Completed today' : '<span class="status-dot"></span> Today’s focus';

  const movementCopy = document.querySelector('.movement-copy strong');
  movementCopy.innerHTML = `${state.movementDone} <span>of 4</span>`;
  document.querySelectorAll('.week-dots span').forEach((dot, index) => dot.classList.toggle('done', index < state.movementDone));
  document.querySelector('.profile-copy strong').textContent = state.profileName;
  document.querySelector('.profile-copy small').textContent = state.profileGoal;
  document.querySelector('#profile-name').value = state.profileName;
  document.querySelector('#profile-goal').value = state.profileGoal;
  document.querySelectorAll('[data-setting]').forEach((button) => {
    const enabled = Boolean(state[button.dataset.setting]);
    button.classList.toggle('is-on', enabled);
    button.setAttribute('aria-checked', String(enabled));
  });
  document.querySelectorAll('[data-range]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.range === state.selectedRange)));
}

function openDialog(id, trigger) {
  const dialog = document.querySelector(`#${id}`);
  if (!dialog) return;
  closeMenu();
  lastFocusedElement = trigger || document.activeElement;
  activeDialog = dialog;
  modalBackdrop.hidden = false;
  dialog.hidden = false;
  body.classList.add('dialog-open');
  const firstControl = dialog.querySelector('button, input, select, [tabindex="0"]');
  (firstControl || dialog).focus();
}

function closeDialog() {
  if (!activeDialog) return;
  activeDialog.hidden = true;
  activeDialog = null;
  modalBackdrop.hidden = true;
  body.classList.remove('dialog-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
}

function cycleDialogFocus(event) {
  if (!activeDialog || event.key !== 'Tab') return;
  const focusable = [...activeDialog.querySelectorAll('button, input, select, [href], [tabindex]:not([tabindex="-1"])')].filter((element) => !element.disabled);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}

document.querySelector('#open-menu').addEventListener('click', () => { body.classList.add('menu-open'); overlay.hidden = false; });
document.querySelector('#close-menu').addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', (event) => {
  closeMenu();
  const modal = item.dataset.modal;
  if (modal) { event.preventDefault(); openDialog(modal, item); }
  if (item.id === 'notifications-link') { event.preventDefault(); showToast('You have two gentle reminders waiting.'); }
}));

document.querySelectorAll('[data-modal]').forEach((button) => button.addEventListener('click', () => openDialog(button.dataset.modal, button)));
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', closeDialog));
modalBackdrop.addEventListener('click', closeDialog);

document.querySelector('#upgrade-button').addEventListener('click', (event) => openDialog('upgrade-modal', event.currentTarget));
document.querySelector('#profile-button').addEventListener('click', (event) => openDialog('profile-modal', event.currentTarget));
document.querySelector('#view-plan').addEventListener('click', (event) => openDialog('plan-modal', event.currentTarget));
document.querySelector('#start-plan').addEventListener('click', () => {
  if (state.planComplete) { showToast('This routine is already complete for today.'); return; }
  openDialog('plan-modal', document.querySelector('#start-plan'));
});
document.querySelector('#complete-plan').addEventListener('click', () => {
  state.planComplete = true; saveState(); updateDashboard(); closeDialog(); showToast('Nice work. Your evening routine is complete.');
});

document.querySelectorAll('.plan-option').forEach((button) => button.addEventListener('click', () => {
  state.selectedPlan = button.dataset.plan;
  document.querySelectorAll('.plan-option').forEach((option) => option.classList.toggle('selected', option === button));
}));
document.querySelector('#choose-plan').addEventListener('click', () => { saveState(); closeDialog(); showToast(`${state.selectedPlan} plan selected. Billing will be added later.`); });

let waterEntry = 250;
document.querySelector('#add-water').addEventListener('click', () => { waterEntry = Math.min(1000, waterEntry + 250); document.querySelector('#water-entry').textContent = waterEntry; });
document.querySelector('#remove-water').addEventListener('click', () => { waterEntry = Math.max(250, waterEntry - 250); document.querySelector('#water-entry').textContent = waterEntry; });
document.querySelector('#save-water').addEventListener('click', () => { state.waterMl += waterEntry; saveState(); updateDashboard(); closeDialog(); showToast(`${waterEntry} ml added to today’s hydration.`); waterEntry = 250; document.querySelector('#water-entry').textContent = waterEntry; });

document.querySelectorAll('[data-sleep]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-sleep]').forEach((option) => option.classList.toggle('selected', option === button));
  document.querySelector('#sleep-feedback-copy').textContent = `${button.dataset.sleep} noted. This will inform a future demo insight.`;
  showToast(`Sleep feedback saved: ${button.dataset.sleep}.`);
}));

document.querySelectorAll('[data-movement]').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('[data-movement]').forEach((option) => option.classList.toggle('selected', option === button));
  state.movementDone = Math.min(4, state.movementDone + 1); saveState(); updateDashboard();
  document.querySelector('#movement-feedback-copy').textContent = `${button.dataset.movement} added to today’s movement plan.`;
  showToast('Movement plan updated.');
}));
document.querySelector('#open-movement').addEventListener('click', (event) => openDialog('movement-modal', event.currentTarget));

document.querySelector('#profile-form').addEventListener('submit', (event) => {
  event.preventDefault();
  state.profileName = document.querySelector('#profile-name').value.trim() || defaultState.profileName;
  state.profileGoal = document.querySelector('#profile-goal').value;
  saveState(); updateDashboard(); closeDialog(); showToast('Profile preferences saved.');
});
document.querySelectorAll('[data-setting]').forEach((button) => button.addEventListener('click', () => {
  const key = button.dataset.setting; state[key] = !state[key]; updateDashboard();
}));
document.querySelector('#save-settings').addEventListener('click', () => { saveState(); closeDialog(); showToast('Privacy settings saved.'); });

document.querySelectorAll('[data-range]').forEach((button) => button.addEventListener('click', () => {
  state.selectedRange = button.dataset.range;
  const labels = { D: 'today', W: 'this week', M: 'this month' };
  document.querySelector('.water-visual small').textContent = `${Math.min(100, Math.round((state.waterMl / 2200) * 100))}% of 2.2 L ${labels[state.selectedRange]}`;
  saveState(); updateDashboard(); showToast(`Hydration view changed to ${labels[state.selectedRange]}.`);
}));

const search = document.querySelector('#metric-search');
search.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  const cards = [...document.querySelectorAll('.card')];
  cards.forEach((card) => { card.hidden = Boolean(query) && !card.textContent.toLowerCase().includes(query); });
  showToast(query ? `${cards.filter((card) => !card.hidden).length} matching metric cards.` : 'Showing all metric cards.');
});

window.addEventListener('keydown', (event) => {
  if (activeDialog) {
    if (event.key === 'Escape') closeDialog();
    cycleDialogFocus(event);
    return;
  }
  if (event.key === '/' && document.activeElement !== search) { event.preventDefault(); search.focus(); }
  if (event.key === 'Escape') closeMenu();
});

updateDashboard();
