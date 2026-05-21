// ===== ROYAL DARK MODE TOGGLE =====
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  if (themeIcon) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
}

if (themeToggleBtn && themeIcon) {
  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeIcon.style.transform = 'scale(0) rotate(90deg)';
    setTimeout(() => {
      if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
      }
      themeIcon.style.transform = 'scale(1) rotate(0deg)';
    }, 150);
  });
}

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
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Manage active states dynamically
    if (link.classList.contains('drawer-item')) {
      document.querySelectorAll('.drawer-item').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    } else {
      document.querySelectorAll('.navbar-links a').forEach(l => l.classList.remove('active'));
      const dropdownParent = link.closest('.nav-dropdown-container');
      if (dropdownParent) {
        dropdownParent.querySelector('.nav-dropdown').classList.add('active');
      } else if (link.closest('.navbar-links')) {
        link.classList.add('active');
      }
    }
  });
});

// ===== MOBILE DRAWER TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const closeDrawer = document.getElementById('closeDrawer');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');

function openMobileDrawer() {
  mobileDrawer.classList.add('active');
  drawerOverlay.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeMobileDrawer() {
  mobileDrawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
  document.body.style.overflow = ''; // Restore background scrolling
}

if (menuToggle && mobileDrawer && drawerOverlay) {
  menuToggle.addEventListener('click', openMobileDrawer);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMobileDrawer);
  drawerOverlay.addEventListener('click', closeMobileDrawer);

  // Auto-close drawer when clicking on any link inside it
  document.querySelectorAll('.drawer-item').forEach(item => {
    item.addEventListener('click', closeMobileDrawer);
  });
}

// ===== GLOBAL SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  const progressEl = document.getElementById('scrollProgress');
  if (progressEl) {
    progressEl.style.width = scrolled + "%";
  }
});

// ===== INTERACTIVE CUSTOMIZER SHOWCASE =====
const fabricBtns = document.querySelectorAll('.fabric-btn');
const motifBtns = document.querySelectorAll('.motif-btn');
const previewFabricTag = document.getElementById('previewFabricTag');
const previewMotifTag = document.getElementById('previewMotifTag');
const customizerPreviewImg = document.getElementById('customizerPreviewImg');
const customizerInquiryBtn = document.getElementById('customizerInquiryBtn');

let selectedFabric = "Royal Silk";
let selectedMotif = "Lakshmi Devotion";

if (fabricBtns.length > 0 && motifBtns.length > 0) {
  // Fabric Selectors
  fabricBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      fabricBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedFabric = btn.dataset.fabric;
      if (previewFabricTag) {
        previewFabricTag.textContent = selectedFabric;
      }
    });
  });

  // Motif Selectors
  motifBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      motifBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedMotif = btn.dataset.motif;
      if (previewMotifTag) {
        previewMotifTag.textContent = selectedMotif;
      }
      
      // Dynamic cross-fade animation for the preview image
      if (customizerPreviewImg && btn.dataset.image) {
        customizerPreviewImg.style.opacity = '0.3';
        customizerPreviewImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          customizerPreviewImg.src = btn.dataset.image;
          customizerPreviewImg.style.opacity = '1';
          customizerPreviewImg.style.transform = 'scale(1)';
        }, 180);
      }
    });
  });

  // WhatsApp Customizer Submit
  if (customizerInquiryBtn) {
    customizerInquiryBtn.addEventListener('click', () => {
      const phoneNumber = "91738220377";
      const waMessage = `Hi VBK Designs! I am interested in placing a custom order for a personalized Aduthera. I have configured the design on your interactive customizer:\n\n- Fabric Base: ${selectedFabric}\n- Sacred Motif: ${selectedMotif}\n\nPlease share the custom pricing, sizing options, and delivery timeline!`;
      const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');
    });
  }
}

