import InputError from '@/Components/InputError';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';

const TextareaGroup = ({ name, id, value, onChange, placeholder, error }) => (
    <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id}>{name}</Label>
        <Textarea name={id} id={id} value={value} onChange={onChange} placeholder={placeholder} />
        {error && <InputError message={error} />}
    </div>
);

export default TextareaGroup;
