import button from "./button.js";

import removeElementForm from "../utils/removeElements.js";

import storage from "../utils/saveAtLocalStorage.js";

const doc = document;

const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

interface Create {
    type: "next" | "submit";
    incrementId: number;
    buttonType: "button" | "submit"
    style?: string
}

export function create({ type, incrementId, buttonType, style }:Create) {
    const $parentDiv = document.createElement("DIV");
    const $buttonForm = document.createElement("BUTTON") as HTMLButtonElement;

    const id = `${type}-${incrementId}`;

    const buttonDelete = button(
        {
            id: `heading-remove-${incrementId}`,
            text: "",
            spanClass: "button-square-remove",
            buttonClass: "inputs-btn-delete",
        },
        removeElementForm
    );

    $parentDiv.classList.add("container-components");
    $parentDiv.classList.add(`container-control-row`);
    $parentDiv.style.justifyContent = "flex-end";
    $parentDiv.id = `card-btn-${type}-${incrementId}`;

    $buttonForm.className = `btn-${type} capitalize`;
    $buttonForm.id = id;
    $buttonForm.setAttribute("name", `btn-${type}`);
    $buttonForm.textContent = type;
    $buttonForm.type = buttonType;
    style ? ($buttonForm.style.width = style) : null;

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild($buttonForm);

    const $lastChildren = $containerCards?.lastElementChild;

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        object: "NavigationButtons",
        id,
        name: `card-btn-${type}-${incrementId}`,
        class: style ? `style='width: ${style}%;` : null,
        options: [
            {
                name: `btn-${type}`,
                type: buttonType,
                id: `btn-${id}`,
                label: type,
                style: style ? `style='width: ${style}%;` : null,
            },
        ],
    };

    storage.create(updateInputs, $lastChildren);
}