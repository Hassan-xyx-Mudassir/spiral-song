import { Button } from "./ui/button";
import { SlidersHorizontal } from "lucide-react";

function Controls({ onSendClick, onSettingsClick }) {
  return (
    <>
      <Button className="flex max-h-[48px]" onClick={onSettingsClick}>
        <p>Settings</p>
        <SlidersHorizontal />
      </Button>

      <Button className="flex max-h-[48px]" onClick={onSendClick}>
        Send
      </Button>
    </>
  );
}

export default Controls;
