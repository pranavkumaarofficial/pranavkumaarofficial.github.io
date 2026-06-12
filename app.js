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

/* ---- hero ---- */
document.getElementById("hero-name").textContent = SITE.name;
document.getElementById("hero-role").textContent = SITE.role;
document.getElementById("hero-intro").textContent = SITE.intro;
document.getElementById("hero-links").innerHTML = `
  <a class="primary" href="${esc(SITE.resume)}" target="_blank" rel="noopener">Resume</a>
  <a href="mailto:${esc(SITE.email)}">Email</a>
  <a href="${esc(SITE.github)}" target="_blank" rel="noopener">GitHub</a>
  <a href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`;

/* ---- projects ---- */
const grid = document.getElementById("projects-grid");
PROJECTS.filter((p) => p.featured !== false).forEach((p) => {
  const card = el("a", "project-card");
  card.href = `project.html?p=${encodeURIComponent(p.slug)}`;
  card.innerHTML = `
    <img class="project-thumb" src="${esc(p.thumb)}" alt="" loading="lazy"
         onerror="this.style.display='none'">
    <div class="project-body">
      <h3>${esc(p.title)}</h3>
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
