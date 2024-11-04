import modal from "../components/modal.js";
import { create, bodyModal, update } from "../inputs/checkbox.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $$ = (selector: string) => doc.querySelectorAll(selector);

export default function checkbox() {
    const $checkbox = $("#checkbox");
    const $allButtonCheckboxUpdate = $$('.card button[id*="checkbox-update"]');
    const $allButtonCheckboxRemove = $$('.card button[id*="checkbox-remove"]');
    let incrementId = $$('.card button[id*="checkbox-update"]').length;

    $checkbox?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });

    for (let i = 0; i < $allButtonCheckboxUpdate.length; i++) {
        const buttonUpdate = $allButtonCheckboxUpdate[i] as HTMLButtonElement;
        buttonUpdate.addEventListener("click", (evt) =>
            modal({
                title: "update checkbox options",
                content: () => bodyModal(evt.target as HTMLButtonElement),
                action: () =>
                    update(evt.target as HTMLButtonElement, { incrementId }),
            })
        );
    }

    for (let i = 0; i < $allButtonCheckboxRemove.length; i++) {
        const buttonRemove = $allButtonCheckboxRemove[i] as HTMLButtonElement;
        buttonRemove.addEventListener("click", removeElementForm);
    }
}
