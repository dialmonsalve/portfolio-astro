import { getUUID } from "./getUUID";
import { reset } from "./reset";
import { values } from "./changeValues.ts";
import { downloadImage } from "./downloadImage.ts";

const drawer = document.createElement("canvas");
drawer.style.display = "none";
drawer.id = "drawer";
document.body.appendChild(drawer);

type CreateFile = File | null | undefined;
type Parent = HTMLDivElement | null;

export function createImage(file: CreateFile, parent: Parent) {
  if (!file) return;

  const { quality, format } = values();

  const $divParent = document.querySelector(".section-images");
  const $divImage = document.querySelector("#card-image") as HTMLDivElement;

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
        const typeOption = format || "jpeg";
        const webpImage = new File([blob], UUID, {
          type: `image/${typeOption}`,
        });
        const inputText = parent?.querySelector(
          "#input-image",
        ) as HTMLInputElement;

        inputText.textContent =
          UUID + "." + webpImage.type.replace("image/", "");
        const urlObj = URL.createObjectURL(webpImage);
        const image = document.createElement("img");
        const label = document.createElement("label");
        const $buttonDownload = document.createElement("button");
        image.width = 100;
        image.height = 100;
        image.src = urlObj;
        image.alt = UUID;
        image.id = "converted-image";
        image.classList.add("image");
        label.innerText = "Click image to delete";
        label.classList.add("label-reset-image");
        label.addEventListener("click", reset);

        image.addEventListener("click", reset);
        image.setAttribute("data-name", `${UUID}.${format}`);
        parent?.querySelector("svg")?.replaceWith(label, image);

        $buttonDownload.textContent = "download";
        $buttonDownload.addEventListener("click", downloadImage);
        $buttonDownload.id = "download-image";
        $buttonDownload.classList.add("btn-download-image");
        $divParent?.insertBefore($buttonDownload, $divImage);
      },
      "image/jpeg",
      quality,
    );
    ctx?.reset();
  });
}
