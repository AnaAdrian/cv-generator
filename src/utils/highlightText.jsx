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
    // Highlight the first matching substring
    const regex = new RegExp(`(${toMatch})`, "gi");
    const parts = text.split(regex);
    let updated = false;

    return parts.map((part, index) => {
      if (part.toLowerCase() === toMatch.toLowerCase() && !updated) {
        updated = true;
        return <b key={index}>{part}</b>;
      } else return part;
    });
  }
}
