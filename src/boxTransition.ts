import { TriangleBox } from "./p5/TriangleBox";

type TFrame = {
  image: string;
  frameBoxes: TriangleBox[];
  frameWidth: number;
  frameHeight: number;
};

type TCoordinate = {
  x: number;
  y: number;
};

export type TConvertedBoxes = [TCoordinate, TCoordinate, TCoordinate];
/**
 *
 * 回傳截圖內所有三角形轉換後座標
 */
export function framesConverter({
  frameBoxes,
  frameWidth,
  frameHeight,
}: TFrame): TConvertedBoxes[] {
  let boxInfoPerFrame = [];
  for (let i = 0; i < frameBoxes.length; i++) {
    let box = frameBoxes[i];
    let converted = convertVertex(box);
    boxInfoPerFrame.push(converted);
  }

  return boxInfoPerFrame;

  function convertVertex(box: TriangleBox) {
    let output: any[] = [];
    box.vertex.forEach((v) => {
      let [x, y] = v;
      output.push(convertRect(x, y));
    });

    return output as TConvertedBoxes;
  }

  function convertRect(x: number, y: number) {
    return {
      x: (x / frameWidth) * 100,
      y: (y / frameHeight) * 100,
    };
  }
}
