/* =====================================================
   GLOBAL HELPERS
===================================================== */
function parseGoogleResponse(text) {
  const json = JSON.parse(text.substring(47).slice(0, -2));
  return json.table.rows;
}

function formatMonthYear(value) {
  if (!value) return "";
  if (typeof value === "string" && value.startsWith("Date(")) {
    const parts = value.replace("Date(", "").replace(")", "").split(",");
    return new Date(parts[0], parts[1]).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric"
    });
  }
  const d = new Date(value);
  return isNaN(d) ? value : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/* =====================================================
   UI BASICS
===================================================== */
function initWOW() {
  if (window.WOW) new WOW().init();
}

function initFadeIn() {
  const faders = document.querySelectorAll(".fade-in");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -100px 0px" });
  faders.forEach(f => obs.observe(f));
}

function initHamburger() {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");
  if (!hamburger || !nav) return;

  hamburger.onclick = () => {
    nav.classList.toggle("nav-active");
    hamburger.classList.toggle("toggle");
  };

  nav.querySelectorAll("a").forEach(a =>
    a.onclick = () => {
      nav.classList.remove("nav-active");
      hamburger.classList.remove("toggle");
    }
  );
}

function initScrollTop() {
  const btn = document.getElementById("scrollToTopBtn");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  btn.onclick = e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

function initDarkMode() {
  const toggle = document.getElementById("dark-mode-toggle");
  if (!toggle) return;

  toggle.onclick = () => {
    document.body.classList.toggle("dark-mode");
    document.body.toggleAttribute("data-theme", document.body.classList.contains("dark-mode"));
  };
}

/* =====================================================
   DATA LOADERS (GOOGLE SHEETS)
===================================================== */
const SHEET_ID = "1VYbIKHEgmpHljYLTTHoonE_IlARRpxudiQ_0QFKDRkU";

async function loadHero() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=hero`;
  const rows = parseGoogleResponse(await (await fetch(url)).text());
  const data = {};
  rows.forEach(r => data[r.c[0]?.v] = r.c[1]?.v);

  Object.entries({
    "hero-headline": data.headline,
    "hero-subheadline": data.subheadline,
    "hero-availability": data.availability
  }).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val || "";
  });

  const img = document.getElementById("hero-profile-image");
  if (img) img.src = data.profile_image || "";
}

async function loadTimeline(sheet, containerId) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheet}`;
  const rows = parseGoogleResponse(await (await fetch(url)).text()).slice(1);
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";
  rows.forEach(r => {
    container.insertAdjacentHTML("beforeend", `
      <div class="resume-item">
        <div class="time">${r.c[0]?.v} - ${r.c[1]?.v}</div>
        <h3>${r.c[2]?.v}</h3>
        <div>${r.c[3]?.v}, ${r.c[4]?.v}</div>
        <p>${r.c[5]?.v}</p>
      </div>
    `);
  });
}

async function loadCertifications() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=certifications`;
  const rows = parseGoogleResponse(await (await fetch(url)).text()).slice(1);
  const container = document.getElementById("certifications-container");
  if (!container) return;

  container.innerHTML = "";
  rows.forEach(r => {
    container.insertAdjacentHTML("beforeend", `
      <a href="${r.c[0]?.v}" target="_blank" class="certification-card">
        <img src="${r.c[1]?.v}">
        <div>
          <div>${r.c[2]?.v}</div>
          <div>${r.c[3]?.v}</div>
          <div>${formatMonthYear(r.c[4]?.v)}</div>
          <div>ID: ${r.c[5]?.v}</div>
        </div>
      </a>
    `);
  });
}

/* =====================================================
   PROJECTS + POPUPS
===================================================== */
const PROJECTS = {};

async function loadProjects() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=projects`;
  const rows = parseGoogleResponse(await (await fetch(url)).text()).slice(1);
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = "";
  rows.forEach((r, i) => {
    PROJECTS[i] = {
      name: r.c[0]?.v,
      description: r.c[1]?.v,
      url: r.c[2]?.v,
      tech: r.c[3]?.v,
      origin: r.c[4]?.v,
      image: r.c[5]?.v
    };

    container.insertAdjacentHTML("beforeend", `
      <div class="project-card" data-id="${i}">
        <img src="${PROJECTS[i].image}">
        <h3>${PROJECTS[i].name}</h3>
      </div>
    `);
  });
}

document.addEventListener("click", e => {
  const card = e.target.closest(".project-card");
  if (!card) return;

  const p = PROJECTS[card.dataset.id];
  if (!p) return;

  document.getElementById("popup-title").textContent = p.name;
  document.getElementById("popup-description").textContent = p.description;
  document.getElementById("popup-image").src = p.image;
  document.getElementById("project-popup").classList.add("active");
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("popup-overlay") || e.target.classList.contains("popup-close")) {
    document.querySelectorAll(".popup").forEach(p => p.classList.remove("active"));
  }
});

/* =====================================================
   INIT EVERYTHING
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initWOW();
  initFadeIn();
  initHamburger();
  initScrollTop();
  initDarkMode();

  loadHero();
  loadTimeline("Experience", "experience-container");
  loadTimeline("Education", "education-container");
  loadCertifications();
  loadProjects();

  window.scrollTo(0, 0);
});
