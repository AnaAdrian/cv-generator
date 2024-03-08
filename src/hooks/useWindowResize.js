import { useEffect, useState } from "react";

export function useWindowResize(size) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < size);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < size);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [size]);

    return isMobile;
}

