import svgwrite
import math

def generate_spiral(
    lyrics_text,
    options=None,
    width=2000,
    height=2000,
):
    if options is None:
        options = {}

    font_family = options.get("font", "Arial")
    text_color = options.get("fontColor", "#000")
    background_color = options.get("bgColor", "#fff")
    spiral_width = float(options.get("spiralWidth", 8))

    # Constant settings
    font_size = 14
    letter_spacing = 1.5
    line_spacing = 12
    center_gap_radius = 100

    # Setup SVG canvas
    dwg = svgwrite.Drawing(size=(f"{width}px", f"{height}px"))
    dwg.add(dwg.rect(insert=(0, 0), size=("100%", "100%"), fill=background_color))

    
    # Split lyrics into words and reverse them
    words = lyrics_text.split()
    words = list(reversed(words))

    # Center of canvas
    cx = width / 2
    cy = height / 2

    # Spiral parameters
    a = center_gap_radius  # Start from center gap radius
    b = spiral_width       # How much the spiral expands per radian

    # Start angle at 0 radians (which is still 3 o'clock)
    theta = 0

    for word in words:
        # Calculate position
        r = a + b * theta
        x = cx + r * math.cos(theta)
        y = cy + r * math.sin(theta)

        # Rotate the word tangentially
        rotation = math.degrees(theta) + 90

        # Draw the word
        text = dwg.text(
            word,
            insert=(x, y),
            fill=text_color,
            font_size=font_size,
            font_family=font_family,
            style=f"letter-spacing: {letter_spacing}px;",
        )
        text.rotate(rotation, center=(x, y))
        dwg.add(text)

        # Estimate angular width of the word and increment theta
        word_width = len(word) * (font_size + letter_spacing) * 0.6
        dtheta = word_width / (r if r != 0 else 1)
        theta += dtheta + line_spacing / 100

    return dwg.tostring()
