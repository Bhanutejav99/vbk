// ===== GOOGLE SHEETS CMS CONFIGURATION =====
// Paste your published Google Spreadsheet ID here (e.g. "1FpLqV0vAExV1r9kLqFm-2Ww5Zle0Jj8QeJ8gqJ1cZ_8")
// Make sure you have set the sheet to "Anyone with the link can view" under Share settings!
const SPREADSHEET_ID = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ2ST8_eeZ1gzsyWJNK55IN9_MmnXDqX63fU2bIc_ZdFrX9rPkommMR3IbzRuf2g3IQgJCcaXH3cOgA/pub?output=csv"; // Leave blank to run entirely on offline fallback data, or enter sheet ID to sync live!

// ===== GLOBAL CMS STATE & FALLBACK DATA =====
let globalWhatsAppNumber = "91738220377";

const fallbackBanners = [
  {
    Slide_Number: "1",
    Title: "Sacred. Timeless.<br>Yours Forever.",
    Subtitle: "Traditional Adutheras",
    Description: "Exquisite embroidered adutheras for your special moments and lifelong blessings.",
    Image_URL: "images/hero-1.png",
    Button_Link: "#collections"
  },
  {
    Slide_Number: "2",
    Title: "Divine Artistry.<br>Every Thread.",
    Subtitle: "Handcrafted with Love",
    Description: "Each piece is meticulously handcrafted by skilled artisans preserving centuries-old traditions.",
    Image_URL: "images/hero-2.png",
    Button_Link: "#bestsellers"
  },
  {
    Slide_Number: "3",
    Title: "Blessed.<br>Handcrafted.<br>Authentic.",
    Subtitle: "Premium Collection",
    Description: "Discover our exclusive range of Shankh Chakra Namalu designs.",
    Image_URL: "images/hero-3.png",
    Button_Link: "#collections"
  },
  {
    Slide_Number: "4",
    Title: "Personalized.<br>Meaningful.<br>Unique.",
    Subtitle: "Custom Orders",
    Description: "Create personalized adutheras with custom names, dates, and designs.",
    Image_URL: "images/hero-4.png",
    Button_Link: "#cta"
  }
];

const fallbackProducts = [
  {
    Product_Name: "Sreenivasa Kalyanam with Shrirasthu",
    Price: "₹2,999",
    Category: "Sreenivasa Kalyanam Series",
    Description: "An exceptionally beautiful ceremonial Aduthera featuring the sacred Sreenivasa Kalyanam wedding motif alongside the divine blessing 'Shrirasthu Shubhamasthu'. Hand-embroidered with brilliant golden Zardosi on pure raw silk.",
    Fabric_Type: "Royal Silk (Customizable in Velvet or Satin)",
    Image_URL: "images/sreenivasa-kalyanam-shrirasthu.png",
    Is_Bestseller: "TRUE",
    Product_Size: 'Standard 15" x 15" (Customizable)',
    Product_Care: "Dry Clean Only"
  },
  {
    Product_Name: "Swastik with Shanku Chakra",
    Price: "₹2,699",
    Category: "Auspicious Swastik Series",
    Description: "An auspicious blend of the sacred Swastik and the divine symbols of the Shanku (Conch) and Chakra (Discus) flanking the corners. Imbues your prayer space with divine protection and eternal prosperity.",
    Fabric_Type: "Premium Satin (Customizable in Silk or Velvet)",
    Image_URL: "images/swastik-shanku-chakra.png",
    Is_Bestseller: "TRUE",
    Product_Size: 'Standard 15" x 15" (Customizable)',
    Product_Care: "Dry Clean Only"
  },
  {
    Product_Name: "Classic Shanku Chakra Namalu",
    Price: "₹2,799",
    Category: "Shanku Chakra Namalu",
    Description: "Adorned with the majestic symbols of the Shankha (Conch shell) and Chakra (Divine discus) flanking the sacred Tilak. Invokes powerful divine protections and celestial grace for your household altars.",
    Fabric_Type: "Royal Silk (Customizable in Satin or Cotton)",
    Image_URL: "images/hero-3.png",
    Is_Bestseller: "TRUE",
    Product_Size: 'Standard 15" x 15" (Customizable)',
    Product_Care: "Dry Clean Only"
  },
  {
    Product_Name: "Sacred Swastik",
    Price: "₹2,299",
    Category: "Auspicious Swastik Series",
    Description: "This sacred Aduthera features the holy Swastik motif, representing auspicious beginnings, peace, and eternal prosperity. Meticulously stitched with shimmering gold thread onto pure velvet-maroon fabric base.",
    Fabric_Type: "Premium Satin (Customizable in Silk or Cotton)",
    Image_URL: "images/hero-2.png",
    Is_Bestseller: "TRUE",
    Product_Size: 'Standard 15" x 15" (Customizable)',
    Product_Care: "Dry Clean Only"
  },
  {
    Product_Name: "Sreenivasa Kalyanam",
    Price: "₹2,899",
    Category: "Sreenivasa Kalyanam Series",
    Description: "An exquisite representation of the divine marriage of Lord Venkateswara and Goddess Padmavathi. Beautifully embroidered in meticulous detail to commemorate and bless wedding milestones.",
    Fabric_Type: "Royal Silk (Customizable in Satin or Cotton)",
    Image_URL: "images/sreenivasa-kalyanam.png",
    Is_Bestseller: "TRUE",
    Product_Size: 'Standard 15" x 15" (Customizable)',
    Product_Care: "Dry Clean Only"
  },
  {
    Product_Name: "Sreenivasa Kalyanam with Swastik",
    Price: "₹3,199",
    Category: "Sreenivasa Kalyanam Series",
    Description: "A magnificent blend of Lord Venkateswara's wedding scene with the auspicious Swastik and Shanku Chakra motifs. The ultimate offering of traditional grace, devotion, and elite craftsmanship.",
    Fabric_Type: "Bespoke Silk / Velvet (Customizable)",
    Image_URL: "images/sreenivasa-kalyanam-swastik.png",
    Is_Bestseller: "TRUE",
    Product_Size: 'Standard 15" x 15" (Customizable)',
    Product_Care: "Dry Clean Only"
  }
];

