import { create, update } from "../inputs/radioButtons.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";
import bodyModal from "../components/bodySelectRadio.js";
import modal from "../components/modal.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function radioButtons() {
    const $radioButtons = $("#radio-buttons");
    const $allButtonRadiosUpdate = $$(
        '.card button[id*="radio-buttons-update"]'
    );
    const $allButtonRadiosRemove = $$(
        '.card button[id*="radio-buttons-remove"]'
    );
    let incrementId = $$('.card button[id*="radio-buttons-update"]').length;

    $radioButtons?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });

    for (let i = 0; i < $allButtonRadiosUpdate.length; i++) {
        const buttonRadiosUpdate = $allButtonRadiosUpdate[i];
        buttonRadiosUpdate.addEventListener("click", (evt) => {
            modal({
                title: "update input options",
                content: () =>
                    bodyModal(evt.target as HTMLButtonElement, {
                        tag: "input",
                        tagOptions: "label",
                    }),
                action: () =>
                    update(evt.target as HTMLButtonElement, { incrementId }),
            });
        });
    }

    for (let i = 0; i < $allButtonRadiosRemove.length; i++) {
        const buttonRadioRemove = $allButtonRadiosRemove[i] as HTMLButtonElement;
        buttonRadioRemove.addEventListener("click", removeElementForm);
    }
}
