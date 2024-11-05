import { createImage } from "./createImage";

export function loadImage(evt: Event) {
  const target = evt.target as HTMLInputElement;
  const file = target.files?.[0];
  const obj = document.querySelector(
    `#container-${target.id}`,
  ) as HTMLDivElement;
  createImage(file, obj);
}
