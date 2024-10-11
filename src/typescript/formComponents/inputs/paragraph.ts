import modal from "../components/modal.js";
import button from "../components/button.js";

import removeElementForm from "../utils/removeElements.js";
import storage from "../utils/saveAtLocalStorage.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export default function paragraph() {
  const $paragraph = $("#paragraph");
  let incrementId = 0;

  $paragraph?.addEventListener("click", () => {
    incrementId++;
    create(incrementId);
  });
}

function configure(evt, parentDiv) {
  modal({
    title: "update title",
    content: () => bodyModal(evt.target),
    action: () => update(parentDiv),
  });
}

function bodyModal(target) {
  const $parentDiv = doc.createElement("app-modal-body");
  const $ContainerInput = doc.createElement("app-input");

  $ContainerInput.setAttribute("name", "input-headings");
  $ContainerInput.setAttribute("type", "text");
  $ContainerInput.setAttribute("label", "title");
  $ContainerInput.setAttribute("input_id", "input-headings");
  $ContainerInput.id = "container-input-headings";

  const $parentInputs = target.closest(".container-components");

  if (!$parentInputs) return;

  const $paragraph = $parentInputs.lastElementChild;

  const newTitle = $paragraph.textContent;

  $ContainerInput.setAttribute("new_value", newTitle);

  $parentDiv.appendChild($ContainerInput);

  return $parentDiv;
}

function create(incrementId) {
  const $parentDiv = document.createElement("DIV");

  const buttonUpdate = button(
    {
      id: `heading-update-${incrementId}`,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) => configure(evt, $parentDiv)
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

  const newValue = "Edit paragraph";

  $parentDiv.classList.add("container-components");
  $parentDiv.id = `card-heading-${incrementId}`;

  const $paragraph = doc.createElement("P");
  const id = `paragraph-${incrementId}`;
  const name = `paragraph-${incrementId}`;
  $paragraph.id = id;
  $paragraph.setAttribute("name", name);

  $paragraph.classList.add("paragraph");
  $paragraph.textContent = newValue;

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($paragraph);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs = {
    object: "Paragraph",
    id,
    name,
    label: newValue,
  };
  storage.create(updateInputs, $lastChildren);
}

function update(parentElement) {
  const $paragraph = parentElement.lastElementChild;

  const $containerInput = $("#container-input-headings");

  const newValue = $containerInput._change
    ? $containerInput.value
    : $paragraph.textContent;

  if (newValue === "") return;

  $paragraph.textContent = newValue;

  parentElement?.appendChild($paragraph);

  storage.update(parentElement, $paragraph, { label: newValue });
}
