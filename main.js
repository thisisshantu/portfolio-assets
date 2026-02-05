/* Assets/main.js - converted from HTML script blocks */

// Initialize WOW if available
if (typeof WOW !== 'undefined') {
  new WOW().init();
}

document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0,
    rootMargin: '0px 0px -100px 0px',
  };
  const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  // Navigation hamburger toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links li');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      hamburger.classList.toggle('toggle');
    });
  }

  // Close navigation on link click
  links.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      hamburger.classList.remove('toggle');
    });
  });

  // --- Scrollspy for nav menu highlight ---
  const navLinksEls = document.querySelectorAll('.nav-links a.centered-link');
  const sections = navLinksEls
    ? Array.from(navLinksEls)
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean)
    : [];

  function highlightNav() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 80; // adjust for fixed nav height if needed
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
      window.innerHeight + scrollPos >= document.body.offsetHeight - 2
      && sections.length > 0
    ) {
      foundIdx = sections.length - 1;
    }

    navLinksEls.forEach(link => link.classList.remove('active-nav'));
    if (foundIdx >= 0) {
      navLinksEls[foundIdx].classList.add('active-nav');
    }
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // Project card overlay (if present)
  const projectCards = document.querySelectorAll('.project-card');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('close-btn');
  const overlayImage = document.getElementById('overlay-image');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayDescription = document.getElementById('overlay-description');
  const overlayUrl = document.getElementById('overlay-url');
  const overlayTechnology = document.getElementById('overlay-technology');
  const overlayOrigin = document.getElementById('overlay-origin');
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const projectData = card.getAttribute('data-project');
      if (!projectData) return;
      try {
        const project = JSON.parse(projectData);
        if (overlayImage) overlayImage.src = project.image;
        if (overlayTitle) overlayTitle.textContent = project.name;
        if (overlayDescription) overlayDescription.textContent = project.description;
        if (overlayUrl) {
          overlayUrl.href = project.url;
          overlayUrl.textContent = project.url;
        }
        if (overlayTechnology) overlayTechnology.textContent = project.technology;
        if (overlayOrigin) overlayOrigin.textContent = project.origin;
        if (overlay) overlay.classList.add('active');
      } catch (err) {
        console.error('Invalid project data on card', err);
      }
    });
  });
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (overlay) overlay.classList.remove('active');
    });
  }
});

window.addEventListener('load', function () {
  window.scrollTo(0, 0);
});

// Scroll to top button
var scrollToTopBtn = document.getElementById('scrollToTopBtn');
if (scrollToTopBtn) {
  window.onscroll = function () {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  };
  scrollToTopBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

// Preloader
window.addEventListener('load', function () {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;
  preloader.style.opacity = '0';
  preloader.style.visibility = 'hidden';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 1000);
});

// FAQ, if present
document.addEventListener('DOMContentLoaded', () => {
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

  let isLoading = false;
  function loadIframe(element) {
    if (isLoading) {
      const loadingMsg = document.getElementById('loading-message');
      if (loadingMsg) loadingMsg.style.display = 'block';
      return;
    }
    isLoading = true;
    const loadingMsg = document.getElementById('loading-message');
    if (loadingMsg) loadingMsg.style.display = 'none';
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

  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        document.body.setAttribute('data-theme', 'dark');
      } else {
        document.body.removeAttribute('data-theme');
      }
    });
  }
});

// Contact form submission
const form = document.getElementById('contact-form');
if (form) {
  const submitBtn = document.getElementById('submit-btn');
  const statusMsg = document.getElementById('status-message');

  form.addEventListener('submit', async (e) => {
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
}

// Enable scrolling text where needed
document.querySelectorAll('.scroll-text').forEach(el => {
  const wrapper = el.parentElement;
  if (el.scrollWidth > wrapper.clientWidth) {
    el.classList.add('scroll-enabled');
  }
});

// Button hover example
const exploreBtn = document.getElementById('exploreBtn');
if (exploreBtn) {
  exploreBtn.addEventListener('mouseenter', function() {
    this.style.background = '#1ad16a';
  });
  exploreBtn.addEventListener('mouseleave', function() {
    this.style.background = '#23e97a';
  });
}

/* ===== Google Sheets Helper (FINAL) ===== */
function parseGoogleResponse(text) {
  const json = JSON.parse(text.substring(47).slice(0, -2));
  return json.table.rows;
}

/* ===== Date Formatter (Handles Google Date format) ===== */
function formatMonthYear(value) {
  if (!value) return "";

  if (typeof value === "string" && value.startsWith("Date(")) {
    const parts = value.replace("Date(", "").replace(")", "").split(",");
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    const date = new Date(year, month);

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric"
    });
  }

  const date = new Date(value);
  if (!isNaN(date)) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric"
    });
  }

  return value;
}

