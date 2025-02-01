import inputComponent from "../components/inputComponent";
import button from "../components/button";
import modal from "../components/modal";
import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";
import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";
import cleanTextInputs from "../utils/cleanTextInputs";
import addRequiredToInput from "../utils/addRequiredToInput";
import { AppInput, AppRadioButtons } from "../../web-components";

interface OptionsCreate {
  object: "Text" | "Email" | "Phone" | "Password";
  type: TypeInput;
  incrementId: number;
}

type TypeInput = "text" | "email" | "phone" | "password";

const doc = document;

const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export function create({ object, type, incrementId }: OptionsCreate) {
 
  const $parentDiv = document.createElement("DIV");
  const $parentInput = document.createElement("DIV");
  const isPassword = object === "Password" ? "password" : type;
  const containerId = `card-${isPassword}-${incrementId}`;
  const buttonIdRemove = `${isPassword}-remove-${incrementId}`;
  const buttonIdUpdate = `${isPassword}-update-${incrementId}`;

  const buttonUpdate = button(
    {
      id: buttonIdUpdate,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: `update input ${type}`,
        content: () => bodyModal(evt.target as HTMLButtonElement, { type }),
        action: () =>
          update(evt.target as HTMLButtonElement, {
            incrementId,
            type,
          }),
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

  const newLabel = "edit text";

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  $parentInput.classList.add(`container-control-row`);
  $parentInput.setAttribute("disposition", "row");

  const $label = doc.createElement("label");
  const $input = doc.createElement("input");

  const id = `${isPassword}-${incrementId}`;
  const name = `${isPassword}-${incrementId}-${newLabel}`;

  $label.classList.add("container-control__label");
  $label.htmlFor = id;
  $label.textContent = newLabel;

  $input.type = isPassword;
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

}

export function bodyModal(
  target: HTMLButtonElement,
  { type }: { type: TypeInput },
) {
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

  const $parentContainer = target.closest(".container-components");

  const $parentInputs = $parentContainer?.lastElementChild;

  if (!$parentInputs) return;

  const $label = $parentInputs.querySelector("label");
  const $input = $parentInputs.querySelector("input");

  const labelText = cleanTextInputs($label);

  const newCheckedPosition = $parentInputs.getAttribute("disposition");

  const newPlaceholder = $input?.getAttribute("placeholder") || "";
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
  $parentDiv.appendChild($radioButtonsRequired);
  $parentDiv.appendChild($radioButtonsPosition);

  return $parentDiv;
}

export function update(
  target: HTMLButtonElement,
  { incrementId, type }: { incrementId: number; type: TypeInput },
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
  const $containerInputLabel = $("#container-input-label") as AppInput;
  const $containerInputPlaceholder = $(
    "#container-input-placeholder",
  ) as AppInput;

  const labelText = cleanTextInputs($label);

  const newLabel = $containerInputLabel.change
    ? $containerInputLabel.value
    : labelText || "";

  const newPlaceholder = $containerInputPlaceholder.change
    ? $containerInputPlaceholder.value
    : $input?.getAttribute("placeholder") || "";

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
  });

  $parentInputs!.className = "";
  $parentInputs?.classList.add(`container-control-${newCheckedPosition}`);
  $parentInputs?.setAttribute("disposition", newCheckedPosition);

  const name = `${type}-${incrementId}-${newLabel}`;
  $input?.setAttribute("placeholder", newPlaceholder);
  $input?.setAttribute("data-required", newCheckedRequired);
  $input?.setAttribute("name", name);

  const rest = {
    disposition: newCheckedPosition,
    name,
    label: newLabel,
    placeholder: newPlaceholder.trim() !== "" ? `${newPlaceholder}` : null,
    required: newCheckedRequired.trim() === "true",
  };

  storage.update(target, rest);
}
