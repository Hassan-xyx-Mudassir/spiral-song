import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const fonts = [
  { value: "Arial", label: "Arial" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Calibri", label: "Calibri" },
  { value: "Roboto", label: "Roboto" },
];

function FontPicker({ open, setOpen, font, setFont }) {
  return (
    <div className="flex flex-col gap-2 ml-4">
      <Label>Font family</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between font-normal"
          >
            {font
              ? fonts.find((myFont) => myFont.value === font)?.label
              : "Select font..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search font..." className="h-9" />
            <CommandList>
              <CommandEmpty>No font found.</CommandEmpty>
              <CommandGroup>
                {fonts.map((myFont) => (
                  <CommandItem
                    key={myFont.value}
                    value={myFont.value}
                    onSelect={(currentValue) => {
                      setFont(
                        currentValue === myFont.value ? currentValue : ""
                      );
                      setOpen(false);
                    }}
                  >
                    {myFont.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        font === myFont.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default FontPicker;
