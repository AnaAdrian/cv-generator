export function handleKeyDown(formHandler, setFocus) {
    return function (e, nextFocus) {
        if (e.key === "Enter") {
            e.preventDefault();
            const target = e.target;
            target.blur();
            formHandler();
            nextFocus ? setTimeout(() => setFocus(nextFocus), 0) : null;
        }
    };

}