// Pantalla de pergamino: bloquea el scroll hasta que se abre
// TEMPORALMENTE DESACTIVADA mientras se ajusta el móvil (ver INTRO_ENABLED)
const INTRO_ENABLED = false;
if (INTRO_ENABLED) document.documentElement.classList.add('intro-lock');

const introEl = document.getElementById('scroll-intro');
if (introEl && !INTRO_ENABLED) introEl.style.display = 'none';
const sparkContainer = document.getElementById('introSparkles');

function burstSparkles(cx, cy) {
  if (!sparkContainer) return;
  const count = 20;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'intro-spark';
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 140;
    const ex = Math.cos(angle) * dist;
    const ey = Math.sin(angle) * dist;
    s.style.left = `${cx}px`;
    s.style.top = `${cy}px`;
    s.style.setProperty('--spark-end', `translate(${ex}px, ${ey}px)`);
    s.style.animationDelay = `${Math.random() * 0.15}s`;
    sparkContainer.appendChild(s);
    setTimeout(() => s.remove(), 1300);
  }
}

function openIntro(evt) {
  if (!introEl || introEl.classList.contains('opening')) return;
  introEl.classList.add('opening');

  const cx = evt && evt.clientX ? evt.clientX : window.innerWidth / 2;
  const cy = evt && evt.clientY ? evt.clientY : window.innerHeight / 2;
  burstSparkles(cx, cy);

  setTimeout(() => {
    introEl.classList.add('hidden');
    document.documentElement.classList.remove('intro-lock');
  }, 550);

  setTimeout(() => {
    introEl.style.display = 'none';
  }, 1500);
}

if (introEl) {
  introEl.addEventListener('click', openIntro);
  introEl.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      openIntro(evt);
    }
  });
}

// Countdown to the wedding
const WEDDING_DATE = new Date('2026-10-18T13:00:00+02:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const diff = Math.max(0, WEDDING_DATE - now);

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val).padStart(2, '0');
  };

  set('cd-days', days);
  set('cd-hours', hours);
  set('cd-mins', mins);
  set('cd-secs', secs);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll reveal for sections below the hero
const revealEls = document.querySelectorAll('.reveal-io');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealEls.forEach((el) => io.observe(el));

// Floating petals
const petalsContainer = document.getElementById('petals');
const PETAL_COUNT = 18;
const petalColors = ['#c98aa0', '#e07a4e', '#c9a668', '#77946f'];

for (let i = 0; i < PETAL_COUNT; i++) {
  const petal = document.createElement('div');
  petal.className = 'petal';
  const size = 6 + Math.random() * 8;
  petal.style.width = `${size}px`;
  petal.style.height = `${size}px`;
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
  petal.style.animationDuration = `${10 + Math.random() * 12}s, ${3 + Math.random() * 3}s`;
  petal.style.animationDelay = `${Math.random() * 12}s, ${Math.random() * 3}s`;
  petalsContainer.appendChild(petal);
}
