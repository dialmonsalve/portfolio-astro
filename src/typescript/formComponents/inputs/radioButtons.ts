import modal from "../components/modal";
import removeElementForm from "../utils/removeElements";
import button from "../components/button";

import bodyModal from "../components/bodySelectRadio";
import storage from "../utils/saveAtLocalStorage";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

let newOptions = "";

const $containerCards = $(".container-forms");

export default function radioButtons() {
  const $radioButtons = $("#radio-buttons");
  let incrementId = 0;

  $radioButtons.addEventListener("click", (evt) => {
    incrementId++;

    create(incrementId);
  });
}

function configure(evt, $parentDiv, incrementId, newOptions, tag) {
  modal({
    title: "update input options",
    content: () =>
      bodyModal(evt.target, {
        newOptions,
        tag,
      }),
    action: () => update($parentDiv, incrementId),
  });
}

function create(incrementId) {
  const $parentDiv = document.createElement("DIV");
  const $paragraph = doc.createElement("P");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt, $parentDiv, incrementId, newOptions, "input")
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

  const $label = doc.createElement("LABEL");
  const $radio = doc.createElement("INPUT");

  const newLabel = "Edit options";
  const id = `container-radio-${incrementId}`;
  const name = `radio-${incrementId}-${newLabel}`;
  const valueOpt = `radio-${incrementId}`;
  const nameOpt = "edit";
  $label.htmlFor = valueOpt;
  $label.textContent = nameOpt;
  $radio.type = "radio";
  $radio.id = valueOpt;
  $radio.setAttribute("data-required", "false");
  $radio.setAttribute("name", name);

  const $lastChildren = $containerCards?.lastElementChild;

  $parentDiv.classList.add("container-components");

  $parentDiv.classList.add(`container-control-row`);
  $parentDiv.id = `card-input-${incrementId}`;

  $paragraph.classList.add("container-control__label");
  $paragraph.textContent = newLabel;
  $paragraph.setAttribute("disposition", "row");

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);

  $parentDiv?.appendChild($paragraph);
  $parentDiv?.appendChild($radio);
  $parentDiv?.appendChild($label);

  $parentDiv.lastElementChild.id = id;

  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object: "RadioButton",
    id,
    name,
    label: newLabel,
    disposition: "row",
    required: false,
    options: null,
  };

  storage.create(updateInputs, $lastChildren);
}

function update(parentElement, incrementId) {
  const $paragraph = parentElement.querySelector("p");
  const $input = parentElement.querySelector("input");

  const $radioButtonsRequired = $("#container-radios-required");
  const $radioButtonsPosition = $("#container-radios-position");
  const $ContainerInputLabel = $("#container-input-label");
  const $containerArea = $("#container-area-label");

  const isRequiredChanged = $radioButtonsRequired._change;
  const isDispositionChanged = $radioButtonsPosition._change;

  const newLabel = $ContainerInputLabel._change
    ? $ContainerInputLabel.value
    : $paragraph.textContent;

  const newCheckedRequired = isRequiredChanged
    ? $radioButtonsRequired.value
    : $input.getAttribute("data-required");

  const newCheckedPosition = isDispositionChanged
    ? $radioButtonsPosition.value
    : $paragraph.getAttribute("disposition");

  newOptions =
    $containerArea.value === "" ? newOptions : $containerArea.value;

  if (newLabel === "" || newOptions === "") return;

  parentElement.className = "";
  parentElement.classList.add("container-components");
  parentElement.classList.add(`container-control-${newCheckedPosition}`);

  $paragraph.textContent = newLabel;
  $paragraph.setAttribute("disposition", newCheckedPosition);

  const name = `radio-${incrementId}-${newLabel}`;
  const id = `container-radio-${incrementId}`;

  let options = [];

  const optionsLabel = newOptions.split("\n");
  const allRadios = parentElement.querySelectorAll('input[type="radio"]');
  const allLabels = parentElement.querySelectorAll("label");
  allRadios.forEach((radio) => radio.remove());
  allLabels.forEach((label) => label.remove());

  optionsLabel.forEach((elem, idx) => {
    const $label = doc.createElement("LABEL");
    const $radio = doc.createElement("INPUT");
    const valueOpt = `radio-${idx + 1}-${incrementId}`;
    const nameOpt = elem;

    $label.htmlFor = valueOpt;
    $label.textContent = nameOpt;

    $radio.type = "radio";
    $radio.setAttribute("data-required", newCheckedRequired);
    $radio.setAttribute("name", name);
    $radio.id = valueOpt;

    options.push({ value: nameOpt, id: valueOpt, valueToShow: nameOpt });

    parentElement?.appendChild($radio);
    parentElement?.appendChild($label);
  });

  const $lastLabel = parentElement.lastElementChild;
  $lastLabel.id = id;

  const rest = {
    id,
    disposition: newCheckedPosition,
    name,
    label: newLabel,
    required: newCheckedRequired.trim() === "true" ? true : false,
    options,
  };
  storage.update(parentElement, $lastLabel, rest);
}