#!/usr/bin/env python3
"""Render the Open Graph cards into public/.

Two cards are produced from the same copy:

  og.png         1200x630   cream panel + dark brand panel, for 1.91:1 and 2:1 feeds
  og-square.png  1200x1200  centred, for placements that crop to 1:1

Usage:
    python3 scripts/make-share-cards.py [--out DIR]

Requires Pillow (`pip install Pillow`) and network access the first time, to
download the two fonts into .font-cache/ (gitignored).
"""

import argparse
import os
import re
import sys
import urllib.request

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, '.font-cache')
MARKS = {
    'ink': os.path.join(ROOT, 'public', 'logo-mark-light.png'),
    'cream': os.path.join(ROOT, 'public', 'logo-mark-dark.png'),
}

PAPER = (251, 246, 239)
INK = (24, 21, 18)
MUTED = (116, 106, 95)
ACCENT = (163, 110, 42)
RULE = (214, 200, 182)

# Copy that lives in components/sections/Hero.tsx — keep these in step with it.
HEADLINE_NORMAL = 'Front-end developer'
HEADLINE_ITALIC = 'with an engineer’s eye.'

FONT_SPECS = {
    'fraunces-600': 'Fraunces:wght@600',
    'fraunces-600i': 'Fraunces:ital,wght@1,600',
    'rubik': 'Rubik:wght@400;500',
}


def read_site():
    """Pull the name, role, brand and URL out of lib/site.ts."""
    source = open(os.path.join(ROOT, 'lib', 'site.ts'), encoding='utf-8').read()
    wanted = {'name': None, 'role': None, 'brand': None, 'url': None, 'location': None}
    for key in wanted:
        match = re.search(rf"{key}:\s*'([^']*)'", source)
        if not match:
            sys.exit(f'could not find {key} in lib/site.ts')
        wanted[key] = match.group(1)
    return wanted


def ensure_fonts():
    os.makedirs(CACHE, exist_ok=True)
    for name, query in FONT_SPECS.items():
        path = os.path.join(CACHE, f'{name}.ttf')
        if os.path.exists(path):
            continue
        css_request = urllib.request.Request(
            f'https://fonts.googleapis.com/css?family={query}',
            headers={'User-Agent': ''},
        )
        css = urllib.request.urlopen(css_request).read().decode()
        url = re.findall(r'url\((https://[^)]+\.ttf)\)', css)[0]
        with open(path, 'wb') as handle:
            handle.write(urllib.request.urlopen(url).read())
        print(f'downloaded {name}')


def font(name, size, weight=None):
    path = os.path.join(CACHE, f'{name}.ttf')
    face = ImageFont.truetype(path, size)
    if weight:
        try:
            face.set_variation_by_axes([weight])
        except Exception:
            pass
    return face


def tracked(draw, x, y, text, face, fill, spacing):
    for char in text:
        draw.text((x, y), char, font=face, fill=fill)
        x += draw.textlength(char, font=face) + spacing
    return x


def fit_size(draw, lines, max_width, start=96, floor=40):
    """Largest size at which every line still fits the column."""
    size = start
    while size > floor:
        if all(draw.textbbox((0, 0), text, font=font(name, size))[2] <= max_width
               for text, name in lines):
            return size
        size -= 1
    return floor


