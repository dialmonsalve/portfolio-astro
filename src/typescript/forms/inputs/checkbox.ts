import modal from "../components/modal";
import Button from "../components/Button";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";

import { REQUIRED_RADIOS } from "../const";

import type { AppRadioButtons, AppInput } from "../webComponents";
import { $, element } from "../utils/utilities";

const doc = document;

const { create } = element
let newLabel = "";
let newCheckedRequired = "";

const $containerCards = $(".container-forms");

export function addToDOM(incrementId: number) {
    const $parentDiv = create("div");
    const $containerCheck = create("div");
    const $input =create("input") ;
    const $paragraph = create("p");

    const buttonIdUpdate = `checkbox-update-${incrementId}`;
    const buttonIdRemove = `checkbox-remove-${incrementId}`;
    const containerId = `card-checkbox-${incrementId}`;

    const buttonUpdate = new Button({
        buttonId: buttonIdUpdate,
        text: "",
        spanClass: "button-square-update",
        buttonClass: "inputs-btn-update",
    });

    const buttonDelete = new Button({
        buttonId: buttonIdRemove,
        text: "",
        spanClass: "button-square-remove",
        buttonClass: "inputs-btn-delete",
    },);

    buttonUpdate.action((evt) => configure(evt.target as HTMLButtonElement, incrementId))
    buttonDelete.action(removeElementForm)

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    const newLabel = "Edit option";

    $parentDiv.className = "container-components isDraggable";
    $parentDiv.id = containerId;

    $containerCheck.classList.add("form-check");
    $containerCheck.classList.add("form-switch");

    $paragraph.classList.add("container-check__label");
    $paragraph.textContent = newLabel;

    $parentDiv.appendChild(buttonDelete.create);
    $parentDiv.appendChild(buttonUpdate.create);

    const id = `checkbox-${incrementId}`;
    const name = `checkbox-${incrementId}-'${newLabel}'`;

    $input.type = "checkbox";
    $input.id = id;
    $input.classList.add("form-check-input");
    $input.setAttribute("name", name);
    $input.setAttribute("data-required", "false");

    $containerCheck.appendChild($input);
    $containerCheck?.appendChild($paragraph);
    $parentDiv?.appendChild($containerCheck);

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate,
        containerId,
        id,
        label: `'${newLabel}'`,
        name,
        object: "Checkbox" as "Checkbox",
        required: false,
    };

    storage.create($lastChildren, updateInputs);
}

function bodyModal(target: HTMLButtonElement) {
    const $parentDiv = doc.createElement("app-modal-body");
    const $radioButtonsRequired = doc.createElement("app-radio-buttons");
    const $containerArea = doc.createElement("app-textarea");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsRequired.id = "container-radios-required";
    $radioButtonsRequired.setAttribute("name", "inputs-required");

    $containerArea.setAttribute("name", "area");
    $containerArea.setAttribute("label", "Label");
    $containerArea.setAttribute("input_id", "area");
    $containerArea.id = "container-area-label";

    const $parentInputs = target.closest(".container-components");

    const $label = $parentInputs?.querySelector("p");
    const $input = $parentInputs?.querySelector("input");

    let labelText = '';

    $label?.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            labelText += node.textContent;
        }
    });

    const newLabel = labelText;

    const newCheckedRequired = $input?.getAttribute("data-required");

    if (!$parentInputs) return;

    const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedRequired,
    }));

    $containerArea.setAttribute("new_value", `${newLabel}`);
    $radioButtonsRequired.setAttribute(
        "radios",
        JSON.stringify(updatedRequiredRadios)
    );

    $parentDiv.appendChild($containerArea);
    $parentDiv.appendChild($radioButtonsRequired);

    return $parentDiv;
}

function configure(target: HTMLButtonElement, incrementId: number) {
    modal({
        title: "update checkbox options",
        content: () =>
            bodyModal(target),
        action: () => update(target, incrementId),
    });
}

function update(target: HTMLButtonElement, incrementId: number) {
    const $parentContainer = target.closest(".container-components");
    const $parentInputs = $parentContainer?.lastElementChild;
    const $paragraph = $parentInputs?.querySelector("p") as HTMLParagraphElement;
    const $input = $parentInputs?.querySelector("input") as HTMLInputElement;

    const $radioButtonsRequired = $("#container-radios-required") as AppInput;
    const $containerArea = $("#container-area-label") as AppRadioButtons;

    newLabel = $containerArea.value === "" ? newLabel : $containerArea.value;

    newCheckedRequired =
        $radioButtonsRequired.value === ""
            ? newCheckedRequired
            : $radioButtonsRequired.value;

    if (newLabel === "") return;

    $paragraph.textContent = newLabel;
    $input.setAttribute("data-required", newCheckedRequired);
    const name = `checkbox-${incrementId}-'${newLabel}'`;

    const rest = {
        name,
        label: `'${newLabel}'`,
        required: newCheckedRequired.trim() === "true" ? true : false,
    };

    storage.update(target, rest);
}




