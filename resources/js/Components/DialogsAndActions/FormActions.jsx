// resources/js/Components/FormActions.jsx
import { Button } from '@/Components/ui/button';

export default function FormActions({ onReset, onSubmit, processing }) {
    return (
        <div className="flex justify-end gap-x-2">
            <Button type="button" variant="ghost" size="lg" onClick={onReset}>
                Reset
            </Button>
            <Button type="submit" variant="orange" size="lg" disabled={processing}>
                Save
            </Button>
        </div>
    );
}
