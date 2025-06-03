import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@src/components/ui/select';
import { cn } from '@src/lib/utils';

export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  className?: string;
}

export const SelectCustomize = ({
  options,
  onChange,
  value,
  placeholder = '',
  className = '',
}: Props) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={cn('col-span-3 text-sm w-full', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectItem value={option.value} key={option.value + index}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
