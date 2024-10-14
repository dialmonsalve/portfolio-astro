import modal from "../components/modal";
import removeElementForm from "../utils/removeElements";
import button from "../components/button";

import bodyModal from "../components/bodySelectRadio";
import storage from "../utils/saveAtLocalStorage";
import type { AppInput, AppRadioButtons } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

let newOptions = "";

const $containerCards = $(".container-forms");

export function create(incrementId: number) {
    const $parentDiv = document.createElement("DIV");
    const $parentInput = document.createElement("DIV");
    const $paragraph = doc.createElement("P");

    const buttonIdUpdate = `radioButtons-update-${incrementId}`;
    const buttonIdRemove = `radioButtons-remove-${incrementId}`;
    const containerId = `card-radioButtons-${incrementId}`;

    const buttonUpdate = button(
        {
            id: buttonIdUpdate,
            text: "",
            spanClass: "button-square-update",
            buttonClass: "inputs-btn-update",
        },
        (evt) => configure(evt.target as HTMLButtonElement, incrementId, newOptions, "input")
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

    const $label = doc.createElement("LABEL") as HTMLLabelElement;
    const $radio = doc.createElement("INPUT") as HTMLInputElement;

    const newLabel = "Edit options";
    const id = `container-radio-${incrementId}`;
    const name = `radio-${incrementId}-'${newLabel}'`;
    const valueOpt = `radio-${incrementId}`;
    const nameOpt = "edit";
    $label.htmlFor = valueOpt;
    $label.textContent = nameOpt;
    $radio.type = "radio";
    $radio.id = valueOpt;
    $radio.setAttribute("data-required", "false");
    $radio.setAttribute("name", name);

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    $parentDiv.className = "container-components isDraggable";
    $parentDiv.id = containerId;

    $parentInput.classList.add(`container-control-row`);
    $parentInput.setAttribute("disposition", "row");

    $paragraph.classList.add("container-control__label");
    $paragraph.textContent = newLabel;

    $parentInput?.appendChild($paragraph);
    $parentInput.appendChild($radio);
    $parentInput?.appendChild($label);

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);
    $parentDiv?.appendChild($parentInput);

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate,
        containerId,
        disposition: "row" as 'row',
        id,
        label: `'${newLabel}'`,
        name,
        object: "RadioButton" as 'RadioButton',
        options: null,
        required: false,
    };

    storage.create($lastChildren, updateInputs);
}

function configure(target: HTMLButtonElement, incrementId: number, newOptions: string, tag: string) {
    modal({
        title: "update input options",
        content: () =>
            bodyModal(target, {
                newOptions,
                tag,
            }),
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
    const $paragraph = $parentInputs?.querySelector("p") as HTMLParagraphElement;
    const $input = $parentInputs?.querySelector("input");

    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
    const $ContainerInputLabel = $("#container-input-label") as AppInput;
    const $containerArea = $("#container-area-label") as AppInput;

    const isRequiredChanged = $radioButtonsRequired.change;
    const isDispositionChanged = $radioButtonsPosition.change;

    const newLabel = $ContainerInputLabel.change
        ? $ContainerInputLabel.value
        : $paragraph?.textContent || '';

    const newCheckedRequired = isRequiredChanged
        ? $radioButtonsRequired.value
        : $input?.getAttribute("data-required") || 'false';

    const newCheckedPosition = isDispositionChanged
        ? $radioButtonsPosition.value
        : $parentInputs?.getAttribute("disposition") || 'row';

    newOptions =
        $containerArea.value === "" ? newOptions : $containerArea.value;

    if (newLabel === "" || newOptions === "") return;

    $parentInputs.className = ''
    $parentInputs.classList.add(`container-control-${newCheckedPosition}`);
    $parentInputs.setAttribute("disposition", newCheckedPosition);

    $paragraph.textContent = newLabel;
    $paragraph.setAttribute("disposition", newCheckedPosition);

    const name = `radio-${incrementId}-'${newLabel}'`;
    const id = `container-radio-${incrementId}`;

    let options: Options[] = [];

    const optionsLabel = newOptions.split("\n");
    const allRadios = $parentInputs.querySelectorAll('input[type="radio"]');
    const allLabels = $parentInputs.querySelectorAll("label");
    allRadios.forEach((radio) => radio.remove());
    allLabels.forEach((label) => label.remove());

    optionsLabel.forEach((elem, idx) => {
        const $label = doc.createElement("LABEL") as HTMLLabelElement;
        const $radio = doc.createElement("INPUT") as HTMLInputElement;
        const valueOpt = `radio-${idx + 1}-${incrementId}`;
        const nameOpt = elem;

        $label.htmlFor = valueOpt;
        $label.textContent = nameOpt;

        $radio.type = "radio";
        $radio.setAttribute("data-required", newCheckedRequired);
        $radio.setAttribute("name", name);
        $radio.id = valueOpt;

        options.push({ value: nameOpt, id: valueOpt, valueToShow: nameOpt });

        $parentInputs?.appendChild($radio);
        $parentInputs?.appendChild($label);
    });

    const rest = {
        id,
        disposition: newCheckedPosition,
        name,
        label: `'${newLabel}'`,
        required: newCheckedRequired.trim() === "true" ? true : false,
        options,
    };
    storage.update(target, rest);
}
