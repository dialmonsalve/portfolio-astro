import { getUUID } from "./getUUID.js";
import { reset } from "./reset.js";

const drawer = document.createElement("canvas");
drawer.style.display = "none";
drawer.id = "drawer";
document.body.appendChild(drawer);

type CreateFile = File | null | undefined;
type Parent = HTMLDivElement | null;

export function createImage(file: CreateFile, parent: Parent) {
  if (!file) return;
  createImageBitmap(file, {
    resizeQuality: "high",
    premultiplyAlpha: "premultiply",
    imageOrientation: "none",
  }).then((img) => {
    drawer.height = img.height;
    drawer.width = img.width;
    const ctx = drawer.getContext("2d");
    ctx?.drawImage(img, 0, 0, img.width, img.height);
    drawer.toBlob(
      (blob) => {
        if (!blob) return;
        const UUID = getUUID();
        const webpImage = new File([blob], UUID, { type: "image/webp" });

        const inputText = parent?.querySelector(
          'input[type="text"]',
        ) as HTMLInputElement;

        inputText.value = UUID + "." + webpImage.type.replace("image/", "");
        const urlObj = URL.createObjectURL(webpImage);
        const image = document.createElement("img");
        const label = document.createElement("label");
        image.width = 100;
        image.height = 100;
        image.src = urlObj;
        image.alt = UUID;
        image.classList.add("image");
        label.innerText = "Click image to delete";
        label.classList.add("label-reset-image");
        image.addEventListener("click", reset);
        parent?.querySelector("svg")?.replaceWith(label, image);
      },
      "image/webp",
      0.95,
    );

    ctx?.reset();
  });
}
