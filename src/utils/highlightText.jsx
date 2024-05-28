export function highlightText(text, toMatch) {
    if (!toMatch) return text;

    // Highlight the first character if it matches
    if (toMatch.length === 1) {
        const firstLetter = text.toLowerCase()[0];
        if (firstLetter === toMatch.toLowerCase()) {
            return (
                <>
                    <b>{text[0]}</b>
                    {text.slice(1)}
                </>
            );
        } else {
            return text;
        }
    } else {
        // Highlight all consecutive matching characters
        const regex = new RegExp(`(${toMatch})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) =>
            part.toLowerCase() === toMatch.toLowerCase() ? (
                <b key={index}>{part}</b>
            ) : (
                part
            ),
        );
    }
}