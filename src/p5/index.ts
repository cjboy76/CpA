import { p5i } from "p5i";
import { TriangleBox } from "./TriangleBox";
import { ref, reactive } from "vue";
import { BoxStore } from "../store";

const p5State = reactive({
  boxes: [],
  detachBox: undefined,
  detachIndex: undefined,
  hoveredBox: undefined,
  grabbing: false,
  grabbingItem: undefined,
});

let boxes: TriangleBox[] = [];
let detachBox: any;
let detachIndex: any;
let hoveredBox: any;
let grabbing = false;
let grabbingItem: any;
const save = ref(false);
const cnv = ref();

const p5sketch = p5i(() => {
  return {
    setup({ createCanvas }) {
      let mountElement = document.querySelector("#sketch-holder");
      let height = mountElement?.clientHeight;
      let width = mountElement?.clientWidth;
      cnv.value = createCanvas(width || 1000, height || 1000);
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
    }) {
      background(220);
      hoveredBox = undefined;

      for (const box of BoxStore.boxes) {
        // Draw boxes
        drawTriangle(box);
        // Detect mouseover boxes and change borders color
        box.hovered = collidePointTriangle(mouseX, mouseY, ...box.dots);
        if (box.hovered) hoveredBox = box;
      }

      // Cursor style
      if (grabbing) {
        cursor("grabbing");
      } else if (detachBox && !grabbing) {
        cursor("grab");
      } else {
        cursor("default");
      }

      // Grab and dragging box or box's vertex
      if (grabbing) {
        // What we grabbing now is a vertex of a box
        if (detachBox) {
          grabbingItem.updateDot(detachIndex, { x: mouseX, y: mouseY });

          // Detect is there any box's vertex nearby.
          let [attached, attachDotIndex] = attachOtherBoxes(
            boxes,
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
        stroke(borderColor);
        strokeWeight(1);

        triangle(...box.dots);
        if (box.onDraft) {
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

export { p5sketch, boxes, cnv, save, p5State };
