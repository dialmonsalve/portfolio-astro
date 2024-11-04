import modal from "../components/modal";
import button from "../components/button";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";

import { REQUIRED_RADIOS } from "../const";
import cleanTextInputs from "../utils/cleanTextInputs";
import addRequiredToInput from "../utils/addRequiredToInput";
import { AppInput, AppTextarea } from "../../web-components";
import type { Inputs } from "../interfaces";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export function create({ incrementId }: { incrementId: number }) {
  const $parentDiv = doc.createElement("div");
  const $parentSignature = doc.createElement("div");
  const $signature = doc.createElement("div");

  const $label = document.createElement("label");
  const $canvas = doc.createElement("canvas");
  const $buttonClear = doc.createElement("button");

  const buttonIdUpdate = `signature-update-${incrementId}`;
  const buttonIdRemove = `signature-remove-${incrementId}`;
  const containerId = `card-signature-${incrementId}`;

  const newLabel = "Edit signature";
  const id = `signature-${incrementId}`;

  $parentSignature.classList.add("container-control-row");
  $parentSignature.setAttribute("disposition", "row");

  $signature.style.display = "flex";
  $signature.style.flexDirection = "column";
  $signature.style.gap = "0.5rem";
  $signature.style.alignItems = "flex-start";

  $label.classList.add("container-check__label");
  $label.textContent = newLabel;

  const name = `signature-${incrementId}-${newLabel}`;

  $canvas.setAttribute("data-required", "false");
  $canvas.setAttribute("name", `canvas-${name}`);
  $canvas.id = `canvas-${id}`;
  $canvas.className = "border border-1 rounded-1";

  $buttonClear.id = `clear-${id}`;
  $buttonClear.className = "btn btn-sm btn-outline-danger mt-1";
  $buttonClear.type = "button";
  $buttonClear.textContent = "clear";

  $canvas.height = 150;
  $canvas.width = 400;

  const buttonUpdate = button(
    {
      id: buttonIdUpdate,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update signature",
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

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);

  $signature.appendChild($label);
  $signature.appendChild($canvas);
  $signature.appendChild($buttonClear);

  $parentSignature.appendChild($signature);

  $parentDiv.appendChild($parentSignature);

  $lastChildren?.appendChild($parentDiv);

  const updateInputs: Inputs = {
    buttonIdRemove,
    buttonIdUpdate,
    containerId,
    id,
    label: newLabel,
    name,
    object: "Signature",
    required: false,
    disposition: "column",
  };

  storage.create($lastChildren, updateInputs);
}

export function bodyModal(target: HTMLButtonElement) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons");
  const $containerArea = doc.createElement("app-textarea");

  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsRequired.id = "container-radios-required";
  $radioButtonsRequired.setAttribute("name", "inputs-required");

  $containerArea.setAttribute("label", "Label");
  $containerArea.setAttribute("input_id", "area");
  $containerArea.id = "container-area-label";

  const $parentInputs = target.closest(".container-components");

  if (!$parentInputs) return;

  const $canvas = $parentInputs.querySelector("canvas");
  const $label = $parentInputs.querySelector("label");

  const labelText = cleanTextInputs($label);

  const newCheckedRequired = $canvas?.getAttribute("data-required");

  const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedRequired,
  }));

  $containerArea.setAttribute("new_value", labelText);
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
  const $radioButtonsRequired = $("#container-radios-required") as AppInput;
  const $containerArea = $("#container-area-label") as AppTextarea;
  const $parentInputs = target.closest(".container-components");

  const $canvas = $parentInputs?.querySelector("canvas");
  const $label = $parentInputs?.querySelector("label");

  const labelText = cleanTextInputs($label);

  const newLabel = $containerArea.change
    ? $containerArea.value
    : labelText || "";

  const newCheckedRequired = $radioButtonsRequired.change
    ? $radioButtonsRequired.value
    : $canvas?.getAttribute("data-required") || "false";

  $label!.textContent = newLabel;

  addRequiredToInput({
    checkedRequired: newCheckedRequired as "false",
    elementRequired: $label!,
  });

  const name = `signature-${incrementId}-${newLabel}`;

  $canvas?.setAttribute("data-required", newCheckedRequired);
  $canvas?.setAttribute("name", name);

  const rest = {
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true",
  };

  storage.update(target, rest);
}
