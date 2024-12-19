import { router } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

export function useFilter({ IconRouteScan, Values, only, wait = 300, route }) {
    const prevValuesRef = useRef(Values); // Menyimpan nilai sebelumnya
    const reload = useCallback(
        debounce((query) => {
            router.get(route, pickBy(query), {
                only: only,
                preserveState: true,
                preserveScroll: true,
            });
        }, wait),
        [only, wait, route],
    );

    // Mengecek perubahan nilai search dan memanggil reload jika ada perubahan
    useEffect(() => {
        if (JSON.stringify(prevValuesRef.current) !== JSON.stringify(Values)) {
            reload(Values);
            prevValuesRef.current = Values; // Update nilai sebelumnya
        }
    }, [Values, reload]);

    return { Values };
}
