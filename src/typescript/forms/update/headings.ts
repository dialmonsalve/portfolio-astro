import modal from "../components/modal.js";
import { create, bodyModal, update } from "../inputs/headings.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function headings() {
    const $heading = $("#heading");
    const $allButtonHeadingsUpdate = $$('.card button[id*="heading-update"]');
    const $allButtonHeadingsRemove = $$('.card button[id*="heading-remove"]');
    let incrementId = $$('.card button[id*="heading-update"]').length;

    $heading?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });

    for (let i = 0; i < $allButtonHeadingsUpdate.length; i++) {
        const buttonHeadersUpdate = $allButtonHeadingsUpdate[i];
        buttonHeadersUpdate.addEventListener("click", (evt) =>
            modal({
                title: "update title",
                content: () => bodyModal(evt.target as HTMLButtonElement),
                action: () => update(evt.target as HTMLButtonElement),
            })
        );
    }

    for (let i = 0; i < $allButtonHeadingsRemove.length; i++) {
        const buttonHeadersRemove = $allButtonHeadingsRemove[i] as HTMLButtonElement;
        buttonHeadersRemove.addEventListener("click", removeElementForm);
    }
}