def render_wide(site):
    width, height, split, left = 1200, 630, 748, 76
    card = Image.new('RGB', (width, height), PAPER)
    draw = ImageDraw.Draw(card)

    draw.rectangle([split, 0, width, height], fill=INK)
    mark = Image.open(MARKS['cream']).resize((300, 300), Image.LANCZOS)
    card.paste(mark, (split + (width - split - 300) // 2, (height - 300) // 2), mark)

    draw.rectangle([left, 92, left + 26, 95], fill=ACCENT)
    tracked(draw, left + 40, 82, site['brand'].upper(), font('rubik', 18, 500), ACCENT, 3.4)

    column = split - left - 56
    size = fit_size(draw, [(HEADLINE_NORMAL, 'fraunces-600'), (HEADLINE_ITALIC, 'fraunces-600i')], column, start=72)
    leading = round(size * 1.14)
    draw.text((left, 196), HEADLINE_NORMAL, font=font('fraunces-600', size), fill=INK)
    draw.text((left, 196 + leading), HEADLINE_ITALIC, font=font('fraunces-600i', size), fill=INK)

    rule_y = 430
    draw.rectangle([left, rule_y, left + 320, rule_y + 1], fill=RULE)

    draw.text((left, rule_y + 46), site['name'], font=font('rubik', 30, 500), fill=INK)
    small = font('rubik', 21, 400)
    draw.text((left, rule_y + 96), site['location'], font=small, fill=MUTED)
    domain = site['domain']
    draw.text((split - left - draw.textbbox((0, 0), domain, font=small)[2], rule_y + 96),
              domain, font=small, fill=MUTED)
    return card


def render_square(site):
    side = 1200
    card = Image.new('RGB', (side, side), PAPER)
    draw = ImageDraw.Draw(card)

    def centred(text, face, y, fill):
        draw.text(((side - draw.textbbox((0, 0), text, font=face)[2]) / 2, y), text, font=face, fill=fill)

    mark = Image.open(MARKS['ink']).resize((300, 300), Image.LANCZOS)
    card.paste(mark, ((side - 300) // 2, 156), mark)

    spacing = 4.5
    label_face = font('rubik', 20, 500)
    label = site['brand'].upper()
    total = sum(draw.textlength(c, font=label_face) + spacing for c in label) - spacing
    tracked(draw, (side - total) / 2, 512, label, label_face, ACCENT, spacing)

    size = fit_size(draw, [(HEADLINE_NORMAL, 'fraunces-600'), (HEADLINE_ITALIC, 'fraunces-600i')], side - 160)
    leading = round(size * 1.14)
    centred(HEADLINE_NORMAL, font('fraunces-600', size), 578, INK)
    centred(HEADLINE_ITALIC, font('fraunces-600i', size), 578 + leading, INK)

    rule_y = 578 + leading * 2 + 52
    draw.rectangle([(side - 320) // 2, rule_y, (side - 320) // 2 + 320, rule_y + 1], fill=RULE)
    centred(site['name'], font('rubik', 34, 500), rule_y + 46, INK)
    centred(site['location'], font('rubik', 22, 400), rule_y + 104, MUTED)
    centred(site['domain'], font('rubik', 22, 400), rule_y + 142, MUTED)
    return card


def read_studies():
    """Pull slug, title, kicker, stack and cover out of lib/case-studies.ts."""
    source = open(os.path.join(ROOT, 'lib', 'case-studies.ts'), encoding='utf-8').read()
    starts = list(re.finditer(r"\n {4}slug: '([a-z0-9-]+)',", source))
    studies = []

    for index, match in enumerate(starts):
        end = starts[index + 1].start() if index + 1 < len(starts) else len(source)
        block = source[match.start():end]

        def value(key):
            found = re.search(rf"{key}:\s*'((?:[^'\\]|\\.)*)'", block, re.S)
            return found.group(1).replace("\\'", "'") if found else ''

        stack_match = re.search(r'stack:\s*\[([^\]]*)\]', block, re.S)
        cover_match = re.search(r"cover:\s*\{\s*src:\s*'([^']+)'", block, re.S)
        studies.append({
            'slug': match.group(1),
            'title': value('title'),
            'kicker': value('kicker'),
            'stack': re.findall(r"'([^']*)'", stack_match.group(1)) if stack_match else [],
            'cover': cover_match.group(1) if cover_match else '',
        })

    return studies


def wrap(draw, text, face, width):
    lines, current = [], ''
    for word in text.split():
        trial = f'{current} {word}'.strip()
        if not current or draw.textlength(trial, font=face) <= width:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def fit_block(draw, text, width, max_lines=3, start=58, floor=32, name='fraunces-600'):
    """Largest size at which the title still wraps inside `max_lines`."""
    size = start
    while size > floor:
        face = font(name, size)
        lines = wrap(draw, text, face, width)
        if len(lines) <= max_lines:
            return face, lines
        size -= 2
    face = font(name, floor)
    return face, wrap(draw, text, face, width)[:max_lines]


def render_work_card(site, study):
    width, height, split, left = 1200, 630, 660, 72
    card = Image.new('RGB', (width, height), PAPER)
    draw = ImageDraw.Draw(card)

    draw.rectangle([split, 0, width, height], fill=INK)

    cover_path = os.path.join(ROOT, 'public', study['cover'].lstrip('/'))
    if study['cover'] and os.path.exists(cover_path):
        shot = Image.open(cover_path).convert('RGB')
        tile_w, tile_h = 420, 262
        tile = ImageOps.fit(shot, (tile_w, tile_h), Image.LANCZOS)
        x = split + (width - split - tile_w) // 2
        y = (height - tile_h) // 2 - 18
        draw.rectangle([x - 5, y - 5, x + tile_w + 5, y + tile_h + 5], fill=(252, 250, 246))
        card.paste(tile, (x, y))
        mark = Image.open(MARKS['cream']).resize((42, 42), Image.LANCZOS)
        card.paste(mark, (x, y + tile_h + 28), mark)

    draw.rectangle([left, 86, left + 26, 89], fill=ACCENT)
    tracked(draw, left + 40, 76, study['kicker'].upper()[:26], font('rubik', 17, 500), ACCENT, 3.0)

    column = split - left - 64
    face, title_lines = fit_block(draw, study['title'], column)
    y = 150
    for line in title_lines:
        draw.text((left, y), line, font=face, fill=INK)
        y += round(face.size * 1.06)

    stack_face = font('rubik', 19, 400)
    y += 16
    for line in wrap(draw, ' · '.join(study['stack'][:4]), stack_face, column)[:2]:
        draw.text((left, y), line, font=stack_face, fill=MUTED)
        y += 27

    rule_y = height - 132
    draw.rectangle([left, rule_y, left + 280, rule_y + 1], fill=RULE)
    draw.text((left, rule_y + 38), site['name'], font=font('rubik', 23, 500), fill=INK)
    draw.text((left, rule_y + 76), f"{site['domain']}/work/{study['slug']}",
              font=font('rubik', 17, 400), fill=MUTED)
    return card


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', default=os.path.join(ROOT, 'public'), help='output directory')
    args = parser.parse_args()

    site = read_site()
    site['domain'] = re.sub(r'^https?://', '', site['url']).rstrip('/')

    ensure_fonts()
    os.makedirs(args.out, exist_ok=True)

    for name, build in (('og.png', render_wide), ('og-square.png', render_square)):
        path = os.path.join(args.out, name)
        card = build(site)
        card.save(path, 'PNG', optimize=True)
        print(f'{path} {card.size[0]}x{card.size[1]} {os.path.getsize(path) // 1024} KB')

    work_dir = os.path.join(args.out, 'og')
    os.makedirs(work_dir, exist_ok=True)
    written = set()

    for study in read_studies():
        card = render_work_card(site, study)
        path = os.path.join(work_dir, f"{study['slug']}.png")
        card.save(path, 'PNG', optimize=True)
        written.add(os.path.basename(path))
        print(f'{path} {card.size[0]}x{card.size[1]} {os.path.getsize(path) // 1024} KB')

    for name in sorted(os.listdir(work_dir)):
        if name.endswith('.png') and name not in written:
            os.remove(os.path.join(work_dir, name))
            print(f'removed stale {name}')


if __name__ == '__main__':
    main()
