export function onPressEnter(e, ref, setFocus, nextFocus) {
    if (e.key === "Enter") {
        e.preventDefault();
        e.target.blur();
        ref.current.click();
        nextFocus ? setTimeout(() => setFocus(nextFocus), 0) : null;
    }
}