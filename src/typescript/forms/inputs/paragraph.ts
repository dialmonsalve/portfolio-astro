import modal from "../components/modal";
import button from "../components/button";
import removeElementForm from "../utils/removeElements";
import storage from "../utils/saveAtLocalStorage";
import type { AppInput } from "../../web-components";
import type { Inputs } from "../interfaces";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

const $containerCards = $(".container-forms");

export function bodyModal(target: HTMLButtonElement) {
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

  const newTitle = $paragraph?.textContent?.trim();

  $ContainerInput.setAttribute("new_value", newTitle || "");

  $parentDiv.appendChild($ContainerInput);

  return $parentDiv;
}

export function create({ incrementId }: { incrementId: number }) {
  const $parentDiv = document.createElement("DIV");
  const $parentInput = document.createElement("DIV");
  const containerId = `card-paragraph-${incrementId}`;
  const buttonIdRemove = `paragraph-remove-${incrementId}`;
  const buttonIdUpdate = `paragraph-update-${incrementId}`;

  const buttonUpdate = button(
    {
      id: buttonIdUpdate,
      text: "",
      spanClass: "button-square-update",
      buttonClass: "inputs-btn-update",
    },
    (evt) =>
      modal({
        title: "update title",
        content: () => bodyModal(evt.target as HTMLButtonElement),
        action: () => update(evt.target as HTMLButtonElement),
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

  const newValue = "Edit paragraph";

  $parentDiv.className = "container-components isDraggable";
  $parentDiv.id = containerId;

  $parentInput.className = "container-control-row";
  $parentInput.setAttribute("position", "row");

  const $paragraph = doc.createElement("P");
  const id = `paragraph-${incrementId}`;
  $paragraph.id = id;

  $paragraph.classList.add("paragraph");
  $paragraph.textContent = newValue;

  $parentInput.appendChild($paragraph);

  $parentDiv.appendChild(buttonDelete);
  $parentDiv.appendChild(buttonUpdate);
  $parentDiv?.appendChild($parentInput);
  $lastChildren?.appendChild($parentDiv);

  const updateInputs: Inputs = {
    buttonIdRemove,
    buttonIdUpdate,
    containerId,
    id,
    label: newValue,
    name: id,
    object: "Paragraph",
    disposition: "row",
  };
  storage.create($lastChildren, updateInputs);
}

export function update(target: HTMLButtonElement) {
  const $parentContainer = target.closest(".container-components");
  const $parentInputs = $parentContainer?.lastElementChild;
  const $paragraph = $parentInputs?.querySelector("P");
  const $containerInput = $("#container-input-headings") as AppInput;

  const newValue = $containerInput.change
    ? $containerInput.value.trim()
    : $paragraph?.textContent?.trim() || "";

  if (newValue === "") return;

  $paragraph!.textContent = newValue || "";

  storage.update(target, { label: newValue });
}
