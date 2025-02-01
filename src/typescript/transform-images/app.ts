import { addImageByClick } from "./utils/addImageByClick";
import { addImageByDrop } from "./utils/addImageByDrop";

const body = document.querySelector("body");
const drawer = document.createElement("canvas");

document.addEventListener ("astro:page-load", () => {
  const uploads = document.querySelectorAll(
    `.uploader-image`,
  ) as NodeListOf<HTMLDivElement>;
  drawer.style.display = "none";
  drawer.id = "drawer";
  body?.appendChild(drawer);

  for (const item of uploads) {
    const $parentDiv = document.querySelector(
      `#container-${item.id}`,
    ) as HTMLDivElement;

    $parentDiv?.addEventListener("click", addImageByClick);
    $parentDiv?.addEventListener("drop", addImageByDrop);
    $parentDiv?.addEventListener("dragover", dragOverEvent);
  }
});

function dragOverEvent(evt: DragEvent) {
  evt.preventDefault();
}
