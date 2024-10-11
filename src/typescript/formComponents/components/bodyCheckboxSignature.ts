import { REQUIRED_RADIOS } from "../const";

interface BodyModal { isCreate: boolean, newCheckedRequired:string, newLabel:string }

const doc = document;

export default function bodyModal(
    target: HTMLDivElement,
    { isCreate, newCheckedRequired, newLabel }: BodyModal
) {
    const $parentDiv = doc.createElement("app-modal-body");
    const $radioButtonsRequired = doc.createElement("app-radio-buttons");
    const $containerArea = doc.createElement("app-textarea");

    $radioButtonsRequired.setAttribute("label", "Required:");
    $radioButtonsRequired.id = "container-radios-required";

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