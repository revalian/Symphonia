import InputError from '@/Components/atoms/InputError';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export default function InputField({
    label,
    name,
    type = 'text',
    value,
    onChange,
    fileRef,
    placeholder,
    error,
    disabled,
}) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Input
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                ref={fileRef}
                value={value}
                disabled={disabled}
                onChange={onChange}
            />
            {error && <InputError message={error} />}
        </div>
    );
}
