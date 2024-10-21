import inputComponent from "../components/inputComponent";
import button from "../components/Button";

import modal from "../components/modal";
import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const/index";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";
import type { AppInput, AppRadioButtons } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

interface Create {
    object: "Text" | "Email" | "Phone" | "Password";
    type: TypeInput
}

type TypeInput = "text" | "email" | "phone" | "password"

export function create(incrementId: number, { object, type }: Create) {
    const $parentDiv = document.createElement("div");
    const $parentInput = document.createElement("div");
    const isPassword = object === "Password" ? "password" : type;
    const containerId = `card-${isPassword}-${incrementId}`;
    const buttonIdRemove = `${isPassword}-remove-${incrementId}`;
    const buttonIdUpdate = `${isPassword}-update-${incrementId}`;

    const buttonUpdate = button(
        {
            id: buttonIdUpdate,
            text: "",
            spanClass: "button-square-update",
            buttonClass: "inputs-btn-update",
        },
        (evt) => configure(evt.target as HTMLButtonElement, incrementId, type)
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

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    const newLabel = "edit text";

    $parentDiv.className = "container-components isDraggable";
    $parentDiv.id = containerId;

    $parentInput.classList.add(`container-control-row`);
    $parentInput.setAttribute("disposition", "row");

    const $label = doc.createElement("label") ;
    const $input = doc.createElement("input") ;

    const id = `${isPassword}-${incrementId}`;
    const name = `${isPassword}-${incrementId}-${newLabel}`;

    $label.classList.add("container-control__label");
    $label.htmlFor = id;
    $label.textContent = newLabel;

    $input.type = isPassword;
    $input.setAttribute("name", name);
    $input.id = id;
    $input.classList.add("container-control__input-text");
    $input.setAttribute("autocomplete", "on");
    $input.setAttribute("data-required", "false");

    $parentInput.appendChild($label);
    $parentInput.appendChild($input);

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);
    $parentDiv?.appendChild($parentInput);
    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate,
        containerId,
        disposition: "row" as "row",
        id,
        label: newLabel,
        name,
        object,
        placeholder: null,
        required: false,
    };

    storage.create($lastChildren, updateInputs);
}

export function configure(target: HTMLButtonElement, incrementId: number, type: TypeInput) {
    modal({
        title: `update input ${type}`,
        content: () => bodyModal(target, { type }),
        action: () => update(target, incrementId, type),
    });
}

function bodyModal(target: HTMLButtonElement, { type }: { type: TypeInput }) {
    const $parentDiv = doc.createElement("app-modal-body");
    const $radioButtonsRequired = doc.createElement("app-radio-buttons");
    const $radioButtonsPosition = doc.createElement("app-radio-buttons");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsPosition.setAttribute("name", "inputs-position");
    $radioButtonsRequired.id = "container-radios-required";

    $radioButtonsPosition.setAttribute("label", "Position:");
    $radioButtonsRequired.setAttribute("name", "inputs-required");
    $radioButtonsPosition.id = "container-radios-position";

    const $ContainerInputLabel = inputComponent({
        name: "input-label",
        type,
        label: "Label",
        id: `container-input-label`,
    });

    const $ContainerInputPlaceholder = inputComponent({
        name: "input-placeholder",
        type,
        label: "Placeholder",
        id: "container-input-placeholder",
    });

    const $parentContainer = target.closest(".container-components");

    const $parentInputs = $parentContainer?.lastElementChild as HTMLDivElement;

    if (!$parentInputs) return;

    const $label = $parentInputs.querySelector("label");
    const $input = $parentInputs.querySelector("input");

    let labelText = "";

    $label?.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            labelText += node.textContent;
        }
    });

    const newLabel = labelText;
    const newCheckedPosition = $parentInputs.getAttribute("disposition");

    const newPlaceholder = $input?.getAttribute("placeholder") || "";
    const newCheckedRequired = $input?.getAttribute("data-required");

    const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedRequired,
    }));

    const updatedPositionRadios = POSITION_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedPosition,
    }));

    $ContainerInputLabel.setAttribute("new_value", newLabel);
    $ContainerInputPlaceholder.setAttribute("new_value", newPlaceholder);
    $radioButtonsRequired.setAttribute(
        "radios",
        JSON.stringify(updatedRequiredRadios)
    );
    $radioButtonsPosition.setAttribute(
        "radios",
        JSON.stringify(updatedPositionRadios)
    );

    $parentDiv.appendChild($ContainerInputLabel);
    $parentDiv.appendChild($ContainerInputPlaceholder);
    $parentDiv.appendChild($radioButtonsRequired);
    $parentDiv.appendChild($radioButtonsPosition);

    return $parentDiv;
}

function update(target: HTMLButtonElement, incrementId: number, type: TypeInput) {
    const $parentContainer = target.closest(".container-components");
    const $parentInputs = $parentContainer?.lastElementChild as HTMLDivElement;
    const $label = $parentInputs.querySelector("label") as HTMLLabelElement;
    const $input = $parentInputs.querySelector("input") as HTMLInputElement;

    let labelText = "";

    $label.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            labelText += node.textContent;
        }
    });

    const oldLabel = labelText;

    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
    const $ContainerInputLabel = $("#container-input-label") as AppInput;
    const $ContainerInputPlaceholder = $("#container-input-placeholder") as AppInput;

    const isPlaceholderChanged = $ContainerInputPlaceholder.change;
    const isRequiredChanged = $radioButtonsRequired.change;
    const isDispositionChanged = $radioButtonsPosition.change;

    const newLabel = $ContainerInputLabel.change
        ? $ContainerInputLabel.value
        : oldLabel;

    const newPlaceholder = isPlaceholderChanged
        ? $ContainerInputPlaceholder.value
        : $input.getAttribute("placeholder") || "";

    const newCheckedRequired = isRequiredChanged
        ? $radioButtonsRequired.value
        : $input.getAttribute("data-required") || 'false';

    const newCheckedPosition = isDispositionChanged
        ? $radioButtonsPosition.value
        : $parentInputs.getAttribute("disposition") || 'row';

    if (newLabel === "") return;

    $parentInputs.className = "";
    $parentInputs.classList.add(`container-control-${newCheckedPosition}`);
    $parentInputs.setAttribute("disposition", newCheckedPosition);

    $label.textContent = newLabel;
    const name = `${type}-${incrementId}-${newLabel}`;
    $input.setAttribute("placeholder", newPlaceholder);
    $input.setAttribute("data-required", newCheckedRequired);
    $input.setAttribute("name", name);

    const rest = {
        disposition: newCheckedPosition,
        name,
        label: `'${newLabel}'`,
        placeholder:
            newPlaceholder.trim() !== "" ? `'${newPlaceholder}'` : null,
        required: newCheckedRequired.trim() === "true" ? true : false,
    };

    storage.update(target, rest);
}
