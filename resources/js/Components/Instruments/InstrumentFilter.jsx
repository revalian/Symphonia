import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Button } from '@/Components/ui/button';
import { IconRefresh } from '@tabler/icons-react';

export default function InstrumentFilter({ params, setParams, state }) {
    return (
        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
            <Input
                className="w-full sm:w-1/4"
                placeholder="Search..."
                value={params?.search}
                onChange={(e) =>
                    setParams((prev) => ({
                        ...prev,
                        search: e.target.value,
                    }))
                }
            />
            <Select value={params?.load} onValueChange={(e) => setParams({ ...params, load: e })}>
                <SelectTrigger className="w-full sm:w-24">
                    <SelectValue placeholder="load" />
                </SelectTrigger>
                <SelectContent>
                    {[10, 25, 50, 75, 100].map((number, index) => (
                        <SelectItem key={index} value={number}>
                            {number}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button variant="red" onClick={() => setParams(state)} size="xl">
                <IconRefresh className="size-4" />
                Bersihkan
            </Button>
        </div>
    );
}