const fallbackCustomizerOptions = [
  { Option_Type: "Fabric", Option_Name: "Royal Silk", Subtitle: "Luxury traditional sheen", Icon_Class: "silk-swatch", Image_URL: "" },
  { Option_Type: "Fabric", Option_Name: "Premium Satin", Subtitle: "Soft, elegant luster", Icon_Class: "satin-swatch", Image_URL: "" },
  { Option_Type: "Fabric", Option_Name: "Sacred Cotton", Subtitle: "Pure, matte traditional weave", Icon_Class: "cotton-swatch", Image_URL: "" },
  { Option_Type: "Motif", Option_Name: "Sreenivasa Kalyanam", Subtitle: "Celestial wedding blessings", Icon_Class: "fas fa-om", Image_URL: "images/sreenivasa-kalyanam.png" },
  { Option_Type: "Motif", Option_Name: "Swastik with Shanku", Subtitle: "Prosperity and divine conch", Icon_Class: "fas fa-star-of-david", Image_URL: "images/swastik-shanku-chakra.png" },
  { Option_Type: "Motif", Option_Name: "Shanku Chakra Tilak", Subtitle: "Divine protection symbols", Icon_Class: "fas fa-dharmachakra", Image_URL: "images/hero-3.png" },
  { Option_Type: "Motif", Option_Name: "Name Embroidery", Subtitle: "Bespoke names & mantras", Icon_Class: "fas fa-signature", Image_URL: "images/hero-1.png" }
];

const fallbackGlobalSettings = {
  WhatsApp_Number: "91738220377",
  Announcement_Bar_Text: "Accepting bookings for the upcoming wedding season!",
  Instagram_URL: "https://instagram.com/vbkdesigns",
  Facebook_URL: "https://facebook.com/vbkdesigns"
};

// Dynamic runtime dataset used by the Quick View Modal
let bestsellersData = {};

// Active interactive customizer state variables
let selectedFabric = "Royal Silk";
let selectedMotifs = ["Sreenivasa Kalyanam"];

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
let currentSlide = 0;
let heroInterval;

function goToSlide(index) {
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  if (heroSlides.length === 0) return;

  heroSlides.forEach(s => s.classList.remove('active'));
  heroDots.forEach(d => d.classList.remove('active'));

  currentSlide = (index + heroSlides.length) % heroSlides.length;
  if (heroSlides[currentSlide]) heroSlides[currentSlide].classList.add('active');
  if (heroDots[currentSlide]) heroDots[currentSlide].classList.add('active');
}

function startHeroAutoplay() {
  heroInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

function resetHeroAutoplay() {
  clearInterval(heroInterval);
  startHeroAutoplay();
}

const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');

if (heroPrev && heroNext) {
  heroPrev.addEventListener('click', () => { goToSlide(currentSlide - 1); resetHeroAutoplay(); });
  heroNext.addEventListener('click', () => { goToSlide(currentSlide + 1); resetHeroAutoplay(); });
}

// Event delegation for dynamically rendered hero dots
const heroDotsContainer = document.getElementById('heroDots');
if (heroDotsContainer) {
  heroDotsContainer.addEventListener('click', (e) => {
    const dot = e.target.closest('.hero-dot');
    if (dot) {
      const idx = parseInt(dot.dataset.index);
      goToSlide(idx);
      resetHeroAutoplay();
    }
  });
}

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

// Initialize initial animations
function refreshScrollAnimations() {
  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}
refreshScrollAnimations();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 50) {
    navbar.style.boxShadow = '0 2px 20px rgba(139, 26, 26, 0.08)';
  } else {
    navbar.style.boxShadow = 'none';
  }
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
  document.body.style.overflow = 'hidden';
}

function closeMobileDrawer() {
  mobileDrawer.classList.remove('active');
  drawerOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

if (menuToggle && mobileDrawer && drawerOverlay) {
  menuToggle.addEventListener('click', openMobileDrawer);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMobileDrawer);
  drawerOverlay.addEventListener('click', closeMobileDrawer);

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

// ===== QUICK VIEW MODAL CONTROLLERS =====
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

  if (modalProductImg) modalProductImg.src = data.image;
  if (modalProductName) modalProductName.textContent = productName;
  if (modalProductPrice) modalProductPrice.textContent = data.price;
  if (modalProductDesc) modalProductDesc.textContent = data.desc;
  if (modalProductFabric) modalProductFabric.textContent = data.fabric;

  const waMessage = `Hi VBK Designs! I am highly interested in ordering the custom "${productName}" (${data.price}) featured on your website. Could you please share the fabric customizers and guide me with the ordering process?`;
  if (modalWhatsAppBtn) {
    modalWhatsAppBtn.href = `https://wa.me/${globalWhatsAppNumber}?text=${encodeURIComponent(waMessage)}`;
  }

  inquiryModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeInquiryModalFn() {
  if (inquiryModal) {
    inquiryModal.classList.remove('active');
  }
  document.body.style.overflow = '';
}

if (closeInquiryModal) closeInquiryModal.addEventListener('click', closeInquiryModalFn);
if (closeModalOverlay) closeModalOverlay.addEventListener('click', closeInquiryModalFn);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeInquiryModalFn();
  }
});

