import { useEffect, useRef } from "react";

export function useOutsideClick(handler, except, listenOnCapture = true) {

    const ref = useRef();

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (except && except.current && except.current.contains(e.target)) {
                return;
            }
            if (ref.current && !ref.current.contains(e.target)) {
                handler();
            }
        };
        document.addEventListener("click", handleOutsideClick, listenOnCapture);
        return () =>
            document.removeEventListener("click", handleOutsideClick, listenOnCapture);
    }, [handler, listenOnCapture, except]);

    return ref;
}

