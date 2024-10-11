import inputComponent from "./inputComponent";
import button from "./button";

import modal from "../components/modal";
import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage.js";
import type { AppInput, AppRadioButtons } from "../webComponents";

type InputType = 'email' | 'text' | 'password' | 'phone';
type InputObject = 'Email' | 'Text' | 'Password' | 'Phone';


const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

function configure(target: HTMLButtonElement, incrementId: number, type: InputType) {
  modal({
    title: "update input text",
    content: () => bodyModal(target, { type, }),
    action: () => update(target, incrementId, type),
  });
}

function bodyModal(target: HTMLButtonElement, { type }: { type: InputType }) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons");
  const $radioButtonsPosition = doc.createElement("app-radio-buttons");

  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsPosition.setAttribute("name", "inputs-position");
  $radioButtonsRequired.id = "container-radios-required";

  $radioButtonsPosition.setAttribute("label", "Position:");
  $radioButtonsRequired.setAttribute("name", "inputs-required");
  $radioButtonsPosition.id = "container-radios-position";

  const $ContainerInputLabel = inputComponent({
    name: "input-label",
    type,
    label: "Label",
    id: `container-input-label`,
  });

  const $ContainerInputPlaceholder = inputComponent({
    name: "input-placeholder",
    type,
    label: "Placeholder",
    id: "container-input-placeholder",
  });

  const $parentInputs = target.closest(".container-components");

  const $label = $parentInputs?.querySelector("label");
  const $input = $parentInputs?.querySelector("input");

  const newLabel = $label?.textContent || '';
  const newCheckedPosition = $label?.getAttribute("disposition");

  const newPlaceholder = $input?.getAttribute("placeholder") || "";
  const newCheckedRequired = $input?.getAttribute("data-required");

  if (!$parentInputs) return;

  const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedRequired,
  }));

  const updatedPositionRadios = POSITION_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedPosition,
  }));

  $ContainerInputLabel.setAttribute("new_value", newLabel);
  $ContainerInputPlaceholder.setAttribute("new_value", newPlaceholder);
  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios)
  );
  $radioButtonsPosition.setAttribute(
    "radios",
    JSON.stringify(updatedPositionRadios)
  );

  $parentDiv.appendChild($ContainerInputLabel);
  $parentDiv.appendChild($ContainerInputPlaceholder);
  $parentDiv.appendChild($radioButtonsRequired);
  $parentDiv.appendChild($radioButtonsPosition);

  return $parentDiv;
}

export function create(incrementId: number, { object, type }: { object: InputObject, type: InputType }) {
  const $parentDiv = document.createElement("DIV");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt.target as HTMLButtonElement, incrementId, type)
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

  const newLabel = "edit text";

  $parentDiv.classList.add("container-components");

  $parentDiv.classList.add(`container-control-row`);
  $parentDiv.id = `card-input-${incrementId}`;

  const $label = doc.createElement("LABEL") as HTMLLabelElement;
  const $input = doc.createElement("INPUT") as HTMLInputElement;

  const id = `${type}-${incrementId}`;
  const name = `${type}-${incrementId}-${newLabel}`;

  $label.classList.add("container-control__label");
  $label.htmlFor = id;
  $label.textContent = newLabel;
  $label.setAttribute("disposition", "row");

  $input.type = type;
  $input.setAttribute("name", name);
  $input.id = id;
  $input.classList.add("container-control__input-text");
  $input.setAttribute("autocomplete", "on");
  $input.setAttribute("data-required", "false");

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($label);
  $parentDiv?.appendChild($input);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object,
    id,
    name,
    label: newLabel,
    disposition: "row",
    placeholder: null,
    required: false,
  };

  storage.create(updateInputs, $lastChildren);
}

function update(target: HTMLButtonElement, incrementId: number, type: InputType) {
  const parentElement = target.closest(".container-components") as HTMLDivElement;
  const $label = parentElement?.querySelector("label") as HTMLLabelElement;
  const $input = parentElement?.querySelector("input") as HTMLInputElement;

  const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
  const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
  const $ContainerInputLabel = $("#container-input-label") as AppInput;
  const $ContainerInputPlaceholder = $("#container-input-placeholder") as AppInput;

  const isPlaceholderChanged = $ContainerInputPlaceholder.change;
  const isRequiredChanged = $radioButtonsRequired.change;
  const isDispositionChanged = $radioButtonsPosition.change;

  const newLabel = $ContainerInputLabel.change
    ? $ContainerInputLabel.value
    : $label?.textContent;

  const newPlaceholder = isPlaceholderChanged
    ? $ContainerInputPlaceholder.value
    : $input?.getAttribute("placeholder") || '';

  const newCheckedRequired = isRequiredChanged
    ? $radioButtonsRequired.value
    : $input?.getAttribute("data-required") || '';

  const newCheckedPosition = isDispositionChanged
    ? $radioButtonsPosition.value
    : $label?.getAttribute("disposition") || '';

  if (newLabel === "") return;

  parentElement.className = "";
  parentElement.classList.add("container-components");
  parentElement.classList.add(`container-control-${newCheckedPosition}`);

  $label.textContent = newLabel;
  $label.setAttribute("disposition", newCheckedPosition);
  const name = `${type}-${incrementId}-${newLabel}`;
  $input.setAttribute("placeholder", newPlaceholder);
  $input.setAttribute("data-required", newCheckedRequired);
  $input.setAttribute("name", name);

  const rest = {
    disposition: newCheckedPosition,
    name,
    label: newLabel,
    placeholder: newPlaceholder.trim() !== "" ? newPlaceholder : null,
    required: newCheckedRequired.trim() === "true" ? true : false,
  };

  storage.update(parentElement, $input, rest);
}