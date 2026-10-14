export function createUI({ body, overlay, modalBackdrop, toast }) {
  let toastTimer; let lastFocusedElement = null; let activeDialog = null;
  function showToast(message) { toast.textContent = message; toast.classList.add('show'); window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200); }
  function closeMenu() { body.classList.remove('menu-open'); overlay.hidden = true; }
  function openDialog(id, trigger) { const dialog = document.querySelector(`#${id}`); if (!dialog) return; closeMenu(); lastFocusedElement = trigger || document.activeElement; activeDialog = dialog; modalBackdrop.hidden = false; dialog.hidden = false; body.classList.add('dialog-open'); const firstControl = dialog.querySelector('button, input, select, [tabindex="0"]'); (firstControl || dialog).focus(); if (id === 'food-modal') document.querySelector('#food-search').focus(); }
  function closeDialog() { if (!activeDialog) return; activeDialog.hidden = true; activeDialog = null; modalBackdrop.hidden = true; body.classList.remove('dialog-open'); if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus(); }
  function cycleDialogFocus(event) { if (!activeDialog || event.key !== 'Tab') return; const focusable = [...activeDialog.querySelectorAll('button, input, select, [href], [tabindex]:not([tabindex="-1"])')].filter((element) => !element.disabled); if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }
  return { showToast, closeMenu, openDialog, closeDialog, cycleDialogFocus, hasOpenDialog: () => Boolean(activeDialog) };
}

export function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
