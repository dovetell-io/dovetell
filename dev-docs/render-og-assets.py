from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
WIDTH, HEIGHT = 1200, 630

FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"


def font(path, size):
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = word if not line else f"{line} {word}"
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def text_block(draw, xy, text, fnt, fill, max_width, line_gap=12):
    x, y = xy
    for line in wrap(draw, text, fnt, max_width):
        draw.text((x, y), line, font=fnt, fill=fill)
        y += draw.textbbox((0, 0), line, font=fnt)[3] + line_gap
    return y


def logo(draw, x, y, dark=False):
    icon = Image.open(ASSETS / "favicon.png").convert("RGBA").resize((54, 54))
    draw._image.paste(icon, (x, y), icon)
    draw.text((x + 70, y + 7), "dovetell", font=font(BLACK, 34), fill="#ffffff" if dark else "#111223")


def save_home():
    img = Image.new("RGB", (WIDTH, HEIGHT), "#111223")
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((54, 54, WIDTH - 54, HEIGHT - 54), radius=18, fill="#17192f", outline="#343751", width=1)
    logo(draw, 114, 108, dark=True)
    draw.rounded_rectangle((344, 118, 535, 160), radius=8, outline="#545a91", fill="#202443")
    draw.text((360, 128), "repo-owned context", font=font(BOLD, 15), fill="#cfd3ff")
    draw.text((114, 250), "Tell it once.", font=font(BLACK, 72), fill="#ffffff")
    draw.text((114, 326), "Let it travel.", font=font(BLACK, 72), fill="#ffffff")
    text_block(draw, (118, 428), "Shared team context for AI-assisted software work.", font(FONT, 27), "#c7cada", 620, 8)
    steps = [("scattered input", "#5865f2"), ("reviewed context", "#d97706"), ("agent-ready handoff", "#16834a")]
    y = 362
    for label, color in steps:
        draw.rounded_rectangle((812, y, 1134, y + 58), radius=10, fill="#111223", outline="#343751")
        draw.ellipse((836, y + 22, 850, y + 36), fill=color)
        draw.text((872, y + 18), label, font=font(BOLD, 18), fill="#f7f7ff")
        y += 72
    draw.text((114, 540), "dovetell.io", font=font(BOLD, 20), fill="#cfd3ff")
    img.save(ASSETS / "og.png")


def save_assessment():
    img = Image.new("RGB", (WIDTH, HEIGHT), "#fbfbff")
    draw = ImageDraw.Draw(img)
    logo(draw, 64, 56, dark=False)
    draw.rounded_rectangle((934, 58, 1138, 100), radius=8, fill="#eef0ff", outline="#dfe2ee")
    draw.text((952, 69), "5 minute assessment", font=font(BOLD, 15), fill="#5865f2")
    text_block(draw, (66, 166), "How reusable is your team's AI context?", font(BLACK, 54), "#111223", 680, 16)
    text_block(draw, (70, 404), "Find where context breaks, then start with one practical repo-native fix.", font(FONT, 25), "#4f566f", 610, 8)
    draw.rounded_rectangle((800, 154, 1130, 484), radius=18, fill="#ffffff", outline="#dfe2ee", width=1)
    draw.text((830, 184), "SAMPLE RESULT", font=font(BOLD, 14), fill="#62677e")
    draw.text((830, 226), "64", font=font(BLACK, 86), fill="#5865f2")
    draw.text((952, 282), "/100", font=font(BOLD, 22), fill="#62677e")
    draw.rounded_rectangle((830, 336, 1100, 348), radius=6, fill="#eceef3")
    draw.rounded_rectangle((830, 336, 1004, 348), radius=6, fill="#5865f2")
    for i, (label, color) in enumerate([("shared context", "#16834a"), ("handoff gaps", "#d97706"), ("decision drift", "#c2413f")]):
        y = 384 + i * 34
        draw.ellipse((832, y + 4, 844, y + 16), fill=color)
        draw.text((862, y), label, font=font(BOLD, 16), fill="#202236")
    draw.text((70, 546), "dovetell.io/team-assessment", font=font(BOLD, 20), fill="#5865f2")
    img.save(ASSETS / "og-assessment.png")


def save_starter():
    img = Image.new("RGB", (WIDTH, HEIGHT), "#111223")
    draw = ImageDraw.Draw(img)
    logo(draw, 66, 58, dark=True)
    text_block(draw, (70, 164), "Starter context for one real project.", font(BLACK, 54), "#ffffff", 610, 16)
    text_block(draw, (72, 404), "A small markdown package to help your next AI session resume with less re-explaining.", font(FONT, 24), "#c7cada", 560, 8)
    draw.rounded_rectangle((730, 92, 1138, 514), radius=16, fill="#fbfbff", outline="#343751", width=1)
    draw.rectangle((730, 92, 1138, 150), fill="#f1f2f8")
    draw.rounded_rectangle((752, 110, 864, 138), radius=7, fill="#ffffff", outline="#dfe2ee")
    draw.text((764, 117), "manifest.md", font=font(BOLD, 13), fill="#62677e")
    draw.rounded_rectangle((876, 110, 980, 138), radius=7, fill="#ffffff", outline="#dfe2ee")
    draw.text((888, 117), "handoff.md", font=font(BOLD, 13), fill="#62677e")
    lines = [
        ("centerline:", " reusable project context"),
        ("status:", " active"),
        ("next:", " preserve intent, decisions, tasks"),
        ("guardrail:", " record drift before debt"),
    ]
    y = 192
    for key, value in lines:
        draw.text((766, y), key, font=font(BOLD, 19), fill="#5865f2")
        draw.text((766 + draw.textbbox((0, 0), key, font=font(BOLD, 19))[2], y), value, font=font(BOLD, 19), fill="#111223")
        y += 62
    draw.text((72, 542), "Tell it once. Let it travel.", font=font(BOLD, 20), fill="#cfd3ff")
    img.save(ASSETS / "og-starter.png")


if __name__ == "__main__":
    save_home()
    save_assessment()
    save_starter()
