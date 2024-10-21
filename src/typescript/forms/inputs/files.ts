import modal from "../components/modal";
import button from "../components/Button";
import inputComponent from "../components/inputComponent";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";

import { MULTIPLE_RADIOS, REQUIRED_RADIOS } from "../const/index";
import type {AppInput, AppRadioButtons} from "../webComponents";

const checkboxFormats = [
    "doc",
    "xls",
    "ppt",
    "pdf",
    "docx",
    "xlsx",
    "pptx",
    "mp4",
    "avi",
    "mov",
    "mkv",
    "mp3",
    "wav",
    "ogg",
    "aac",
    "txt",
    "csv",
    "zip",
    "rar",
    "7z",
    "odt",
    "ods",
    "odp",
    "rtf",
];

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $containerCards = $(".container-forms");

const elementsCheck = (elementChecked: string | null | undefined) => {
    const $parentCheckbox = doc.createElement("div");
    $parentCheckbox.classList.add("container-modal-checkbox");

    checkboxFormats.map((check) => {
        const $containerCheck = document.createElement("div");

        $containerCheck.className = "form-check form-switch";

        const isChecked = elementChecked?.split(",").includes(`.${check}`)
            ? true
            : false;

        const $paragraph = document.createElement("p");
        const $input = document.createElement("input");

        $input.className = "form-check-input accept";
        $input.type = "checkbox";
        $input.checked = isChecked;
        $input.id = check;
        $input.value = `.${check}`;
        $input.setAttribute("name", check);

        $paragraph.textContent = check;

        $containerCheck.appendChild($input);
        $containerCheck.appendChild($paragraph);
        $parentCheckbox.appendChild($containerCheck);
    });

    return $parentCheckbox;
};

export function create(incrementId: number) {
    const $parentDiv = document.createElement("div");
    const $parentImage = document.createElement("div");
    const $paragraph = document.createElement("p");
    const $containerVoucher = document.createElement("div");
    const $label = document.createElement("label");
    const $labelImage = document.createElement("span");
    const $image = doc.createElement("img") as HTMLImageElement;
    const $input = doc.createElement("input") as HTMLInputElement;
    const $containerNameFiles = document.createElement("div");
    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    const buttonIdUpdate = `files-update-${incrementId}`;
    const buttonIdRemove = `files-remove-${incrementId}`;
    const containerId = `card-files-${incrementId}`;

    const label = $paragraph.textContent || "";
    const id = `files-${incrementId}`;
    const name = `files-${incrementId}-${label}`;

    $parentDiv.classList.add("container-components");
    $parentDiv.id = containerId;

    $parentImage.classList.add("container-components__image");
    $parentImage.id = `parent-${id}`;

    $paragraph.className = "text-capitalize text-voucher";
    $paragraph.id = `label-${incrementId}`;

    $label.classList.add("voucher-upload");
    $label.htmlFor = id;
    $label.id = "input-files";
    $label.textContent = "upload images";

    $labelImage.classList.add("voucher");

    $image.classList.add("voucher-img");
    $image.src = "/img/upload.svg";
    $image.alt = "voucher upload";

    $input.classList.add("voucher-input");
    $input.type = "file";
    $input.id = id;
    $input.setAttribute("name", name);
    $input.setAttribute("data-required", "false");
    $input.setAttribute("multiple", "false");

    $containerVoucher.classList.add("container-voucher");

    $containerNameFiles.id = `name-${id}`;
    $containerNameFiles.classList.add("container-name-files");

    const buttonUpdate = button(
        {
            id: buttonIdUpdate,
            text: "",
            spanClass: "button-square-update",
            buttonClass: "inputs-btn-update",
        },
        (evt) => configure(evt.target as HTMLButtonElement, incrementId)
    );

    const buttonDelete = button(
        {
            id: buttonIdRemove,
            text: "",
            spanClass: "button-square-remove",
            buttonClass: "inputs-btn-delete",
        },
        removeElementForm
    );

    $labelImage.appendChild($image);

    $containerVoucher.appendChild($label);
    $containerVoucher.appendChild($labelImage);
    $containerVoucher.appendChild($input);

    $parentImage.appendChild($paragraph);
    $parentImage.appendChild($containerVoucher);
    $parentImage.appendChild($containerNameFiles);

    $parentDiv.appendChild(buttonUpdate);
    $parentDiv.appendChild(buttonDelete);

    $parentDiv.appendChild($parentImage);

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        object: "Files" as "Files",
        id,
        name,
        label: label === "" ? null : label,
        multiple: null,
        accept: null,
        required: false,
        buttonIdUpdate,
        buttonIdRemove,
        containerId,
    };

    storage.create($lastChildren, updateInputs);
}

