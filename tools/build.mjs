/* =================================================================
   Static site generator for the portfolio.

   Why this exists: link-preview bots (LinkedIn, WhatsApp, Slack, X) and
   crawlers do NOT run JavaScript. The homepage bakes its own meta, but
   project pages were rendered client-side from project.html?p=slug (one
   physical file), so every project shared the same raw <title>/meta.

   This generator reads content/data.js + content/projects/<slug>.md and
   emits a real static file per project at projects/<slug>.html, with:
     - baked <title>, description, canonical, Open Graph, Twitter, JSON-LD
     - the markdown pre-rendered into the HTML body (visible with JS off)
     - the optional interactive embed still injected client-side
   Plus sitemap.xml, robots.txt, and an og-manifest for the card renderer.

   Run:  node tools/build.mjs        (then it calls tools/make_og.py)
   ================================================================= */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, unlinkSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://pranavkumaarofficial.github.io";

/* ---------- load content/data.js by evaluating it ---------- */
function loadData() {
  const code = readFileSync(join(ROOT, "content", "data.js"), "utf8");
  const fn = new Function(
    code + "\n;return { SITE, PROJECTS, EXPERIENCE, EDUCATION, WRITING, SKILLS };"
  );
  return fn();
}

/* ---------- helpers ---------- */
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Minimal external-link glyph. Inherits currentColor, no emoji rendering.
const EXT_ARROW =
  '<svg class="ext-arrow" viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">' +
  '<path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" fill="none" stroke="currentColor" ' +
  'stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// Minimal, purpose-built Markdown → HTML for the constructs these files use:
// ## / ### headings, - lists, **bold**, `code`, [text](url), paragraphs.
// Deliberately small so it can never mangle the prose. No tables/images/fences
// are used in content/projects/*.md; if you add them, extend this or the page
// will show them literally.
function inline(text) {
  let t = esc(text);
  t = t.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  t = t.replace(/\*\*([^*]+)\*\*/g, (_, c) => `<strong>${c}</strong>`);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const safe = /^https?:|^mailto:|^\//.test(url) ? url : "#";
    const ext = /^https?:/.test(safe) ? ' target="_blank" rel="noopener"' : "";
    return `<a href="${esc(safe)}"${ext}>${label}</a>`;
  });
  return t;
}
function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let para = [];
  let list = [];
  const flushPara = () => { if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; } };
  const flushList = () => { if (list.length) { out.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join("")}</ul>`); list = []; } };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flushPara(); flushList(); continue; }
    let m;
    if ((m = line.match(/^###\s+(.*)$/))) { flushPara(); flushList(); out.push(`<h3>${inline(m[1])}</h3>`); }
    else if ((m = line.match(/^##\s+(.*)$/))) { flushPara(); flushList(); out.push(`<h2>${inline(m[1])}</h2>`); }
    else if ((m = line.match(/^[-*]\s+(.*)$/))) { flushPara(); list.push(m[1]); }
    else { flushList(); para.push(line.trim()); }
  }
  flushPara(); flushList();
  return out.join("\n      ");
}

/* ---------- project page template ---------- */
function projectPage(p, SITE) {
  const url = `${ORIGIN}/projects/${p.slug}.html`;
  const desc = p.seoDescription || p.summary || "";
  const ogImg = `${ORIGIN}/assets/og/${p.slug}.png`;
  const mdPath = join(ROOT, "content", "projects", `${p.slug}.md`);
  const body = existsSync(mdPath) ? mdToHtml(readFileSync(mdPath, "utf8")) : `<p>${esc(p.summary || "")}</p>`;

  const metaLinks = [];
  if (p.repo) metaLinks.push(`<a href="${esc(p.repo)}" target="_blank" rel="noopener">View code ${EXT_ARROW}</a>`);
  if (p.demo) metaLinks.push(`<a href="${esc(p.demo)}" target="_blank" rel="noopener">Live demo ${EXT_ARROW}</a>`);
  if (p.article) metaLinks.push(`<a href="${esc(p.article)}" target="_blank" rel="noopener">Read article ${EXT_ARROW}</a>`);

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: p.title,
    description: desc,
    author: { "@type": "Person", name: SITE.name, url: `${ORIGIN}/` },
    keywords: (p.tags || []).join(", "),
    image: ogImg,
    url,
    mainEntityOfPage: url,
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>${esc(p.title)} · ${esc(SITE.name)}</title>
  <meta name="description" content="${esc(desc)}" />
  <meta name="author" content="${esc(SITE.name)}" />
  <meta name="keywords" content="${esc((p.tags || []).join(", "))}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="theme-color" content="#191919" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
  <link rel="canonical" href="${url}" />

  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="../assets/favicon-32.png" sizes="32x32" type="image/png" />
  <link rel="apple-touch-icon" href="../assets/apple-touch-icon.png" />

  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="${esc(SITE.name)}" />
  <meta property="og:title" content="${esc(p.title)} · ${esc(SITE.name)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${ogImg}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(p.title)} · ${esc(SITE.name)}" />
  <meta name="twitter:description" content="${esc(desc)}" />
  <meta name="twitter:image" content="${ogImg}" />

  <script type="application/ld+json">
  ${JSON.stringify(jsonld, null, 2).replace(/\n/g, "\n  ")}
  </script>

  <link rel="stylesheet" href="../styles.css" />
  <script>
    const t = localStorage.getItem("theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.dataset.theme = t;
  </script>
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin />
</head>
<body>
  <div class="page">
    <nav class="nav">
      <a class="nav-name" href="../index.html">${esc(SITE.name)}</a>
      <div class="nav-links">
        <a href="../index.html#projects">Projects</a>
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">◐</button>
      </div>
    </nav>

    <a class="back-link" href="../index.html#projects">← All projects</a>

    <article class="article">
      <header class="article-header">
        <h1>${esc(p.title)}</h1>
        <p class="subtitle">${esc(p.subtitle || "")}</p>
        <div class="tags">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      </header>
      <div class="article-meta">${metaLinks.join("")}</div>
      ${p.cover ? `<img class="article-cover" src="${esc(p.cover.startsWith("http") ? p.cover : "../" + p.cover)}" alt="${esc(p.title)}" />` : ""}
      <div class="md">
      ${body}
      </div>
      <div id="p-embed"></div>
    </article>

    <footer><span id="footer-copy"></span></footer>
  </div>

  <script>
    document.getElementById("theme-toggle").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
    });
    document.getElementById("footer-copy").textContent =
      "© " + new Date().getFullYear() + " ${esc(SITE.name)}";

    // optional interactive embed (trusted first-party file from this repo)
    fetch("../content/projects/${p.slug}.embed.html")
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((html) => {
        const host = document.getElementById("p-embed");
        host.innerHTML = html;
        host.querySelectorAll("script").forEach((old) => {
          const s = document.createElement("script");
          [...old.attributes].forEach((a) => s.setAttribute(a.name, a.value));
          s.textContent = old.textContent;
          old.replaceWith(s);
        });
      })
      .catch(() => {});
  </script>
</body>
</html>
`;
}