// Event delegation for Quick View clicks in Bestsellers and Collections
document.body.addEventListener('click', (e) => {
  const detailsLink = e.target.closest('.view-details-link');
  if (detailsLink) {
    e.preventDefault();
    const card = detailsLink.closest('.product-card');
    if (!card) return;
    const nameEl = card.querySelector('.product-card-name');
    if (nameEl) {
      openInquiryModal(nameEl.textContent.trim());
    }
  }
});

// ===== INTERACTIVE CUSTOMIZER EVENT BINDINGS =====
const customizerInquiryBtn = document.getElementById('customizerInquiryBtn');
const previewFabricTag = document.getElementById('previewFabricTag');
const previewMotifTag = document.getElementById('previewMotifTag');
const customizerPreviewImg = document.getElementById('customizerPreviewImg');

function bindCustomizerEvents() {
  const fabricsGrid = document.querySelector('.fabrics-grid');
  const motifsGrid = document.querySelector('.motifs-grid');

  if (fabricsGrid) {
    // Replace listener with a fresh clean delegation
    const newFabricsGrid = fabricsGrid.cloneNode(true);
    fabricsGrid.parentNode.replaceChild(newFabricsGrid, fabricsGrid);

    newFabricsGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.fabric-btn');
      if (btn) {
        newFabricsGrid.querySelectorAll('.fabric-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedFabric = btn.dataset.fabric;
        if (previewFabricTag) {
          previewFabricTag.textContent = selectedFabric;
        }
        if (typeof update3DFabric === 'function') {
          update3DFabric(selectedFabric);
        }
      }
    });
  }

  if (motifsGrid) {
    // Replace listener with a fresh clean delegation
    const newMotifsGrid = motifsGrid.cloneNode(true);
    motifsGrid.parentNode.replaceChild(newMotifsGrid, motifsGrid);

    newMotifsGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.motif-btn');
      if (btn) {
        const motifName = btn.dataset.motif;
        if (btn.classList.contains('active')) {
          if (selectedMotifs.length > 1) {
            btn.classList.remove('active');
            selectedMotifs = selectedMotifs.filter(m => m !== motifName);
          }
        } else {
          btn.classList.add('active');
          if (!selectedMotifs.includes(motifName)) {
            selectedMotifs.push(motifName);
          }
        }

        if (previewMotifTag) {
          previewMotifTag.textContent = selectedMotifs.join(" + ");
        }

        if (btn.dataset.image && typeof update3DMotif === 'function') {
          update3DMotif(btn.dataset.image);
        }
      }
    });
  }
}

// Initial binding of customizer event delegation
bindCustomizerEvents();

