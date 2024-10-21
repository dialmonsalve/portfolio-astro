import startUpload from "../utils/uploaderSingleImage";

import modal from "../components/modal";
import bodyModal from "../components/bodyImage";
import button from "../components/Button";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";
import type { AppRadioButtons, AppTextareaForm } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $(".container-forms");

interface Create {
    showPhoto: boolean;
    userId?: string;
    userToken?: string;
    route?: string;
    stringId: string
}

function configure(target: HTMLButtonElement, incrementId: number, showPhoto: boolean) {
    modal({
        title: "update image options",
        content: () => bodyModal(target, showPhoto),
        action: () => update(target, incrementId, showPhoto),
    });
}

export function create(
    incrementId: number,
    { showPhoto, userId, userToken, route, stringId }: Create
) {
    const $parentDiv = doc.createElement("div");

    const isSingleImage = showPhoto ? "image" : "single-image";

    const buttonIdUpdate = `${isSingleImage}-update-${incrementId}`;
    const buttonIdRemove = `${isSingleImage}-remove-${incrementId}`;
    const containerId = `card-${isSingleImage}-${incrementId}`;

    const buttonUpdate = button(
        {
            id: `heading-update-${incrementId}`,
            text: "",
            spanClass: "button-square-update",
            buttonClass: "inputs-btn-update",
        },
        (evt) => configure(evt.target as HTMLButtonElement, incrementId, showPhoto)
    );

    const buttonDelete = button(
        {
            id: `heading-remove-${incrementId}`,
            text: "",
            spanClass: "button-square-remove",
            buttonClass: "inputs-btn-delete",
        },
        removeElementForm
    );

    const newLabel = "Edit";

    const $containerImage = doc.createElement("div");
    const $imageDiv = doc.createElement("div");
    const $label = doc.createElement("label");
    const $input = doc.createElement("input") ;

    const id = `${stringId}-${incrementId}`;
    const name = `${stringId}-${incrementId}-'${newLabel}'`;

    $label.htmlFor = `${id}-${incrementId}`;
    $label.setAttribute("name", name);
    $label.className = "text-capitalize label";
    $label.textContent = newLabel;

    $input.type = "file";
    $input.className = `uploader-${id} hidden-image`;
    $input.id = `${id}-${incrementId}`;

    const upload = showPhoto
        ? { route, userToken, userId }
        : { route: "fake", userToken: "567", userId: id };

    $input.setAttribute("name", name);
    $input.setAttribute("data-upload-route", upload.route || '');
    $input.setAttribute("data-upload-key", upload.userToken || '');
    $input.setAttribute("data-upload-id", upload.userId || '');
    $input.setAttribute("accept", ".png, .jpeg, .jpg, .webp");
    $input.setAttribute("data-required", "false");

    setTimeout(() => {
        startUpload(id);
    }, 500);

    $containerImage.appendChild($label);
    $containerImage.appendChild($input);

    $containerImage.appendChild($imageDiv);

    $containerImage.classList.add("container-components__image");
    $containerImage.id = id;

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    $parentDiv.classList.add("container-components");
    $parentDiv.id = containerId;

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);
    $parentDiv.appendChild($containerImage);
    $lastChildren?.appendChild($parentDiv);

    if (showPhoto) {
        const updateImage = {
            object: "Image" as "Image",
            id,
            label: `${newLabel}`,
            buttonIdUpdate,
            buttonIdRemove,
            containerId,
        };
        $input.addEventListener("change", () => {
            const inputText = $parentDiv.querySelector("input[type='text']") as HTMLInputElement;
            setTimeout(() => {
                const rest = {
                    alt: `image-${newLabel}`,
                    src: inputText?.value,
                };
                storage.update(buttonUpdate, rest);
            }, 1000);
        });
        storage.create($lastChildren, updateImage);
    } else {
        const updateSingleImage = {
            object: "SingleImage" as 'SingleImage',
            id,
            name,
            label: `'${newLabel}'`,
            required: false,
            buttonIdUpdate,
            buttonIdRemove,
            containerId,
        };
        storage.create($lastChildren, updateSingleImage);
    }
}

function update(target: HTMLButtonElement, incrementId: number, showPhoto: boolean) {
    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $containerArea = $("#container-area-label") as AppTextareaForm;

    const $parentContainer = target.closest(".container-components");
    const $parentInputs = $parentContainer?.lastElementChild;

    const $label = $parentInputs?.querySelector("LABEL") as HTMLLabelElement;
    const $input = $parentInputs?.querySelector("input[type='file']");

    const isLabelChanged = $containerArea.change;
    const isRequiredChanged = $radioButtonsRequired.change;

    const newLabel = isLabelChanged ? $containerArea.value : $label.textContent;

    const newCheckedRequired = isRequiredChanged
        ? $radioButtonsRequired.value
        : $input?.getAttribute("data-required") || 'false';

    $label.textContent = newLabel;
    $input?.setAttribute("data-required", newCheckedRequired);
    const name = `single-image-${incrementId}-${newLabel}`;

    const updateSingleImage = {
        name,
        label: newLabel,
        required: newCheckedRequired.trim() === "true" ? true : false,
    };

    const updateImage = {
        label: newLabel,
    };

    let updateInputs = showPhoto ? updateImage : updateSingleImage;

    storage.update(target, updateInputs);
}
