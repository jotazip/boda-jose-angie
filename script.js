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
