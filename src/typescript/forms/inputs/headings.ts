import modal from "../components/modal";
import button from "../components/button";
import inputComponent from "../components/inputComponent";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";
import { AppInput, AppRadioButtons } from "../../web-components";
import type { Inputs } from "../interfaces";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

const radioButtonsData = [
  {
    name: "heading",
    value: "h2",
    labelText: "title",
    id: "h2",
  },
  {
    name: "heading",
    value: "h3",
    labelText: "subtitle",
    id: "h3",
  },
  {
    name: "heading",
    value: "h4",
    labelText: "subtitle 2",
    id: "h4",
  },
  {
    name: "heading",
    value: "h5",
    labelText: "normal",
    id: "h5",
  },
  {
    name: "heading",
    value: "h6",
    labelText: "normal 2",
    id: "h6",
  },
];

export function create({ incrementId }: { incrementId: number }) {
  const $parentDiv = document.createElement("DIV");
  const $parentInput = document.createElement("DIV");
  const containerId = `card-heading-${incrementId}`;
  const buttonIdRemove = `heading-remove-${incrementId}`;
  const buttonIdUpdate = `heading-update-${incrementId}`;

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update title",
        content: () => bodyModal(evt.target as HTMLButtonElement),
        action: () => update(evt.target as HTMLButtonElement),
      }),
  );

  const buttonDelete = button(
    {
      id: buttonIdRemove,
      text: "",
      spanClass: "button-square-remove",
      buttonClass: "inputs-btn-delete",
    },
    removeElementForm,
  );

  const $lastChildren = $containerCards?.lastElementChild;

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  const id = `heading-${incrementId}`;
  const name = `heading-${incrementId}`;

  $parentInput.classList.add("container-control-row");
  $parentInput.setAttribute("position", "row");

  const $heading = doc.createElement("H2");
  $heading.id = id;
  $heading.setAttribute("name", name);

  $heading.classList.add(`heading2`);
  $heading.textContent = "Edit title";

  $parentInput?.appendChild($heading);
  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($parentInput);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs: Inputs = {
    buttonIdRemove,
    buttonIdUpdate,
    containerId,
    disposition: "row",
    heading: "h2",
    id,
    label: "Edit title",
    name,
    object: "Heading",
  };

  storage.create($lastChildren, updateInputs);
}

export function bodyModal(target: HTMLButtonElement) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtons = doc.createElement(
    "app-radio-buttons",
  ) as AppRadioButtons;
  const $containerInput = inputComponent({
    name: "input-headings",
    type: "text",
    id: "container-input-headings",
    label: "title",
  });

  $radioButtons.id = "container-radios-headings";
  $radioButtons.setAttribute("name", "headings");

  const $parentContainer = target.closest(".container-components");

  const $parentInputs = $parentContainer?.lastElementChild;

  if (!$parentInputs) return;

  const $headingElement = $parentInputs.lastElementChild;

  const tagName = $headingElement?.tagName;

  const oldLabel = $headingElement?.textContent?.trim();

  const newLabel = $radioButtons.change ? $radioButtons.value : oldLabel || "";

  const updatedRadios = radioButtonsData.map((radio) => ({
    ...radio,
    isChecked: radio.value.toUpperCase() === tagName,
  }));

  $containerInput.setAttribute("new_value", newLabel);

  $radioButtons.setAttribute("radios", JSON.stringify(updatedRadios));

  $parentDiv.appendChild($containerInput);
  $parentDiv.appendChild($radioButtons);

  return $parentDiv;
}

export function update(target: HTMLButtonElement) {
  const $parentContainer = target.closest(".container-components");
  const $parentInputs = $parentContainer?.lastElementChild;

  if (!$parentInputs) return;

  const $headingElement = $parentInputs.lastElementChild;

  const $radioButtons = $("#container-radios-headings") as AppRadioButtons;
  const $containerInput = $("#container-input-headings") as AppInput;

  const newChecked = $radioButtons.change
    ? $radioButtons.value
    : $headingElement?.tagName.toLowerCase() || "";

  const newValue = $containerInput.change
    ? $containerInput.value
    : $headingElement?.textContent;

  const id = $headingElement?.id;
  const name = $headingElement?.getAttribute("name");

  $headingElement?.remove();

  const $heading = doc.createElement(newChecked) as HTMLHeadElement;
  $heading.id = id!;
  $heading.setAttribute("name", name || "");

  const num =
    newChecked === "h2"
      ? "2"
      : newChecked === "h3"
        ? "3"
        : newChecked === "h4"
          ? "4"
          : newChecked === "h5"
            ? "5"
            : "6";

  $heading.classList.add(`heading${num}`);
  $heading.textContent = newValue || "";

  $parentInputs?.appendChild($heading);

  const rest = {
    heading: newChecked,
    label: newValue,
  };

  storage.update(target, rest);
}
