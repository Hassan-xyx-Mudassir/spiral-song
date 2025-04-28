# server/file_manager.py

import uuid
import os
import cairosvg

# Directory where we'll store files temporarily
TEMP_DIR = "generated_files"

# Ensure the folder exists
os.makedirs(TEMP_DIR, exist_ok=True)

def save_svg(svg_content):
    """
    Saves the SVG content to a uniquely named file.
    Returns the file path.
    """
    filename = f"{uuid.uuid4().hex}.svg"
    filepath = os.path.join(TEMP_DIR, filename)
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    return filepath

def convert_svg_to_pdf(svg_path):
    """
    Converts an SVG file to a PDF file (300 DPI).
    Returns the PDF file path.
    """
    pdf_filename = os.path.splitext(os.path.basename(svg_path))[0] + ".pdf"
    pdf_path = os.path.join(TEMP_DIR, pdf_filename)

    # Convert using CairoSVG
    cairosvg.svg2pdf(
        url=svg_path,
        write_to=pdf_path,
        dpi=300
    )

    return pdf_path
