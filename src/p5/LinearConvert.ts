import gradient from "gradient-parser";

export function linearConvert(style: string) {
  if (!style.startsWith("linear")) return style;
  return gradient.parse(style);
}
