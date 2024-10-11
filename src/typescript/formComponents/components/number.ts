import modal from "../components/modal";
import button from "./button.js";
import inputComponent from "./inputComponent";

import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";
import type { AppInput, AppRadioButtons } from "../webComponents";


const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

function configure(target: HTMLButtonElement) {
  modal({
    title: "update input text",
    content: () => bodyModal(target),
    action: () => update(target),
  });
}

function bodyModal(target: HTMLButtonElement) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons");
  const $radioButtonsPosition = doc.createElement("app-radio-buttons");

  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsRequired.id = "container-radios-required";
  $radioButtonsRequired.setAttribute("name", "inputs-required");

  $radioButtonsPosition.setAttribute("label", "Position:");
  $radioButtonsPosition.setAttribute("name", "inputs-position");
  $radioButtonsPosition.id = "container-radios-position";

  const $ContainerInputLabel = inputComponent({
    name: "input-label",
    type: "text",
    label: "Label",
    id: "container-input-label",
  });

  const $ContainerInputPlaceholder = inputComponent({
    name: "input-placeholder",
    type: "text",
    label: "Placeholder",
    id: "container-input-placeholder",
  });

  const $ContainerInputStep = inputComponent({
    name: "input-step",
    type: "number",
    label: "Step",
    id: "container-input-step",
  });

  const $ContainerInputMin = inputComponent({
    name: "input-min",
    type: "number",
    label: "Min",
    id: "container-input-min",
  });

  const $ContainerInputMax = inputComponent({
    name: "input-max",
    type: "number",
    label: "Max",
    id: "container-input-max",
  });

  const $parentInputs = target.closest(".container-components");
  const $label = $parentInputs?.querySelector("label") as HTMLLabelElement;
  const $input = $parentInputs?.querySelector("input") as HTMLInputElement;

  const newLabel = $label.textContent || '';
  const newCheckedPosition = $label.getAttribute("disposition");

  const newPlaceholder = $input.getAttribute("placeholder") || "";
  const newStep = $input.getAttribute("step") || "";
  const newMin = $input.getAttribute("min") || "";
  const newMax = $input.getAttribute("max") || "";
  const newCheckedRequired = $input.getAttribute("data-required");

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
  $ContainerInputStep.setAttribute("new_value", newStep);
  $ContainerInputMin.setAttribute("new_value", newMin);
  $ContainerInputMax.setAttribute("new_value", newMax);

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
  $parentDiv.appendChild($ContainerInputStep);
  $parentDiv.appendChild($ContainerInputMin);
  $parentDiv.appendChild($ContainerInputMax);
  $parentDiv.appendChild($radioButtonsRequired);
  $parentDiv.appendChild($radioButtonsPosition);

  return $parentDiv;
}

export function create(incrementId: string) {
  const $parentDiv = document.createElement("DIV");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt.target as HTMLButtonElement)
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

  const newLabel = "Edit text";

  $parentDiv.classList.add("container-components");

  $parentDiv.classList.add(`container-control-row`);
  $parentDiv.id = `card-input-${incrementId}`;

  const $label = doc.createElement("LABEL") as HTMLLabelElement;
  const $input = doc.createElement("INPUT") as HTMLInputElement;

  const id = `number-${incrementId}`;
  const name = `number-${incrementId}-${newLabel}`;

  $label.classList.add("container-control__label");
  $label.htmlFor = id;
  $label.textContent = newLabel;
  $label.setAttribute("disposition", "row");

  $input.type = "number";
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
    object: "Number",
    id,
    name,
    label: newLabel,
    disposition: "row",
    placeholder: null,
    required: false,
    step: null,
    min: null,
    max: null,
  };

  storage.create(updateInputs, $lastChildren);
}

function update(target: HTMLButtonElement) {
  const parentElement = target.closest(".container-components") as HTMLDivElement;
  const $label = parentElement?.querySelector("label")as HTMLLabelElement;
  const $input = parentElement?.querySelector("input") as HTMLInputElement;

  const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
  const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
  const $ContainerInputLabel = $("#container-input-label") as AppInput;
  const $ContainerInputPlaceholder = $("#container-input-placeholder") as AppInput;
  const $ContainerInputStep = $("#container-input-step") as AppInput;
  const $ContainerInputMin = $("#container-input-min") as AppInput;
  const $ContainerInputMax = $("#container-input-max") as AppInput;

  const isPlaceholderChanged = $ContainerInputPlaceholder.change;
  const isStepChanged = $ContainerInputStep.change;
  const isMinChanged = $ContainerInputMin.change;
  const isMaxChanged = $ContainerInputMax.change;

  const isRequiredChanged = $radioButtonsRequired.change;
  const isDispositionChanged = $radioButtonsPosition.change;

  const newLabel = $ContainerInputLabel.change
    ? $ContainerInputLabel.value
    : $label?.textContent;

  const newPlaceholder = isPlaceholderChanged
    ? $ContainerInputPlaceholder.value
    : $input?.getAttribute("placeholder") || '';

  const newSteps = isStepChanged
    ? $ContainerInputStep.value
    : $input?.getAttribute("step") || '';

  const newMin = isMinChanged
    ? $ContainerInputMin.value
    : $input?.getAttribute("min") || '';

  const newMax = isMaxChanged
    ? $ContainerInputMax.value
    : $input?.getAttribute("max") || '';

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
  $label?.setAttribute("disposition", newCheckedPosition);
  const name = $input?.getAttribute("name") || '';
  $input?.setAttribute("placeholder", newPlaceholder);
  $input?.setAttribute("data-required", newCheckedRequired);
  $input?.setAttribute("step", newSteps);
  $input?.setAttribute("min", newMin);
  $input?.setAttribute("max", newMax);
  $input?.setAttribute("name", name);

  const rest = {
    disposition: newCheckedPosition,
    name,
    label: newLabel,
    placeholder: newPlaceholder.trim() !== "" ? newPlaceholder : null,
    required: newCheckedRequired.trim() === "true" ? true : false,
    step: newSteps.trim() === "" ? null : newSteps.trim(),
    min: newMin.trim() === "" ? null : newMin.trim(),
    max: newMax.trim() === "" ? null : newMax.trim(),
  };

  storage.update(parentElement, $input, rest);
}