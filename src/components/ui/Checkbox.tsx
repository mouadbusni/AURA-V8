import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox = ({ id, label, checked, onCheckedChange, className }: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <CheckboxPrimitive.Root
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className={cn(
          'h-4 w-4 rounded border border-aura-gray-300 bg-white',
          'focus:outline-none focus:ring-2 focus:ring-aura-black focus:ring-offset-2',
          'data-[state=checked]:bg-aura-black data-[state=checked]:border-aura-black',
          className
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label htmlFor={id} className="ml-2 text-sm">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;