import { TriangleBox } from "./p5/TriangleBox";
import cloneDeep from "lodash.clonedeep";

export function cloneTriangleboxMap(
  map: Map<string, TriangleBox>
): Map<string, TriangleBox> {
  let newMap = new Map();
  for (let [key, value] of map.entries()) {
    newMap.set(key, cloneDeep(value));
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
