"""Create the transparent, looping scan line embedded in the slides."""
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
DESTINATION = ROOT / "assets" / "animations" / "qr-scan.gif"

def main() -> None:
    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    frames = []
    size = 128
    for step in range(20):
        frame = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(frame)
        y = 5 + int((size - 12) * step / 19)
        draw.rectangle((5, y - 3, size - 6, y + 3), fill=(48, 214, 220, 55))
        draw.rectangle((5, y - 1, size - 6, y + 1), fill=(74, 135, 255, 185))
        draw.rectangle((5, y, size - 6, y), fill=(235, 255, 255, 245))
        frames.append(frame)
    frames[0].save(DESTINATION, save_all=True, append_images=frames[1:],
                   duration=65, loop=0, disposal=2)
    print(DESTINATION)

if __name__ == "__main__":
    main()
