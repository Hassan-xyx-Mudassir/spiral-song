import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import axios from "axios";
import SettingsDrawer from "./components/SettingsDrawer";
import FileDialog from "./components/FileDialog";
import SongInput from "./components/SongInput";
import spiralSong from "./assets/spiral_song.png";

export default function App() {
  const [searchType, setSearchType] = useState("by-song");
  const [song, setSong] = useState("");
  const [artist, setArtist] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [options, setOptions] = useState({
    font: "Arial",
    fontColor: "#000",
    bgColor: "#000",
    spiralWidth: 8,
  });
  const [pdfFileName, setPdfFileName] = useState(null);
  const [svgFileName, setSvgFileName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setDrawerOpen] = useState(false);
  const [openDialog, setDialogOpen] = useState(false);

  const handleSong = (e) => setSong(e.target.value);
  const handleArtist = (e) => setArtist(e.target.value);
  const handleLyrics = (e) => setLyrics(e.target.value);
  const handleOptions = (myOptions) => {
    setOptions(myOptions);
  };

  const handleDownload = async (filename) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/download/${filename}`,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);

      // Show error toast
      toast("Failed to generate spiral", {
        description: "Something weird happened. Try again please.",
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });

      setDialogOpen(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSettingsClick = () => {
    setDrawerOpen(true);
  };
  const handleSendClick = async () => {
    try {
      setIsLoading(true);
      setDialogOpen(true);

      const payload = {
        mode: searchType,
        song: song,
        artist: artist,
        lyrics: lyrics,
        options: options,
      };

      console.log(JSON.stringify(payload));

      const response = await axios.post(
        "http://localhost:5000/generate",
        payload
      );

      setSvgFileName(response.data.svg_file);
      setPdfFileName(response.data.pdf_file);

      setIsLoading(false);
    } catch (error) {
      console.error("Error generating spiral:", error);

      // Show error toast
      toast("Failed to generate spiral", {
        description: "Something weird happened. Try again please.",
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });

      setDialogOpen(false);
    }
  };

  return (
    <div className="flex items-center flex-col h-screen bg-primary-foreground">
      <img src={spiralSong} width="200" alt="logo" />

      <ToggleGroup
        type="single"
        value={searchType}
        onValueChange={(value) => {
          if (value) setSearchType(value);
        }}
      >
        <ToggleGroupItem value="by-song">
          <p className="text-lg tracking-wide">By Song</p>
        </ToggleGroupItem>
        <ToggleGroupItem value="by-lyrics">
          <p className="text-lg tracking-wide">By Lyrics</p>
        </ToggleGroupItem>
      </ToggleGroup>

      <SongInput
        searchType={searchType}
        onSongChange={handleSong}
        onArtistChange={handleArtist}
        onLyricsChange={handleLyrics}
        onSendClick={handleSendClick}
        onSettingsClick={handleSettingsClick}
      />

      <SettingsDrawer
        open={openDrawer}
        onOpen={setDrawerOpen}
        options={options}
        onOptionsChange={handleOptions}
      />

      <FileDialog
        open={openDialog}
        onOpen={setDialogOpen}
        handleDownload={handleDownload}
        svgFileName={svgFileName}
        pdfFileName={pdfFileName}
        isLoading={isLoading}
      />

      <Toaster />
    </div>
  );
}
