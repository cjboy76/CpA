import gradient from "gradient-parser";
import { linearAngleMap } from "../data/LinearAngle";
import { TriangleBox } from "./TriangleBox";

// 1. arg: ctx.createLinearGradient(arg)
// 2. addColorStop length
export function linearConvert(box: TriangleBox, style: string) {
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

  let position = linearSize(box);

  return {
    ...gradientContextArg(Number(angle), position),
    colorStops: converted.colorStops,
  };
}

function parse(style: string) {
  let converted = gradient.parse(style);
  return converted[0];
}

function linearSize(box: TriangleBox) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < box.vertex.length; i++) {
    minX = Math.min(minX, box.vertex[i][0]);
    minY = Math.min(minY, box.vertex[i][1]);
    maxX = Math.max(maxX, box.vertex[i][0]);
    maxY = Math.max(maxY, box.vertex[i][1]);
  }

  return [minX, minY, maxX, maxY];
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
