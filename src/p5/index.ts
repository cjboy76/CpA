import { p5i } from "p5i";
import { TriangleBox } from "./TriangleBox";
import { reactive, ref, Ref } from "vue";
import { BoxStore } from "../store";

let detachBox: any;
let detachIndex: any;
let hoveredBox: any;
let grabbing = false;
let grabbingItem: any;
const save = ref(false);
const cnv = ref();
export const isZooming = ref(false);
export const scaleSize = ref(1);
let cnvHeight: number;
let cnvWidth: number;
const defaultColumnWidth = 50;
let backgroundState = reactive({
  defaultGap: 50,
  x: 0,
  y: 0,
  update(vectorx: number, vectory: number) {
    this.x += vectorx;
    if (this.x > this.defaultGap || this.x < this.defaultGap * -1) this.x = 0;
    this.y += vectory;
    if (this.y > this.defaultGap || this.y < this.defaultGap * -1) this.y = 0;
  },
});

const p5sketch = p5i(() => {
  return {
    setup({ createCanvas }) {
      let mountElement = document.querySelector("#sketch-holder");
      cnvHeight = mountElement?.clientHeight || 1000;
      cnvWidth = mountElement?.clientWidth || 1000;
      cnv.value = createCanvas(cnvWidth, cnvHeight);
    },

    draw({
      background,
      mouseX,
      mouseY,
      pmouseX,
      pmouseY,
      cursor,
      stroke,
      strokeWeight,
      triangle,
      circle,
      abs,
      dist,
      saveCanvas,
      fill,
      mouseIsPressed,
      line,
    }) {
      background("white");

      hoveredBox = undefined;

      // Cursor style
      if (grabbing) {
        cursor("grabbing");
      } else if (detachBox && !grabbing) {
        cursor("grab");
      } else {
        cursor("default");
      }

      // Dragging canvas
      if (mouseIsPressed && !grabbing && !grabbingItem) {
        let dirX = mouseX - pmouseX;
        let dirY = mouseY - pmouseY;
        for (const box of BoxStore.boxes) {
          box.updateDots(dirX, dirY);
        }
        backgroundState.update(dirX, dirY);
      }

      // Grab and dragging box or box's vertex
      if (grabbing) {
        // What we grabbing now is a vertex of a box
        if (detachBox) {
          grabbingItem.updateDot(detachIndex, { x: mouseX, y: mouseY });

          // Detect is there any box's vertex nearby.
          let [attached, attachDotIndex] = attachOtherBoxes(
            BoxStore.boxes,
            grabbingItem.id,
            mouseX,
            mouseY
          );
          // if grabbingItem is close enough to other box's vertex, attach it.
          if (attached) {
            let [attachedX, attachedY] = attached["vertex"][attachDotIndex];
            grabbingItem.updateDot(detachIndex, { x: attachedX, y: attachedY });
          }

          // What we grabbing now is a box, not a vertex of a box
        } else {
          grabbingItem.updateDots(mouseX - pmouseX, mouseY - pmouseY);
        }
      }

      cnv.value.mouseMoved(() => {
        if (!grabbing) {
          if (hoveredBox) {
            let [onVertex, index] = getNearestVertex(
              hoveredBox,
              mouseX,
              mouseY
            );

            if (onVertex) {
              detachBox = hoveredBox;
              detachIndex = index;
            } else {
              detachBox = undefined;
              detachIndex = -1;
            }
          } else {
            detachBox = undefined;
          }
        }
      });

      cnv.value.mouseReleased(() => {
        grabbing = false;
        grabbingItem = undefined;
        detachBox = undefined;
      });

      cnv.value.mousePressed(() => {
        grabbing = !!detachBox || !!hoveredBox;
        grabbingItem = detachBox || hoveredBox;
      });

      cnv.value.mouseWheel((e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          if (scaleSize.value > 1.9) return;
          scaleSize.value += 0.05;
        } else {
          if (scaleSize.value < 0.2) return;
          scaleSize.value += -0.05;
        }
      });
      backgroundState.defaultGap = defaultColumnWidth * scaleSize.value;

      // Background grid columns
      for (
        let startX = backgroundState.x;
        startX < cnvWidth;
        startX += backgroundState.defaultGap
      ) {
        for (
          let startY = backgroundState.y;
          startY < cnvHeight;
          startY += backgroundState.defaultGap
        ) {
          stroke(240);
          strokeWeight(1);
          line(startX, 0, startX, cnvHeight);
          line(0, startY, cnvWidth, startY);
        }
      }

      for (const box of BoxStore.boxes) {
        // Draw boxes
        drawTriangle(box);
        // Detect mouseover boxes and change borders color
        box.hovered = collidePointTriangle(mouseX, mouseY, ...box.dots);
        if (box.hovered) hoveredBox = box;
      }

      // Save image
      if (save.value) {
        saveCanvas(cnv.value, "myCanvas");
        save.value = false;
      }

      function getNearestVertex(
        box: TriangleBox,
        mouseX: number,
        mouseY: number,
        distance = 10
      ) {
        for (const key of box.vertex.keys()) {
          let d = dist(...box["vertex"][key], mouseX, mouseY);
          if (d <= distance) return [true, key];
        }
        return [false, -1];
      }

      function drawTriangle(box: TriangleBox) {
        let borderColor = box.hovered ? "red" : "black";
        fill(box.color);
        stroke(borderColor);
        strokeWeight(1);

        triangle(...box.dots);
        if (box.onDraft) {
          fill(255, 255, 255);

          circle(...box.pointMap[0], 5);
          circle(...box.pointMap[1], 5);
          circle(...box.pointMap[2], 5);
        }
      }

      function collidePointTriangle(
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

      function attachOtherBoxes(
        boxes: TriangleBox[],
        currentBoxId: string,
        mouseX: number,
        mouseY: number,
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
    },
  };
});

export { p5sketch, cnv, save };
