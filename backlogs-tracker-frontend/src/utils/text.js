export function shortenText(text, maxLength) {
  if (!text || !maxLength) return;
  if (text.length > maxLength) return text.slice(0, maxLength - 3) + "...";
  return text;
}

/**
 * Create a "hacker" style animation to characters on the input element
 * @param {*} el the element with text
 */
export function hackerTextOld(el) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let iterations = 0;
  let text = el.innerText;
  const interval = setInterval(() => {
    el.innerText = text
      .split("")
      .map((letter, index) => {
        function upperOrLower(current, original) {
          if (original.toUpperCase() === original) {
            return current.toUpperCase();
          }
          return current.toLowerCase();
        }

        if (index < iterations || letter === " ") return letter;

        return upperOrLower(letters[Math.floor(Math.random() * 26)], letter);
      })
      .join("");

    if (iterations >= text.length) clearInterval(interval);
    iterations += 1 / 3;
  }, 1);
}

export function hackerText(el) {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:',.<>?";
  let iterations = 0;
  const text = el.innerText;

  if (!text) return; // handle empty text

  const interval = setInterval(() => {
    el.innerText = text
      .split("")
      .map((letter, index) => {
        // leave spaces or non-alphabetic characters as-is
        if (!/[a-zA-Z]/.test(letter) || index < iterations) return letter;

        // random letter, preserve original case
        const randomChar = letters[Math.floor(Math.random() * letters.length)];
        return letter === letter.toUpperCase()
          ? randomChar.toUpperCase()
          : randomChar.toLowerCase();
      })
      .join("");

    if (iterations >= text.length) clearInterval(interval);
    iterations += 3;
  }, 10); // slightly slower for readability
}
