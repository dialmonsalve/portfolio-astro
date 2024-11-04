import { createImage } from "./createImage.js";

export function loadImage(evt: Event) {
  console.log("click");
  const target = evt.target as HTMLInputElement;
  const file = target.files?.[0];
  const obj = document.querySelector(
    `#container-${target.id}`,
  ) as HTMLDivElement;
  createImage(file, obj);
}
