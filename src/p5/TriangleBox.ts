export type TDot = [number, number];
export type TDots = [number, number, number, number, number, number];

export class TriangleBox {
  id: string;
  name: string;
  pointMap: Record<string, TDot> = {};
  vertex: TDot[] = [];
  dots!: TDots;
  hovered: boolean = false;
  onDraft: boolean = true;

  constructor(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number
  ) {
    this.id = new Date().toISOString();
    this.name = Math.random().toString(36).substring(2, 9);
    this.init(x1, y1, x2, y2, x3, y3);
  }

  updateDot(index: number, { x, y }: Record<string, number>) {
    this.pointMap[index] = [x, y];
    this.vertex[index] = this.pointMap[index];
    this.dots[index * 2] = x;
    this.dots[index * 2 + 1] = y;
  }

  updateDots(vectorX: number, vectorY: number) {
    let [x1, y1, x2, y2, x3, y3] = this.dots;
    this.init(
      x1 + vectorX,
      y1 + vectorY,
      x2 + vectorX,
      y2 + vectorY,
      x3 + vectorX,
      y3 + vectorY
    );
  }

  init(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    this.pointMap[0] = [x1, y1];
    this.pointMap[1] = [x2, y2];
    this.pointMap[2] = [x3, y3];
    this.vertex = [this.pointMap[0], this.pointMap[1], this.pointMap[2]];
    this.dots = [x1, y1, x2, y2, x3, y3];
  }
}
