import modal from "../components/modal";
import button from "../components/Button";
import inputComponent from "../components/inputComponent";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";

import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";
import type { AppInput, AppRadioButtons } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

interface Options {
    object: 'Date' | 'DateTime' | 'Textarea',
    type: InputType;
    input: Input
}

type InputType = 'date' | 'time' | 'textarea'
type Input = 'TEXTAREA' | 'INPUT'

export function create(incrementId: number, { object, type, input }: Options) {
    const $parentDiv = document.createElement("div");
    const $parentInput = document.createElement("div");
    const isTextarea = input === "TEXTAREA" ? "textarea" : type;

    const buttonIdRemove = `${isTextarea}-remove-${incrementId}`;
    const buttonIdUpdate = `${isTextarea}-update-${incrementId}`;
    const containerId = `card-${isTextarea}-${incrementId}`;

    const buttonUpdate = button(
        {
            id: `heading-update-${incrementId}`,
            text: "",
            spanClass: "button-square-update",
            buttonClass: "inputs-btn-update",
        },
        (evt) => configure(evt.target as HTMLButtonElement, incrementId, type, input)
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

    const newLabel = "Edit text";
    const isArea: 'row' | 'column' = input === "TEXTAREA" ? "column" : "row";

    $parentDiv.className = "container-components isDraggable";
    $parentDiv.id = containerId;

    $parentInput.classList.add(`container-control-${isArea}`);
    $parentInput.setAttribute("disposition", isArea);

    const $label = doc.createElement("LABEL") as HTMLLabelElement;
    const $input = doc.createElement(input) as HTMLInputElement | HTMLTextAreaElement;

    const id = `${type}-${incrementId}`;
    const name = `${type}-${incrementId}-'${newLabel}'`;

    $label.classList.add("container-control__label");
    $label.htmlFor = id;
    $label.textContent = newLabel;

    $input instanceof HTMLInputElement
    if (input === "INPUT" && $input instanceof HTMLInputElement) {
        $input.type = type;
    }
    $input.setAttribute("name", name);
    $input.id = id;

    const className =
        input === "INPUT"
            ? "container-control__input-text"
            : "container-control__input-textarea";

    $input.classList.add(className);
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
        disposition: isArea,
        id,
        label: `'${newLabel}'`,
        name,
        object,
        required: false,
    };

    storage.create($lastChildren, updateInputs);
}

function configure(target: HTMLButtonElement, incrementId: number, type: InputType, input: Input) {
    modal({
        title: "update input text",
        content: () => bodyModal(target, { input }),
        action: () => update(target, incrementId, type, input),
    });
}

function bodyModal(target: HTMLButtonElement, { input = "input" }) {
    const $parentDiv = doc.createElement("app-modal-body");
    const $radioButtonsRequired = doc.createElement("app-radio-buttons");
    const $radioButtonsPosition = doc.createElement("app-radio-buttons");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsRequired.id = "container-radios-required";
    $radioButtonsRequired.setAttribute("name", "inputs-required");

    $radioButtonsPosition.setAttribute("name", "inputs-position");
    $radioButtonsPosition.setAttribute("label", "Position:");
    $radioButtonsPosition.id = "container-radios-position";

    const $ContainerInputLabel = inputComponent({
        name: "input-label",
        type: "text",
        label: "Label",
        id: "container-input-label",
    });
    const $parentContainer = target.closest(".container-components");

    const $parentInputs = $parentContainer?.lastElementChild;

    if (!$parentInputs) return;

    const $label = $parentInputs.querySelector("label");
    const $input = $parentInputs.querySelector(input);

    let labelText = '';

    $label?.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            labelText += node.textContent;
        }
    });

    const newLabel = labelText;
    const newCheckedPosition = $parentInputs.getAttribute("disposition");
    const newCheckedRequired = $input?.getAttribute("data-required");

    const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedRequired,
    }));

    const updatedPositionRadios = POSITION_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedPosition,
    }));

    $ContainerInputLabel.setAttribute("new_value", `${newLabel}`);
    $radioButtonsRequired.setAttribute(
        "radios",
        JSON.stringify(updatedRequiredRadios)
    );
    $radioButtonsPosition.setAttribute(
        "radios",
        JSON.stringify(updatedPositionRadios)
    );

    $parentDiv.appendChild($ContainerInputLabel);
    $parentDiv.appendChild($radioButtonsRequired);
    $parentDiv.appendChild($radioButtonsPosition);

    return $parentDiv;
}

function update(target: HTMLButtonElement, incrementId: number, type: InputType, input: Input) {
    const $parentContainer = target.closest(".container-components");
    const $parentInputs = $parentContainer?.lastElementChild as HTMLDivElement;
    const $label = $parentContainer?.querySelector("label") as HTMLLabelElement;
    const $input = $parentContainer?.querySelector(input) as HTMLInputElement | HTMLTextAreaElement;

    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
    const $containerInputLabel = $("#container-input-label") as AppInput;

    const isRequiredChanged = $radioButtonsRequired?.change;
    const isDispositionChanged = $radioButtonsPosition.change;

    const newLabel = $containerInputLabel.change
        ? $containerInputLabel.value
        : $label?.textContent;

    const newCheckedRequired = isRequiredChanged
        ? $radioButtonsRequired.value
        : $input?.getAttribute("data-required") || 'false';

    const newCheckedPosition = isDispositionChanged
        ? $radioButtonsPosition.value
        : $parentInputs?.getAttribute("disposition") || 'row';

    if (newLabel === "") return;

    $parentInputs.className = ''
    $parentInputs.classList.add(`container-control-${newCheckedPosition}`);
    $parentInputs.setAttribute("disposition", newCheckedPosition);

    $label.textContent = newLabel;

    const name = `${type}-${incrementId}-'${newLabel}'`;
    $input.setAttribute("data-required", newCheckedRequired);
    $input.setAttribute("name", name);

    const rest = {
        disposition: newCheckedPosition,
        name,
        label: `'${newLabel}'`,
        required: newCheckedRequired.trim() === "true" ? true : false,
    };

    storage.update(target, rest);
}
