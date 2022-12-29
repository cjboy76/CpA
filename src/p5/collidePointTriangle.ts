import { p5i } from "p5i";

const { abs } = p5i();

export function collidePointTriangle(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) {
  // get the area of the triangle
  let areaOrig = abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));

  // get the area of 3 triangles made between the point and the corners of the triangle
  let area1 = abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
  let area2 = abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
  let area3 = abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));

  // if the sum of the three areas equals the original, we're inside the triangle!
  if (area1 + area2 + area3 === areaOrig) {
    return true;
  }
  return false;
}
