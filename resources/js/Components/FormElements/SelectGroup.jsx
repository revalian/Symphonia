import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

const SelectGroup = ({ name, id, options, value, onChange, error, placeholder }) => (
    <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id}>{name}</Label>
        <Select defaultValue={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue>{options.find((opt) => opt.value == value)?.label || placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((opt, index) => (
                    <SelectItem key={index} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        {error && <InputError message={error} />}
    </div>
);

export default SelectGroup;
