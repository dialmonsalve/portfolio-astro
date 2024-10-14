import button from "../components/button";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";

const doc = document;

const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

interface Create {
    type: 'submit' | 'next';
    incrementId: number;
    buttonType: "submit" | "button"
}

export function create({ type, incrementId, buttonType }: Create) {
    const $parentDiv = document.createElement("DIV");
    const $buttonFormBack = document.createElement("BUTTON") as HTMLButtonElement;
    const $buttonFormNext = document.createElement("BUTTON") as HTMLButtonElement;

    const buttonIdRemove = `both-back-${type}-remove-${incrementId}`;
    const containerId = `card-both-back-${type}-${incrementId}`;

    const btnBack = `both-back-${incrementId}`;
    const btnNext = `both-${type}-${incrementId}`;

    const id = `both-${type}-${incrementId}`;

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
    $parentDiv.id = containerId;

    $buttonFormBack.className = `btn-back capitalize`;
    $buttonFormBack.id = btnBack;
    $buttonFormBack.setAttribute("name", `btn-back`);
    $buttonFormBack.textContent = "Back";
    $buttonFormBack.type = "button";

    $buttonFormNext.className = `btn-${type} capitalize`;
    $buttonFormNext.id = btnNext;
    $buttonFormNext.setAttribute("name", `btn-${type}`);
    $buttonFormNext.textContent = type;
    $buttonFormNext.type = buttonType;

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild($buttonFormBack);
    $parentDiv.appendChild($buttonFormNext);

    const $lastChildren = $containerCards?.lastElementChild as HTMLDivElement;

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        buttonIdRemove,
        buttonIdUpdate: null,
        class: null,
        containerId,
        id,
        name: `card-btn-${type}-${incrementId}`,
        object: "NavigationButtons" as "NavigationButtons",
        options: [
            {
                name: btnBack,
                type: "button" as "button",
                id: `btn-${btnBack}`,
                label: "Back" as "Back",
                style: null,
            },
            {
                name: btnNext,
                type: buttonType,
                id: `btn-${btnNext}`,
                label: type as "Next" | "Submit",
                style: null,
            },
        ],
    };

    storage.create($lastChildren, updateInputs);
}
