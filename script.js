// ===== GOOGLE SHEETS CMS CONFIGURATION =====
// Paste your published Google Spreadsheet ID here (e.g. "1FpLqV0vAExV1r9kLqFm-2Ww5Zle0Jj8QeJ8gqJ1cZ_8")
// Make sure you have set the sheet to "Anyone with the link can view" under Share settings!
const SPREADSHEET_ID = ""; // Leave blank to run entirely on offline fallback data, or enter sheet ID to sync live!

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

        if (customizerPreviewImg && btn.dataset.image) {
          customizerPreviewImg.style.opacity = '0.3';
          customizerPreviewImg.style.transform = 'scale(0.97)';
          setTimeout(() => {
            customizerPreviewImg.src = btn.dataset.image;
            customizerPreviewImg.style.opacity = '1';
            customizerPreviewImg.style.transform = 'scale(1)';
          }, 180);
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
    const next = text[i+1];

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
async function initCMS() {
  // 1. Instantly render everything using fallback data to guarantee 100% immediate load speed and offline safety
  console.log("CMS: Initializing local static fallback dataset...");
  renderHeroBanners(fallbackBanners);
  renderBestsellersAndCollections(fallbackProducts);
  renderCustomizerOptions(fallbackCustomizerOptions);
  applyGlobalSettings(fallbackGlobalSettings);

  // 2. If a Spreadsheet ID is provided, fetch sheets in the background asynchronously
  if (!SPREADSHEET_ID || SPREADSHEET_ID.trim() === "" || SPREADSHEET_ID.includes("YOUR_SPREADSHEET_ID")) {
    console.log("CMS: No spreadsheet ID configured. Operating in high-performance local offline fallback mode.");
    return;
  }

  console.log(`CMS: Found spreadsheet ID: ${SPREADSHEET_ID}. Commencing fetch...`);

  async function fetchTab(tabName) {
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&sheet=${tabName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
      const csvText = await response.text();
      return parseCSV(csvText);
    } catch (err) {
      console.warn(`CMS: Failed to fetch tab "${tabName}". Details:`, err);
      return null;
    }
  }

  // Fetch all 4 sheets in parallel for high efficiency
  const [bannersData, productsData, customizerData, settingsData] = await Promise.all([
    fetchTab('Hero_Banner'),
    fetchTab('Products_Catalog'),
    fetchTab('Customizer_Options'),
    fetchTab('Global_Settings')
  ]);

  // Apply fetched data selectively only if successful
  if (bannersData && bannersData.length > 0) {
    console.log("CMS: Hero slider data loaded successfully from sheet.");
    renderHeroBanners(bannersData);
  }
  
  if (productsData && productsData.length > 0) {
    console.log("CMS: Catalog products loaded successfully from sheet.");
    renderBestsellersAndCollections(productsData);
  }

  if (customizerData && customizerData.length > 0) {
    console.log("CMS: Customizer options loaded successfully from sheet.");
    renderCustomizerOptions(customizerData);
  }

  if (settingsData && settingsData.length > 0) {
    console.log("CMS: Global configuration settings applied successfully from sheet.");
    applyGlobalSettings(settingsData[0]); // Use first row of settings
  }

  console.log("CMS: Live sheet sync complete.");
}

// Start CMS Initialization
initCMS();
