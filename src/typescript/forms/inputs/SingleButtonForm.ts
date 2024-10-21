import button from "../components/Button";

import removeElementForm from "../utils/removeElements";

import storage from "../utils/saveAtLocalStorage";

const doc = document;

const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

interface Create {
    type: 'submit' | 'next';
    incrementId: number;
    buttonType: "submit" | "button";
    style?: number
}

export function create({ type, incrementId, buttonType, style }: Create) {
    const $parentDiv = document.createElement("div");
    const $buttonForm = document.createElement("button");
    const buttonIdRemove = `btn-${type}-remove-${incrementId}`;
    const containerId = `card-btn-${type}-${incrementId}`;

    const id = `${type}-${incrementId}`;

    const buttonDelete = button(
        {
            id: buttonIdRemove,
            text: "",
            spanClass: "button-square-remove",
            buttonClass: "inputs-btn-delete",
        },
        removeElementForm
    );

    $parentDiv.classList.add("container-components");
    $parentDiv.classList.add(`container-control-row`);
    $parentDiv.style.justifyContent = "flex-end";
    $parentDiv.id = containerId;

    $buttonForm.className = `btn-${type} capitalize`;
    $buttonForm.id = id;
    $buttonForm.setAttribute("name", `btn-${type}`);
    $buttonForm.textContent = type;
    $buttonForm.type = buttonType;
    style && style > 1 ? ($buttonForm.style.width = `${style}%`) : null;

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild($buttonForm);

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate: null,
        class: `style='width: ${style}%';`,
        containerId,
        id,
        name: containerId,
        object: "NavigationButtons" as "NavigationButtons",
        options: [
            {
                name: `btn-${type}`,
                type: buttonType,
                id: `btn-${id}`,
                label: type as "Next" | "Submit",
                style: style ? `style='width: ${style}%;` : null,
            },
        ],
    };

    storage.create($lastChildren, updateInputs,);
}