if (customizerInquiryBtn) {
  customizerInquiryBtn.addEventListener('click', () => {
    const motifsList = selectedMotifs.map((m, idx) => `  ${idx + 1}. ${m}`).join("\n");
    const waMessage = `Hi VBK Designs! I am interested in placing a custom order for a personalized Aduthera. I have configured the design on your interactive customizer:\n\n- Fabric Base: ${selectedFabric}\n- Sacred Motif Blend:\n${motifsList}\n\nPlease share the custom pricing, sizing options, and delivery timeline!`;
    const waUrl = `https://wa.me/${globalWhatsAppNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');
  });
}

// ===== HIGH-EFFICIENCY BROWSER-SIDE CSV PARSER =====
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"') {
        if (next === '"') {
          row[row.length - 1] += '"';
          i++; // Skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        row[row.length - 1] += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        row.push("");
      } else if (c === '\r' || c === '\n') {
        if (c === '\r' && next === '\n') {
          i++;
        }
        lines.push(row);
        row = [""];
      } else {
        row[row.length - 1] += c;
      }
    }
  }
  if (row.length > 1 || row[0] !== "") {
    lines.push(row);
  }

  if (lines.length < 2) return [];
  const headers = lines[0].map(h => h.trim());
  const data = [];
  for (let r = 1; r < lines.length; r++) {
    const values = lines[r];
    if (values.length < headers.length) continue;
    const obj = {};
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = (values[c] || "").trim();
    }
    data.push(obj);
  }
  return data;
}

// ===== CMS DOM RENDERERS =====

function renderHeroBanners(slides) {
  const slider = document.querySelector('.hero-slider');
  const dotsContainer = document.getElementById('heroDots');
  if (!slider || !dotsContainer || slides.length === 0) return;

  slider.innerHTML = '';
  dotsContainer.innerHTML = '';

  slides.forEach((slide, idx) => {
    const activeClass = idx === 0 ? 'active' : '';
    const slideHTML = `
      <div class="hero-slide ${activeClass}">
        <div class="hero-slide-content">
          <img src="${slide.Image_URL}" alt="${slide.Title}" class="hero-slide-bg">
          <div class="hero-text-overlay">
            <p class="hero-label">${slide.Subtitle}</p>
            <h1 class="hero-title">${slide.Title}</h1>
            <p class="hero-desc">${slide.Description}</p>
            <a href="${slide.Button_Link || '#collections'}" class="btn-primary">Explore Collection</a>
          </div>
        </div>
      </div>
    `;
    slider.insertAdjacentHTML('beforeend', slideHTML);

    const dotHTML = `<span class="hero-dot ${activeClass}" data-index="${idx}"></span>`;
    dotsContainer.insertAdjacentHTML('beforeend', dotHTML);
  });

  goToSlide(0);
  resetHeroAutoplay();
}

function renderBestsellersAndCollections(products) {
  // 1. Update the Bestsellers Carousel
  const bestsellersTrack = document.getElementById('bestsellers-track');
  if (bestsellersTrack) {
    bestsellersTrack.innerHTML = '';
    const bestsellers = products.filter(p => p.Is_Bestseller === 'TRUE' || p.Is_Bestseller === true || p.Is_Bestseller === 'true');

    bestsellers.forEach(prod => {
      const cardHTML = `
        <div class="product-card">
          <div class="product-card-img">
            <img src="${prod.Image_URL}" alt="${prod.Product_Name}">
          </div>
          <div class="product-card-body">
            <p class="product-card-name">${prod.Product_Name}</p>
            <p class="product-card-price">${prod.Price}</p>
            <a href="#" class="view-details-link">View Details <span>→</span></a>
          </div>
        </div>
      `;
      bestsellersTrack.insertAdjacentHTML('beforeend', cardHTML);
    });
  }

  // 2. Repopulate Quick-View Dictionary dynamically
  bestsellersData = {};
  products.forEach(prod => {
    bestsellersData[prod.Product_Name] = {
      image: prod.Image_URL,
      price: prod.Price,
      desc: prod.Description,
      fabric: prod.Fabric_Type
    };
  });

  // 3. Update the Collections Grid dynamically grouped by Category
  const collectionsGrid = document.querySelector('.collections-grid');
  if (collectionsGrid && products.length > 0) {
    collectionsGrid.innerHTML = '';
    const categories = [...new Set(products.map(p => p.Category))];

    categories.forEach(cat => {
      const sampleProd = products.find(p => p.Category === cat);
      const prodImg = sampleProd ? sampleProd.Image_URL : 'images/hero-1.png';
      const catCount = products.filter(p => p.Category === cat).length;

      const iconMap = {
        'Sreenivasa Kalyanam Series': 'fas fa-om',
        'Auspicious Swastik Series': 'fas fa-star-of-david',
        'Shanku Chakra Namalu': 'fas fa-dharmachakra',
        'Bespoke Custom Names': 'fas fa-signature'
      };
      const iconClass = iconMap[cat] || 'fas fa-gem';

      const cardHTML = `
        <div class="collection-card animate-in visible">
          <div class="collection-card-img">
            <img src="${prodImg}" alt="${cat}">
          </div>
          <div class="collection-card-body">
            <div class="collection-card-icon">
              <span><i class="${iconClass}"></i></span>
              <h3 class="collection-card-name">${cat}</h3>
            </div>
            <p class="collection-card-desc">${catCount} sacred design${catCount > 1 ? 's' : ''} available.</p>
            <a href="#bestsellers" class="shop-now-link">Shop Now <span>→</span></a>
          </div>
        </div>
      `;
      collectionsGrid.insertAdjacentHTML('beforeend', cardHTML);
    });
  }

  refreshScrollAnimations();
}

function renderCustomizerOptions(options) {
  const fabricsGrid = document.querySelector('.fabrics-grid');
  const motifsGrid = document.querySelector('.motifs-grid');

  if (fabricsGrid) {
    fabricsGrid.innerHTML = '';
    const fabrics = options.filter(o => o.Option_Type === 'Fabric');
    fabrics.forEach((fabric, idx) => {
      const activeClass = idx === 0 ? 'active' : '';
      if (idx === 0) selectedFabric = fabric.Option_Name;

      const buttonHTML = `
        <button class="selector-btn fabric-btn ${activeClass}" data-fabric="${fabric.Option_Name}">
          <span class="swatch ${fabric.Icon_Class || 'silk-swatch'}"></span>
          <div class="selector-btn-text">
            <span class="option-name">${fabric.Option_Name}</span>
            <span class="option-desc">${fabric.Subtitle}</span>
          </div>
        </button>
      `;
      fabricsGrid.insertAdjacentHTML('beforeend', buttonHTML);
    });
  }

  if (motifsGrid) {
    motifsGrid.innerHTML = '';
    const motifs = options.filter(o => o.Option_Type === 'Motif');
    selectedMotifs = [];
    motifs.forEach((motif, idx) => {
      const activeClass = idx === 0 ? 'active' : '';
      if (idx === 0) {
        selectedMotifs.push(motif.Option_Name);
        if (customizerPreviewImg) {
          customizerPreviewImg.src = motif.Image_URL;
        }
      }

      const buttonHTML = `
        <button class="selector-btn motif-btn ${activeClass}" data-motif="${motif.Option_Name}" data-image="${motif.Image_URL}">
          <i class="${motif.Icon_Class || 'fas fa-gem'} option-icon"></i>
          <div class="selector-btn-text">
            <span class="option-name">${motif.Option_Name}</span>
            <span class="option-desc">${motif.Subtitle}</span>
          </div>
          <span class="check-badge"><i class="fas fa-check"></i></span>
        </button>
      `;
      motifsGrid.insertAdjacentHTML('beforeend', buttonHTML);
    });
  }

  if (previewFabricTag) previewFabricTag.textContent = selectedFabric;
  if (previewMotifTag) previewMotifTag.textContent = selectedMotifs.join(" + ");

  bindCustomizerEvents();
}

function applyGlobalSettings(settings) {
  if (settings.WhatsApp_Number) {
    globalWhatsAppNumber = settings.WhatsApp_Number;
  }

  const announcementBar = document.getElementById('announcementBar');
  if (announcementBar && settings.Announcement_Bar_Text) {
    announcementBar.innerHTML = `<span class="announcement-text">${settings.Announcement_Bar_Text}</span>`;
  }

  const footerInsta = document.querySelector('.footer-social[aria-label="Instagram"]');
  if (footerInsta && settings.Instagram_URL) footerInsta.href = settings.Instagram_URL;

  const footerFB = document.querySelector('.footer-social[aria-label="Facebook"]');
  if (footerFB && settings.Facebook_URL) footerFB.href = settings.Facebook_URL;
}

// ===== DYNAMIC ASYNC SHEET CMS INITIALIZER =====
function processUnifiedCMSData(data) {
  const banners = [];
  const products = [];
  const customizerOptions = [];
  const settings = {};

  data.forEach(row => {
    const section = (row.Section || "").trim();
    if (section === "Hero") {
      banners.push({
        Slide_Number: row.Title_Name ? (banners.length + 1).toString() : "",
        Title: row.Title_Name || "",
        Subtitle: row.Subtitle_Price_Value || "",
        Description: row.Description || "",
        Image_URL: row.Image_URL || "",
        Button_Link: row.Link_Or_Bestseller || ""
      });
    } else if (section === "Product") {
      products.push({
        Product_Name: row.Title_Name || "",
        Price: row.Subtitle_Price_Value || "",
        Category: row.Category || "",
        Description: row.Description || "",
        Fabric_Type: row.Fabric_Type || "",
        Image_URL: row.Image_URL || "",
        Is_Bestseller: row.Link_Or_Bestseller || "",
        Product_Size: row.Product_Size || "",
        Product_Care: row.Product_Care || ""
      });
    } else if (section === "Customizer") {
      customizerOptions.push({
        Option_Type: row.Category || "", // "Fabric" or "Motif"
        Option_Name: row.Title_Name || "",
        Subtitle: row.Subtitle_Price_Value || "",
        Icon_Class: row.Link_Or_Bestseller || "", // Swatch class or FontAwesome class
        Image_URL: row.Image_URL || ""
      });
    } else if (section === "Setting") {
      if (row.Title_Name) {
        settings[row.Title_Name] = row.Subtitle_Price_Value || "";
      }
    }
  });

  if (banners.length > 0) {
    console.log(`CMS: Loaded ${banners.length} hero slides from sheet.`);
    renderHeroBanners(banners);
  }
  if (products.length > 0) {
    console.log(`CMS: Loaded ${products.length} products from sheet.`);
    renderBestsellersAndCollections(products);
  }
  if (customizerOptions.length > 0) {
    console.log(`CMS: Loaded ${customizerOptions.length} customizer options from sheet.`);
    renderCustomizerOptions(customizerOptions);
  }
  if (Object.keys(settings).length > 0) {
    console.log("CMS: Applied global settings from sheet.");
    applyGlobalSettings(settings);
  }
}

async function initCMS() {
  // 1. Instantly render everything using fallback data to guarantee 100% immediate load speed and offline safety
  console.log("CMS: Initializing local static fallback dataset...");
  renderHeroBanners(fallbackBanners);
  renderBestsellersAndCollections(fallbackProducts);
  renderCustomizerOptions(fallbackCustomizerOptions);
  applyGlobalSettings(fallbackGlobalSettings);

  // Initialize majestic 3D effects for initial content
  init3DTilt();
  initHeroParallax();

  // 2. If a Spreadsheet ID/URL is provided, fetch sheet in the background asynchronously
  if (!SPREADSHEET_ID || SPREADSHEET_ID.trim() === "" || SPREADSHEET_ID.includes("YOUR_SPREADSHEET_ID")) {
    console.log("CMS: No spreadsheet ID configured. Operating in high-performance local offline fallback mode.");
    return;
  }

  // Parse the spreadsheet ID/URL and construct the direct CSV export link
  let url = SPREADSHEET_ID.trim();
  if (!url.startsWith("http")) {
    url = `https://docs.google.com/spreadsheets/d/${url}/export?format=csv`;
  } else if (url.includes("docs.google.com/spreadsheets") && !url.includes("output=csv")) {
    const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
    const id = match ? match[1] : "";
    if (id) {
      url = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`;
    }
  }

  console.log(`CMS: Commencing unified fetch from: ${url}`);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
    const csvText = await response.text();
    const parsedData = parseCSV(csvText);
    
    if (parsedData && parsedData.length > 0) {
      processUnifiedCMSData(parsedData);
    }
  } catch (err) {
    console.warn("CMS: Failed to fetch live Google Sheets data. Operating on static offline fallbacks. Details:", err);
  }

  // Re-trigger 3D tilts for newly dynamic components from spreadsheet
  init3DTilt();
  console.log("CMS: Live sheet sync complete.");
}

// Start CMS Initialization
initCMS();

// ===== HIGH-EFFICIENCY DYNAMIC IMAGE LOADING FALLBACK =====
// Intercepts any external resource loading failures (e.g. broken Pinterest/CDN hotlinks)
// and seamlessly switches the src to pre-packaged local high-quality assets.
function handleImageError(img) {
  // Prevent infinite recursive load loops if the fallback asset is also somehow missing
  if (img.dataset.fallbackTried === "true") return;
  img.dataset.fallbackTried = "true";

  const originalSrc = img.src;
  console.warn(`CMS Fallback: Image failed to load: ${originalSrc}. Swapping to local traditional asset...`);

  // 1. Identify and recover Hero slider background images
  if (img.classList.contains('hero-slide-bg')) {
    const textOverlay = img.parentNode.querySelector('.hero-text-overlay');
    if (textOverlay) {
      const heading = textOverlay.querySelector('.hero-title') ? textOverlay.querySelector('.hero-title').textContent : "";
      if (heading.includes("Sacred")) { img.src = "images/hero-1.png"; return; }
      if (heading.includes("Artistry")) { img.src = "images/hero-2.png"; return; }
      if (heading.includes("Blessed")) { img.src = "images/hero-3.png"; return; }
      if (heading.includes("Personalized")) { img.src = "images/hero-4.png"; return; }
    }
    // Secondary fallback using current index
    const allSlides = Array.from(document.querySelectorAll('.hero-slide-bg'));
    const index = allSlides.indexOf(img);
    if (index !== -1) {
      img.src = `images/hero-${(index % 4) + 1}.png`;
      return;
    }
  }

  // 2. Identify and recover Catalog Cards, collections, customizer previews, and Quick View modals
  let productName = "";

  const productCard = img.closest('.product-card');
  if (productCard) {
    const nameEl = productCard.querySelector('.product-card-name');
    if (nameEl) productName = nameEl.textContent.trim();
  }

  const collectionCard = img.closest('.collection-card');
  if (collectionCard) {
    const nameEl = collectionCard.querySelector('.collection-card-name');
    if (nameEl) productName = nameEl.textContent.trim();
  }

  const modalContent = img.closest('.modal-content');
  if (modalContent) {
    const nameEl = document.getElementById('modalProductName');
    if (nameEl) productName = nameEl.textContent.trim();
  }

  if (img.id === 'customizerPreviewImg') {
    const activeMotifBtn = document.querySelector('.motif-btn.active');
    if (activeMotifBtn) {
      productName = activeMotifBtn.dataset.motif;
    }
  }

  // Fall back to ALT text keyword parsing if no element-structure text is found
  if (!productName && img.alt) {
    productName = img.alt;
  }

  if (productName) {
    const nameLower = productName.toLowerCase();

    if (nameLower.includes("shrirasthu")) {
      img.src = "images/sreenivasa-kalyanam-shrirasthu.png";
      return;
    }
    if (nameLower.includes("swastik") && nameLower.includes("shanku")) {
      img.src = "images/swastik-shanku-chakra.png";
      return;
    }
    if (nameLower.includes("namalu") || nameLower.includes("tilak")) {
      img.src = "images/hero-3.png";
      return;
    }
    if (nameLower.includes("swastik")) {
      img.src = "images/hero-2.png";
      return;
    }
    if (nameLower.includes("sreenivasa") || nameLower.includes("kalyanam")) {
      img.src = "images/sreenivasa-kalyanam.png";
      return;
    }
    if (nameLower.includes("name") || nameLower.includes("bespoke")) {
      img.src = "images/hero-1.png";
      return;
    }
  }

  // 3. Absolute catch-all standard default asset fallback
  img.src = "images/hero-1.png";
}

// Global Capturing Event Listener for Resource Errors
window.addEventListener('error', function (event) {
  const target = event.target;
  if (target && target.tagName === 'IMG') {
    handleImageError(target);
  }
}, true); // Capture phase is critical to catch non-bubbling resource load errors!

// ===== MAJESTIC 3D PERSPECTIVE & LUXURY MOTION INTERACTIVITY =====

function init3DTilt() {
  // Mobile / Tablet safety switch: Bypass 3D rotate logic below 1024px to ensure buttery frame rates and standard gestures
  if (window.innerWidth < 1024) {
    document.querySelectorAll('.product-card, .collection-card, .ornamental-frame, .preview-frame').forEach(card => {
      card.style.transform = '';
      const sheen = card.querySelector('.card-sheen');
      if (sheen) sheen.style.opacity = '0';
    });
    return;
  }

  const cards = document.querySelectorAll('.product-card, .collection-card, .ornamental-frame, .preview-frame');
  cards.forEach(card => {
    // Inject dynamic gold zari sheen layer if missing
    let sheen = card.querySelector('.card-sheen');
    if (!sheen) {
      sheen = document.createElement('div');
      sheen.className = 'card-sheen';
      card.appendChild(sheen);
    }

    // Shield against duplicate mouse event registers
    if (card.dataset.tiltInitialized === "true") return;
    card.dataset.tiltInitialized = "true";

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;

      // Custom coordinate mathematical vector rotation angles (capped at premium 12deg)
      const rotateX = -((y / h) - 0.5) * 24;
      const rotateY = ((x / w) - 0.5) * 24;

      // Glare center reflection mapping
      const sheenX = (x / w) * 100;
      const sheenY = (y / h) * 100;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

      const curSheen = card.querySelector('.card-sheen');
      if (curSheen) {
        curSheen.style.opacity = '1';
        curSheen.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(201, 168, 76, 0.22) 0%, rgba(201, 168, 76, 0) 70%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      const curSheen = card.querySelector('.card-sheen');
      if (curSheen) {
        curSheen.style.opacity = '0';
      }
    });
  });
}

function initHeroParallax() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // Track cursor offsets to push active background slide and header overlay in depth directions
  hero.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 1024) return;

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const offsetX = (x / rect.width) - 0.5;
    const offsetY = (y / rect.height) - 0.5;

    const activeBg = hero.querySelector('.hero-slide.active .hero-slide-bg');
    const activeText = hero.querySelector('.hero-slide.active .hero-text-overlay');

    if (activeBg) {
      activeBg.style.transform = `scale(1.06) translate(${offsetX * -25}px, ${offsetY * -25}px)`;
    }
    if (activeText) {
      activeText.style.transform = `translateY(-50%) translate(${offsetX * 20}px, ${offsetY * 20}px)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    const bgs = hero.querySelectorAll('.hero-slide-bg');
    const texts = hero.querySelectorAll('.hero-text-overlay');
    bgs.forEach(bg => bg.style.transform = '');
    texts.forEach(txt => txt.style.transform = 'translateY(-50%)');
  });
}

// Seamlessly handle responsive resizing transitions
window.addEventListener('resize', () => {
  init3DTilt();
});

/* ===== CINEMATIC 3D PRELOADER CONTROLLER ===== */
(function () {
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');

  if (preloader && preloaderProgress) {
    let progress = 0;
    const interval = setInterval(() => {
      // Simulate natural progressive loading
      progress += Math.floor(Math.random() * 12) + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('fade-out');
          // Initialize GSAP animations after preloader fades out
          initGSAPAnimations();
        }, 500);
      }
      preloaderProgress.style.width = progress + '%';
    }, 60);
  } else {
    // If no preloader elements exist, trigger GSAP immediately
    window.addEventListener('load', () => {
      initGSAPAnimations();
    });
  }
})();

