# pranavkumaarofficial.github.io

Notion-style portfolio. Plain HTML/CSS/JS served by GitHub Pages — no framework, nothing to `npm install`.

There is **one optional generator** (`tools/build.mjs`) that pre-renders static project
pages so link previews (LinkedIn, WhatsApp, Slack, X) and search crawlers see real
content — those bots don't run JavaScript. You only run it when project content changes.

## Build (regenerate static pages + social cards)

```bash
node tools/build.mjs
```

This reads `content/data.js` + `content/projects/*.md` and writes:
- `projects/<slug>.html` — one static page per project, with baked `<title>`, meta,
  Open Graph, Twitter, JSON-LD, and the markdown pre-rendered into the HTML.
- `project.html` — a redirect shim so old `project.html?p=slug` links still work.
- `sitemap.xml`, `robots.txt`.
- `assets/og-default.png` + `assets/og/<slug>.png` — social share cards (needs Python + Pillow).

Requirements: Node 18+ and (for the cards) `python` with Pillow (`pip install Pillow`).
If Python isn't available the pages still build; only the `.png` cards are skipped.

**Commit the generated files** (`projects/`, `assets/og/`, `sitemap.xml`, `robots.txt`) —
GitHub Pages serves them directly.

## Deploy (replaces your current site)

```bash
git clone https://github.com/pranavkumaarofficial/pranavkumaarofficial.github.io.git
cd pranavkumaarofficial.github.io
git rm -r .                      # clear old site (history is preserved)
# copy everything from this folder in, then:
git add -A
git commit -m "Rebuild: Notion-style portfolio"
git push
```

Live at `https://pranavkumaarofficial.github.io/` in ~1 minute. Preview locally first with `python3 -m http.server` and open http://localhost:8000.

## Before you publish — required

1. **Add your resume** at `assets/resume.pdf` (the hero's primary button points there).
2. **Fill in `repo:` URLs** in `content/data.js` for projects with public code. Empty string = no button shown.
3. **Read every file in `content/projects/`.** They are drafts written from your existing site's descriptions plus reasonable inference. Delete anything you can't defend in an interview.

## How to add a project

1. Add one object to `PROJECTS` in `content/data.js`:
   ```js
   { slug: "my-thing", title: "My Thing", subtitle: "One-line role",
     summary: "Two sentences with a metric.", tags: ["Python"],
     thumb: "assets/thumbs/my-thing.svg", repo: "", featured: true }
   ```
2. Create `content/projects/my-thing.md` (plain markdown — `##`/`###` headings, `-` lists,
   `**bold**`, `` `code` ``, and `[links](url)` are pre-rendered by the generator).
3. Optional: drop a thumbnail image (16:9) in `assets/thumbs/`. PNG/JPG/SVG all fine. If missing, the card renders without an image.
4. **Run `node tools/build.mjs`** and commit the new `projects/<slug>.html` + `assets/og/<slug>.png`.

Optional fields per project: `demo` (live link), `article` (Medium link), `cover` (large image at top of the project page).

## How to add an article

Add one line to `WRITING` in `content/data.js`:
```js
{ when: "Jun 2026", title: "My article", where: "Medium", link: "https://medium.com/..." }
```
The Writing section is hidden until this array is non-empty.

## Everything else

- Edit hero text / links / skills: top of `content/data.js`.
- Dark mode: automatic from OS preference, toggle in nav, remembered per visitor.
- Project page images inside markdown: put files in `assets/` and reference as `../assets/file.png` (paths in markdown are relative to the page, which lives at root — use `assets/file.png`).
