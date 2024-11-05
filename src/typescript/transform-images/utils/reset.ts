import { addImageByClick } from "./addImageByClick";
import { addImageByDrop } from "./addImageByDrop";
import { getImage } from "./getImage";

export function reset(evt: MouseEvent) {
  evt.stopPropagation();
  const target = evt.target as HTMLDivElement;
  const parent = target.parentNode as HTMLDivElement;
  const inputText = parent.querySelector("#input-image") as HTMLInputElement;
  const $buttonDownLoad = document.querySelector("#download-image");
  if ($buttonDownLoad) $buttonDownLoad.remove();
  inputText.style.background = "transparent";
  const id = parent.dataset.target!;
  const elem = getImage({ id });
  console.log(elem);
  elem.addEventListener("click", addImageByClick);
  elem.addEventListener("drop", addImageByDrop);
  elem.addEventListener("dragover", dragOverEvent);
  parent.replaceWith(elem);
  inputText.textContent = "";
}

function dragOverEvent(evt: DragEvent) {
  evt.preventDefault();
}
