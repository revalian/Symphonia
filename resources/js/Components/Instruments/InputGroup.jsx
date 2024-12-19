import InputError from '@/Components/InputError';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const InputGroup = ({ name, id, type, placeholder, value, onChange, error }) => (
    <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={id}>{name}</Label>
        <Input
            name={id}
            id={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        {error && <InputError message={error} />}
    </div>
);

export default InputGroup;
