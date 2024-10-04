import modal from "../components/modal.js";
import bodyModal from "../components/bodyCheckboxSignature";
import button from "../components/button";

import removeElementForm from "../utils/removeElements";
import saveAtLocalStorage from "../utils/saveAtLocalStorage";

import { PAGES_STRING } from "../const/index.js";

import type { Inputs, Page } from "../interface/index.js";
import type { AppTextareaForm, AppRadioButtons } from "../webComponents";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

let newLabel = "";
let newCheckedRequired = "";

const $containerCards = $(".container-forms");

export default function checkbox() {
    const $checkbox = $("#checkbox");
    let incrementId = 0;

    $checkbox?.addEventListener("click", (evt) => {
        incrementId++;

        modal({
            title: "create checkbox options",
            content: () =>
                bodyModal(evt.target as HTMLDivElement, {
                    isCreate: true, newLabel, newCheckedRequired
                }),
            action: () => addElementForm(evt.target, incrementId),
        });
    });
}

function update(evt: MouseEvent, $parentDiv: HTMLDivElement, incrementId: number) {
    modal({
        title: "update checkbox options",
        content: () =>
            bodyModal(evt.target as HTMLDivElement, {
                isCreate: false, newLabel, newCheckedRequired
            }),
        action: () => updateElementForm($parentDiv, incrementId),
    });
}

function addElementForm(target: EventTarget | null, incrementId: number) {
    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $containerArea = $("#container-area-label") as AppTextareaForm;
    const $parentDiv = doc.createElement("DIV") as HTMLDivElement;
    const $containerCheck = doc.createElement('DIV')
    const $input = doc.createElement("INPUT") as HTMLInputElement;
    const $paragraph = doc.createElement("P");

    const buttonUpdate = button({
        id: `heading-update-${incrementId}`,
        text: "",
        spanClass: "button-square-update",
        buttonClass: "inputs-btn-update",
    }, (evt) =>
        update(evt, $parentDiv, incrementId));

    const buttonDelete = button({
        id: `heading-remove-${incrementId}`,
        text: "",
        spanClass: "button-square-remove",
        buttonClass: "inputs-btn-delete",
    }, removeElementForm);

    const $lastChildren = $containerCards?.lastElementChild;

    newLabel = $containerArea?.value;

    newCheckedRequired =
        $radioButtonsRequired?.value === ""
            ? "false"
            : $radioButtonsRequired?.value;

    if (newLabel.trim() === "") return;

    $parentDiv.classList.add("container-components");

    $containerCheck.classList.add("form-check");
    $containerCheck.classList.add("form-switch");

    $paragraph.classList.add("container-check__label");
    $paragraph.textContent = newLabel;

    $parentDiv.appendChild(buttonDelete);
    $parentDiv.appendChild(buttonUpdate);

    const id = `checkbox-${incrementId}`;
    const name = `checkbox-${incrementId}-${newLabel}`;

    $containerCheck.id = id;

    $input.type = 'checkbox';
    $input.id = id;
    $input.classList.add("form-check-input");
    $input.setAttribute("name", name);
    $input.setAttribute("data-required", newCheckedRequired);

    $containerCheck.appendChild($input)
    $containerCheck?.appendChild($paragraph);
    $parentDiv?.appendChild($containerCheck);

    $lastChildren?.appendChild($parentDiv);

    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

    const updateInputs  = {
        object: "Checkbox",
        id,
        name,
        label: newLabel,
        required: newCheckedRequired === "true" ? true : false,
    };

    const updatedPages = pages.map((page) => {
        if (page.id === $lastChildren?.getAttribute("id")) {
            return {
                ...page,
                inputs: [...page.inputs, updateInputs],
            };
        }
        return page;
    }) ;
    saveAtLocalStorage(updatedPages);
}

function updateElementForm(parentElement: HTMLDivElement, incrementId: number) {
    const $paragraph = parentElement.querySelector("p") as HTMLParagraphElement;
    const $input = parentElement.querySelector("div input") as HTMLInputElement;

    const $radioButtonsRequired = $("#container-radios-required") as AppRadioButtons;
    const $containerArea = $("#container-area-label") as AppTextareaForm;

    newLabel =
        $containerArea.value === "" ? newLabel : $containerArea.value;

    newCheckedRequired =
        $radioButtonsRequired.value === ""
            ? newCheckedRequired
            : $radioButtonsRequired.value;

    if (newLabel === "") return;

    $paragraph.textContent = newLabel;
    $input.setAttribute("data-required", newCheckedRequired);
    const name = `checkbox-${incrementId}-${newLabel}`;

    const pages = JSON.parse(localStorage.getItem("pages") || PAGES_STRING) as Page[];

    const updatedPages = pages.map((page) =>
        page.id === parentElement?.parentElement?.id
            ? {
                ...page,
                inputs: page.inputs.map((input) => ({
                    ...input,
                    name,
                    label: newLabel,
                    required: newCheckedRequired.trim() === "true" ? true : false,
                })),
            }
            : page
    );
    saveAtLocalStorage(updatedPages);
}