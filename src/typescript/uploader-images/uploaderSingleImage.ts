/**
 * Para hacer uso de está opcion el input de  tipo file require de los siguiente:
 * Clase llamada "uploader"
 * dataset con los siguiente datos:
 *     "data-upload-route" con la ruta a la cual sera enviado,
 *     "data-upload-key" con el token de api
 *     "data-upload-id" con el  id del usuario logueado
 *
 */

import { addImageByClick } from "./utils/addImageByClick.js";
import { addImageByDrop } from "./utils/addImageByDrop.js";
import { getImage } from "./utils/getImage.js";

const body = document.querySelector("body");
const drawer = document.createElement("canvas");

export default function startUpload(classContainer: string) {
  let rowIterator = 1;
  const uploads = document.querySelectorAll(
    `.uploader-${classContainer}`,
  ) as NodeListOf<HTMLDivElement>;

  drawer.style.display = "none";
  drawer.id = "drawer";
  body?.appendChild(drawer);

  for (const item of uploads) {
    item.insertAdjacentElement(
      "beforebegin",
      getImage({
        route: item.dataset.uploadRoute,
        id: item.id,
        token: item.dataset.uploadKey,
        userId: item.dataset.uploadId,
        name: item.dataset.name,
      }),
    );
    const $parentDiv = document.querySelector(
      `#container-${item.id}`,
    ) as HTMLDivElement;

    $parentDiv?.addEventListener("click", addImageByClick);
    $parentDiv?.addEventListener("drop", addImageByDrop);
    $parentDiv?.addEventListener("dragover", dragOverEvent);
  }

  rowIterator++;
}

function dragOverEvent(evt: DragEvent) {
  evt.preventDefault();
}
