// ===== HERO SLIDER =====
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
let currentSlide = 0;
let heroInterval;

function goToSlide(index) {
  heroSlides.forEach(s => s.classList.remove('active'));
  heroDots.forEach(d => d.classList.remove('active'));
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides[currentSlide].classList.add('active');
  heroDots[currentSlide].classList.add('active');
}

function startHeroAutoplay() {
  heroInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetHeroAutoplay() {
  clearInterval(heroInterval);
  startHeroAutoplay();
}

heroPrev.addEventListener('click', () => { goToSlide(currentSlide - 1); resetHeroAutoplay(); });
heroNext.addEventListener('click', () => { goToSlide(currentSlide + 1); resetHeroAutoplay(); });
heroDots.forEach(dot => {
  dot.addEventListener('click', () => { goToSlide(parseInt(dot.dataset.index)); resetHeroAutoplay(); });
});
startHeroAutoplay();

// ===== CAROUSEL NAVIGATION =====
document.querySelectorAll('.carousel-nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const trackId = btn.dataset.carousel;
    if (!trackId) return;
    const track = document.getElementById(trackId);
    if (!track) return;
    const scrollAmount = 220;
    if (btn.classList.contains('prev')) {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(139, 26, 26, 0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('.navbar-links a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.querySelectorAll('.navbar-links a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
