import modal from "../components/modal";
import button from "../components/button";
import inputComponent from "../components/inputComponent";
import removeElementForm from "../utils/removeElements";

import saveAtLocalStorage from "../utils/saveAtLocalStorage";
import type { AppRadioButtons, AppInput } from "../webComponents/";
import { PAGES_STRING } from "../const";
import type { Page } from "../interface";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

let newValue:string = "";
let newChecked:string = "";

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
  const $headings = document.querySelector("#heading") as HTMLHeadingElement;
  let incrementId = 0;

  $headings.addEventListener("click", (evt) => {
    incrementId++;

    modal({
      title: "create title",
      content: () => bodyModal(evt.target as HTMLDivElement, "create"),
      action: () => addElementForm(evt.target, incrementId),
    });
  });
}

function update(evt: MouseEvent, $parentDiv: HTMLDivElement) {
  modal({
    title: "update title",
    content: () => bodyModal(evt.target as HTMLDivElement, "update"),
    action: () => updateElementForm($parentDiv),
  });
}

function bodyModal(target: HTMLDivElement, type: 'create' | 'update') {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtons = doc.createElement("app-radio-buttons");
  const $ContainerInput = inputComponent({
    name: "input-headings",
    type: "text",
    id: "container-input-headings",
    label: "title"
  });

  $radioButtons.id = "container-radios-headings";

  if (type === "create") {
    $radioButtons.setAttribute("radios", JSON.stringify(radioButtonsData));
  } else {
    const $parentInputs = target?.closest(".container-components") as HTMLDivElement;

    if (!$parentInputs) return;

    const $headingElement = $parentInputs.lastElementChild;

    const newTitle = $headingElement?.textContent as string;
    const tagName = $headingElement?.tagName;

    const updatedRadios = radioButtonsData.map((radio) => ({
      ...radio,
      isChecked: radio.value.toUpperCase() === tagName,
    }));

    $ContainerInput.setAttribute("new_value", newTitle);

    $radioButtons.setAttribute("radios", JSON.stringify(updatedRadios));
  }

  $parentDiv.appendChild($ContainerInput);
  $parentDiv.appendChild($radioButtons);

  return $parentDiv;
}

function addElementForm(target: EventTarget | null, incrementId: number) {
  const $radioButtons = $("#container-radios-headings") as AppRadioButtons;
  const $ContainerInput = $("#container-input-headings") as AppInput;
  const $parentDiv = document.createElement("DIV") as HTMLDivElement;

  const buttonUpdate = button({
    id: `heading-update-${incrementId}`,
    text: "",
    spanClass: "button-square-update",
    buttonClass: "inputs-btn-update",
  }, (evt) => update(evt, $parentDiv));

  const buttonDelete = button({
    id: `heading-remove-${incrementId}`,
    text: "",
    spanClass: "button-square-remove",
    buttonClass: "inputs-btn-delete",
  }, removeElementForm);

  const $lastChildren = $containerCards?.lastElementChild;

  newChecked = $radioButtons.value;
  newValue = $ContainerInput.value;

  if (newValue.trim() === "") return;

  $parentDiv.classList.add("container-components");
  $parentDiv.id = `card-heading-${incrementId}`;

  const $heading = doc.createElement(newChecked);
  const id = `${newChecked}-${incrementId}`;
  const name = `${newChecked}-${incrementId}`;
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

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($heading);
  $lastChildren?.appendChild($parentDiv);

  const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

  const updateInputs = {
    object: "Heading",
    id,
    name,
    label: newValue,
    heading: newChecked,
  };

  const updatedPages = pages.map((page) => {
    if (page.id === $lastChildren?.getAttribute("id")) {
      return {
        ...page,
        inputs: [...page.inputs, updateInputs],
      };
    }
    return page;
  });

  saveAtLocalStorage(updatedPages);
}

function updateElementForm(parentElement: HTMLDivElement) {
  const $headingElement = parentElement.lastElementChild  as HTMLHeadElement;

  const $radioButtons = $("#container-radios-headings") as AppRadioButtons;
  const $ContainerInput = $("#container-input-headings") as AppInput;

  newChecked = $radioButtons.value === "" ? newChecked : $radioButtons.value;

  newValue = $ContainerInput.value === "" ? newValue : $ContainerInput.value;

  if (newValue === "") return;

  const id = $headingElement.id;
  const name = $headingElement?.getAttribute("name") as string;

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

  parentElement?.appendChild($heading);

  const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

  const updatedPages = pages.map((page) =>
    page.id === parentElement?.parentElement?.id
      ? {
        ...page,
        inputs: page.inputs.map((input) => ({
          ...input,
          heading: newChecked,
          label: newValue,
        })),
      }
      : page
  );
  saveAtLocalStorage(updatedPages);
}