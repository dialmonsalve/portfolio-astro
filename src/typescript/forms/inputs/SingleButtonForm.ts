import button from "../components/button";

import removeElementForm from "../utils/removeElements";

import storage from "../utils/saveAtLocalStorage";
import type { Inputs } from "../interfaces";

const doc = document;

const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

interface OptionsButton {
  type: "next" | "submit";
  buttonType: "button" | "submit";
  incrementId: number;
  style?: number;
}

export function create({
  type,
  incrementId,
  buttonType,
  style,
}: OptionsButton) {
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
    removeElementForm,
  );

  $parentDiv.classList.add("container-components");
  $parentDiv.classList.add(`isDraggable`);
  $parentDiv.classList.add(`container-control-row`);
  $parentDiv.style.justifyContent = "flex-end";
  $parentDiv.id = containerId;

  $buttonForm.className = `btn-${type} capitalize`;
  $buttonForm.id = id;
  $buttonForm.setAttribute("name", `btn-${type}`);
  $buttonForm.textContent = type;
  $buttonForm.type = buttonType;

  if (style && style > 1) {
    $buttonForm.style.width = `${style}%`;
  }

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild($buttonForm);

  const $lastChildren = $containerCards?.lastElementChild;

  $lastChildren?.appendChild($parentDiv);

  const updateInputs: Inputs = {
    buttonIdRemove,
    buttonIdUpdate: null,
    containerId,
    id,
    name: containerId,
    object: "NavigationButtons",
    disposition: "row",
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

  storage.create($lastChildren, updateInputs);
}
