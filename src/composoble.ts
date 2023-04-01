import { TriangleBox } from "./p5/TriangleBox";

export function cloneTriangleboxMap(
  map: Map<string, TriangleBox>
): Map<string, TriangleBox> {
  let newMap = new Map();
  for (let [key, value] of map.entries()) {
    let clone = Object.assign(
      Object.create(Object.getPrototypeOf(value)),
      value
    );

    newMap.set(key, clone);
  }

  return newMap;
}

export function generateOTID() {
  const digits = "#$%&!@_+1234567890";
  let OTID = "";

  for (let i = 0; i <= 8; i++) {
    OTID += digits[Math.floor(Math.random() * (digits.length - 1))];
  }

  return OTID;
}
