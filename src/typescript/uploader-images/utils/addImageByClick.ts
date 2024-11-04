import { loadImage } from "./loadImage.js";

export function addImageByClick(evt: MouseEvent) {
  evt.stopPropagation();
  const target = evt.target as HTMLInputElement;
  const id = target.dataset.skTarget;
  const obj = document.querySelector(`#${id}`) as HTMLInputElement;

  obj?.addEventListener("change", loadImage);
  obj?.click();
}
