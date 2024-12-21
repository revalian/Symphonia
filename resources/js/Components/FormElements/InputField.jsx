import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

export default function InputField({ label, name, type = 'text', value, onChange, fileRef, placeholder, error }) {
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
                onChange={onChange}
            />
            {error && <InputError message={error} />}
        </div>
    );
}
