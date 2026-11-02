"""Draw the red donkey2 outline into public/favicon.ico (16, 32, 48 px).

Matches src/pages/favicon.svg.ts: same path, square padding, stroke and colour.
Needs only Pillow. Run from the repo root after re-exporting the outline:

    python3 scripts/favicon-ico.py
"""

import re
from pathlib import Path

from PIL import Image, ImageDraw

SRC = Path("materials/svg/donkey2-outline.svg")
OUT = Path("public/favicon.ico")

VIEW_X, VIEW_Y, VIEW_SIZE = -12, -57, 399  # same square viewBox as favicon.svg.ts
STROKE = 22  # in outline units, as in favicon.svg.ts
COLOR = (0xFB, 0x2C, 0x36, 255)  # Tailwind red-500
CANVAS = 768  # draw large, then downsample for smooth edges


def outline_points(d: str) -> list[tuple[float, float]]:
    """Flatten the path (only absolute M, C and Z are used) into a closed polyline."""
    tokens = re.findall(r"[MCZ]|-?\d*\.?\d+", d)
    pts: list[tuple[float, float]] = []
    i, cmd = 0, None
    while i < len(tokens):
        if tokens[i] in "MCZ":
            cmd = tokens[i]
            i += 1
            if cmd == "Z":
                pts.append(pts[0])
            continue
        if cmd == "M":
            pts.append((float(tokens[i]), float(tokens[i + 1])))
            i += 2
        elif cmd == "C":
            x0, y0 = pts[-1]
            x1, y1, x2, y2, x3, y3 = map(float, tokens[i : i + 6])
            for s in range(1, 17):
                t = s / 16
                u = 1 - t
                pts.append((
                    u**3 * x0 + 3 * u**2 * t * x1 + 3 * u * t**2 * x2 + t**3 * x3,
                    u**3 * y0 + 3 * u**2 * t * y1 + 3 * u * t**2 * y2 + t**3 * y3,
                ))
            i += 6
    return pts


def main() -> None:
    d = re.search(r' d="([^"]+)"', SRC.read_text()).group(1)
    k = CANVAS / VIEW_SIZE
    pts = [((x - VIEW_X) * k, (y - VIEW_Y) * k) for x, y in outline_points(d)]
    width = round(STROKE * k)

    img = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.line(pts, fill=COLOR, width=width, joint="curve")
    r = width / 2
    for x, y in pts:  # round caps/joins everywhere, like stroke-linejoin="round"
        draw.ellipse((x - r, y - r, x + r, y + r), fill=COLOR)

    OUT.parent.mkdir(exist_ok=True)
    img.save(OUT, sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
