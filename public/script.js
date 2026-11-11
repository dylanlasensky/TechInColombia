// Open links to other websites in a new tab.
const links = document.querySelectorAll('a[href^="https://"]');

links.forEach(function (link) {
  link.target = '_blank';
  link.rel = 'noopener';
});

// Leave room for the header when jumping to a section.
const header = document.querySelector('.site-header');
function updateHeaderSpace() {
  document.documentElement.style.setProperty('--header-offset', `${header.offsetHeight + 16}px`);
}
updateHeaderSpace();
if ('ResizeObserver' in window) {
  new ResizeObserver(updateHeaderSpace).observe(header);
} else {
  window.addEventListener('resize', updateHeaderSpace);
}
