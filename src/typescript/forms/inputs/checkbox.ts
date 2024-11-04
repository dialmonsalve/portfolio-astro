import modal from "../components/modal";
import button from "../components/button";
import { REQUIRED_RADIOS } from "../const";
import addRequiredToInput from "../utils/addRequiredToInput";
import cleanTextInputs from "../utils/cleanTextInputs";
import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";
import { AppRadioButtons, AppTextarea } from "../../web-components";
import type { Inputs } from "../interfaces";

const doc = document;

const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");
export function create({ incrementId }: { incrementId: number }) {
  const $parentDiv = doc.createElement("div");
  const $containerCheck = doc.createElement("div");
  const $input = doc.createElement("input");
  const $paragraph = doc.createElement("p");

  const buttonIdUpdate = `checkbox-update-${incrementId}`;
  const buttonIdRemove = `checkbox-remove-${incrementId}`;
  const containerId = `card-checkbox-${incrementId}`;

  const buttonUpdate = button(
    {
      id: buttonIdUpdate,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update checkbox options",
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

  const newLabel = "Edit option";

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  $containerCheck.classList.add("form-check");
  $containerCheck.classList.add("form-switch");

  $paragraph.classList.add("container-check__label");
  $paragraph.textContent = newLabel;

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);

  const id = `checkbox-${incrementId}`;
  const name = `checkbox-${incrementId}-${newLabel}`;

  $input.type = "checkbox";
  $input.id = id;
  $input.classList.add("form-check-input");
  $input.setAttribute("name", name);
  $input.setAttribute("data-required", "false");

  $containerCheck.appendChild($input);
  $containerCheck?.appendChild($paragraph);
  $parentDiv?.appendChild($containerCheck);

  $lastChildren?.appendChild($parentDiv);

  const updateInputs: Inputs = {
    buttonIdRemove,
    buttonIdUpdate,
    containerId,
    disposition: "row",
    id,
    label: newLabel,
    name,
    object: "Checkbox",
    required: false,
  };

  storage.create($lastChildren, updateInputs);
}

export function bodyModal(target: HTMLButtonElement) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons-form");
  const $containerArea = doc.createElement("app-textarea-form");

  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsRequired.id = "container-radios-required";
  $radioButtonsRequired.setAttribute("name", "inputs-required");

  $containerArea.setAttribute("name", "area");
  $containerArea.setAttribute("label", "Label");
  $containerArea.setAttribute("input_id", "area");
  $containerArea.id = "container-area-label";

  const $parentInputs = target.closest(".container-components");

  const $paragraph = $parentInputs?.querySelector("p");
  const $input = $parentInputs?.querySelector("input");

  const labelParagraph = cleanTextInputs($paragraph);

  const newCheckedRequired = $input?.getAttribute("data-required");

  if (!$parentInputs) return;

  const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedRequired,
  }));

  $containerArea.setAttribute("new_value", `${labelParagraph}`);
  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios),
  );

  $parentDiv.appendChild($containerArea);
  $parentDiv.appendChild($radioButtonsRequired);

  return $parentDiv;
}

export function update(
  target: HTMLButtonElement,
  { incrementId }: { incrementId: number },
) {
  const $parentContainer = target.closest(".container-components");
  const $parentInputs = $parentContainer?.lastElementChild;
  const $radioButtonsRequired = $(
    "#container-radios-required",
  ) as AppRadioButtons;
  const $containerArea = $("#container-area-label") as AppTextarea;

  const $paragraph = $parentInputs?.querySelector("p") as HTMLParagraphElement;
  const $input = $parentInputs?.querySelector("input");

  const paragraphText = cleanTextInputs($paragraph);

  const newLabel = $containerArea?.change
    ? $containerArea.value
    : paragraphText || "";

  const newCheckedRequired = $radioButtonsRequired.change
    ? $radioButtonsRequired.value
    : $input?.getAttribute("data-required") || "false";

  if (newLabel === "") return;

  $paragraph.textContent = newLabel;

  addRequiredToInput({
    checkedRequired: newCheckedRequired! as "false",
    elementRequired: $paragraph,
  });

  $input?.setAttribute("data-required", newCheckedRequired);
  const name = `checkbox-${incrementId}-${newLabel}`;

  const rest = {
    name,
    label: `${newLabel}`,
    required: newCheckedRequired.trim() === "true",
  };

  storage.update(target, rest);
}
