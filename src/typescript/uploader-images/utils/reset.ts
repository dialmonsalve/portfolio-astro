import { addImageByClick } from "./addImageByClick.js";
import { addImageByDrop } from "./addImageByDrop.js";
import { getImage } from "./getImage.js";

export function reset(evt: MouseEvent) {
  evt.stopPropagation();
  const target = evt.target as HTMLDivElement;
  const parent = target.parentNode as HTMLDivElement;
  const inputText = parent.querySelector(
    'input[type="text"]',
  ) as HTMLInputElement;
  inputText.style.background = "transparent";
  const id = parent.dataset.target!;
  const elem = getImage({ id });
  elem.addEventListener("click", addImageByClick);
  elem.addEventListener("drop", addImageByDrop);
  elem.addEventListener("dragover", dragOverEvent);
  parent.replaceWith(elem);
  inputText.value = "";
}

function dragOverEvent(evt: DragEvent) {
  evt.preventDefault();
}
