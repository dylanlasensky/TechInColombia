// External sources open in a separate tab.
for (const link of document.querySelectorAll('a[href^="https://"]')) {
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
}

const menu = document.querySelector('.quick-menu');
const summary = menu.querySelector('summary');
menu.addEventListener('click', event => {
  if (event.target.closest('a')) menu.open = false;
});

document.addEventListener('click', event => {
  if (menu.open && !menu.contains(event.target)) menu.open = false;
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    summary.focus();
  }
});

// Keep section links below the navigation.
const navigation = document.querySelector('.site-header');
function updateHeaderSpace() {
  document.documentElement.style.setProperty('--header-offset', (navigation.offsetHeight + 16) + 'px');
}
updateHeaderSpace();
if ('ResizeObserver' in window) {
  new ResizeObserver(updateHeaderSpace).observe(navigation);
} else {
  window.addEventListener('resize', updateHeaderSpace);
}
