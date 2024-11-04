import modal from "../components/modal.js";
import { create, bodyModal, update } from "../inputs/number.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function number() {
    const $number = $("#number");
    const $allButtonNumbersUpdate = $$('.card button[id*="number-update"]');
    const $allButtonNumbersRemove = $$('.card button[id*="number-remove"]');
    let incrementId = $$('.card button[id*="number-update"]').length;

    $number?.addEventListener("click", () => {
        incrementId++;
        create({incrementId});
        smooth();
    });

    for (let i = 0; i < $allButtonNumbersUpdate.length; i++) {
        const buttonNumberUpdate = $allButtonNumbersUpdate[i];
        buttonNumberUpdate.addEventListener("click", (evt) =>
            modal({
                title: "update input text",
                content: () => bodyModal(evt.target as HTMLButtonElement),
                action: () =>
                    update(evt.target as HTMLButtonElement, { incrementId }),
            })
        );
    };

    for (let i = 0; i < $allButtonNumbersRemove.length; i++) {
        const buttonHeadersRemove = $allButtonNumbersRemove[i] as HTMLButtonElement;
        buttonHeadersRemove.addEventListener("click", removeElementForm);
    };
}