/* ---------- redirect shim so old project.html?p=slug links still work ---------- */
function redirectShim(SITE) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(SITE.name)}</title>
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="${ORIGIN}/" />
  <script>
    // Legacy URL support: project.html?p=slug now lives at projects/slug.html
    var slug = new URLSearchParams(location.search).get("p");
    location.replace(slug ? "projects/" + encodeURIComponent(slug) + ".html" : "index.html");
  </script>
</head>
<body><p style="font-family:sans-serif;padding:24px">Redirecting… <a href="index.html">Home</a></p></body>
</html>
`;
}

/* ---------- sitemap + robots ---------- */
function sitemap(projects) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [`${ORIGIN}/`, ...projects.map((p) => `${ORIGIN}/projects/${p.slug}.html`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u, i) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${i === 0 ? "1.0" : "0.8"}</priority>\n  </url>`)
  .join("\n")}
</urlset>
`;
}
const robots = `User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`;

/* ---------- run ---------- */
const { SITE, PROJECTS } = loadData();
const pub = PROJECTS.filter((p) => p.featured !== false);

mkdirSync(join(ROOT, "projects"), { recursive: true });
mkdirSync(join(ROOT, "assets", "og"), { recursive: true });

const slugs = new Set(pub.map((p) => p.slug));

// Remove stale generated pages/cards for projects no longer in data.js
for (const f of readdirSync(join(ROOT, "projects")).filter((f) => f.endsWith(".html"))) {
  if (!slugs.has(f.replace(/\.html$/, ""))) {
    unlinkSync(join(ROOT, "projects", f));
    console.log("prune ->", `projects/${f}`);
  }
}
const ogDir = join(ROOT, "assets", "og");
if (existsSync(ogDir)) {
  for (const f of readdirSync(ogDir).filter((f) => f.endsWith(".png"))) {
    if (!slugs.has(f.replace(/\.png$/, ""))) {
      unlinkSync(join(ogDir, f));
      console.log("prune ->", `assets/og/${f}`);
    }
  }
}

for (const p of pub) {
  writeFileSync(join(ROOT, "projects", `${p.slug}.html`), projectPage(p, SITE));
  console.log("page  ->", `projects/${p.slug}.html`);
}
writeFileSync(join(ROOT, "project.html"), redirectShim(SITE));
writeFileSync(join(ROOT, "sitemap.xml"), sitemap(pub));
writeFileSync(join(ROOT, "robots.txt"), robots);
console.log("wrote  -> project.html (redirect shim), sitemap.xml, robots.txt");

// og-manifest drives the per-project social cards (rendered by Pillow)
const manifest = {
  site: { name: SITE.name, role: SITE.role, availability: SITE.availability },
  projects: pub.map((p) => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    summary: p.summary,
    eyebrow: p.badge ? p.badge : p.type === "venture" ? "Venture" : "Case study",
  })),
};
writeFileSync(join(ROOT, "tools", "og-manifest.json"), JSON.stringify(manifest, null, 2));
console.log("wrote  -> tools/og-manifest.json");

// render social cards (default + per project)
const py = spawnSync("python", [join(ROOT, "tools", "make_og.py")], { stdio: "inherit" });
if (py.status !== 0) console.warn("make_og.py did not run cleanly. Check Python/Pillow.");
