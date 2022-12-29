const appendButton = document.querySelector("#appendNewBox");
const saveAsImage = document.querySelector("#saveAsImage");

appendButton.addEventListener("click", () => {
  boxes.push(new TriangleBox(30, 75, 58, 20, 86, 75));
});

saveAsImage.addEventListener("click", () => {
  boxes.forEach((b) => (b.onDraft = false));
  setTimeout(() => {
    saveCanvas(cnv, "myCanvas", "jpg")
  }, 1000)
});
