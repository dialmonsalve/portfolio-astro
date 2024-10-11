import modal from "../components/modal";
import button from "../components/button";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";

import { REQUIRED_RADIOS } from "../const";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

let newLabel = "";
let newCheckedRequired = "";

const $containerCards = $(".container-forms");

export default function signature() {
  const $signature = $("#signature");
  let incrementId = 0;

  $signature?.addEventListener("click", () => {
    incrementId++;
    create(incrementId);
  });
}

function bodyModal(target) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $radioButtonsRequired = doc.createElement("app-radio-buttons");
  const $containerArea = doc.createElement("app-textarea");

  $radioButtonsRequired.setAttribute("label", "Required:");
  $radioButtonsRequired.id = "container-radios-required";
  $radioButtonsRequired.setAttribute("name", "inputs-required");

  $containerArea.setAttribute("label", "Label");
  $containerArea.setAttribute("input_id", "area");
  $containerArea.id = "container-area-label";

  // if (isCreate) {
  //     $radioButtonsRequired.setAttribute(
  //         "radios",
  //         JSON.stringify(REQUIRED_RADIOS)
  //     );
  // } else {
  // }
  const $parentInputs = target.closest(".container-components");
  const signatureParent = $parentInputs.querySelector("app-signature-form");
  const shadowRoot = signatureParent.shadowRoot;

  const $paragraph = shadowRoot.querySelector("p");
  const newLabel = $paragraph.textContent;

  const newCheckedRequired = $parentInputs
    .querySelector("div")
    .getAttribute("data-required");

  if (!$parentInputs) return;

  const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
    ...radio,
    isChecked: radio.value === newCheckedRequired,
  }));

  $containerArea.setAttribute("new_value", newLabel);
  $radioButtonsRequired.setAttribute(
    "radios",
    JSON.stringify(updatedRequiredRadios)
  );

  $parentDiv.appendChild($containerArea);
  $parentDiv.appendChild($radioButtonsRequired);

  return $parentDiv;
}

function configure(evt, $parentDiv, incrementId) {
  modal({
    title: "update signature",
    content: () =>
      bodyModal(evt.target, {
        newLabel,
        newCheckedRequired,
      }),
    action: () => update($parentDiv, incrementId),
  });
}

function create(incrementId) {
  const $parentDiv = doc.createElement("DIV");
  const $signature = doc.createElement("app-signature-form");
  const $containerSignature = doc.createElement("DIV");

  const newLabel = "Edit signature";

  $signature.setAttribute("label", newLabel);
  const id = `signature-${incrementId}`;
  const name = `signature-${incrementId}-${newLabel}`;

  $containerSignature.appendChild($signature);

  $containerSignature.id = id;
  $containerSignature.setAttribute("data-required", "false");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt, $parentDiv, incrementId)
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

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv.appendChild($containerSignature);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object: "Signature",
    id,
    name,
    label: newLabel,
    required: false,
  };

  storage.create(updateInputs, $lastChildren);
}

function update(parentElement, incrementId) {
  const $signature = $("#app-signature");
  const $radioButtonsRequired = $("#container-radios-required");
  const $containerArea = $("#container-area-label");
  const $parentSignature = parentElement.querySelector("div");

  const isLabelChanged = $containerArea._change;

  newLabel = isLabelChanged ? $containerArea.value : newLabel;

  newCheckedRequired =
    $radioButtonsRequired.value === ""
      ? newCheckedRequired
      : $radioButtonsRequired.value;

  $signature.setAttribute("label", newLabel);

  const name = `signature-${incrementId}-${newLabel}`;

  $parentSignature.setAttribute("data-required", newCheckedRequired);

  const rest = {
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true" ? true : false,
  };

  storage.update(parentElement, $parentSignature, rest);
}