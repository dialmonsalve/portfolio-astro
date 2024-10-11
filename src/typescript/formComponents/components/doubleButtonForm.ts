import button from "./button";

import removeElementForm from "../utils/removeElements";

import storage from "../utils/saveAtLocalStorage";

interface Create {
  type: "next" | "submit";
  incrementId: number;
  buttonType: "button" | "submit"
  style?: string
}

const doc = document;

const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export function create({ type, incrementId, buttonType }: Create) {
  const $parentDiv = document.createElement("DIV");
  const $buttonFormBack = document.createElement("BUTTON") as HTMLButtonElement;
  const $buttonFormNext = document.createElement("BUTTON") as HTMLButtonElement;

  const btnBack = `both-back-${incrementId}`;
  const btnNext = `both-${type}-${incrementId}`;

  const id = `both-${type}-${incrementId}`;

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
  $parentDiv.id = `card-btn-${type}-${incrementId}`;

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

  const $lastChildren = $containerCards?.lastElementChild;

  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object: "NavigationButtons",
    id,
    name: `card-btn-${type}-${incrementId}`,
    options: [
      {
        name: btnBack,
        type: "button",
        id: `btn-${btnBack}`,
        label: "Back",
      },
      {
        name: btnNext,
        type: buttonType,
        id: `btn-${btnNext}`,
        label: type,
      },
    ],
  };

  storage.create(updateInputs, $lastChildren);
}