/* ===== HIGH-EFFICIENCY DYNAMIC 3D TILT EFFECT ===== */
function init3DTilt() {
  const cards = document.querySelectorAll('.product-card, .collection-card');

  cards.forEach(card => {
    // Inject dynamic gloss reflection overlay sheet if not present
    if (!card.querySelector('.card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    const glare = card.querySelector('.card-glare');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate realistic rotation tilt values (max 8 degrees tilt to maintain luxury stability)
      const rotateX = -(y - centerY) / (centerY / 8);
      const rotateY = (x - centerX) / (centerX / 8);

      // Hardware-accelerated 3D transforms
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
      card.style.transition = 'transform 0.1s cubic-bezier(0.25, 0.8, 0.25, 1)';

      // Cast glossy reflections on gold cords
      if (glare) {
        const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
        glare.style.opacity = '1';
        glare.style.background = `linear-gradient(${angle - 45}deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 75%)`;
        glare.style.transition = 'opacity 0.15s ease';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
      if (glare) {
        glare.style.opacity = '0';
      }
    });
  });
}

// Instantiate Tilt effect on document load
document.addEventListener('DOMContentLoaded', () => {
  init3DTilt();
});

// Re-instantiate Tilt effect if catalog cards are re-rendered by CMS
const originalRenderCatalog = window.renderBestsellersAndCollections;
if (typeof originalRenderCatalog === 'function') {
  window.renderBestsellersAndCollections = function (products) {
    originalRenderCatalog(products);
    setTimeout(init3DTilt, 150);
  };
}

/* ===== THREE.JS INTERACTIVE 3D CUSTOMIZER ENGINE ===== */
let update3DFabric, update3DMotif;

(function () {
  const container = document.getElementById('customizer3DContainer');
  const canvas = document.getElementById('customizer3DCanvas');

  if (!container || !canvas) return;

  // 1. Create Scene, Camera, and Renderer
  const scene = new THREE.Scene();

  // Set camera with standard perspective (45-deg FOV, matching realistic focus distance)
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 5.2);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  // 2. Setup Lighting (Premium Studio Array)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambientLight);

  // Warm direction spotlight for shadows
  const dirLight = new THREE.DirectionalLight(0xfffaee, 0.85);
  dirLight.position.set(5, 8, 4);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.bias = -0.001;
  scene.add(dirLight);

  // Soft cool fill light from opposite corner
  const fillLight = new THREE.DirectionalLight(0xe6f2ff, 0.4);
  fillLight.position.set(-5, -4, 2);
  scene.add(fillLight);

  // GOLD Mouse-Tracking point light to simulate real gold embroidery Zari reflections
  const goldenSparkLight = new THREE.PointLight(0xffc547, 0.7, 8);
  goldenSparkLight.position.set(0, 0, 1.5);
  scene.add(goldenSparkLight);

  // 3. Create the 3D Cloth slab representing the Aduthera fabric base
  // A rounded box geometry simulating a padded traditional ceremonial fabric board
  const clothGeometry = new THREE.BoxGeometry(3.0, 3.0, 0.10, 8, 8, 1);

  // Define base material maps
  const textureLoader = new THREE.TextureLoader();

  // Configure detailed PBR materials array
  // Index 4 is the Front embroidered face. Sides and back are luxurious gold braided satin border trim.
  const sideMaterial = new THREE.MeshStandardMaterial({
    color: 0xC9A84C, // Royal Gold
    roughness: 0.15,
    metalness: 0.85,
    bumpScale: 0.05
  });

  const frontMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xF5EBE1,
    roughness: 0.38,
    metalness: 0.15,
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    bumpScale: 0.08
  });

  const materials = [
    sideMaterial, // right
    sideMaterial, // left
    sideMaterial, // top
    sideMaterial, // bottom
    frontMaterial,// front face
    sideMaterial  // back
  ];

  const clothMesh = new THREE.Mesh(clothGeometry, materials);
  clothMesh.castShadow = true;
  clothMesh.receiveShadow = true;
  scene.add(clothMesh);

  // Set rest rotation angle for optimal perspective projection
  clothMesh.rotation.set(0.1, -0.05, 0);

  // 4. Fabric Base Texture Properties Handler
  update3DFabric = function (fabricName) {
    if (fabricName === 'Royal Silk') {
      frontMaterial.roughness = 0.42;
      frontMaterial.metalness = 0.15;
      frontMaterial.clearcoat = 0.25;
      frontMaterial.clearcoatRoughness = 0.3;
    } else if (fabricName === 'Premium Satin') {
      frontMaterial.roughness = 0.22;
      frontMaterial.metalness = 0.08;
      frontMaterial.clearcoat = 0.65;
      frontMaterial.clearcoatRoughness = 0.15;
    } else if (fabricName === 'Sacred Cotton') {
      frontMaterial.roughness = 0.85;
      frontMaterial.metalness = 0.0;
      frontMaterial.clearcoat = 0.0;
      frontMaterial.clearcoatRoughness = 0.0;
    }
    frontMaterial.needsUpdate = true;
  };

  // 5. Motif Texture Projection Handler (Projecting actual product images with relief mapping)
  let activeTexture = null;

  update3DMotif = function (imageUrl) {
    const spinner = document.getElementById('customizerSpinner');
    if (spinner) spinner.classList.remove('hidden');

    // Asynchronously fetch high-fidelity motif texture
    textureLoader.load(imageUrl,
      (texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy() || 8;

        if (activeTexture) activeTexture.dispose();
        activeTexture = texture;

        // Map texture onto front face
        frontMaterial.map = texture;

        // Dynamically create a high-contrast bump map from the texture itself 
        // to raise the golden Zardosi embroidery lines in realistic 3D relief!
        frontMaterial.bumpMap = texture;
        frontMaterial.bumpScale = 0.05;

        frontMaterial.needsUpdate = true;

        if (spinner) spinner.classList.add('hidden');
      },
      undefined,
      (err) => {
        console.warn("Three.js Customizer: Failed to load texture, applying color fallback.", err);
        if (spinner) spinner.classList.add('hidden');
      }
    );
  };

  // Initialize with Sreenivasa Kalyanam fallback motif
  update3DMotif('images/sreenivasa-kalyanam.png');
  update3DFabric('Royal Silk');

  // 6. Interactive Grab-to-Drag & Smooth Mouse Tilting Controls
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let targetRotation = { x: 0.1, y: -0.05 };
  let mouseRelative = { x: 0, y: 0 };

  // Drag to rotate mesh fully on X and Y axes
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalized Mouse Coordinates (-1 to 1) inside container
    mouseRelative.x = (x / rect.width) * 2 - 1;
    mouseRelative.y = -(y / rect.height) * 2 + 1;

    // Position goldenPointLight to follow mouse coordinates in 3D
    goldenSparkLight.position.x = mouseRelative.x * 2;
    goldenSparkLight.position.y = mouseRelative.y * 2;

    if (isDragging) {
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      targetRotation.y += deltaX * 0.007;
      targetRotation.x += deltaY * 0.007;

      // Clamp rotation on X axis to avoid flipping inverted
      targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.x));

      prevMousePos = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Mobile touch support
  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;

      targetRotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, targetRotation.x));

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    isDragging = false;
  });

  // 7. Render Animation Loop
  let floatTime = 0;

  function animate() {
    requestAnimationFrame(animate);

    // Soft automatic floating wave behavior
    floatTime += 0.015;
    const hoverFloat = Math.sin(floatTime) * 0.06;
    clothMesh.position.y = hoverFloat;

    // Gentle auto-rotation drift when user is not actively dragging
    if (!isDragging) {
      // Create a smooth tilt reaction pointing the cloth face slightly towards cursor position
      const mouseTiltX = mouseRelative.y * 0.18;
      const mouseTiltY = mouseRelative.x * 0.18;

      clothMesh.rotation.x += (targetRotation.x + mouseTiltX - clothMesh.rotation.x) * 0.08;
      clothMesh.rotation.y += (targetRotation.y + mouseTiltY - clothMesh.rotation.y) * 0.08;
      clothMesh.rotation.z += (0 - clothMesh.rotation.z) * 0.08;

    } else {
      // Direct drag rotation tracking
      clothMesh.rotation.x += (targetRotation.x - clothMesh.rotation.x) * 0.15;
      clothMesh.rotation.y += (targetRotation.y - clothMesh.rotation.y) * 0.15;
    }

    renderer.render(scene, camera);
  }

  // Start Three.js Render Loop
  animate();

  // 8. Responsive viewport resize handler
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  });
})();

