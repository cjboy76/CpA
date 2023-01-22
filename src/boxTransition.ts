import { TriangleBox } from "./p5/TriangleBox";

type TFrame = {
  image: string;
  frameBoxes: TriangleBox[];
  frameWidth: number;
  frameHeight: number;
};

export function frameConvert({ frameBoxes, frameWidth, frameHeight }: TFrame) {
  let frameboxes = [];
  for (let i = 0; i < frameBoxes.length; i++) {
    let box = frameBoxes[i];
    let converted = convertVertex(box);
    frameboxes.push(converted);
  }

  return frameboxes;

  function convertVertex(box: TriangleBox) {
    let vertex = box.vertex;
    let output = [];
    for (let i = 0; i < vertex.length; i++) {
      let [x, y] = vertex[i];
      output.push(convertRect(x, y));
    }

    return output;
  }

  function convertRect(x: number, y: number) {
    return [(x / frameWidth) * 100, (y / frameHeight) * 100];
  }
}
