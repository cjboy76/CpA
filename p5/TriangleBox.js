class TriangleBox {
  constructor(x1, y1, x2, y2, x3, y3) {
    this.id = new Date().toISOString();
    this.pointMap = {};
    this.vertex = [];
    this.dots = [];
    this.init(x1, y1, x2, y2, x3, y3);
    this.hovered = false;
    this.onDraft = true;
  }

  draw() {
    let borderColor = this.hovered ? "red" : "black";
    stroke(borderColor);
    strokeWeight(1);

    triangle(...this.dots);
    if (this.onDraft) {
      circle(...this.pointMap[0], 5);
      circle(...this.pointMap[1], 5);
      circle(...this.pointMap[2], 5);
    }
  }

  updateDot(index, { x, y }) {
    this.pointMap[index] = [x, y];
    this.vertex[index] = this.pointMap[index];
    this.dots[index * 2] = x;
    this.dots[index * 2 + 1] = y;
  }

  updateDots(vectorX, vectorY) {
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

  init(x1, y1, x2, y2, x3, y3) {
    this.pointMap[0] = [x1, y1];
    this.pointMap[1] = [x2, y2];
    this.pointMap[2] = [x3, y3];
    this.vertex = [this.pointMap[0], this.pointMap[1], this.pointMap[2]];
    this.dots = [x1, y1, x2, y2, x3, y3];
  }
}
