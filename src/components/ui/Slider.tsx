import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../utils/cn';

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  className?: string;
}

const Slider = ({ value, onValueChange, min, max, step = 1, className }: SliderProps) => {
  return (
    <SliderPrimitive.Root
      className={cn('relative flex items-center select-none touch-none w-full', className)}
      value={value}
      onValueChange={onValueChange}
      min={min}
      max={max}
      step={step}
    >
      <SliderPrimitive.Track className="relative h-1.5 grow rounded-full bg-aura-gray-200">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-aura-black" />
      </SliderPrimitive.Track>
      {value.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-4 w-4 rounded-full border border-aura-black bg-white focus:outline-none focus:ring-2 focus:ring-aura-black focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
};

export default Slider;