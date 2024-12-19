// resources/js/Components/FileInputField.jsx
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import InputError from '@/Components/InputError';

export default function FileInputField({ name, label, value, onChange, error, fileRef }) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={name}>{label}</Label>
            <Input
                name={name}
                id={name}
                type="file"
                onChange={onChange}
                ref={fileRef}
                value={value}
            />
            {error && <InputError message={error} />}
        </div>
    );
}
