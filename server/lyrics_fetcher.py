import requests

def fetch_lyrics(search_query):
    song_name, artist_name = search_query
    
    # Turn spaces into underscores
    song_name = song_name.replace(" ", "_").lower()
    artist_name = artist_name.replace(" ", "_").lower()

    lyrics = fetch_from_deezer(song_name)
    if lyrics:
        return lyrics

    print("[Info] Falling back to Lyrics.ovh...")
    lyrics = fetch_from_lyrics_ovh(song_name, artist_name)
    return lyrics


def fetch_from_deezer(song_name):
    try:
        search_url = f"https://api.deezer.com/search?q={song_name}"
        response = requests.get(search_url, timeout=5)
        response.raise_for_status()

        data = response.json()
        if data['data']:
            track_id = data['data'][0]['id']

            track_url = f"https://api.deezer.com/track/{track_id}"
            track_response = requests.get(track_url, timeout=5)
            track_response.raise_for_status()

            track_data = track_response.json()
            if 'lyrics' in track_data and track_data['lyrics']:
                return track_data['lyrics']['lyrics']

            # Deezer might not have full lyrics (usually no full lyrics in free API)
            return None
        else:
            return None

    except Exception as e:
        print(f"[Error] Deezer fetch failed: {e}")
        return None


def fetch_from_lyrics_ovh(song_name, artist_name):
    try:
        url = f"https://api.lyrics.ovh/v1/{artist_name}/{song_name}"  
        response = requests.get(url, timeout=5)
        response.raise_for_status()

        data = response.json()
        return data.get('lyrics')

    except Exception as e:
        print(f"[Error] Lyrics.ovh fetch failed: {e}")
        return None
