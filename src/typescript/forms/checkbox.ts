
import button from "./components/button";
import modal from "./components/modal";
import { REQUIRED_RADIOS } from "./const";
import removeElementForm from "./utils/removeElements";
import storage from "./utils/saveAtLocalStorage";

const doc = document;
const $ = (selector:string) => doc.querySelector(selector);

let newLabel = "";
let newCheckedRequired = "";

const $containerCards = $(".container-forms");

export default function checkbox() {
    const $checkbox = $("#checkbox");
    let incrementId = 0;

    $checkbox.addEventListener("click", (evt) => {
        incrementId++;
        create(incrementId);
    });
}

function bodyModal(target, { isCreate }) {
    const $parentDiv = doc.createElement("rain-modal-body");
    const $radioButtonsRequired = doc.createElement("rain-radio-buttons-form");
    const $containerArea = doc.createElement("rain-textarea-form");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsRequired.id = "container-radios-required";
    $radioButtonsRequired.setAttribute("name", "inputs-required");

    $containerArea.setAttribute("name", "area");
    $containerArea.setAttribute("label", "Label");
    $containerArea.setAttribute("input_id", "area");
    $containerArea.id = "container-area-label";

    if (isCreate) {
        $radioButtonsRequired.setAttribute(
            "radios",
            JSON.stringify(REQUIRED_RADIOS)
        );
    } else {
        const $parentInputs = target.closest(".container-components");

        const $label = $parentInputs.querySelector("p");
        const $input = $parentInputs.querySelector("input");

        const newLabel = $label.textContent;

        const newCheckedRequired = $input.getAttribute("data-required");

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
    }

    $parentDiv.appendChild($containerArea);
    $parentDiv.appendChild($radioButtonsRequired);

    return $parentDiv;
}

function configure(evt, $parentDiv, incrementId) {
    modal({
        title: "update checkbox options",
        content: () =>
            bodyModal(evt.target, {
                isCreate: false,
                newLabel,
                newCheckedRequired,
            }),
        action: () => update($parentDiv, incrementId),
    });
}

function create(incrementId) {
    const $parentDiv = doc.createElement("DIV");
    const $containerCheck = doc.createElement("DIV");
    const $input = doc.createElement("INPUT");
    const $paragraph = doc.createElement("P");

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

    const newLabel = "Edit option";

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

    $input.type = "checkbox";
    $input.id = id;
    $input.classList.add("form-check-input");
    $input.setAttribute("name", name);
    $input.setAttribute("data-required", "false");

    $containerCheck.appendChild($input);
    $containerCheck?.appendChild($paragraph);
    $parentDiv?.appendChild($containerCheck);

    $lastChildren?.appendChild($parentDiv);

    const updateInputs = {
        object: "Checkbox",
        id,
        name,
        label: newLabel,
        required: false,
    };

    storage.create(updateInputs, $lastChildren);
}

function update(parentElement, incrementId) {
    const $paragraph = parentElement.querySelector("p");
    const $input = parentElement.querySelector("div input");

    const $radioButtonsRequired = $("#container-radios-required");
    const $containerArea = $("#container-area-label");

    newLabel = $containerArea.value === "" ? newLabel : $containerArea.value;

    newCheckedRequired =
        $radioButtonsRequired.value === ""
            ? newCheckedRequired
            : $radioButtonsRequired.value;

    if (newLabel === "") return;

    $paragraph.textContent = newLabel;
    $input.setAttribute("data-required", newCheckedRequired);
    const name = `checkbox-${incrementId}-${newLabel}`;

    const rest = {
        name,
        label: newLabel,
        required: newCheckedRequired.trim() === "true" ? true : false,
    };

    storage.update(parentElement, $input.parentElement, rest)
}