function configure(target: HTMLButtonElement, incrementId: number) {
    modal({
        title: "configure files",
        content: () => bodyModal(target),
        action: () => update(target, incrementId),
    });
}

function bodyModal(target: HTMLButtonElement) {
    const $parentDiv = doc.createElement("app-modal-body");
    const $radioButtonsRequired = doc.createElement("app-radio-buttons");
    const $radioButtonsMultiple = doc.createElement("app-radio-buttons");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsRequired.setAttribute("name", "inputs-required");
    $radioButtonsRequired.id = "container-radios-required";

    $radioButtonsMultiple.setAttribute("label", "Multiple:");
    $radioButtonsMultiple.setAttribute("name", "inputs-multiple");
    $radioButtonsMultiple.id = "container-radios-multiple";

    const $ContainerInputLabel = inputComponent({
        name: "input-label",
        type: "text",
        label: "Label",
        id: `container-input-label`,
    });

    const $parentInputs = target.closest(".container-components");

    const $label = $parentInputs?.querySelector("P");
    const $input = $parentInputs?.querySelector("input");

    const newLabel = $label?.textContent;
    const newCheckedMultiple = $input?.getAttribute("multiple");

    const newCheckedRequired = $input?.getAttribute("data-required");

    if (!$parentInputs) return;

    const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedRequired,
    }));

    const updatedPositionRadios = MULTIPLE_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedMultiple,
    }));

    $ContainerInputLabel.setAttribute("new_value", `${newLabel}`);

    $radioButtonsRequired.setAttribute(
        "radios",
        JSON.stringify(updatedRequiredRadios)
    );
    $radioButtonsMultiple.setAttribute(
        "radios",
        JSON.stringify(updatedPositionRadios)
    );

    const accept = $input?.getAttribute("accept");

    $parentDiv.appendChild($ContainerInputLabel);
    $parentDiv.appendChild(elementsCheck(accept));
    $parentDiv.appendChild($radioButtonsRequired);
    $parentDiv.appendChild($radioButtonsMultiple);

    return $parentDiv;
}

function update(target: HTMLButtonElement, incrementId: number) {
    const $parentDiv = $("app-modal-body");
    const $checkboxChecked = $parentDiv?.querySelectorAll(
        '.container-modal-checkbox input[type="checkbox"]:checked'
    )as NodeListOf<HTMLInputElement>;
    const $containerInputLabel = $("#container-input-label") as AppInput;
    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $radioButtonsMultiple = $("#container-radios-multiple")as AppRadioButtons;

    const $parentElement = target.closest(".container-components");

    const isRequiredChanged = $radioButtonsRequired?.change;
    const isMultipleChanged = $radioButtonsMultiple?.change;

    let accept = "";

    for (const checkbox of $checkboxChecked) {
        accept = accept.concat(checkbox.value, ",");
    }

    const $input = $parentElement?.querySelector("INPUT") as HTMLInputElement;
    const $paragraph = $parentElement?.querySelector("P") as HTMLParagraphElement;

    const newLabel = $containerInputLabel?.change
        ? $containerInputLabel.value
        : $paragraph?.textContent || "";

    const newCheckedRequired = isRequiredChanged
        ? $radioButtonsRequired.value
        : $input?.getAttribute("data-required") || 'false';

    const newCheckedMultiple = isMultipleChanged
        ? $radioButtonsMultiple.value
        : $input?.getAttribute("multiple") || 'false';

    $paragraph.textContent = newLabel;
    $input.setAttribute("accept", accept);
    $input.setAttribute("data-required", newCheckedRequired);
    $input.setAttribute("multiple", newCheckedMultiple);

    const name = `files-${incrementId}-'${newLabel}'`;

    const rest = {
        multiple: newCheckedMultiple,
        name,
        label: `'${newLabel}'`,
        required: newCheckedRequired.trim() === "true" ? true : false,
        accept,
    };

    storage.update(target, rest);
}
