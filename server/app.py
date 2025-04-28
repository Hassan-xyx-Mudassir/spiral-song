# server/app.py

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from lyrics_fetcher import fetch_lyrics
from spiral_generator import generate_spiral
from file_manager import save_svg, convert_svg_to_pdf
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


# Folder where generated SVG and PDF files are saved
GENERATED_FOLDER = "generated_files"

@app.route("/", methods=["GET"])
def home():
    return "Hello, World!"

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    # Get inputs
    mode = data.get("mode")  
    song = data.get("song")
    artist = data.get("artist")
    lyrics = data.get("lyrics")
    options = data.get("options", {})  

    if not mode:
        return jsonify({"error": "Missing mode."}), 400

    # 1. If input is song name, fetch lyrics
    if mode == "by-song":
        if not song or not artist:
            return jsonify({"error": "Missing song or artist for by-song mode."}), 400
        search_query = [song, artist]
        lyrics = fetch_lyrics(search_query)
        if not lyrics:
            return jsonify({"error": "Lyrics not found."}), 404
    elif mode == "by-lyrics":
        if not lyrics:
            return jsonify({"error": "Missing lyrics for by-lyrics mode."}), 400
        # use the provided lyrics
    else:
        return jsonify({"error": "Invalid mode."}), 400

    # 2. Generate SVG spiral
    try:
        svg_content = generate_spiral(lyrics, options)  
    except Exception as e:
        return jsonify({"error": f"Failed to generate spiral: {str(e)}"}), 500

    # 3. Save SVG to file
    svg_path = save_svg(svg_content)

    # 4. Convert SVG to PDF
    pdf_path = convert_svg_to_pdf(svg_path)

    # 5. Prepare filenames to send back
    svg_filename = os.path.basename(svg_path)
    pdf_filename = os.path.basename(pdf_path)

    return jsonify({
        "svg_file": svg_filename,
        "pdf_file": pdf_filename
    })

@app.route("/download/<path:filename>", methods=["GET"])
def download_file(filename):
    return send_from_directory(GENERATED_FOLDER, filename, as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
