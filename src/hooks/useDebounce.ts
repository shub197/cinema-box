import { useState, useEffect, useRef } from 'react';
import { useSearch } from '@/contexts/SearchContext';

function useDebounce(delay: number) {
    const [debouncedValue, setDebouncedValue] = useState<string | null>();
    const previousDebouncedValue = useRef<string | null>(null);
    const { searchValue } = useSearch();

    useEffect(() => {
        let debouncedHandler: ReturnType<typeof setTimeout>;

        if (searchValue) {
            debouncedHandler = setTimeout(() => {
                previousDebouncedValue.current = searchValue;
                setDebouncedValue(searchValue);
            }, delay)
        } else {
            if (previousDebouncedValue.current) setDebouncedValue(null);
        }

        return () => {
            clearTimeout(debouncedHandler);
        }
    }, [searchValue]);

    return debouncedValue;
}

export default useDebounce;