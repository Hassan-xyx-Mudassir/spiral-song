import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

function SliderInput({ label, value, setValue }) {
  return (
    <div className="flex flex-col gap-2 ml-4 mt-4">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <Slider
          min={8}
          max={32}
          value={[value]}
          onValueChange={(myValue) => setValue(myValue[0])}
        />
        <p className="text-muted-foreground text-sm mb-1">({value})</p>
      </div>
    </div>
  );
}

export default SliderInput;
