import modal from "../components/modal";
import button from "../components/button";
import bodyModal from "../components/bodySelectRadio";

import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";

const doc = document;
const $ = (selector:string) => doc.querySelector(selector);

let newOptions = "";

const $containerCards = $(".container-forms");

export default function select() {
  const $select = $("#select");
  let incrementId = 0;

  $select?.addEventListener("click", () => {
    incrementId++;
    create(incrementId);
  });
}

function configure(evt, $parentDiv, incrementId, newOptions, tag) {
  modal({
    title: "update select options",
    content: () =>
      bodyModal(evt.target, { newOptions, tag, }),
    action: () => update($parentDiv, incrementId),
  });
}

function create(incrementId) {
  const $parentDiv = doc.createElement("DIV");
  const $select = doc.createElement("SELECT");
  const $paragraph = doc.createElement("P");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt, $parentDiv, incrementId, newOptions, "select")
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

  const newLabel = "Edit select";

  $parentDiv.classList.add("container-components");

  $parentDiv.classList.add(`container-control-row`);
  $parentDiv.id = `card-input-${incrementId}`;

  $paragraph.classList.add("container-control__label");
  $paragraph.textContent = newLabel;
  $paragraph.setAttribute("disposition", "row");

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);

  const id = `select-${incrementId}`;
  const name = `select-${incrementId}-${newLabel}`;

  $select.id = id;
  $select.classList.add("container-control__input-text");
  $select.setAttribute("name", name);
  $select.setAttribute("data-required", "false");

  const $option = doc.createElement("OPTION");
  $option.value = "";
  $option.setAttribute("checked", "checked");

  $select.appendChild($option);

  $parentDiv?.appendChild($paragraph);

  $parentDiv.appendChild($select);

  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object: "Select",
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
  const $select = parentElement.querySelector("select");

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
    : $select.getAttribute("data-required");

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
  $select.setAttribute("data-required", newCheckedRequired);
  const allOptions = parentElement.querySelectorAll("select option");

  allOptions.forEach((option) => option.remove());

  const name = `select-${incrementId}-${newLabel}`;

  const $option = doc.createElement("OPTION");
  $option.value = "";
  $option.setAttribute("checked", "checked");

  $select.appendChild($option);

  let options = [];

  const optionsLabel = newOptions.split("\n");

  optionsLabel.forEach((elem, idx) => {
    const $option = doc.createElement("OPTION");
    $option.setAttribute("name", `option-${idx + 1}`);
    $option.id = `option-${idx + 1}`;
    $option.value = elem;
    $option.textContent = elem;

    options.push({
      value: elem,
      valueToShow: elem,
      id: `option-${idx + 1}`,
    });

    $select?.appendChild($option);
  });

  const rest = {
    name,
    disposition: newCheckedPosition,
    label: newLabel,
    required: newCheckedRequired.trim() === "true" ? true : false,
    options,
  };

  storage.update(parentElement, $select, rest);
}