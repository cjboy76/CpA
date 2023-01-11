import gradient from "gradient-parser";
import { linearAngleMap } from "../data/LinearAngle";

// 1. arg: ctx.createLinearGradient(arg)
// 2. addColorStop length
export function linearConvert(position: number[], style: string) {
  let converted = parse(style);
  let angle;
  if (
    converted.type === "repeating-linear-gradient" ||
    converted.type === "linear-gradient"
  ) {
    angle =
      converted.orientation!.type === "directional"
        ? linearAngleMap[converted.orientation!.value]
        : converted.orientation!.value;
  }

  return {
    ...gradientContextArg(Number(angle), position),
    colorStops: converted.colorStops,
  };
}

function parse(style: string) {
  let converted = gradient.parse(style);
  return converted[0];
}

function gradientContextArg(angle: number, position: number[]) {
  let [x1, y1, x2, y2] = position;
  x2 = x2 * Math.cos(angle);
  y2 = y2 * Math.sin(angle);

  return {
    angle: (angle * Math.PI) / 180,
    linearContext: [x1, y1, x2, y2],
  };
}
