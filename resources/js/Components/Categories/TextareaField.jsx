import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import InputError from '@/Components/InputError';

export default function TextareaField({ name, label, placeholder, value, onChange, error }) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Textarea
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            ></Textarea>
            {error && <InputError message={error} />}
        </div>
    );
}
