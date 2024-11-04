import { addImageByClick } from "./utils/addImageByClick.js";
import { addImageByDrop } from "./utils/addImageByDrop.js";
import { getImage } from "./utils/getImage.js";

const drawer = document.createElement("canvas");
drawer.style.display = "none";
drawer.id = "drawer";
document.body.appendChild(drawer);

let rowIterator = 1;

const $inputFile = document.querySelector('input[type="file"]');
const name = $inputFile?.getAttribute("name");

interface StartUploadOptions {
  containerId: string;
  name: string;
}

export default function startUpload({ containerId, name }: StartUploadOptions) {
  const $buttonAdd = document.querySelector(
    `#button-${name}`,
  ) as HTMLButtonElement;
  const uploads = document.querySelectorAll(
    `.uploader-${name}`,
  ) as NodeListOf<HTMLDivElement>;

  for (const item of uploads) {
    item.style.display = "none";
    item.insertAdjacentElement(
      "beforebegin",
      getImage({
        id: item.id,
        name: item.dataset.name,
      }),
    );
    const $parentDiv = document.querySelector(
      `#container-${item.id}`,
    ) as HTMLDivElement;
    $parentDiv.addEventListener("click", addImageByClick);
    $parentDiv.addEventListener("drop", addImageByDrop);
    $parentDiv.addEventListener("dragover", dragOverEvent);
  }

  $buttonAdd.addEventListener("click", function () {
    add({ containerId });
  });
}

interface AddOptions {
  containerId: string;
}

function add({ containerId }: AddOptions) {
  rowIterator++;
  const content = `
        <div id="row-${containerId}-${rowIterator}"
            >
            <input
                type="file" 
                id="multi-${containerId}-${rowIterator}"
                name="${name}" 
                class="uploader" 
            />
            <div class="container-button-add">
                <span 
                    class="delete-photo"
                    data-target="row-${containerId}-${rowIterator}"
                    id='delete-${rowIterator}'
                ><i class="bi bi-x"></i>
                </span>
            </div>
        </div>`;

  const containerPhoto = document.querySelector(
    `#contain-${containerId}`,
  ) as HTMLDivElement;
  const lastChild = containerPhoto.children.length - 1;
  containerPhoto.children
    .item(lastChild)
    ?.insertAdjacentHTML("afterend", content);
  const newRow = document.getElementById(
    `multi-${containerId}-${rowIterator}`,
  ) as HTMLDivElement;

  newRow.style.display = "none";
  newRow.insertAdjacentElement(
    "beforebegin",
    getImage({
      id: newRow.id,
      name: newRow.dataset.name,
    }),
  );
  const $parentRowDiv = document.querySelector(
    `#container-${newRow.id}`,
  ) as HTMLDivElement;
  $parentRowDiv.addEventListener("click", addImageByClick);
  $parentRowDiv.addEventListener("drop", addImageByDrop);
  $parentRowDiv.addEventListener("dragover", dragOverEvent);

  const $btnDelete = document.querySelector(
    `#delete-${rowIterator}`,
  ) as HTMLSpanElement;

  $btnDelete?.addEventListener("click", quit);
}

function quit(evt: MouseEvent) {
  const target = evt.target as HTMLSpanElement;

  const divParent = target.closest("div");

  const divContainer = divParent?.parentElement;

  rowIterator--;
  divContainer?.remove();
}

function dragOverEvent(evt: DragEvent) {
  evt.preventDefault();
}
