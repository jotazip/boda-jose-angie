// Pantalla de bienvenida: carta que se abre en dos mitades
const INTRO_ENABLED = true;
if (INTRO_ENABLED) document.documentElement.classList.add('intro-lock');

const introEl = document.getElementById('scroll-intro');
if (introEl && !INTRO_ENABLED) introEl.style.display = 'none';
const sparkContainer = document.getElementById('introSparkles');

// Estrellas titilando en cada mitad de la carta
document.querySelectorAll('.intro-stars').forEach((container) => {
  const STAR_COUNT = 14;
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'intro-star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${2 + Math.random() * 3}s`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(star);
  }
});

function burstSparkles(cx, cy) {
  if (!sparkContainer) return;
  const count = 44;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'intro-spark';
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 260;
    const ex = Math.cos(angle) * dist;
    const ey = Math.sin(angle) * dist * 0.5;
    s.style.left = `${cx}px`;
    s.style.top = `${cy}px`;
    s.style.setProperty('--spark-end', `translate(${ex}px, ${ey}px)`);
    s.style.animationDuration = `${1.4 + Math.random() * 0.8}s`;
    s.style.animationDelay = `${Math.random() * 0.6}s`;
    sparkContainer.appendChild(s);
    setTimeout(() => s.remove(), 2600);
  }
}

const welcomeEl = document.getElementById('welcome-screen');
const welcomeBtn = document.getElementById('welcomeBtn');
const welcomeP1 = document.querySelector('.welcome-p1');
const welcomeP2 = document.querySelector('.welcome-p2');
let welcomeTimers = [];

function scheduleWelcomeSequence() {
  welcomeTimers.push(setTimeout(() => welcomeP1 && welcomeP1.classList.add('visible'), 3300));
  welcomeTimers.push(setTimeout(() => welcomeP2 && welcomeP2.classList.add('visible'), 6000));
  welcomeTimers.push(setTimeout(() => welcomeBtn && welcomeBtn.classList.add('visible'), 8500));
}

function skipWelcomeSequence() {
  welcomeTimers.forEach(clearTimeout);
  welcomeTimers = [];
  [welcomeP1, welcomeP2, welcomeBtn].forEach((el) => el && el.classList.add('visible'));
}

if (welcomeEl) {
  welcomeEl.addEventListener('click', (evt) => {
    if (evt.target === welcomeBtn) return;
    skipWelcomeSequence();
  });
}

function openIntro() {
  if (!introEl || introEl.classList.contains('opening')) return;

  introEl.classList.add('opening');
  burstSparkles(window.innerWidth / 2, window.innerHeight / 2);

  setTimeout(() => {
    introEl.classList.add('hidden');
  }, 3000);

  scheduleWelcomeSequence();
}

if (introEl) {
  introEl.addEventListener('click', openIntro);
  introEl.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      openIntro();
    }
  });
}

function revealSite() {
  if (!welcomeEl) return;
  welcomeEl.classList.add('hidden');
  document.documentElement.classList.add('intro-done');
  document.documentElement.classList.remove('intro-lock');
  setTimeout(() => {
    welcomeEl.classList.add('gone');
  }, 900);
}

if (welcomeBtn) {
  welcomeBtn.addEventListener('click', revealSite);
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
