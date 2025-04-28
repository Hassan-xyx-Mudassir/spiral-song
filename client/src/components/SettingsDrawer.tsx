import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import FontPicker from "./FontPicker";
import ColorPicker from "./ColorPicker";
import SliderInput from "./SliderInput";

function SettingsDrawer({ open, onOpen, options, onOptionsChange }) {
  const [font, setFont] = useState(options.font);
  const [fontColor, setFontColor] = useState(options.fontColor);
  const [bgColor, setBgColor] = useState(options.bgColor);
  const [spiralWidth, setSpiralWidth] = useState(options.spiralWidth);
  const [openFont, setFontOpen] = useState(false);

  const handleApply = () => {
    onOptionsChange({ font, fontColor, bgColor, spiralWidth });
    onOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>
              Adjust your spiral as you like.
            </DrawerDescription>
          </DrawerHeader>

          {/* Font family */}
          <FontPicker
            open={openFont}
            setOpen={setFontOpen}
            font={font}
            setFont={setFont}
          />

          {/* Font color */}
          <ColorPicker
            label="Font color"
            color={fontColor}
            setColor={setFontColor}
          />

          {/* Background color */}
          <ColorPicker
            label="Background color"
            color={bgColor}
            setColor={setBgColor}
          />

          {/* Spiral width */}
          <SliderInput
            label="Spiral spacing"
            value={spiralWidth}
            setValue={setSpiralWidth}
          />

          <DrawerFooter className="flex justify-center items-center flex-row">
            <Button onClick={handleApply}>Apply</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default SettingsDrawer;
