import modal from "../components/modal";
import button from "../components/Button";
import bodyModal from "../components/bodySelectRadio";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";
import type { AppInput, AppRadioButtons } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

let newOptions = "";

const $containerCards = $(".container-forms");

export function create(incrementId: number) {
    const $parentDiv = doc.createElement("div");
    const $parentInput = document.createElement("div");
    const $select = doc.createElement("select");
    const $paragraph = doc.createElement("p");

    const buttonIdUpdate = `select-update-${incrementId}`;
    const buttonIdRemove = `select-remove-${incrementId}`;
    const containerId = `card-select-${incrementId}`;

    const buttonUpdate = button(
        {
            id: buttonIdUpdate,
            text: "",
            spanClass: "button-square-update",
            buttonClass: "inputs-btn-update",
        },
        (evt) => configure(evt.target as HTMLButtonElement, incrementId, newOptions, "select")
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

    const newLabel = "Edit select";

    $parentDiv.className = "container-components isDraggable";
    $parentDiv.id = containerId;

    $parentInput.classList.add(`container-control-row`);
    $parentInput.setAttribute("disposition", "row");

    $paragraph.classList.add("container-control__label");
    $paragraph.textContent = newLabel;

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);

    const id = `select-${incrementId}`;
    const name = `select-${incrementId}-'${newLabel}'`;

    $select.id = id;
    $select.classList.add("container-control__input-text");
    $select.setAttribute("name", name);
    $select.setAttribute("data-required", "false");

    const $option = doc.createElement("option");
    $option.value = "";
    $option.setAttribute("checked", "checked");

    $select.appendChild($option);

    $parentInput?.appendChild($paragraph);
    $parentInput.appendChild($select);

    $parentDiv?.appendChild($parentInput);

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate,
        containerId,
        disposition: "row" as "row",
        id,
        label: `'${newLabel}'`,
        name,
        object: "Select" as "Select",
        options: null,
        required: false,
    };

    storage.create($lastChildren, updateInputs);
}

function configure(target: HTMLButtonElement, incrementId: number, newOptions: string, tag: string) {
    modal({
        title: "update select options",
        content: () => bodyModal(target, { newOptions, tag }),
        action: () => update(target, incrementId),
    });
}

interface Options {
    value: string;
    id: string;
    valueToShow: string
}

function update(target: HTMLButtonElement, incrementId: number) {
    const $parentContainer = target.closest(".container-components");
    const $parentInputs = $parentContainer?.lastElementChild as HTMLDivElement;
    const $paragraph = $parentInputs.querySelector("p") as HTMLParagraphElement;
    const $select = $parentInputs.querySelector("select") as HTMLSelectElement;

    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
    const $ContainerInputLabel = $("#container-input-label") as AppInput;
    const $containerArea = $("#container-area-label") as AppInput;

    const isRequiredChanged = $radioButtonsRequired.change;
    const isDispositionChanged = $radioButtonsPosition.change;

    const newLabel = $ContainerInputLabel.change
        ? $ContainerInputLabel.value
        : $paragraph.textContent || '';

    const newCheckedRequired = isRequiredChanged
        ? $radioButtonsRequired.value
        : $select.getAttribute("data-required") || 'false';

    const newCheckedPosition = isDispositionChanged
        ? $radioButtonsPosition.value
        : $parentInputs.getAttribute("disposition") || 'row';

    newOptions =
        $containerArea.value === "" ? newOptions : $containerArea.value;

    if (newLabel === "" || newOptions === "") return;

    $parentInputs.className = ''
    $parentInputs.classList.add(`container-control-${newCheckedPosition}`);
    $parentInputs.setAttribute("disposition", newCheckedPosition);

    $paragraph.textContent = newLabel;
    $select.setAttribute("data-required", newCheckedRequired);
    const allOptions = $parentInputs.querySelectorAll("select option");

    allOptions.forEach((option) => option.remove());

    const name = `select-${incrementId}-'${newLabel}'`;

    const $option = doc.createElement("option");
    $option.value = "";
    $option.setAttribute("checked", "checked");

    $select.appendChild($option);

    let options: Options[] = [];

    const optionsLabel = newOptions.split("\n");

    optionsLabel.forEach((elem, idx) => {
        const $option = doc.createElement("option");
        $option.setAttribute("name", `option-${idx + 1}`);
        $option.id = `option-${idx + 1}`;
        $option.value = elem;
        $option.textContent = elem;

        options.push({
            value: elem,
            valueToShow: elem,
            id: `option-${idx + 1}`,
        });

        $select?.appendChild($option);
    });

    const rest = {
        name,
        disposition: newCheckedPosition,
        label: `'${newLabel}'`,
        required: newCheckedRequired.trim() === "true" ? true : false,
        options,
    };

    storage.update(target, rest);
}
