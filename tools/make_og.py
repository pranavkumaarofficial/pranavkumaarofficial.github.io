#!/usr/bin/env python3
"""
Generate social share cards (og:image) that match the site's design language.
Dark card (#191919) + blue accent (#2383e2), Segoe UI to match the font stack.

Usage:
    python tools/make_og.py     # regenerates assets/og-default.png, and if
                                # tools/og-manifest.json exists, one card per
                                # project into assets/og/<slug>.png
Normally invoked for you by `node tools/build.mjs`.
"""
import os
import json
import textwrap
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, "assets")
FONTS = r"C:\Windows\Fonts"

BG = (25, 25, 25)            # #191919
WHITE = (255, 255, 255)
TEXT = (255, 255, 255, 222)  # ~0.87
SECONDARY = (255, 255, 255, 128)
FAINT = (255, 255, 255, 90)
ACCENT = (35, 131, 226)      # #2383e2

W, H = 1200, 630
PAD = 90


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def draw_card(out_path, name, role, line, status, footer):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")

    # accent bar, top-left
    d.rounded_rectangle([PAD, PAD, PAD + 56, PAD + 8], radius=4, fill=ACCENT)

    y = PAD + 40
    f_name = font("segoeuib.ttf", 92)
    d.text((PAD, y), name, font=f_name, fill=(255, 255, 255))
    y += 116

    f_role = font("segoeui.ttf", 40)
    d.text((PAD, y), role, font=f_role, fill=SECONDARY)
    y += 74

    f_line = font("segoeui.ttf", 33)
    d.text((PAD, y), line, font=f_line, fill=(255, 255, 255, 200))

    # availability pill (accent): recruiter-facing signal
    f_pill = font("segoeuib.ttf", 26)
    ph_h = 56  # pill height
    dot_r = 6
    d_pad_l, d_gap, d_pad_r = 26, 14, 30
    pb = d.textbbox((0, 0), status, font=f_pill)
    txt_w, txt_h = pb[2] - pb[0], pb[3] - pb[1]
    pill_w = d_pad_l + dot_r * 2 + d_gap + txt_w + d_pad_r
    px, py = PAD, H - PAD - ph_h
    d.rounded_rectangle([px, py, px + pill_w, py + ph_h], radius=ph_h // 2,
                        fill=(35, 131, 226, 38), outline=ACCENT, width=2)
    cy = py + ph_h // 2
    d.ellipse([px + d_pad_l, cy - dot_r, px + d_pad_l + dot_r * 2, cy + dot_r], fill=ACCENT)
    d.text((px + d_pad_l + dot_r * 2 + d_gap, cy - txt_h // 2 - pb[1] // 2),
           status, font=f_pill, fill=(150, 200, 255))

    # domain, bottom-right
    f_dom = font("segoeui.ttf", 28)
    domain = "pranavkumaarofficial.github.io"
    bbox = d.textbbox((0, 0), domain, font=f_dom)
    dom_w = bbox[2] - bbox[0]
    d.text((W - PAD - dom_w, H - PAD - 34), domain, font=f_dom, fill=FAINT)

    img.save(out_path, "PNG", optimize=True)
    print("wrote", out_path)


def wrap(d, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if d.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_project_card(out_path, name, title, subtitle, summary, eyebrow="Case study"):
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")
    max_w = W - PAD * 2

    # accent bar + eyebrow (author name · type)
    d.rounded_rectangle([PAD, PAD, PAD + 56, PAD + 8], radius=4, fill=ACCENT)
    f_eye = font("segoeui.ttf", 28)
    d.text((PAD, PAD + 30), name.upper() + "  ·  " + eyebrow.upper(), font=f_eye, fill=(35, 131, 226, 220))

    y = PAD + 84
    f_title = font("segoeuib.ttf", 74)
    for ln in wrap(d, title, f_title, max_w)[:2]:
        d.text((PAD, y), ln, font=f_title, fill=(255, 255, 255))
        y += 88
    y += 6

    if subtitle:
        f_sub = font("segoeui.ttf", 34)
        for ln in wrap(d, subtitle, f_sub, max_w)[:1]:
            d.text((PAD, y), ln, font=f_sub, fill=SECONDARY)
            y += 52

    if summary:
        f_sum = font("segoeui.ttf", 30)
        y = max(y + 12, H - PAD - 34 - 4 * 42)
        for ln in wrap(d, summary, f_sum, max_w)[:3]:
            d.text((PAD, y), ln, font=f_sum, fill=(255, 255, 255, 190))
            y += 42

    f_dom = font("segoeui.ttf", 28)
    domain = "pranavkumaarofficial.github.io"
    bb = d.textbbox((0, 0), domain, font=f_dom)
    d.text((W - PAD - (bb[2] - bb[0]), H - PAD - 34), domain, font=f_dom, fill=FAINT)

    img.save(out_path, "PNG", optimize=True)
    print("wrote", out_path)


if __name__ == "__main__":
    os.makedirs(ASSETS, exist_ok=True)
    draw_card(
        os.path.join(ASSETS, "og-default.png"),
        "Pranav Kumaar",
        "Software Engineer · AI/ML Systems",
        "LLM orchestration, retrieval systems, production ML infrastructure",
        "Open to Summer 2027 internships",
        "MSCS @ UMass Amherst · Fall 2026",
    )

    manifest_path = os.path.join(ROOT, "tools", "og-manifest.json")
    if os.path.exists(manifest_path):
        with open(manifest_path, encoding="utf-8") as f:
            manifest = json.load(f)
        og_dir = os.path.join(ASSETS, "og")
        os.makedirs(og_dir, exist_ok=True)
        name = manifest.get("site", {}).get("name", "Pranav Kumaar")
        for p in manifest.get("projects", []):
            draw_project_card(
                os.path.join(og_dir, p["slug"] + ".png"),
                name, p.get("title", ""), p.get("subtitle", ""), p.get("summary", ""),
                p.get("eyebrow", "Case study"),
            )