/* ===== GSAP + SCROLLTRIGGER CINEMATIC 3D ANIMATIONS ===== */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn("GSAP / ScrollTrigger libraries not loaded. Operating in standard CSS transition mode.");
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Spinning Mandala Watermarks 3D Parallax rotation
  gsap.to('.mandala-watermark svg', {
    rotation: 360,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2
    }
  });

  // 2. Staggered 3D reveal on Section Titles
  gsap.utils.toArray('.section-header').forEach(header => {
    const title = header.querySelector('.section-title');
    const divider = header.querySelector('.section-divider');
    const icon = header.querySelector('.section-icon');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });

    if (title) {
      tl.fromTo(title,
        { opacity: 0, y: 25, rotateX: -25 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: 'power3.out' });
    }

    if (divider) {
      tl.fromTo(divider,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6');
    }

    if (icon) {
      tl.fromTo(icon,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, '-=0.4');
    }
  });

  // 3. Staggered 3D slide-in animations for section cards
  gsap.utils.toArray('.collections-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.collection-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 60, rotateY: -15, rotateX: 8 },
      {
        opacity: 1, y: 0, rotateY: 0, rotateX: 0,
        stagger: 0.18,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%'
        }
      });
  });

  // Staggered products grid animations
  gsap.utils.toArray('.carousel-track').forEach(track => {
    const cards = track.querySelectorAll('.product-card');
    gsap.fromTo(cards,
      { opacity: 0, x: 50, rotateY: 12 },
      {
        opacity: 1, x: 0, rotateY: 0,
        stagger: 0.12,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: track,
          start: 'top 85%'
        }
      });
  });

  // 4. Heritage Grid Cinematic 3D Parallax entrance
  const heritageSec = document.querySelector('.heritage-section');
  if (heritageSec) {
    const imageFrame = heritageSec.querySelector('.ornamental-frame');
    const content = heritageSec.querySelector('.heritage-content');

    if (imageFrame && content) {
      gsap.fromTo(imageFrame,
        { opacity: 0, x: -80, rotateY: 20 },
        {
          opacity: 1, x: 0, rotateY: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heritageSec,
            start: 'top 80%'
          }
        });

      gsap.fromTo(content,
        { opacity: 0, x: 80 },
        {
          opacity: 1, x: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heritageSec,
            start: 'top 80%'
          }
        });
    }
  }

  // 5. CTA Banner 3D tilt zoom reveal
  const ctaBanner = document.querySelector('.cta-banner');
  if (ctaBanner) {
    gsap.fromTo(ctaBanner,
      { opacity: 0, scale: 0.95, rotateX: -10 },
      {
        opacity: 1, scale: 1, rotateX: 0,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaBanner,
          start: 'top 85%'
        }
      });
  }

  // 6. Trust Badges slide reveal
  const trustBadges = document.querySelectorAll('.trust-badge');
  if (trustBadges.length > 0) {
    gsap.fromTo(trustBadges,
      { opacity: 0, y: 35 },
      {
        opacity: 1, y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.trust-badges',
          start: 'top 90%'
        }
      });
  }
}
