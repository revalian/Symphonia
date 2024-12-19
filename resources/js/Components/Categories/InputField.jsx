// resources/js/Components/InputField.jsx
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import InputError from '@/Components/InputError';

export default function InputField({ name, label, type = 'text', placeholder, value, onChange, error }) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Input
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <InputError message={error} />}
        </div>
    );
}
