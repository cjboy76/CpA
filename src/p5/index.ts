import { p5i } from "p5i";
import { TriangleBox } from "./TriangleBox";
import { getNearestVertex, attachOtherBoxes } from "./collision";
import { collidePointTriangle } from "./collidePointTriangle";

let { mouseX, mouseY, cursor, pmouseX, pmouseY } = p5i();
let cnv: any;
let boxes: TriangleBox[];
let detachBox: any;
let detachIndex: any;
let hoveredBox: any;
let grabbing = false;
let grabbingItem: any;

const sketch = p5i(() => {
  return {
    setup({ createCanvas }) {
      cnv = createCanvas(600, 600);
      cnv.parent("sketch-holder");

      boxes.push(new TriangleBox(30, 75, 58, 20, 86, 75));

      cnv.mouseMoved(() => {
        if (!grabbing) {
          if (hoveredBox) {
            let [onVertex, index] = getNearestVertex(hoveredBox);
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

      cnv.mouseReleased(() => {
        grabbing = false;
        grabbingItem = undefined;
        detachBox = undefined;
      });

      cnv.mousePressed(() => {
        grabbing = !!detachBox || !!hoveredBox;
        grabbingItem = detachBox || hoveredBox;
      });
    },

    draw({ background }) {
      background(220);
      hoveredBox = undefined;

      for (const box of boxes) {
        // Draw boxes
        box.draw();
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

          // Detect is there any box's vertex nearby, if there is, attach it.
          let [attached, attachDotIndex] = attachOtherBoxes(
            boxes,
            grabbingItem.id
          );
          if (attached) {
            let [attachedX, attachedY] = attached["vertex"][attachDotIndex];
            mouseX = attachedX;
            mouseY = attachedY;
          }

          // What we grabbing now is a box, not a vertex of a box
        } else {
          grabbingItem.updateDots(mouseX - pmouseX, mouseY - pmouseY);
        }
      }
    },
  };
});

export function initP5(el: HTMLElement) {
  return () => {
    sketch.mount(el);
  };
}