/* ===== Certifications Loader ===== */
async function loadCertifications() {
  const url =
    "https://docs.google.com/spreadsheets/d/1VYbIKHEgmpHljYLTTHoonE_IlARRpxudiQ_0QFKDRkU/gviz/tq?tqx=out:json&sheet=certifications";

  const response = await fetch(url);
  const text = await response.text();
  const rows = parseGoogleResponse(text);

  const container = document.getElementById("certifications-container");
  if (!container) return;
  container.innerHTML = "";

  rows.forEach(row => {
    const link = row.c[0]?.v;
    const image = row.c[1]?.v;
    const name = row.c[2]?.v;
    const org = row.c[3]?.v;
    const date = formatMonthYear(row.c[4]?.v);
    const id = row.c[5]?.v;

    container.innerHTML += `
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
    `;
  });
}

/* ===== About Section Loader ===== */
async function loadAboutSection() {
  const SHEET_ID = "1VYbIKHEgmpHljYLTTHoonE_IlARRpxudiQ_0QFKDRkU";

  async function fetchSheet(sheet) {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheet}`;
    const res = await fetch(url);
    const text = await res.text();
    return parseGoogleResponse(text);
  }

  const introRows = await fetchSheet("about_intro");
  const introEl = document.getElementById("about-intro");
  if (introEl && introRows.length > 1) {
    introEl.textContent = introRows[1].c[0]?.v || "";
  }

  const infoRows = await fetchSheet("personal_info");
  const infoContainer = document.getElementById("personal-info-container");
  if (infoContainer) {
    infoContainer.innerHTML = "";
    infoRows.slice(1).forEach(row => {
      const label = row.c[0]?.v;
      const value = row.c[1]?.v;
      if (!label || !value) return;
      const p = document.createElement("p");
      p.innerHTML = `<strong>${label}:</strong> ${value}`;
      infoContainer.appendChild(p);
    });
  }

  const techRows = await fetchSheet("technical_skills");
  const techContainer = document.getElementById("technical-skills-container");
  if (techContainer) {
    techContainer.innerHTML = "";
    techRows.slice(1).forEach(row => {
      const name = row.c[0]?.v;
      const image = row.c[1]?.v;
      const percent = row.c[2]?.v;
      if (!name || !percent) return;
      techContainer.insertAdjacentHTML(
        "beforeend",
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

  const softRows = await fetchSheet("soft_skills");
  const softContainer = document.getElementById("soft-skills-container");
  if (softContainer) {
    softContainer.innerHTML = "";
    softRows.slice(1).forEach(row => {
      const name = row.c[0]?.v;
      const image = row.c[1]?.v;
      const percent = row.c[2]?.v;
      if (!name || !percent) return;
      softContainer.insertAdjacentHTML(
        "beforeend",
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
  const SHEET_ID = "1VYbIKHEgmpHljYLTTHoonE_IlARRpxudiQ_0QFKDRkU";
  const SHEET_NAME = "testimonial";
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const rows = parseGoogleResponse(text);

    const container = document.getElementById("testimonial-container");
    if (!container) return;
    container.innerHTML = "";

    rows.slice(1).forEach(row => {
      const name = row.c[0]?.v;
      const profile = row.c[1]?.v;
      const image = row.c[2]?.v;
      const description = row.c[3]?.v;
      if (!name || !description) return;
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="recommendation-card">
          <img src="${image || ""}" alt="${name}" class="profile-picture" loading="lazy" />
          <div class="user-name">${name}</div>
          <div class="user-profile">${profile || ""}</div>
          <div class="recommendation-description">${description}</div>
        </div>
        `
      );
    });
  } catch (error) {
    console.error("Error loading testimonials:", error);
  }
}

/* ===== Video Section Loader ===== */
async function loadVideoSection() {
  const SHEET_ID = "1VYbIKHEgmpHljYLTTHoonE_IlARRpxudiQ_0QFKDRkU";
  const SHEET_NAME = "videos";
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const rows = parseGoogleResponse(text);
    const iframeHTML = rows[1]?.c[0]?.v;
    if (!iframeHTML) return;
    const container = document.getElementById("video-container");
    if (container) container.innerHTML = iframeHTML;
  } catch (error) {
    console.error("Error loading video iframe:", error);
  }
}

