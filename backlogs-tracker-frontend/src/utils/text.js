export function shortenText(text, maxLength) {
  if (!text || !maxLength) return;
  if (text.length > maxLength) return text.slice(0, maxLength - 3) + "...";
  return text;
}
