import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Controls from "./Controls";

function SongInput({
  searchType,
  onSongChange,
  onArtistChange,
  onLyricsChange,
  onSendClick,
  onSettingsClick,
}) {
  return (
    <div className="flex gap-[8px] px-48 py-12 self-stretch h-[40%] flex-col">
      {searchType == "by-song" ? (
        <>
          <Input
            type="text"
            placeholder="Fill in the song's name."
            onChange={onSongChange}
          />
          <Input
            type="text"
            placeholder="Type the artist's name."
            onChange={onArtistChange}
          />
        </>
      ) : (
        <Textarea
          placeholder="Type your lyrics here."
          onChange={onLyricsChange}
          className="h-[128px]"
        />
      )}

      <Controls onSendClick={onSendClick} onSettingsClick={onSettingsClick} />
    </div>
  );
}

export default SongInput;
