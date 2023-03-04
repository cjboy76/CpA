import { TriangleBox } from "./p5/TriangleBox";
import { reactive } from "vue";

export let BoxStore: Store;

type TFrameCanvas = {
  id: string;
  image: string;
  frameBoxes: Map<string, TriangleBox>;
  frameWidth: number;
  frameHeight: number;
};
export let FramesStore: Map<string, TFrameCanvas>;

class Store {
  boxesMap: Map<string, TriangleBox> = new Map();
  boxes: TriangleBox[] = [];

  createBox() {
    let newBox = new TriangleBox(30, 95, 58, 40, 86, 95);
    this.boxesMap.set(newBox.id, newBox);
    this.formatMap();
    return newBox;
  }

  getBox(id: string) {
    return this.boxesMap.get(id);
  }

  updateBox(box: TriangleBox) {
    this.boxesMap.set(box.id, box);
    return this.boxesMap;
  }

  clear() {
    this.boxesMap.clear();
    this.formatMap();
  }

  removeBox(id: string) {
    this.boxesMap.delete(id);
    this.formatMap();
  }

  formatMap() {
    this.boxes = Array.from(this.boxesMap, ([name, value]) => value);
  }

  setBoxColor(id: string, color: string) {
    if (!this.boxesMap.has(id)) return;
    let box = this.boxesMap.get(id);
    box?.setColor(color);
    this.formatMap();
  }

  restore(newMap: Map<string, TriangleBox>) {
    this.boxesMap = newMap;
    this.formatMap();
    return this.boxes;
  }
}

function createStore() {
  if (BoxStore) return BoxStore;
  let instance = new Store();
  BoxStore = reactive(instance);
  return BoxStore;
}

createStore();

function createFrames() {
  if (FramesStore) return FramesStore;
  FramesStore = reactive(new Map());
  return FramesStore;
}

createFrames();
