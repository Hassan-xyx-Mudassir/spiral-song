import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { HexColorPicker } from "react-colorful";
import { Palette } from "lucide-react";

function ColorPicker({ label, color, setColor }) {
  return (
    <div className="flex flex-col gap-2 ml-4 mt-4">
      <Label>{label}</Label>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[200px] justify-between font-normal"
          >
            Open picker
            <Palette />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-transparent w-fit border-none shadow-none">
          <HexColorPicker color={color} onChange={setColor} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ColorPicker;
