import modal from "../components/modal.js";
import button from "../components/button.js";
import inputComponent from "../components/inputComponent.js";

import removeElementForm from "../utils/removeElements.js";
import storage from "../utils/saveAtLocalStorage.js";
import type AppRadioButtons from "../webComponents/AppRadioButtons.js";
import type AppInput from "../webComponents/AppInput.js";

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

export default function headings() {
  const $headings = document.querySelector("#heading");
  let incrementId = 0;

  $headings?.addEventListener("click", () => {
    incrementId++;
    create(incrementId);
  });
}

function configure(target: HTMLButtonElement, incrementId: number) {
  modal({
    title: "update title",
    content: () => bodyModal(target),
    action: () => update(target,),
  });
}

function bodyModal(target: HTMLButtonElement) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtons = doc.createElement("app-radio-buttons");
  const $containerInput = inputComponent({
    name: "input-headings",
    type: "text",
    id: "container-input-headings",
    label: "title",
  });

  $radioButtons.id = "container-radios-headings";
  $radioButtons.setAttribute("name", "headings");

  const $parentInputs = target.closest(".container-components");

  if (!$parentInputs) return;

  const $headingElement = $parentInputs.lastElementChild;

  const newTitle = $headingElement.textContent;
  const tagName = $headingElement.tagName;

  const updatedRadios = radioButtonsData.map((radio) => ({
    ...radio,
    isChecked: radio.value.toUpperCase() === tagName,
  }));

  $containerInput.setAttribute("new_value", newTitle);

  $radioButtons.setAttribute("radios", JSON.stringify(updatedRadios));

  $parentDiv.appendChild($containerInput);
  $parentDiv.appendChild($radioButtons);

  return $parentDiv;
}

function create(incrementId: number) {
  const $parentDiv = document.createElement("DIV");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt.target as HTMLButtonElement, incrementId)
  );

  const buttonDelete = button(
    {
      id: `heading-remove-${incrementId}`,
      text: "",
      spanClass: "button-square-remove",
      buttonClass: "inputs-btn-delete",
    },
    removeElementForm
  );

  const $lastChildren = $containerCards?.lastElementChild;

  $parentDiv.classList.add("container-components");
  $parentDiv.id = `card-heading-${incrementId}`;

  const $heading = doc.createElement("H2");
  const id = `h2-${incrementId}`;
  const name = `h2-${incrementId}`;
  $heading.id = id;
  $heading.setAttribute("name", name);

  $heading.classList.add(`heading2`);
  $heading.textContent = "Edit title";

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($heading);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object: "Heading",
    id,
    name,
    label: "Edit title",
    heading: 'h2',
  };

  storage.create(updateInputs, $lastChildren);
}

function update(target: HTMLButtonElement) {
  const $parentElement = target.closest(".container-components");
  const $headingElement = $parentElement?.lastElementChild;

  const $radioButtons = $("#container-radios-headings") as AppRadioButtons;
  const $containerInput = $("#container-input-headings")as AppInput ;


  const newChecked = $radioButtons?.change ? $radioButtons?.value : $headingElement?.tagName.toLowerCase();

  const newValue = $containerInput?.change ? $containerInput.value : $headingElement?.textContent;

  const id = $headingElement?.id;
  const name = $headingElement?.getAttribute("name");

  $headingElement?.remove();

  const $heading = doc.createElement(newChecked);
  $heading.id = id;
  $heading.setAttribute("name", name);

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
  $heading.textContent = newValue;

  $parentElement?.appendChild($heading);

  const rest = {
    heading: newChecked,
    label: newValue,
  };

  storage.update($parentElement, $heading, rest);
}