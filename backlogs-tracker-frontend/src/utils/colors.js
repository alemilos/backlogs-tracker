export function hexToRgba(hex, alpha = 1) {
  if (!hex) hex = "#fff";

  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  // Expand shorthand (#rgb) to full form (#rrggbb)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }

  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
