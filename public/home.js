const track = document.querySelector('.scene-track');
const stage = track.querySelector('.scene-pin');
const landscape = stage.querySelector('.landscape');
const mist = stage.querySelector('.mist');
const question = stage.querySelector('.q-copy');
const siteHeader = document.querySelector('header');
const moving = matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 441px)');
document.documentElement.classList.add('motion-on');

function smooth(value) {
  const fraction = Math.max(0, Math.min(1, value));
  return fraction * fraction * (3 - 2 * fraction);
}

function paintScene() {
  if (!moving.matches) {
    for (const layer of [landscape, mist, question]) {
      layer.removeAttribute('style');
    }
    return;
  }

  const bounds = track.getBoundingClientRect();
  const height = stage.offsetHeight;
  const approach = height * .52;
  const distance = Math.max(1, bounds.height - height + approach);
  const progress = Math.max(0, Math.min(1, (siteHeader.offsetHeight + approach - bounds.top) / distance));
  const reveal = smooth(progress / .96);

  // The whole hillside rises together as the camera settles.
  landscape.style.transform = 'translateY(' + (1.25 * (1 - reveal)) + '%) scale(' + (1 + .042 * (1 - reveal)) + ')';
  question.style.opacity = String(1 - smooth((progress - .67) / .22));
  mist.style.opacity = String(1 - .13 * reveal - .87 * smooth((progress - .72) / .24));
}
let queued = false;
function schedulePaint() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    paintScene();
  });
}
let onScreen = true;
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    onScreen = entries[0].isIntersecting;
    schedulePaint();
  }, { rootMargin: '200px' }).observe(track);
}
addEventListener('scroll', () => {
  if (onScreen) schedulePaint();
}, { passive: true });
addEventListener('resize', schedulePaint);
addEventListener('pageshow', schedulePaint);
moving.addEventListener('change', schedulePaint);
paintScene();
