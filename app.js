/* Renders the homepage from content/data.js. You should rarely need to edit this. */

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
}
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* ---- theme toggle ---- */
document.getElementById("theme-toggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
});

/* ---- hero (re-hydrates the static HTML from data.js) ---- */
document.getElementById("hero-name").textContent = SITE.name;
document.getElementById("hero-role").textContent = SITE.role;
document.getElementById("hero-intro").textContent = SITE.intro;

const avail = SITE.availability;
const availEl = document.getElementById("hero-availability");
if (avail && avail.open) {
  availEl.innerHTML =
    `<span class="status-pill"><span class="status-dot" aria-hidden="true"></span>${esc(avail.label)}</span>` +
    (avail.detail ? `<span class="status-detail">${esc(avail.detail)}</span>` : "");
} else {
  availEl.hidden = true;
}

document.getElementById("hero-links").innerHTML = `
  <a class="primary" id="resume-link" href="${esc(SITE.resume)}" target="_blank" rel="noopener">Resume</a>
  <a href="mailto:${esc(SITE.email)}">Email</a>
  <a href="${esc(SITE.github)}" target="_blank" rel="noopener">GitHub</a>
  <a href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`;

/* If the resume PDF isn't uploaded yet, don't let the primary CTA dead-end —
   fall back to LinkedIn. Auto-restores to "Resume" once the file exists. */
fetch(SITE.resume, { method: "HEAD" })
  .then((r) => {
    if (!r.ok) throw new Error("no resume");
  })
  .catch(() => {
    const rl = document.getElementById("resume-link");
    if (!rl) return;
    rl.textContent = "LinkedIn";
    rl.href = SITE.linkedin;
  });

/* ---- projects ---- */
const grid = document.getElementById("projects-grid");
PROJECTS.filter((p) => p.featured !== false).forEach((p) => {
  const card = el("a", "project-card");
  // Link to the pre-rendered static page (crawlable + real link previews).
  // Falls back gracefully: project.html?p=slug still works for old shared links.
  card.href = `projects/${encodeURIComponent(p.slug)}.html`;
  const hasCode = p.repo || p.demo;
  const badge = hasCode
    ? `<span class="card-badge code">Code ↗</span>`
    : `<span class="card-badge">Case study</span>`;
  card.innerHTML = `
    <img class="project-thumb" src="${esc(p.thumb)}" alt="" loading="lazy"
         onerror="this.style.display='none'">
    <div class="project-body">
      <div class="project-head">
        <h3>${esc(p.title)}</h3>
        ${badge}
      </div>
      <p class="subtitle">${esc(p.subtitle)}</p>
      <p class="summary">${esc(p.summary)}</p>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    </div>`;
  grid.appendChild(card);
});

/* ---- generic row renderer ---- */
function renderRows(containerId, items) {
  const c = document.getElementById(containerId);
  items.forEach((it) => {
    const row = el(it.link ? "a" : "div", "row");
    if (it.link) row.href = it.link;
    row.innerHTML = `
      <div class="when">${esc(it.when)}</div>
      <div>
        <h3>${esc(it.title)}</h3>
        <p class="where">${esc(it.where)}</p>
        ${it.desc ? `<p class="desc">${esc(it.desc)}</p>` : ""}
      </div>`;
    c.appendChild(row);
  });
}
renderRows("experience-list", EXPERIENCE);
renderRows("education-list", EDUCATION);

/* ---- writing (hidden until you add articles) ---- */
if (WRITING.length) {
  document.getElementById("writing").hidden = false;
  document.getElementById("nav-writing").hidden = false;
  renderRows("writing-list", WRITING);
}

/* ---- skills ---- */
const skills = document.getElementById("skills-list");
SKILLS.forEach((s) => {
  skills.appendChild(
    el("div", "skill-group",
      `<div class="label">${esc(s.label)}</div><div class="items">${esc(s.items)}</div>`));
});

/* ---- footer ---- */
document.getElementById("footer-copy").textContent =
  `© ${new Date().getFullYear()} ${SITE.name}`;
document.getElementById("footer-links").innerHTML =
  `<a href="mailto:${esc(SITE.email)}">Email</a> · ` +
  `<a href="${esc(SITE.github)}" target="_blank" rel="noopener">GitHub</a> · ` +
  `<a href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`;

/* ---- sticky nav: border on scroll + scroll-spy ---- */
const nav = document.querySelector(".nav");
addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", scrollY > 8);
}, { passive: true });

const navLinks = [...document.querySelectorAll(".nav-links a[data-section]")];
const sections = navLinks
  .map((a) => document.getElementById(a.dataset.section))
  .filter((s) => s && !s.hidden);

const spy = new IntersectionObserver(
  (entries) => {
    // pick the section closest to the top of the viewport that's visible
    const visible = entries.filter((e) => e.isIntersecting);
    if (!visible.length) return;
    const top = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.dataset.section === top.target.id));
  },
  { rootMargin: "-64px 0px -55% 0px", threshold: 0 }
);
sections.forEach((s) => spy.observe(s));

// clear highlight when scrolled back to the hero
addEventListener("scroll", () => {
  if (scrollY < document.getElementById("projects").offsetTop - 200) {
    navLinks.forEach((a) => a.classList.remove("active"));
  }
}, { passive: true });