// ===== BESTSELLERS DATA & QUICK VIEW MODAL =====
const bestsellersData = {
  "Lakshmi Aduthera": {
    image: "images/hero-2.png",
    price: "₹2,499",
    desc: "A premium handcrafted Aduthera adorned with intricate gold Zardosi embroidery of the sacred Goddess Lakshmi. Perfect for lining ceremonial plates, holding deities, or elevating home temple shrines during festive pujas.",
    fabric: "Royal Silk (Customizable in Satin or Cotton)"
  },
  "Swastik Aduthera": {
    image: "images/surya-aduthera.png",
    price: "₹2,199",
    desc: "This sacred Aduthera features the holy Swastik motif, representing auspicious beginnings, peace, and eternal prosperity. Meticulously stitched with shimmering gold thread onto pure velvet-maroon fabric base.",
    fabric: "Premium Satin (Customizable in Silk or Cotton)"
  },
  "Shankh Chakra Namalu": {
    image: "images/hero-3.png",
    price: "₹2,799",
    desc: "Adorned with the majestic symbols of the Shankha (Conch shell) and Chakra (Divine discus) flanking the sacred Tilak. Invokes powerful divine protections and celestial grace for your household altars.",
    fabric: "Royal Silk (Customizable in Satin or Cotton)"
  },
  "Surya Aduthera": {
    image: "images/surya-aduthera.png",
    price: "₹2,299",
    desc: "Inspired by the ultimate source of cosmic energy, the Surya Aduthera features a brilliant sunburst motif in golden zari work. Brings warmth, vitality, and glowing traditional brilliance to your spiritual spaces.",
    fabric: "Sacred Cotton (Customizable in Silk or Satin)"
  },
  "Priya Sachin Aduthera": {
    image: "images/hero-4.png",
    price: "₹2,499",
    desc: "A premium celebratory custom-embellished Aduthera designed specifically for sacred wedding milestones. Embellished with beautiful traditional border motifs and customizable family name lettering.",
    fabric: "Royal Silk (Customizable in Satin or Cotton)"
  },
  "Custom Name Aduthera": {
    image: "images/hero-1.png",
    price: "₹2,999",
    desc: "Our finest bespoke offering. Personalize this exquisite Aduthera with custom hand-embroidered family names, special wedding dates, or unique personalized mantras. Handcrafted with utmost devotion.",
    fabric: "Bespoke Silk / Velvet (Customizable)"
  }
};

const inquiryModal = document.getElementById('inquiryModal');
const closeInquiryModal = document.getElementById('closeInquiryModal');
const closeModalOverlay = document.getElementById('closeModalOverlay');
const modalProductImg = document.getElementById('modalProductImg');
const modalProductName = document.getElementById('modalProductName');
const modalProductPrice = document.getElementById('modalProductPrice');
const modalProductDesc = document.getElementById('modalProductDesc');
const modalProductFabric = document.getElementById('modalProductFabric');
const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');

function openInquiryModal(productName) {
  const data = bestsellersData[productName];
  if (!data || !inquiryModal) return;

  // Set Modal Contents
  if (modalProductImg) modalProductImg.src = data.image;
  if (modalProductName) modalProductName.textContent = productName;
  if (modalProductPrice) modalProductPrice.textContent = data.price;
  if (modalProductDesc) modalProductDesc.textContent = data.desc;
  if (modalProductFabric) modalProductFabric.textContent = data.fabric;

  // Generate pre-filled WhatsApp inquiry link
  const phoneNumber = "91738220377";
  const waMessage = `Hi VBK Designs! I am highly interested in ordering the custom "${productName}" (${data.price}) featured on your website. Could you please share the fabric customizers and guide me with the ordering process?`;
  if (modalWhatsAppBtn) {
    modalWhatsAppBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waMessage)}`;
  }

  // Show Modal
  inquiryModal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Stop background scroll
}

function closeInquiryModalFn() {
  if (inquiryModal) {
    inquiryModal.classList.remove('active');
  }
  document.body.style.overflow = ''; // Restore background scroll
}

// Bind "View Details" Click Events in Bestsellers
document.querySelectorAll('#bestsellers .view-details-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const card = link.closest('.product-card');
    if (!card) return;
    const nameEl = card.querySelector('.product-card-name');
    if (nameEl) {
      const productName = nameEl.textContent.trim();
      openInquiryModal(productName);
    }
  });
});

// Bind Modal Close Click Events
if (closeInquiryModal) closeInquiryModal.addEventListener('click', closeInquiryModalFn);
if (closeModalOverlay) closeModalOverlay.addEventListener('click', closeInquiryModalFn);

// Close modal on Escape key press
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeInquiryModalFn();
  }
});


