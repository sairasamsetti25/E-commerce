const body = document.body;
const overlay = document.querySelector('#overlay');
const toast = document.querySelector('#toast');
let toastTimer;

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

document.querySelector('#open-menu').addEventListener('click', () => {
  body.classList.add('menu-open');
  overlay.hidden = false;
});
document.querySelector('#close-menu').addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', closeMenu));

document.querySelector('#upgrade-button').addEventListener('click', () => showToast('Upgrade flow placeholder — coming in the next iteration.'));
document.querySelector('#start-plan').addEventListener('click', () => showToast('Evening routine started. Your first step is saved.'));
document.querySelector('#view-plan').addEventListener('click', () => showToast('Plan details placeholder — this will open the routine view.'));
document.querySelector('#open-movement').addEventListener('click', () => showToast('Movement plan placeholder — weekly planning is next.'));
document.querySelector('#save-insight').addEventListener('click', () => showToast('Note saved to your private dashboard.'));
document.querySelector('#profile-button').addEventListener('click', () => showToast('Profile menu placeholder.'));

const search = document.querySelector('#metric-search');
window.addEventListener('keydown', (event) => {
  if (event.key === '/' && document.activeElement !== search) {
    event.preventDefault();
    search.focus();
  }
  if (event.key === 'Escape') closeMenu();
});
search.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll('.card').forEach((card) => {
    card.style.opacity = !query || card.textContent.toLowerCase().includes(query) ? '1' : '0.38';
  });
});