/* ================================
   GLOBAL PROJECT STORE + LOADER
================================ */
const PROJECTS_DATA = {};
async function loadProjects() {
  const SHEET_ID = "1VYbIKHEgmpHljYLTTHoonE_IlARRpxudiQ_0QFKDRkU";
  const SHEET_NAME = "projects";
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

  const response = await fetch(url);
  const text = await response.text();
  const rows = parseGoogleResponse(text);
  const container = document.getElementById("projects-container");
  if (!container) return;
  container.innerHTML = "";

  rows.slice(1).forEach((row, index) => {
    const project = {
      name: row.c[0]?.v,
      description: row.c[1]?.v,
      url: row.c[2]?.v,
      technology: row.c[3]?.v,
      origin: row.c[4]?.v,
      image: row.c[5]?.v,
      icon: row.c[6]?.v || "fa-user"
    };
    if (!project.name) return;
    PROJECTS_DATA[index] = project;
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="project-card" data-project-id="${index}">
        <img src="${project.image}" alt="${project.name}" />
        <div class="project-info">
          <div class="icon"><i class="fa-solid ${project.icon}"></i></div>
          <h3>${project.name}</h3>
          <p>${project.description}</p>
        </div>
      </div>
      `
    );
  });
}

// Delegated click handler for project cards
document.addEventListener("click", function (e) {
  const card = e.target.closest(".project-card");
  if (!card) return;
  const id = card.dataset.projectId || card.dataset.designId;
  if (card.dataset.projectId && PROJECTS_DATA[id]) {
    openProjectPopup(PROJECTS_DATA[id]);
    return;
  }
});

function openProjectPopup(project) {
  const titleEl = document.getElementById("popup-title");
  const descEl = document.getElementById("popup-description");
  const imgEl = document.getElementById("popup-image");
  const techEl = document.getElementById("popup-tech");
  const originEl = document.getElementById("popup-origin");
  const link = document.getElementById("popup-link");

  if (titleEl) titleEl.textContent = project.name;
  if (descEl) descEl.textContent = project.description;
  if (imgEl) imgEl.src = project.image;
  if (techEl) techEl.textContent = project.technology;
  if (originEl) originEl.textContent = project.origin;
  if (link) {
    link.href = project.url || "#";
    link.style.display = project.url ? "inline-block" : "none";
  }
  const popup = document.getElementById("project-popup");
  if (popup) popup.classList.add("active");
}

document.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("popup-close") ||
    e.target.classList.contains("popup-overlay")
  ) {
    const popup = document.getElementById("project-popup");
    if (popup) popup.classList.remove("active");
  }
});

/* ================================
   DESIGN PROJECTS + LOADER
================================ */
const DESIGN_PROJECTS = {};
async function loadDesignProjects() {
  const SHEET_ID = "1VYbIKHEgmpHljYLTTHoonE_IlARRpxudiQ_0QFKDRkU";
  const projectURL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=design_projects`;
  const assetURL   = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=design_assets`;

  const [projectRes, assetRes] = await Promise.all([
    fetch(projectURL).then(r => r.text()),
    fetch(assetURL).then(r => r.text())
  ]);

  const projectRows = parseGoogleResponse(projectRes).slice(1);
  const assetRows   = parseGoogleResponse(assetRes).slice(1);

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

  assetRows.forEach(row => {
    const projectId = row.c[0]?.v;
    if (!DESIGN_PROJECTS[projectId]) return;
    DESIGN_PROJECTS[projectId].assets.push({
      title: row.c[1]?.v,
      type: row.c[2]?.v,
      url: row.c[3]?.v,
      order: row.c[4]?.v || 0
    });
  });

  const container = document.getElementById("design-container");
  if (!container) return;
  container.innerHTML = "";

  Object.values(DESIGN_PROJECTS).forEach(project => {
    container.insertAdjacentHTML(
      "beforeend",
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
}

document.addEventListener("click", e => {
  const card = e.target.closest(".project-card[data-design-id]");
  if (!card) return;
  const project = DESIGN_PROJECTS[card.dataset.designId];
  if (!project) return;

  document.getElementById("design-popup-title").textContent = project.title;
  document.getElementById("design-popup-description").textContent = project.description;
  document.getElementById("design-popup-image").src = project.image;

  const assetContainer = document.getElementById("design-assets");
  assetContainer.innerHTML = "";

  project.assets
    .sort((a, b) => a.order - b.order)
    .forEach(asset => {
      if (asset.type === "iframe") {
        assetContainer.insertAdjacentHTML(
          "beforeend",
          `
          <h4>${asset.title}</h4>
          <div class="iframe-container">
            <iframe src="${asset.url}" loading="lazy"></iframe>
          </div>
          `
        );
      } else {
        assetContainer.insertAdjacentHTML(
          "beforeend",
          `
          <h4>${asset.title}</h4>
          <a href="${asset.url}" target="_blank" class="btn">View</a>
          `
        );
      }
    });

  document.getElementById("design-popup").classList.add("active");
});

document.addEventListener("click", e => {
  if (
    e.target.classList.contains("popup-close") ||
    e.target.classList.contains("popup-overlay")
  ) {
    document.getElementById("design-popup").classList.remove("active");
  }
});

/* ================================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  loadExperience && loadExperience();
  loadEducation && loadEducation();
  loadHeroSection && loadHeroSection();
  loadCertifications && loadCertifications();
  loadAboutSection && loadAboutSection();
  loadTestimonials && loadTestimonials();
  loadVideoSection && loadVideoSection();
  loadProjects && loadProjects();
  loadDesignProjects && loadDesignProjects();
});
