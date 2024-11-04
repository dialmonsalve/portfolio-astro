import modal from "../components/modal";
import button from "../components/button";
import inputComponent from "../components/inputComponent";
import removeElementForm from "../utils/removeElements";
import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";

import storage from "../utils/saveAtLocalStorage";
import addRequiredToInput from "../utils/addRequiredToInput";
import cleanTextInputs from "../utils/cleanTextInputs";
import { AppInput, AppRadioButtons } from "../../web-components";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

type Obj = "Date" | "DateTime" | "Textarea";
type Input = "input" | "textarea";
type InputType = "date" | "time" | "textarea";

interface OptionsCreate extends OptionsUpdate {
  object: Obj;
}

interface OptionsUpdate {
  incrementId: number;
  type: InputType;
  input: Input;
}

export function create({ incrementId, object, type, input }: OptionsCreate) {
  const $parentDiv = document.createElement("div");
  const $parentInput = document.createElement("div");
  const isTextarea = input === "textarea" ? "textarea" : type;

  const buttonIdRemove = `${isTextarea}-remove-${incrementId}`;
  const buttonIdUpdate = `${isTextarea}-update-${incrementId}`;
  const containerId = `card-${isTextarea}-${incrementId}`;

  const buttonUpdate = button(
    {
      id: `${type}-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update input text",
        content: () => bodyModal(evt.target as HTMLButtonElement, { input }),
        action: () =>
          update(evt.target as HTMLButtonElement, {
            incrementId,
            type,
            input,
          }),
        twoButtons: false,
      }),
  );

  const buttonDelete = button(
    {
      id: `${type}-remove-${incrementId}`,
      text: "",
      spanClass: "button-square-remove",
      buttonClass: "inputs-btn-delete",
    },
    removeElementForm,
  );

  const $lastChildren = $containerCards?.lastElementChild;

  const newLabel = "Edit text";
  const isArea = input === "textarea" ? "column" : "row";

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  $parentInput.classList.add(`container-control-${isArea}`);
  $parentInput.setAttribute("disposition", isArea);

  const $label = doc.createElement("label");
  const $input =
    (doc.createElement(input) as HTMLInputElement) || HTMLTextAreaElement;

  const id = `${type}-${incrementId}`;
  const name = `${type}-${incrementId}-${newLabel}`;

  $label.classList.add("container-control__label");
  $label.htmlFor = id;
  $label.textContent = newLabel;

  if (input === "input") {
    $input.type = type;
  }
  $input.setAttribute("name", name);
  $input.id = id;

  const className =
    input === "input"
      ? "container-control__input-text"
      : "container-control__input-textarea";

  $input.classList.add(className);
  $input.setAttribute("data-required", "false");

  $parentInput.appendChild($label);
  $parentInput.appendChild($input);

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($parentInput);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    buttonIdRemove,
    buttonIdUpdate,
    containerId,
    disposition: isArea as "row",
    id,
    label: newLabel,
    name,
    object,
    required: false,
  };

  storage.create($lastChildren, updateInputs);
}

export function bodyModal(target: HTMLButtonElement, { input = "input" }) {
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
  const $parentContainer = target.closest(".container-components");

  const $parentInputs = $parentContainer?.lastElementChild;

  if (!$parentInputs) return;

  const $label = $parentInputs.querySelector("label");
  const $input = $parentInputs.querySelector(input);

  const labelText = cleanTextInputs($label);

  const newCheckedPosition = $parentInputs.getAttribute("disposition");
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
  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios),
  );
  $radioButtonsPosition.setAttribute(
    "radios",
    JSON.stringify(updatedPositionRadios),
  );

  $parentDiv.appendChild($ContainerInputLabel);
  $parentDiv.appendChild($radioButtonsRequired);
  $parentDiv.appendChild($radioButtonsPosition);

  return $parentDiv;
}

export function update(
  target: HTMLButtonElement,
  { incrementId, type, input }: OptionsUpdate,
) {
  const $parentContainer = target.closest(".container-components");
  const $parentInputs = $parentContainer?.lastElementChild as HTMLDivElement;
  const $radioButtonsRequired = $(
    "#container-radios-required",
  ) as AppRadioButtons;
  const $radioButtonsPosition = $(
    "#container-radios-position",
  ) as AppRadioButtons;
  const $ContainerInputLabel = $("#container-input-label") as AppInput;

  const $label = $parentContainer?.querySelector("label") as HTMLLabelElement;
  const $input = $parentContainer?.querySelector(input);

  const labelText = cleanTextInputs($label);

  const newLabel = $ContainerInputLabel.change
    ? $ContainerInputLabel.value
    : labelText;

  const newCheckedRequired = $radioButtonsRequired.change
    ? $radioButtonsRequired.value
    : $input?.getAttribute("data-required") || "false";

  const newCheckedPosition = $radioButtonsPosition.change
    ? $radioButtonsPosition.value
    : $parentInputs?.getAttribute("disposition") || "row";

  if (newLabel === "") return;

  $label.textContent = newLabel;

  addRequiredToInput({
    checkedRequired: newCheckedRequired as "false",
    elementRequired: $label,
  });

  $parentInputs.className = "";
  $parentInputs?.classList.add(`container-control-${newCheckedPosition}`);
  $parentInputs?.setAttribute("disposition", newCheckedPosition);

  const name = `${type}-${incrementId}-${newLabel}`;
  $input?.setAttribute("data-required", newCheckedRequired);
  $input?.setAttribute("name", name);

  const rest = {
    disposition: newCheckedPosition,
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true",
  };

  storage.update(target, rest);
}
