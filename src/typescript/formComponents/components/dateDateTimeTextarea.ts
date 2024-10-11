import modal from "../components/modal";
import button from "./button";
import inputComponent from "./inputComponent";
import removeElementForm from "../utils/removeElements";
import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";

import storage from "../utils/saveAtLocalStorage";
import type { AppRadioButtons } from "../webComponents";

interface Create {
  object: "Date" | 'DateTime' | 'Textarea';
  type: "date" | 'time' | 'textarea',
  input: "INPUT" | 'TEXTAREA';
}

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

function bodyModal(target: HTMLElement, { input = "input" }) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons");
  const $radioButtonsPosition = doc.createElement("app-radio-buttons");

  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsRequired.id = "container-radios-required";
  $radioButtonsRequired.setAttribute("name", "inputs-required");

  $radioButtonsPosition.setAttribute("name", "inputs-position");
  $radioButtonsPosition.setAttribute("label", "Position:");
  $radioButtonsPosition.id = "container-radios-position";

  const $ContainerInputLabel = inputComponent({
    name: "input-label",
    type: "text",
    label: "Label",
    id: "container-input-label",
  });
  const $parentInputs = target.closest(".container-components");

  const $label = $parentInputs?.querySelector("label");
  const $input = $parentInputs?.querySelector(input);

  const newLabel = $label?.textContent || '';
  const newCheckedPosition = $label?.getAttribute("disposition");

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
  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios)
  );
  $radioButtonsPosition.setAttribute(
    "radios",
    JSON.stringify(updatedPositionRadios)
  );

  $parentDiv.appendChild($ContainerInputLabel);
  $parentDiv.appendChild($radioButtonsRequired);
  $parentDiv.appendChild($radioButtonsPosition);

  return $parentDiv;
}

export function create(incrementId: number, { object, type, input }: Create) {
  const $parentDiv = document.createElement("DIV");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt.target as HTMLButtonElement, incrementId, type, input)
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
  const isArea = input === "TEXTAREA" ? "column" : "row";

  $parentDiv.classList.add("container-components");

  $parentDiv.classList.add(`container-control-${isArea}`);
  $parentDiv.id = `card-input-${incrementId}`;

  const $label = doc.createElement("LABEL") as HTMLLabelElement;
  const $input = doc.createElement(input) as HTMLInputElement;

  const id = `${type}-${incrementId}`;
  const name = `${type}-${incrementId}-${newLabel}`;

  $label.classList.add("container-control__label");
  $label.htmlFor = id;
  $label.textContent = newLabel;
  $label.setAttribute("disposition", isArea);

  if (input === "INPUT") {
    $input.type = type;
  }
  $input.setAttribute("name", name);
  $input.id = id;

  const className =
    input === "INPUT"
      ? "container-control__input-text"
      : "container-control__input-textarea";

  $input.classList.add(className);
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
    disposition: isArea,
    required: false,
  };

  storage.create(updateInputs, $lastChildren);
}

function configure(target: HTMLButtonElement, incrementId: number, type: "date" | 'time' | 'textarea', input: "INPUT" | 'TEXTAREA') {
  modal({
    title: "update input text",
    content: () => bodyModal(target, { input }),
    action: () => update(target, incrementId, type, input),
  });
}

function update(target: HTMLButtonElement, incrementId: number, type: "date" | 'time' | 'textarea', input: "INPUT" | 'TEXTAREA') {
  const parentElement = target.closest(".container-components") as HTMLDivElement;
  const $label = parentElement?.querySelector("label") as HTMLLabelElement;
  const $input = parentElement?.querySelector(input) as HTMLInputElement;

  const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
  const $radioButtonsPosition = $("#container-radios-position") as AppRadioButtons;
  const $ContainerInputLabel = $("#container-input-label") as AppRadioButtons;

  const isRequiredChanged = $radioButtonsRequired?.change;
  const isDispositionChanged = $radioButtonsPosition?.change;

  const newLabel = $ContainerInputLabel.change
    ? $ContainerInputLabel.value
    : $label?.textContent;

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
  $input.setAttribute("data-required", newCheckedRequired);
  $input.setAttribute("name", name);

  const rest = {
    disposition: newCheckedPosition,
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true" ? true : false,
  };

  storage.update(parentElement, $input, rest);
}