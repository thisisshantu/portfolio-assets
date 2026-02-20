if (window.__portfolioAssetsInitialized) {
  console.warn('portfolio-assets main.js already initialized; skipping duplicate execution.');
} else {
  window.__portfolioAssetsInitialized = true;

if (typeof WOW !== 'undefined') {
  new WOW().init();
}

function initFadeInObserver() {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0,
    rootMargin: '0px 0px -100px 0px',
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
}

function initNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links li');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      hamburger.classList.toggle('toggle');
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('nav-active');
      if (hamburger) hamburger.classList.remove('toggle');
    });
  });

  const navLinksEls = document.querySelectorAll('.nav-links a.centered-link');
  const sections = navLinksEls
    ? Array.from(navLinksEls)
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean)
    : [];

  function highlightNav() {
    const scrollPos = window.scrollY || window.pageYOffset;
    const offset = 80;
    let foundIdx = -1;

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (
        section.offsetTop - offset <= scrollPos &&
        section.offsetTop + section.offsetHeight - offset > scrollPos
      ) {
        foundIdx = i;
        break;
      }
    }

    if (
      window.innerHeight + scrollPos >= document.body.offsetHeight - 2 &&
      sections.length > 0
    ) {
      foundIdx = sections.length - 1;
    }

    navLinksEls.forEach((link) => link.classList.remove('active-nav'));
    if (foundIdx >= 0) {
      navLinksEls[foundIdx].classList.add('active-nav');
    }
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();
}

window.addEventListener('load', function () {
  window.scrollTo(0, 0);
});

var scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.addEventListener('scroll', function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
  scrollToTopBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;
  preloader.style.opacity = '0';
  preloader.style.visibility = 'hidden';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 1000);
});

// FAQ Section Updated with Code 2
function initFaqSection() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector('.faq-answer');
          const otherArrow = otherItem.querySelector('.arrow');
          if (otherAnswer) otherAnswer.style.display = 'none';
          if (otherArrow) otherArrow.classList.remove('rotate');
        }
      });

      const answer = item.querySelector('.faq-answer');
      const arrow = question.querySelector('.arrow');
      if (answer) answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
      if (arrow) arrow.classList.toggle('rotate');
    });
  });
}

function initIframePlaceholders() {
  let isLoading = false;

  function loadIframe(element) {
    if (isLoading) {
      const loading = document.getElementById('loading-message');
      if (loading) loading.style.display = 'block';
      return;
    }

    isLoading = true;
    const loading = document.getElementById('loading-message');
    if (loading) loading.style.display = 'none';

    const iframe = document.createElement('iframe');
    iframe.src = element.getAttribute('data-src');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.onload = () => {
      isLoading = false;
    };

    element.parentNode.replaceChild(iframe, element);
  }

  const placeholders = document.querySelectorAll('.iframe-placeholder');
  placeholders.forEach((placeholder) => {
    placeholder.addEventListener('click', () => loadIframe(placeholder));
  });
}

function initThemeToggle() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (!darkModeToggle) return;

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  });
}

const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const statusMsg = document.getElementById('status-message');

if (form) form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (submitBtn) {
    submitBtn.classList.add('loading');
    submitBtn.value = 'Sending...';
  }

  const formData = new FormData(form);
  const url = 'https://script.google.com/macros/s/AKfycbyKL6eedH56qUEc_rMx5SnR93hGSh3Wd9AeSgpqfE8zSs84kxTRgY6i3VZS4RPxmF5KcA/exec'; // Replace with actual Google Script URL

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      if (statusMsg) {
        statusMsg.textContent = 'Message sent successfully!';
        statusMsg.style.color = 'green';
      }
      form.reset();
    } else {
      if (statusMsg) {
        statusMsg.textContent = 'Failed to send message. Please try again.';
        statusMsg.style.color = 'red';
      }
    }
  } catch (error) {
    console.error('Error:', error);
    if (statusMsg) {
      statusMsg.textContent = 'An error occurred. Please try again.';
      statusMsg.style.color = 'red';
    }
  } finally {
    if (submitBtn) {
      submitBtn.classList.remove('loading');
      submitBtn.value = 'Send Message';
    }
    setTimeout(() => {
      if (statusMsg) statusMsg.textContent = '';
    }, 5000);
  }
});

function initScrollTextOverflow() {
  document.querySelectorAll('.scroll-text').forEach((el) => {
    const wrapper = el.parentElement;
    if (wrapper && el.scrollWidth > wrapper.clientWidth) {
      el.classList.add('scroll-enabled');
    }
  });
}

// Example JS: Button hover effect
const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('mouseenter', function() {
    this.style.background = '#1ad16a';
  });
  exploreBtn.addEventListener('mouseleave', function() {
    this.style.background = '#23e97a';
  });
}
// You can add more JS for interactivity as needed

const PORTFOLIO_SHEET_ID = '1VYbIKHEgmpHljYLTTHoonE_IlARRpxudiQ_0QFKDRkU';

