import { TriangleBox } from "./TriangleBox";
import { p5i } from "p5i";

const { dist, mouseX, mouseY } = p5i();

export function attachOtherBoxes(
  boxes: TriangleBox[],
  currentBoxId: string,
  distance = 15
): [TriangleBox | undefined, number] {
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].id === currentBoxId) continue;
    for (const key of boxes[i]["vertex"].keys()) {
      let d = dist(...boxes[i]["vertex"][key], mouseX, mouseY);
      if (d <= distance) return [boxes[i], key];
    }
  }
  return [undefined, -1];
}

export function getNearestVertex(box: TriangleBox, distance = 10) {
  for (const key of box.vertex.keys()) {
    let d = dist(...box["vertex"][key], mouseX, mouseY);
    if (d <= distance) return [true, key];
  }
  return [false, -1];
}
