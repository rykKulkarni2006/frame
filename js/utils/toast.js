/**
 * TOAST NOTIFICATION UTILITY
 * Student Learning Note: Dynamically creates HTML elements and appends them
 * to a fixed toast container, removing them automatically after a timer.
 */

export function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  // Icon based on notification type
  const icon = type === 'success' ? '✓' : 'ℹ';
  
  toast.innerHTML = `
    <span style="color: var(--primary); font-weight: bold; font-size: 1.1rem;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove toast after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
