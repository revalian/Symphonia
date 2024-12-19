import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

export default function TextareaField({ label, name, value, onChange, placeholder, error }) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Textarea name={name} id={name} placeholder={placeholder} value={value} onChange={onChange} />
            {error && <InputError message={error} />}
        </div>
    );
}
