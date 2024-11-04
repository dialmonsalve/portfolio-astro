import modal from "../components/modal";
import button from "../components/button";
import inputComponent from "../components/inputComponent";

import storage from "../utils/saveAtLocalStorage";
import removeElementForm from "../utils/removeElements";
import cleanTextInputs from "../utils/cleanTextInputs";
import addRequiredToInput from "../utils/addRequiredToInput";
import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";

import type { AppInput, AppRadioButtons } from "../../web-components";
import type { Inputs } from "../interfaces";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export function create({ incrementId }: { incrementId: number }) {
  const $parentDiv = document.createElement("DIV");
  const $parentInput = document.createElement("DIV");
  const containerId = `card-number-${incrementId}`;
  const buttonIdRemove = `number-remove-${incrementId}`;
  const buttonIdUpdate = `number-update-${incrementId}`;

  const buttonUpdate = button(
    {
      id: buttonIdUpdate,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update input text",
        content: () => bodyModal(evt.target as HTMLButtonElement),
        action: () => update(evt.target as HTMLButtonElement, { incrementId }),
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

  const newLabel = "Edit text";

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  $parentInput.classList.add(`container-control-row`);
  $parentInput.setAttribute("disposition", "row");

  const $label = doc.createElement("label");
  const $input = doc.createElement("input");

  const id = `number-${incrementId}`;
  const name = `number-${incrementId}-${newLabel}`;

  $label.classList.add("container-control__label");
  $label.classList.add("label-column");
  $label.htmlFor = id;
  $label.textContent = newLabel;
  $label.setAttribute("disposition", "row");

  $input.type = "number";
  $input.setAttribute("name", name);
  $input.id = id;
  $input.classList.add("container-control__input-text");
  $input.setAttribute("autocomplete", "on");
  $input.setAttribute("data-required", "false");

  $parentInput.appendChild($label);
  $parentInput.appendChild($input);

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($parentInput);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs: Inputs = {
    buttonIdRemove,
    buttonIdUpdate,
    containerId,
    disposition: "row",
    id,
    label: newLabel,
    max: null,
    min: null,
    name,
    object: "Number",
    placeholder: null,
    required: false,
  };

  storage.create($lastChildren, updateInputs);
}

export function bodyModal(target: HTMLButtonElement) {
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

  const $parentContainer = target.closest(".container-components");

  const $parentInputs = $parentContainer?.lastElementChild;

  if (!$parentInputs) return;

  const $label = $parentInputs.querySelector("label");
  const $input = $parentInputs.querySelector("input");

  const labelText = cleanTextInputs($label);

  const newCheckedPosition = $parentInputs.getAttribute("disposition");

  const newPlaceholder = $input?.getAttribute("placeholder") || "";
  const newMin = $input?.getAttribute("min") || "";
  const newMax = $input?.getAttribute("max") || "";
  const newCheckedRequired = $input?.getAttribute("data-required");

  const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedRequired,
  }));

  const updatedPositionRadios = POSITION_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedPosition,
  }));

  $ContainerInputLabel.setAttribute("new_value", labelText);
  $ContainerInputPlaceholder.setAttribute("new_value", newPlaceholder);
  $ContainerInputMin.setAttribute("new_value", newMin);
  $ContainerInputMax.setAttribute("new_value", newMax);

  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios),
  );
  $radioButtonsPosition.setAttribute(
    "radios",
    JSON.stringify(updatedPositionRadios),
  );

  $parentDiv.appendChild($ContainerInputLabel);
  $parentDiv.appendChild($ContainerInputPlaceholder);
  $parentDiv.appendChild($ContainerInputMin);
  $parentDiv.appendChild($ContainerInputMax);
  $parentDiv.appendChild($radioButtonsRequired);
  $parentDiv.appendChild($radioButtonsPosition);

  return $parentDiv;
}

export function update(
  target: HTMLButtonElement,
  { incrementId }: { incrementId: number },
) {
  const $parentContainer = target.closest(".container-components");
  const $parentInputs = $parentContainer?.lastElementChild;
  const $label = $parentInputs?.querySelector("label");
  const $input = $parentInputs?.querySelector("input");

  const $radioButtonsRequired = $(
    "#container-radios-required",
  ) as AppRadioButtons;
  const $radioButtonsPosition = $(
    "#container-radios-position",
  ) as AppRadioButtons;
  const $ContainerInputLabel = $("#container-input-label") as AppInput;
  const $ContainerInputPlaceholder = $(
    "#container-input-placeholder",
  ) as AppInput;
  const $ContainerInputMin = $("#container-input-min") as AppInput;
  const $ContainerInputMax = $("#container-input-max") as AppInput;

  const labelText = cleanTextInputs($label);

  const newLabel = $ContainerInputLabel.change
    ? $ContainerInputLabel.value
    : labelText;

  const newPlaceholder = $ContainerInputPlaceholder.change
    ? $ContainerInputPlaceholder.value
    : $input?.getAttribute("placeholder") || "";

  const newMin = $ContainerInputMin.change
    ? $ContainerInputMin.value
    : $input?.getAttribute("min") || "";

  const newMax = $ContainerInputMax.change
    ? $ContainerInputMax.value
    : $input?.getAttribute("max") || "";

  const newCheckedRequired = $radioButtonsRequired.change
    ? $radioButtonsRequired.value
    : $input?.getAttribute("data-required") || "false";

  const newCheckedPosition = $radioButtonsPosition.change
    ? $radioButtonsPosition.value
    : $parentInputs?.getAttribute("disposition") || "row";

  if (newLabel === "") return;

  $label!.textContent = newLabel;

  addRequiredToInput({
    checkedRequired: newCheckedRequired as "false",
    elementRequired: $label!,
    min: Number(newMin),
    max: Number(newMax),
  });

  $parentInputs!.className = "";
  $parentInputs?.classList.add(`container-control-${newCheckedPosition}`);
  $parentInputs?.setAttribute("disposition", newCheckedPosition);

  const inputName = $input?.getAttribute("name") || "";
  const name = `number-${incrementId}-${newLabel}`;
  $input?.setAttribute("placeholder", newPlaceholder);
  $input?.setAttribute("data-required", newCheckedRequired);
  $input?.setAttribute("min", newMin);
  $input?.setAttribute("max", newMax);
  $input?.setAttribute("name", inputName);

  const rest = {
    disposition: newCheckedPosition,
    name,
    label: newLabel,
    placeholder: newPlaceholder.trim() !== "" ? newPlaceholder : null,
    required: newCheckedRequired.trim() === "true",
    min: newMin?.trim() === "" ? null : newMin?.trim(),
    max: newMax?.trim() === "" ? null : newMax?.trim(),
  };

  storage.update(target, rest);
}
