// import startUpload from "../utils/uploaderMultiImage";

import modal from "../components/modal";
import bodyModal from "../components/bodyImage";
import button from "../components/Button";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";
import type { AppRadioButtons, AppTextareaForm } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $(".container-forms");


export function create(incrementId: number) {
    const $parentDiv = doc.createElement("div");
    const $parentImages = doc.createElement("div");

    const newLabel = "Edit Description";

    const id = `multi-image-${incrementId}`;
    const name = `multi-image-${incrementId}-'${newLabel}'`;

    const $containerImages = doc.createElement("div");
    const $label = doc.createElement("label");
    const $input = doc.createElement("input");
    const $span = doc.createElement("span");
    const $spanBody = doc.createElement("span");
    const $spanIcon = doc.createElement("i");

    const buttonIdUpdate = `multi-image-update-${incrementId}`;
    const buttonIdRemove = `multi-image-remove-${incrementId}`;
    const containerId = `card-multi-image-${incrementId}`;

    $label.htmlFor = `${id}-${incrementId}`;
    $label.className = "text-capitalize label";
    $label.textContent = newLabel;

    $input.type = "file";
    $input.id = `${id}-${incrementId}`;
    $input.className = `uploader-${id}`;
    $input.setAttribute("name", id);
    $input.setAttribute("data-upload-route", "fake");
    $input.setAttribute("data-upload-key", "123456");
    $input.setAttribute("data-type", "image");
    $input.setAttribute("data-upload-id", "9585");
    $input.setAttribute("data-required", "false");

    $containerImages.classList.add("container-multi-images");
    $parentImages.style.width = "100%";

    $span.classList.add("add-photo");
    $span.id = `button-${id}`;
    $span.textContent = "+";
    $spanBody.className = "btn btn-danger";
    $spanBody.style.display = "none";
    $spanBody.setAttribute("data-target", `${id}-1`);

    $spanIcon.className = "bi bi-x";

    $containerImages.appendChild($label);
    $containerImages.appendChild($input);
    $containerImages.appendChild($span);
    $spanBody.appendChild($spanIcon);
    $containerImages.appendChild($spanBody);

    $containerImages.id = `contain-${id}`;

    // setTimeout(() => {
    //     startUpload({
    //         userId: "userId",
    //         token: "token",
    //         route: "route",
    //         containerId: id,
    //         name: id,
    //     });
    //     $parentImages.id = id;
    // }, 100);

    const buttonUpdate = button(
        {
            id: `heading-update-${incrementId}`,
            text: "",
            spanClass: "button-square-update",
            buttonClass: "inputs-btn-update",
        },
        (evt) => configure(evt.target as HTMLButtonElement, incrementId)
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

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    $parentDiv.classList.add("container-components");

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);
    $parentImages.appendChild($containerImages);
    $parentDiv.appendChild($parentImages);

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate,
        containerId,
        object: "MultiImage" as "MultiImage",
        id,
        name,
        label: `'${newLabel}'`,
        required: false,
    };

    storage.create($lastChildren, updateInputs);
}

function configure(target: HTMLButtonElement, incrementId: number) {
    modal({
        title: "update select options",
        content: () =>
            bodyModal(target, false),
        action: () => update(target, incrementId),
    });
}

function update(target: HTMLButtonElement, incrementId: number) {

    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $containerArea = $("#container-area-label") as AppTextareaForm;
    const $parentContainer = target.closest(".container-components");
    const $parentInputs = $parentContainer?.lastElementChild;
    const $label = $parentInputs?.querySelector("LABEL") as HTMLLabelElement;
    const $input = $parentInputs?.querySelector("input") as HTMLInputElement;


    const isLabelChanged = $containerArea.change;
    const isRequiredChanged = $radioButtonsRequired.change;

    const newLabel = isLabelChanged ? $containerArea?.value : $label.textContent;

    const newCheckedRequired = isRequiredChanged
        ? $radioButtonsRequired.value
        : $input.getAttribute("data-required") || 'false';

    $label.textContent = newLabel;
    $input.setAttribute("data-required", newCheckedRequired);

    const name = `single-image-${incrementId}-'${newLabel}'`;

    const rest = {
        name,
        label: `'${newLabel}'`,
        required: newCheckedRequired.trim() === "true" ? true : false,
    };

    storage.update(target, rest);
}
