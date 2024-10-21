/**
 * Para hacer uso de está opcion el input de  tipo file require de los siguiente:
 * Clase llamada "uploader"
 * dataset con los siguiente datos:
 *     "data-upload-route" con la ruta a la cual sera enviado,
 *     "data-upload-key" con el token de api
 *     "data-upload-id" con el  id del usuario logueado
 *
 */

import modal from "../components/modal";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $$ = (selector: string) => doc.querySelectorAll(selector);

const body = $("body") as HTMLBodyElement;
const drawer = document.createElement("canvas");

interface GetImage {
    id?: string;
    route?: string;
    token?: string;
    userId?: string
}

interface CreateImage {
    file?: File;
    parent: HTMLElement | null
}

interface GenerateWebp {
    blob: File,
    route?: string;
    id?: string;
    token?: string;
    userId?: string;
}

export default function startUpload(classContainer: string) {
    let rowIterator = 1;
    const $inputUploader = $$(`.uploader-${classContainer}`) as NodeListOf<HTMLInputElement>;

    drawer.style.display = "none";
    drawer.id = "drawer";
    body.appendChild(drawer);

    for (let item of $inputUploader) {
        const $parentContainer = $(`#container-${item.id}`) as HTMLDivElement;

        item.insertAdjacentHTML(
            "beforebegin",
            getImage({
                id: item.id,
                route: item.dataset.uploadRoute,
                token: item.dataset.uploadKey,
                userId: item.dataset.uploadId,
            }
            )
        );
        $parentContainer?.addEventListener("click", addImageByClick);
        $parentContainer?.addEventListener("drop", addImageByDrop);
        $parentContainer?.addEventListener("dragover", dragOverEvent);
    }

    rowIterator++;
}

function createImage(createImageProps: CreateImage) {
    const { file, parent } = createImageProps
    const uploadRoute = parent?.dataset.uploadRoute;
    const token = parent?.dataset.uploadKey;
    const userId = parent?.dataset.uploadId;
    if (!file) return
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
                const UUID = getUUID();
                if (!blob) return;
                const webpImage = new File([blob], UUID, { type: "image/webp" });
                generateWebp({ blob: webpImage, route: uploadRoute, id: parent?.id, token, userId });
                const inputText = parent?.querySelector('input[type="text"]') as HTMLInputElement;;

                inputText.value =
                    UUID + "." + webpImage.type.replace("image/", "");
                const urlObj = URL.createObjectURL(webpImage);
                const image = document.createElement("img");
                const label = document.createElement("label")
                image.width = 100;
                image.height = 100;
                image.src = urlObj;
                image.alt = UUID;
                image.classList.add('image')
                label.innerText = "Click image to delete"
                label.classList.add('label-reset-image')
                image.addEventListener("click", reset);
                parent?.querySelector("svg")?.replaceWith(label, image);
            },
            "image/webp",
            0.95
        );

        ctx?.reset();
    });
}

function generateWebp(generateWebpProps: GenerateWebp) {
    const { blob, id, route, token, userId } = generateWebpProps;

    let loadImageWorker = null;
    if (window.Worker) {
        loadImageWorker = new Worker("/js/workers/loadImage.js");
    }

    if (loadImageWorker == null) {
        modal({
            title: "functionality not support for this browser.",
            type: "red",
            content: () => {
                const $parent = doc.createElement('div');
                const $paragraph = doc.createElement('p');
                $paragraph.textContent = "error al cargar imagen";

                $parent.appendChild($paragraph);

                return $parent
            },
        });
        return;
    }

    loadImageWorker.postMessage({
        img: blob,
        route: route,
        id,
        token,
        userId,
    });

    loadImageWorker.onmessage = (evt) => {
        const parent = $(`#${evt.data.id}`) as HTMLDivElement;
        if (evt.data.status == 200) {
            const inputText = parent?.querySelector('input[type="text"]') as HTMLInputElement;
            const container = $(`#${evt.data.id.replace("container-", "")}`) as HTMLInputElement
            container.value = "";
            inputText.style.background = "#A8F0A8";
        } else {
            modal({
                title: "error al cargar imagen",
                type: "red",
                content: () => {
                    const $parent = doc.createElement('div');
                    const $paragraph = doc.createElement('p');
                    $paragraph.textContent = "error al cargar imagen";

                    $parent.appendChild($paragraph);

                    return $parent
                },
            });
        }
    };
}

function addImageByClick(evt: MouseEvent) {
    evt.stopPropagation();
    const target = evt.target as HTMLButtonElement
    const id = target.dataset.skTarget;
    let obj = $(`#${id}`) as HTMLInputElement;
    obj?.addEventListener("change", loadImage);
    obj?.click();
}

function addImageByDrop(evt: DragEvent) {
    evt.preventDefault();

    const target = evt.target as HTMLElement

    const tagName = target.tagName;
    let parent = null;

    if (tagName == "svg" || tagName == "input") {
        parent = target.parentNode as HTMLElement;
    } else if (tagName == "path") {
        parent = target?.parentNode?.parentNode as HTMLElement;
    } else {
        parent = target.parentNode as HTMLElement;
    }

    const file = evt.dataTransfer?.files.item(0);

    if (!parent || !file) return

    createImage({ file, parent });
}

function dragOverEvent(evt: MouseEvent) {
    evt.preventDefault();
}


function loadImage(evt: Event) {
    const target = evt.target as HTMLInputElement
    const file = target.files?.[0];
    const parent = $(`#container-${target.id}`) as HTMLDivElement;
    createImage({ file, parent });
}

function getImage(getImageProps: GetImage) {

    const { id, route, token, userId } = getImageProps;

    return `
            <div 
                class="new-uploader" 
                id="container-${id}" 
                data-target="${id}" 
                data-upload-route="${route}" 
                data-upload-key="${token}" 
                data-upload-id="${userId}"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="#8c68cd" 
                    class="bi bi-cloud-plus new-uploader__image" 
                    viewBox="0 0 16 16" data-sk-target="${id}"
                >
                    <path 
                        fill-rule="evenodd" 
                        d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" 
                    >
                    </path>
                    <path 
                        d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z">
                    </path>
                </svg>
                <input 
                    type="text" 
                    readonly
                    data-sk-drawer="drawer-${id}" 
                    id="input-${id}" 
                    name="input-${id}" 
                    data-sk-target="${id}" 
                    required
                    class="new-uploader__input"
                    data-required='true'
                    />
            </div>
                `;
}

function getUUID() {
    const buffer = new ArrayBuffer(24);
    const bigint64 = new BigUint64Array(buffer);

    const uuid = crypto.getRandomValues(bigint64);

    return uuid[0] + "-" + uuid[1] + "-" + uuid[2];
}

function reset(evt: MouseEvent) {
    evt.stopPropagation();
    const target = evt.target as HTMLButtonElement
    const parent = target.parentNode as HTMLDivElement;
    const inputText = parent.querySelector('input[type="text"]') as HTMLInputElement;
    inputText.style.background = "transparent";
    const id = parent.dataset.target;
    const route = parent.dataset.uploadRoute;
    const token = parent.dataset.uploadKey;
    const userId = parent.dataset.uploadId;
    const elem = $$(getImage({ id, route, token, userId }))[0] as HTMLInputElement;
    elem.addEventListener("click", addImageByClick);
    elem.addEventListener("drop", addImageByDrop);
    elem.addEventListener("dragover", dragOverEvent);
    parent.replaceWith(elem);
    inputText.value = "";
}
