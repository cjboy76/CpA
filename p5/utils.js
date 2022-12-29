function attachOtherBoxes(boxes, currentBoxId , distance = 15) {

  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].id === currentBoxId) continue;
    for (const key of boxes[i].vertex.keys()) {
      let d = dist(...boxes[i]["vertex"][key], mouseX, mouseY);
      if (d <= distance) return [boxes[i], key];
    }
  }
  return [undefined, -1];
  
}

function getNearestVertex(box, distance = 10) {

  for (const key of box.vertex.keys()) {
    let d = dist(...box["vertex"][key], mouseX, mouseY);
    if (d <= distance) return [true, key];
  }
  return [false, -1];
  
}

