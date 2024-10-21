import modal from "../components/modal";
import button from "../components/Button";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";

import { REQUIRED_RADIOS } from "../const/index";
import smooth from "../utils/smoothWindow";
import type { AppRadioButtons, AppTextareaForm } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export default function signature() {
    const $signature = $("#signature");
    let incrementId = 0;

    $signature?.addEventListener("click", () => {
        incrementId++;
        create(incrementId);
        smooth();
    });
}

export function create(incrementId: number) {
    const $parentDiv = doc.createElement("div");
    const $signature = doc.createElement("app-signature");
    const $containerSignature = doc.createElement("div");

    const buttonIdUpdate = `signature-update-${incrementId}`;
    const buttonIdRemove = `signature-remove-${incrementId}`;
    const containerId = `card-signature-${incrementId}`;

    const newLabel = "Edit signature";

    $signature.setAttribute("label", newLabel);
    const id = `signature-${incrementId}`;
    const name = `signature-${incrementId}-'${newLabel}'`;

    $containerSignature.appendChild($signature);

    $containerSignature.id = id;
    $containerSignature.setAttribute("data-required", "false");

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

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    $parentDiv.className = "container-components isDraggable";
    $parentDiv.id = containerId;

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);
    $parentDiv.appendChild($containerSignature);
    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate,
        containerId,
        id,
        label: `'${newLabel}'`,
        name,
        object: "Signature" as "Signature",
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

    $containerArea.setAttribute("label", "Label");
    $containerArea.setAttribute("input_id", "area");
    $containerArea.id = "container-area-label";

    const $parentInputs = target.closest(".container-components");
    const signatureParent = $parentInputs?.querySelector("app-signature");
    const shadowRoot = signatureParent?.shadowRoot;

    const $paragraph = shadowRoot?.querySelector("p");
    const newLabel = $paragraph?.textContent || '';

    const newCheckedRequired = $parentInputs?.querySelector("div")?.getAttribute("data-required");

    if (!$parentInputs) return;

    const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedRequired,
    }));

    $containerArea.setAttribute("new_value", newLabel);
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
        title: "update signature",
        content: () =>
            bodyModal(target),
        action: () => update(target, incrementId),
    });
}

function update(target: HTMLButtonElement, incrementId: number) {
    const $signature = $("#app-signature");
    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $containerArea = $("#container-area-label") as AppTextareaForm;

    const $parentContainer = target.closest(".container-components");
    const $parentSignature = $parentContainer?.lastElementChild;

    const isLabelChanged = $containerArea.change;

    const newLabel = isLabelChanged ? $containerArea?.value : '';

    const newCheckedRequired =
        $radioButtonsRequired.value === ""
            ? ""
            : $radioButtonsRequired.value;

    $signature?.setAttribute("label", newLabel || '');

    const name = `signature-${incrementId}-'${newLabel}'`;

    $parentSignature?.setAttribute("data-required", newCheckedRequired);

    const rest = {
        name,
        label: `'${newLabel}'`,
        required: newCheckedRequired.trim() === "true" ? true : false,
    };

    storage.update(target, rest);
}
