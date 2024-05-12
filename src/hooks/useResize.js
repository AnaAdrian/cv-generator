import { useState, useEffect } from 'react';

export function useResize(size) {
    const [condition, setCondition] = useState(window.innerWidth < size);

    useEffect(() => {
        const handleResize = () => {
            setCondition(window.innerWidth < size);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [size]);

    return condition;
}