"""Add consistent, restrained PowerPoint fade transitions to the authored deck."""
from pathlib import Path
import os
import tempfile
import zipfile

def add_fades(pptx_path: Path) -> None:
    pptx_path = pptx_path.resolve()
    fd, temp_name = tempfile.mkstemp(suffix=".pptx", dir=pptx_path.parent)
    os.close(fd)
    temp_path = Path(temp_name)
    try:
        with zipfile.ZipFile(pptx_path, "r") as source, zipfile.ZipFile(temp_path, "w", zipfile.ZIP_DEFLATED) as target:
            for info in source.infolist():
                data = source.read(info.filename)
                if info.filename.startswith("ppt/slides/slide") and info.filename.endswith(".xml"):
                    xml = data.decode("utf-8")
                    if "<p:transition" not in xml:
                        xml = xml.replace("</p:sld>", '<p:transition spd="med"><p:fade/></p:transition></p:sld>')
                    data = xml.encode("utf-8")
                target.writestr(info, data)
        os.replace(temp_path, pptx_path)
    finally:
        if temp_path.exists():
            temp_path.unlink()

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        raise SystemExit("Usage: add_transitions.py path/to/deck.pptx")
    add_fades(Path(sys.argv[1]))
