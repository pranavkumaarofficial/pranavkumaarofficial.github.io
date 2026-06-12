# pranavkumaarofficial.github.io

Notion-style portfolio. No build step, no framework, no dependencies to install. Plain HTML/CSS/JS served by GitHub Pages.

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
2. Create `content/projects/my-thing.md` (plain markdown — headings, lists, images, code all work).
3. Optional: drop a thumbnail image (16:9) in `assets/thumbs/`. PNG/JPG/SVG all fine. If missing, the card renders without an image.

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