function getSheetUrl(sheetName) {
  return `https://docs.google.com/spreadsheets/d/${PORTFOLIO_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
}

function parseGoogleResponse(text) {
  const json = JSON.parse(text.substring(47).slice(0, -2));
  return json.table.rows;
}

async function loadExperience() {
  const url = getSheetUrl('Experience');

  const response = await fetch(url);
  const text = await response.text();
  const rows = parseGoogleResponse(text);

  const container = document.getElementById('experience-container');
  if (!container) return;
  container.innerHTML = '';

  rows.forEach((row, index) => {
    const start = row.c[0]?.v;
    const end = row.c[1]?.v;
    const title = row.c[2]?.v;
    const company = row.c[3]?.v;
    const location = row.c[4]?.v;
    const description = row.c[5]?.v;

    container.innerHTML += `
      <div class="resume-item wow fadeInLeft" data-wow-delay="0.${index + 3}s">
        <div class="time">${start} - ${end}</div>
        <h3 class="resume-title">${title}</h3>
        <div class="institute">${company}, ${location}</div>
        <p>${description}</p>
      </div>
    `;
  });
}

async function loadEducation() {
  const url = getSheetUrl('Education');

  const response = await fetch(url);
  const text = await response.text();
  const rows = parseGoogleResponse(text);

  const container = document.getElementById('education-container');
  if (!container) return;
  container.innerHTML = '';

  rows.forEach((row, index) => {
    const start = row.c[0]?.v;
    const end = row.c[1]?.v;
    const degree = row.c[2]?.v;
    const institute = row.c[3]?.v;
    const location = row.c[4]?.v;
    const description = row.c[5]?.v;

    container.innerHTML += `
      <div class="resume-item wow fadeInRight" data-wow-delay="0.${index + 3}s">
        <div class="time">${start} - ${end}</div>
        <h3 class="resume-title">${degree}</h3>
        <div class="institute">${institute}, ${location}</div>
        <p>${description}</p>
      </div>
    `;
  });
}

async function loadHeroSection() {
  const url = getSheetUrl('hero');

  const response = await fetch(url);
  const text = await response.text();
  const rows = parseGoogleResponse(text);

  const heroData = {};
  rows.forEach(row => {
    heroData[row.c[0]?.v] = row.c[1]?.v;
  });

  // Text
  const availability = document.getElementById('hero-availability');
  const headline = document.getElementById('hero-headline');
  const subheadline = document.getElementById('hero-subheadline');
  if (availability) availability.textContent = heroData.availability;
  if (headline) headline.textContent = heroData.headline;
  if (subheadline) subheadline.textContent = heroData.subheadline;

  // Links
  const linkedin = document.getElementById('hero-linkedin');
  const facebook = document.getElementById('hero-facebook');
  const instagram = document.getElementById('hero-instagram');
  const whatsapp = document.getElementById('hero-whatsapp');
  const resume = document.getElementById('hero-resume');
  if (linkedin) linkedin.href = heroData.linkedin;
  if (facebook) facebook.href = heroData.facebook;
  if (instagram) instagram.href = heroData.instagram;
  if (whatsapp) whatsapp.href = heroData.whatsapp;
  if (resume) resume.href = heroData.resume;

  // Image
  const heroImage = document.getElementById('hero-profile-image');
  if (heroImage) heroImage.src = heroData.profile_image;
}

function upsertMetaByName(name, content) {
  if (!name || !content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertMetaByProperty(property, content) {
  if (!property || !content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(url) {
  if (!url) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

async function loadSeoMetadata() {
  const url = getSheetUrl('seo');
  const response = await fetch(url);
  const text = await response.text();
  const rows = parseGoogleResponse(text);
  if (!rows || rows.length === 0) return;

  const getVal = (cell) => {
    if (!cell) return '';
    if (cell.v !== undefined && cell.v !== null) return String(cell.v).trim();
    if (cell.f !== undefined && cell.f !== null) return String(cell.f).trim();
    return '';
  };

  const header = (rows[0]?.c || []).map((c) => getVal(c).toLowerCase());
  const hasHeader = header.includes('page_key');
  const dataRows = rows.slice(hasHeader ? 1 : 0);

  const findCol = (aliases, fallbackIndex) => {
    const idx = header.findIndex((h) => aliases.some((a) => h === a || h.includes(a)));
    return idx >= 0 ? idx : fallbackIndex;
  };

  const colPageKey = findCol(['page_key', 'page key', 'key'], 0);
  const colTitle = findCol(['title', 'meta title'], 1);
  const colDescription = findCol(['meta_description', 'meta description', 'description'], 2);
  const colThumb = findCol(['thumbnail_url', 'thumbnail url', 'og image', 'image'], 3);
  const colOgType = findCol(['og_type', 'og type', 'type'], 4);
  const colTwitterCard = findCol(['twitter_card', 'twitter card'], 5);

  const pageKey =
    document.body?.getAttribute('data-page-key') ||
    document.querySelector('meta[name="page_key"]')?.getAttribute('content') ||
    'portfolio_home';

  const row =
    dataRows.find((r) => getVal(r?.c?.[colPageKey]) === pageKey) ||
    dataRows.find((r) => getVal(r?.c?.[colPageKey]) === 'portfolio_home') ||
    dataRows[0];

  if (!row) return;

  const title = getVal(row.c?.[colTitle]);
  const description = getVal(row.c?.[colDescription]);
  const thumbnailUrl = getVal(row.c?.[colThumb]);
  const ogType = getVal(row.c?.[colOgType]) || 'website';
  const twitterCard = getVal(row.c?.[colTwitterCard]) || 'summary_large_image';
  const cleanUrl = window.location.href.split('#')[0];

  if (title) document.title = title;
  if (description) upsertMetaByName('description', description);

  upsertCanonical(cleanUrl);
  if (title) upsertMetaByProperty('og:title', title);
  if (description) upsertMetaByProperty('og:description', description);
  if (thumbnailUrl) upsertMetaByProperty('og:image', thumbnailUrl);
  upsertMetaByProperty('og:url', cleanUrl);
  upsertMetaByProperty('og:type', ogType);

  upsertMetaByName('twitter:card', twitterCard);
  if (title) upsertMetaByName('twitter:title', title);
  if (description) upsertMetaByName('twitter:description', description);
  if (thumbnailUrl) upsertMetaByName('twitter:image', thumbnailUrl);
}

/* ===== Date Formatter (Handles Google Date format) ===== */
function formatMonthYear(value) {
  if (!value) return '';

  // Google Sheets format: Date(YYYY,MM,DD)
  if (typeof value === 'string' && value.startsWith('Date(')) {
    const parts = value.replace('Date(', '').replace(')', '').split(',');
    const year = Number(parts[0]);
    const month = Number(parts[1]); // 0-based month
    const date = new Date(year, month);

    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }

  // Normal date or timestamp
  const date = new Date(value);
  if (!isNaN(date)) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }

  // Fallback (already formatted text)
  return value;
}

function ensureSectionPagination(container, paginationId) {
  if (!container) return null;

  let pagination = document.getElementById(paginationId);
  if (!pagination) {
    pagination = document.createElement('div');
    pagination.id = paginationId;
    pagination.className = 'blog-pagination section-pagination';
    container.insertAdjacentElement('afterend', pagination);
  }

  return pagination;
}

function getResponsiveItemsPerPage() {
  if (window.matchMedia('(min-width: 1200px)').matches) return 4;
  if (window.matchMedia('(min-width: 900px)').matches) return 3;
  if (window.matchMedia('(min-width: 640px)').matches) return 2;
  return 1;
}

const sectionResizeHandlers = {};

function applySectionPagination(container, paginationId, cards) {
  if (!container) return;
  const pagination = ensureSectionPagination(container, paginationId);
  if (!pagination) return;
  let activePage = 1;
  let resizeTimer = null;

  const renderPage = (page) => {
    const pageSize = getResponsiveItemsPerPage();
    const totalPages = Math.max(1, Math.ceil(cards.length / pageSize));
    activePage = Math.min(Math.max(1, page), totalPages);
    const start = (activePage - 1) * pageSize;
    const pageCards = cards.slice(start, start + pageSize);

    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', pageCards.join(''));

    pagination.innerHTML = '';
    if (totalPages <= 1) {
      pagination.style.display = 'none';
    } else {
      pagination.style.display = 'flex';
      for (let i = 1; i <= totalPages; i += 1) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'blog-page-btn section-page-btn' + (i === activePage ? ' active' : '');
        btn.textContent = String(i);
        btn.addEventListener('click', () => renderPage(i));
        pagination.appendChild(btn);
      }
    }

    initScrollTextOverflow();
  };

  renderPage(1);

  const onResize = () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => renderPage(activePage), 120);
  };
  if (sectionResizeHandlers[paginationId]) {
    window.removeEventListener('resize', sectionResizeHandlers[paginationId]);
  }
  sectionResizeHandlers[paginationId] = onResize;
  window.addEventListener('resize', onResize);
}

/* ===== Certifications Loader ===== */
async function loadCertifications() {
  const url = getSheetUrl('certifications');

  const response = await fetch(url);
  const text = await response.text();
  const rows = parseGoogleResponse(text);

  const container = document.getElementById('certifications-container');
  if (!container) return;
  container.innerHTML = '';

  const cards = [];

  rows.slice(1).forEach(row => {
    const link = row.c[0]?.v;
    const image = row.c[1]?.v;
    const name = row.c[2]?.v;
    const org = row.c[3]?.v;
    const date = formatMonthYear(row.c[4]?.v);
    const id = row.c[5]?.v;
    if (!name) return;

    cards.push(`
      <a href="${link}" target="_blank" class="certification-card">
        <div class="cert-image">
          <img src="${image}" alt="${org} Logo" />
        </div>

        <div class="cert-text">
          <div class="scroll-wrapper">
            <div class="cert-name scroll-text">${name}</div>
          </div>

          <div class="scroll-wrapper">
            <div class="cert-org scroll-text">${org}</div>
          </div>

          <div class="cert-date">${date}</div>
          <div class="cert-id">Credential ID: ${id}</div>
        </div>
      </a>
    `);
  });

  applySectionPagination(container, 'certifications-pagination', cards);
}

async function loadAboutSection() {
  async function fetchSheet(sheet) {
    const url = getSheetUrl(sheet);
    const res = await fetch(url);
    const text = await res.text();
    return parseGoogleResponse(text);
  }

  /* ===== About Intro (skip header row) ===== */
  const introRows = await fetchSheet('about_intro');
  const introEl = document.getElementById('about-intro');

  if (introEl && introRows.length > 1) {
    introEl.textContent = introRows[1].c[0]?.v || '';
  }

  /* ===== Personal Info (skip header row) ===== */
  const infoRows = await fetchSheet('personal_info');
  const infoContainer = document.getElementById('personal-info-container');

  if (infoContainer) {
    infoContainer.innerHTML = '';

    infoRows.slice(1).forEach(row => {
      const label = row.c[0]?.v;
      const value = row.c[1]?.v;
      if (!label || !value) return;

      const p = document.createElement('p');
      p.innerHTML = `<strong>${label}:</strong> ${value}`;
      infoContainer.appendChild(p);
    });
  }

  /* ===== Technical Skills (skip header row) ===== */
  const techRows = await fetchSheet('technical_skills');
  const techContainer = document.getElementById('technical-skills-container');

  if (techContainer) {
    techContainer.innerHTML = '';

    techRows.slice(1).forEach(row => {
      const name = row.c[0]?.v;
      const image = row.c[1]?.v;
      const percent = row.c[2]?.v;
      if (!name || !percent) return;

      techContainer.insertAdjacentHTML(
        'beforeend',
        `
        <div class="skill-item">
          <div class="skill-circle" style="--percent:${percent}%" data-percent="${percent}%">
            <img src="${image}" alt="${name}" />
          </div>
          <span>${name}</span>
        </div>
        `
      );
    });
  }

  /* ===== Soft Skills (skip header row) ===== */
  const softRows = await fetchSheet('soft_skills');
  const softContainer = document.getElementById('soft-skills-container');

  if (softContainer) {
    softContainer.innerHTML = '';

    softRows.slice(1).forEach(row => {
      const name = row.c[0]?.v;
      const image = row.c[1]?.v;
      const percent = row.c[2]?.v;
      if (!name || !percent) return;

      softContainer.insertAdjacentHTML(
        'beforeend',
        `
        <div class="skill-item">
          <div class="skill-circle" style="--percent:${percent}%" data-percent="${percent}%">
            <img src="${image}" alt="${name}" />
          </div>
          <span>${name}</span>
        </div>
        `
      );
    });
  }
}

/* ===== Testimonials Loader (FINAL) ===== */
async function loadTestimonials() {
  const SHEET_NAME = 'testimonial'; // 👈 change ONLY if your tab name differs

  const url = getSheetUrl(SHEET_NAME);

  try {
    const response = await fetch(url);
    const text = await response.text();
    const rows = parseGoogleResponse(text);

    const container = document.getElementById('testimonial-container');
    if (!container) return;
    container.innerHTML = '';

    // Skip header row
    rows.slice(1).forEach(row => {
      const name = row.c[0]?.v;
      const profile = row.c[1]?.v;
      const image = row.c[2]?.v;
      const description = row.c[3]?.v;

      if (!name || !description) return;

      container.insertAdjacentHTML(
        'beforeend',
        `
        <div class="recommendation-card">
          <img
            src="${image || ''}"
            alt="${name}"
            class="profile-picture"
            loading="lazy"
          />

          <div class="user-name">${name}</div>

          <div class="user-profile">
            ${profile || ''}
          </div>

          <div class="recommendation-description">
            ${description}
          </div>
        </div>
        `
      );
    });
  } catch (error) {
    console.error('Error loading testimonials:', error);
  }
}

async function loadVideoSection() {
  const SHEET_NAME = 'videos';

  const url = getSheetUrl(SHEET_NAME);

  try {
    const response = await fetch(url);
    const text = await response.text();
    const rows = parseGoogleResponse(text);

    // Skip header row, get iframe HTML
    const iframeHTML = rows[1]?.c[0]?.v;
    if (!iframeHTML) return;

    const container = document.getElementById('video-container');
    if (container) container.innerHTML = iframeHTML;
  } catch (error) {
    console.error('Error loading video iframe:', error);
  }
}

/* ================================
   GLOBAL PROJECT STORE
================================ */
const PROJECTS_DATA = {};

/* ================================
   LOAD PROJECTS
================================ */
async function loadProjects() {
  const SHEET_NAME = 'projects';

  const url = getSheetUrl(SHEET_NAME);

  const response = await fetch(url);
  const text = await response.text();
  const rows = parseGoogleResponse(text);

  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = '';
  const cards = [];

  Object.keys(PROJECTS_DATA).forEach((key) => delete PROJECTS_DATA[key]);
  let projectIndex = 0;

  rows.slice(1).forEach((row) => {
    const project = {
      name: row.c[0]?.v,
      description: row.c[1]?.v,
      url: row.c[2]?.v,
      technology: row.c[3]?.v,
      origin: row.c[4]?.v,
      image: row.c[5]?.v,
      icon: row.c[6]?.v || 'fa-user'
    };

    if (!project.name) return;

    const id = String(projectIndex);
    PROJECTS_DATA[id] = project;
    projectIndex += 1;

    cards.push(
      `
      <div class="project-card" data-project-id="${id}">
        <img src="${project.image}" alt="${project.name}" />
        <div class="project-info">
          <div class="icon">
            <i class="fa-solid ${project.icon}"></i>
          </div>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
        </div>
      </div>
      `
    );
  });

  applySectionPagination(container, 'projects-pagination', cards);
}

/* ================================
   CLICK HANDLER (DELEGATION)
================================ */
document.addEventListener('click', function (e) {
  const card = e.target.closest('.project-card');
  if (!card) return;

  const id = card.dataset.projectId;
  const project = PROJECTS_DATA[id];
  if (!project) return;

  openProjectPopup(project);
});

/* ================================
   OPEN POPUP
================================ */
function openProjectPopup(project) {
  const title = document.getElementById('popup-title');
  const desc = document.getElementById('popup-description');
  const image = document.getElementById('popup-image');
  const tech = document.getElementById('popup-tech');
  const origin = document.getElementById('popup-origin');
  if (title) title.textContent = project.name;
  if (desc) desc.textContent = project.description;
  if (image) image.src = project.image;
  if (tech) tech.textContent = project.technology;
  if (origin) origin.textContent = project.origin;

  const link = document.getElementById('popup-link');
  if (link) {
    link.href = project.url || '#';
    link.style.display = project.url ? 'inline-block' : 'none';
  }

  const popup = document.getElementById('project-popup');
  if (popup) popup.classList.add('active');
}

/* ================================
   GLOBAL STORES
================================ */
const DESIGN_PROJECTS = {};

/* ================================
   LOAD DESIGN PROJECTS
================================ */
async function loadDesignProjects() {
  const projectURL = getSheetUrl('design_projects');
  const assetURL = getSheetUrl('design_assets');

  const [projectRes, assetRes] = await Promise.all([
    fetch(projectURL).then(r => r.text()),
    fetch(assetURL).then(r => r.text())
  ]);

  const projectRows = parseGoogleResponse(projectRes).slice(1);
  const assetRows   = parseGoogleResponse(assetRes).slice(1);
  Object.keys(DESIGN_PROJECTS).forEach((key) => delete DESIGN_PROJECTS[key]);

  // Store projects
  projectRows.forEach(row => {
    const id = row.c[0]?.v;
    if (!id) return;

    DESIGN_PROJECTS[id] = {
      id,
      title: row.c[1]?.v,
      description: row.c[2]?.v,
      image: row.c[3]?.v,
      type: row.c[4]?.v,
      link: row.c[5]?.v,
      assets: []
    };
  });

  // Attach assets
  assetRows.forEach(row => {
    const projectId = row.c[0]?.v;
    if (!DESIGN_PROJECTS[projectId]) return;

    DESIGN_PROJECTS[projectId].assets.push({
      title: row.c[1]?.v,
      type: row.c[2]?.v, // iframe | link
      url: row.c[3]?.v,
      order: row.c[4]?.v || 0
    });
  });

  // Render cards
  const container = document.getElementById('design-container');
  if (!container) return;
  container.innerHTML = '';
  const cards = [];

  Object.values(DESIGN_PROJECTS).forEach(project => {
    cards.push(
      `
      <div class="project-card" data-design-id="${project.id}">
        <img src="${project.image}" alt="${project.title}" />
        <div class="project-info">
          <div class="icon"><i class="fa-solid fa-pen-nib"></i></div>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
        </div>
      </div>
      `
    );
  });

  applySectionPagination(container, 'design-pagination', cards);
}

/* ================================
   OPEN DESIGN POPUP
================================ */
document.addEventListener('click', e => {
  const card = e.target.closest('.project-card[data-design-id]');
  if (!card) return;

  const project = DESIGN_PROJECTS[card.dataset.designId];
  if (!project) return;

  const designTitle = document.getElementById('design-popup-title');
  const designDesc = document.getElementById('design-popup-description');
  const designImage = document.getElementById('design-popup-image');
  if (designTitle) designTitle.textContent = project.title;
  if (designDesc) designDesc.textContent = project.description;
  if (designImage) designImage.src = project.image;

  const assetContainer = document.getElementById('design-assets');
  if (!assetContainer) return;
  assetContainer.innerHTML = '';

  project.assets
    .sort((a, b) => a.order - b.order)
    .forEach(asset => {
      if (asset.type === 'iframe') {
        assetContainer.insertAdjacentHTML(
          'beforeend',
          `
          <h4>${asset.title}</h4>
          <div class="iframe-container">
            <iframe src="${asset.url}" loading="lazy"></iframe>
          </div>
          `
        );
      } else {
        assetContainer.insertAdjacentHTML(
          'beforeend',
          `
          <h4>${asset.title}</h4>
          <a href="${asset.url}" target="_blank" class="btn">View</a>
          `
        );
      }
    });

  const designPopup = document.getElementById('design-popup');
  if (designPopup) designPopup.classList.add('active');
});

/* ================================
   CLOSE POPUPS
================================ */
document.addEventListener('click', (e) => {
  if (
    !e.target.classList.contains('popup-close') &&
    !e.target.classList.contains('popup-overlay')
  ) return;

  const projectPopup = document.getElementById('project-popup');
  const designPopup = document.getElementById('design-popup');
  if (projectPopup) projectPopup.classList.remove('active');
  if (designPopup) designPopup.classList.remove('active');
});

/* ================================
   Footer Scrolling Images Loader
================================ */
async function loadFooterImages() {
  const url = getSheetUrl('footer_images');

  try {
    const response = await fetch(url);
    const text = await response.text();
    const rows = parseGoogleResponse(text);

    const container = document.getElementById('footer-image-strip');
    if (!container) return;

    container.innerHTML = '';

    /* First pass */
    rows.slice(1).forEach(row => {
      const imgUrl = row.c[0]?.v;
      if (!imgUrl) return;

      const img = document.createElement('img');
      img.src = imgUrl;
      img.loading = 'lazy';

      container.appendChild(img);
    });

    /* Duplicate for infinite scrolling */
    rows.slice(1).forEach(row => {
      const imgUrl = row.c[0]?.v;
      if (!imgUrl) return;

      const img = document.createElement('img');
      img.src = imgUrl;
      img.loading = 'lazy';

      container.appendChild(img);
    });

  } catch (err) {
    console.error('Footer image load failed:', err);
  }
}

let blogsLoadRequestId = 0;
let blogsResizeHandler = null;

function getBlogsContainer() {
  let container =
    document.getElementById('blogs-container') ||
    document.getElementById('blog-container') ||
    document.querySelector('#blogs .blog-grid') ||
    document.querySelector('.blog-grid');

  if (!container) {
    const blogsSection = document.getElementById('blogs');
    const targetParent = blogsSection?.querySelector('.container') || blogsSection;
    if (targetParent) {
      container = document.createElement('div');
      container.id = 'blogs-container';
      container.className = 'blog-grid';
      targetParent.appendChild(container);
    }
  }

  return container || null;
}

async function loadBlogs() {
  const requestId = ++blogsLoadRequestId;
  const container = getBlogsContainer();
  if (!container) return false;
  let activePage = 1;
  let resizeTimer = null;
  let pagination = document.getElementById('blogs-pagination');
  if (!pagination) {
    pagination = document.createElement('div');
    pagination.id = 'blogs-pagination';
    pagination.className = 'blog-pagination';
    container.insertAdjacentElement('afterend', pagination);
  }

  const SHEET_NAMES = ['blogs', 'Blogs', 'BLOGS', 'Sheet1', 'sheet1'];

  const getCellValue = (cell) => {
    if (!cell) return '';
    if (cell.v !== undefined && cell.v !== null) return String(cell.v).trim();
    if (cell.f !== undefined && cell.f !== null) return String(cell.f).trim();
    return '';
  };

  const getDateValue = (cell) => {
    if (!cell) return '';
    // Prefer Google Sheets formatted display value (e.g., "Feb 2020")
    if (cell.f !== undefined && cell.f !== null && String(cell.f).trim() !== '') {
      return String(cell.f).trim();
    }
    const raw = cell.v !== undefined && cell.v !== null ? String(cell.v).trim() : '';
    if (!raw) return '';
    // Handle gviz raw date shape: Date(YYYY,MM,DD) where MM is zero-based.
    const match = raw.match(/^Date\((\d+),(\d+),(\d+)\)$/);
    if (match) {
      const year = Number(match[1]);
      const month = Number(match[2]);
      const dateObj = new Date(year, month, 1);
      return dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return raw;
  };

  let loadedAny = false;

  for (const sheetName of SHEET_NAMES) {
    const url = getSheetUrl(sheetName);

    try {
      const response = await fetch(url);
      const text = await response.text();
      const rows = parseGoogleResponse(text);
      if (requestId !== blogsLoadRequestId) return false;

      if (!rows || rows.length === 0) continue;

      // Map columns from header row first; fall back to A-D if headers are absent.
      const headers = (rows[0]?.c || []).map((c) => getCellValue(c).toLowerCase());
      const findCol = (aliases, fallbackIndex) => {
        const idx = headers.findIndex((h) => aliases.some((a) => h === a || h.includes(a)));
        return idx >= 0 ? idx : fallbackIndex;
      };

      const colTitle = findCol(['title', 'blog title', 'post title'], 0);
      const colUrl = findCol(['url', 'link', 'post url', 'blog url'], 1);
      const colDate = findCol(['date', 'published', 'publish date'], 2);
      const colExcerpt = findCol(['excerpt', 'summary', 'description'], 3);
      const hasHeaderRow =
        headers.some((h) => ['title', 'blog title', 'post title'].some((k) => h === k || h.includes(k))) &&
        headers.some((h) => ['url', 'link', 'post url', 'blog url'].some((k) => h === k || h.includes(k)));
      const dataRows = rows.slice(hasHeaderRow ? 1 : 0);

      const nextCards = [];
      dataRows.forEach((row) => {
        const title = getCellValue(row?.c?.[colTitle]);
        let postUrl = getCellValue(row?.c?.[colUrl]);
        const date = getDateValue(row?.c?.[colDate]);
        const excerpt = getCellValue(row?.c?.[colExcerpt]);

        if (!title || !postUrl) return;
        if (!/^https?:\/\//i.test(postUrl) && postUrl.includes('blogspot.com')) {
          postUrl = 'https://' + postUrl.replace(/^\/+/, '');
        }
        if (!/^https?:\/\//i.test(postUrl)) return;

        const card =
          '<a class="blog-card" href="' + postUrl + '" target="_blank" rel="noopener noreferrer">' +
            '<h3>' + title + '</h3>' +
            '<p class="blog-meta">' + date + '</p>' +
            '<p class="blog-excerpt">' + excerpt + '</p>' +
          '</a>';

        nextCards.push(card);
        loadedAny = true;
      });

      if (loadedAny) {
        if (requestId !== blogsLoadRequestId) return false;
        const renderPage = (page) => {
          if (requestId !== blogsLoadRequestId) return;
          const pageSize = getResponsiveItemsPerPage();
          const totalPages = Math.max(1, Math.ceil(nextCards.length / pageSize));
          activePage = Math.max(1, Math.min(page, totalPages));
          const start = (activePage - 1) * pageSize;
          const pageCards = nextCards.slice(start, start + pageSize);

          container.innerHTML = '';
          container.insertAdjacentHTML('beforeend', pageCards.join(''));

          pagination.innerHTML = '';
          if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
          }

          pagination.style.display = 'flex';
          for (let i = 1; i <= totalPages; i += 1) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'blog-page-btn' + (i === activePage ? ' active' : '');
            btn.textContent = String(i);
            btn.addEventListener('click', () => renderPage(i));
            pagination.appendChild(btn);
          }
        };

        renderPage(1);
        if (blogsResizeHandler) {
          window.removeEventListener('resize', blogsResizeHandler);
        }
        blogsResizeHandler = () => {
          if (requestId !== blogsLoadRequestId) return;
          if (resizeTimer) window.clearTimeout(resizeTimer);
          resizeTimer = window.setTimeout(() => renderPage(activePage), 120);
        };
        window.addEventListener('resize', blogsResizeHandler);
        return true;
      }
    } catch (error) {
      // try next sheet candidate
    }
  }

  // Show a visible fallback so the section never appears empty while debugging data issues.
  if (requestId !== blogsLoadRequestId) return false;
  if (pagination) {
    pagination.innerHTML = '';
    pagination.style.display = 'none';
  }
  container.innerHTML =
    '<div class="blog-card">' +
      '<h3>Blogs are being updated</h3>' +
      '<p class="blog-meta">Data source not found</p>' +
      '<p>Please verify the Google Sheet tab name and rows.</p>' +
    '</div>';
  console.warn('Blogs could not be loaded. Check sheet tab name and sharing settings.');
  return false;
}

function initBlogsSection() {
  loadBlogs().then((ok) => {
    if (ok) return;

    let attempts = 0;
    const maxAttempts = 20;

    const retry = async () => {
      attempts += 1;
      const loaded = await loadBlogs();
      if (!loaded && attempts < maxAttempts) {
        setTimeout(retry, 400);
      }
    };

    retry();
  });

  window.addEventListener('load', () => {
    loadBlogs();
  }, { once: true });
}

function initFloatingDocsBackground() {
  if (document.getElementById('doc-float-layer')) return;

  const layer = document.createElement('div');
  layer.id = 'doc-float-layer';
  layer.className = 'doc-float-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.prepend(layer);

  const symbols = [
    { type: 'emoji', value: '📈' },
    { type: 'emoji', value: '📄' },
    { type: 'emoji', value: '📜' },
    { type: 'emoji', value: '📊' },
    { type: 'emoji', value: '📝' },
    { type: 'emoji', value: '📑' },
    { type: 'emoji', value: '📃' },
    { type: 'emoji', value: '🗂️' },
    { type: 'emoji', value: '🗃️' },
    { type: 'emoji', value: '📋' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/microsoftexcel/217346', alt: 'Excel' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/microsoftpowerpoint/B7472A', alt: 'PowerPoint' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/microsoftaccess/A4373A', alt: 'Access' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/microsoftteams/6264A7', alt: 'Teams' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/microsoftoutlook/0078D4', alt: 'Outlook' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/powerautomate/0066FF', alt: 'Power Automate' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/notion/000000', alt: 'Notion' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/google/4285F4', alt: 'Google' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/googleslides/FBBC04', alt: 'Google Slides' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/googlesheets/34A853', alt: 'Google Sheets' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/applenotes/FFCC00', alt: 'Apple Notes' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/apple/000000', alt: 'Apple' },
    { type: 'icon', value: 'https://cdn.simpleicons.org/microsoft365/D83B01', alt: 'Microsoft 365' }
  ];
  const count = window.matchMedia('(max-width: 768px)').matches ? 22 : 44;

  for (let i = 0; i < count; i += 1) {
    const item = document.createElement('span');
    item.className = 'doc-float-item';
    const token = symbols[i % symbols.length];
    if (token.type === 'icon') {
      const img = document.createElement('img');
      img.className = 'doc-float-icon';
      img.src = token.value;
      img.alt = token.alt;
      img.loading = 'lazy';
      item.appendChild(img);
    } else {
      item.textContent = token.value;
    }

    const left = Math.random() * 100;
    const size = 14 + Math.random() * 42;
    const duration = 18 + Math.random() * 22;
    const delay = -Math.random() * duration;
    const driftStart = -20 + Math.random() * 40;
    const driftEnd = -40 + Math.random() * 80;
    const rotStart = -14 + Math.random() * 28;
    const rotEnd = rotStart + (-20 + Math.random() * 40);

    item.style.left = left + 'vw';
    item.style.fontSize = size + 'px';
    item.style.width = size + 'px';
    item.style.height = size + 'px';
    item.style.animationDuration = duration + 's';
    item.style.animationDelay = delay + 's';
    item.style.setProperty('--drift-start', driftStart + 'px');
    item.style.setProperty('--drift-end', driftEnd + 'px');
    item.style.setProperty('--rot-start', rotStart + 'deg');
    item.style.setProperty('--rot-end', rotEnd + 'deg');

    layer.appendChild(item);
  }
}

function initHeroGearCluster() {
  const hero = document.getElementById('hero');
  if (!hero || hero.querySelector('.hero-gear-cluster')) return;

  const cluster = document.createElement('button');
  cluster.type = 'button';
  cluster.className = 'hero-gear-cluster';
  cluster.setAttribute('aria-label', 'Start gear animation');
  cluster.setAttribute('title', 'Click to animate');
  cluster.innerHTML =
    '<span class="hero-gear gear-a"></span>' +
    '<span class="hero-gear gear-b"></span>' +
    '<span class="hero-gear gear-c"></span>';

  cluster.addEventListener('click', () => {
    cluster.classList.toggle('is-active');
  });

  hero.appendChild(cluster);
}

document.addEventListener('DOMContentLoaded', () => {
  initFloatingDocsBackground();
  initHeroGearCluster();
  initResponsiveNavbar();
  initFadeInObserver();
  initNavigation();
  initFaqSection();
  initIframePlaceholders();
  initThemeToggle();

  loadSeoMetadata().catch((err) => {
    console.error('SEO metadata load failed:', err);
  });

  loadExperience();
  loadEducation();
  loadHeroSection();
  loadCertifications();
  loadAboutSection();
  loadTestimonials();
  loadVideoSection();
  loadProjects();
  loadDesignProjects();
  loadFooterImages();
  initBlogsSection();

  initScrollTextOverflow();
});

function initResponsiveNavbar() {
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (!nav || !hamburger || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("nav-active");
    hamburger.classList.remove("toggle");
    hamburger.setAttribute("aria-expanded", "false");
  }

  function syncNavPanelSize() {
    const navHeight = Math.ceil(nav.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--nav-height", navHeight + "px");

    if (window.matchMedia("(max-width: 1200px)").matches) {
      navLinks.style.top = navHeight + "px";
      navLinks.style.height = "calc(100dvh - " + navHeight + "px)";
    } else {
      navLinks.style.top = "";
      navLinks.style.height = "";
      closeMenu();
    }
  }

  if (!hamburger.hasAttribute("aria-expanded")) {
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.contains("nav-active");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  document.addEventListener("click", (e) => {
    if (!window.matchMedia("(max-width: 1200px)").matches) return;
    if (!navLinks.classList.contains("nav-active")) return;

    const clickedInsideNav = nav.contains(e.target);
    if (!clickedInsideNav) closeMenu();
  });

  const relayout = () => syncNavPanelSize();
  window.addEventListener("resize", relayout);
  window.addEventListener("orientationchange", relayout);

  syncNavPanelSize();
}

}
