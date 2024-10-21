import modal from "../components/modal";
import button from "../components/Button";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";
import type { AppInput } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export function configure(target: HTMLButtonElement) {
    modal({
        title: "update title",
        content: () => bodyModal(target),
        action: () => update(target),
    });
}

function bodyModal(target: HTMLButtonElement) {
    const $parentDiv = doc.createElement("app-modal-body");
    const $ContainerInput = doc.createElement("app-input");

    $ContainerInput.setAttribute("name", "input-headings");
    $ContainerInput.setAttribute("type", "text");
    $ContainerInput.setAttribute("label", "title");
    $ContainerInput.setAttribute("input_id", "input-headings");
    $ContainerInput.id = "container-input-headings";

    const $parentInputs = target.closest(".container-components");

    if (!$parentInputs) return;

    const $paragraph = $parentInputs.lastElementChild;

    const newTitle = $paragraph?.textContent || '';

    $ContainerInput.setAttribute("new_value", newTitle);

    $parentDiv.appendChild($ContainerInput);

    return $parentDiv;
}

export function create(incrementId: number) {
    const $parentDiv = document.createElement("div");
    const $parentInput = document.createElement("div");
    const containerId = `card-paragraph-${incrementId}`;
    const buttonIdRemove = `paragraph-remove-${incrementId}`;
    const buttonIdUpdate = `paragraph-update-${incrementId}`;

    const buttonUpdate = button(
        {
            id: buttonIdUpdate,
            text: "",
            spanClass: "button-square-update",
            buttonClass: "inputs-btn-update",
        },
        (evt) => configure(evt.target as HTMLButtonElement,)
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

    const newValue = "Edit paragraph";

    $parentDiv.className = "container-components isDraggable";
    $parentDiv.id = containerId;

    $parentInput.className = "container-control-row";
    $parentInput.setAttribute("position", "row");

    const $paragraph = doc.createElement("p");
    const id = `paragraph-${incrementId}`;
    $paragraph.id = id;

    $paragraph.classList.add("paragraph");
    $paragraph.textContent = newValue;

    $parentInput.appendChild($paragraph);

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);
    $parentDiv?.appendChild($parentInput);
    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate,
        containerId,
        id,
        label: newValue,
        name: id,
        object: "Paragraph" as 'Paragraph',
        disposition: "row" as "row",
    };
    storage.create($lastChildren, updateInputs);
}

function update(target: HTMLButtonElement) {
    const $parentContainer = target.closest(".container-components");
    const $parentInputs = $parentContainer?.lastElementChild;
    const $paragraph = $parentInputs?.querySelector("P") as HTMLParagraphElement;
    const $containerInput = $("#container-input-headings") as AppInput;

    const newValue = $containerInput.change
        ? $containerInput.value
        : $paragraph?.textContent || '';

    if (newValue === "") return;

    $paragraph.textContent = newValue;

    storage.update(target, { label: newValue });
}
