import inputComponent from "../components/inputComponent";
import { REQUIRED_RADIOS, POSITION_RADIOS } from "../const";

interface BodyModal {
    newOptions: string;
    tag: 'SELECT' | 'INPUT'
}

const doc = document;

export default function bodyModal(target: HTMLElement, { newOptions, tag }: BodyModal) {

    const $parentDiv = doc.createElement("app-modal-body");
    const $radioButtonsRequired = doc.createElement("app-radio-buttons");
    const $radioButtonsPosition = doc.createElement("app-radio-buttons");
    const $containerArea = doc.createElement("app-textarea");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsRequired.id = "container-radios-required";
    $radioButtonsRequired.setAttribute('name', 'inputs-required');

    $radioButtonsPosition.setAttribute('name', 'inputs-position');
    $radioButtonsPosition.setAttribute("label", "Position:");
    $radioButtonsPosition.id = "container-radios-position";

    const $ContainerInputLabel = inputComponent({
        name: "input-label",
        type: "text",
        label: "Label",
        id: "container-input-label",
    });

    $containerArea.setAttribute("name", "area");
    $containerArea.setAttribute("label", "options");
    $containerArea.setAttribute("input_id", "area");
    $containerArea.id = "container-area-label";

    const $parentInputs = target.closest(".container-components");

    const $label = $parentInputs?.querySelector("p");
    const $input = $parentInputs?.querySelector(tag);

    const newLabel = $label?.textContent || '';
    const newCheckedPosition = $label?.getAttribute("disposition");

    const newCheckedRequired = $input?.getAttribute("data-required");

    if (!$parentInputs) return;

    const updatedRequiredRadios = REQUIRED_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedRequired,
    }));

    const updatedPositionRadios = POSITION_RADIOS.map((radio) => ({
        ...radio,
        isChecked: radio.value === newCheckedPosition,
    }));

    $ContainerInputLabel.setAttribute("new_value", newLabel);
    $containerArea.setAttribute("new_value", newOptions);
    $radioButtonsRequired.setAttribute(
        "radios",
        JSON.stringify(updatedRequiredRadios)
    );
    $radioButtonsPosition.setAttribute(
        "radios",
        JSON.stringify(updatedPositionRadios)
    );

    $parentDiv.appendChild($ContainerInputLabel);
    $parentDiv.appendChild($containerArea);
    $parentDiv.appendChild($radioButtonsRequired);
    $parentDiv.appendChild($radioButtonsPosition);

    return $parentDiv;
}