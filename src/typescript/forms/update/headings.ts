import { create, configure } from "../inputs/headings.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $$ = (selector) => doc.querySelectorAll(selector);

export default function headings() {
    const $heading = document.querySelector("#heading");
    const $allButtonHeadingsUpdate = $$('.card button[id*="heading-update"]');
    const $allButtonHeadingsRemove = $$('.card button[id*="heading-remove"]');
    let incrementId = $$('.card button[id*="heading-update"]').length;

    $heading.addEventListener("click", () => {
        incrementId++;
        create(incrementId);
        smooth();
    });

    for (let i = 0; i < $allButtonHeadingsUpdate.length; i++) {
        const buttonHeadersUpdate = $allButtonHeadingsUpdate[i];
        buttonHeadersUpdate.addEventListener("click", (evt) =>
            configure(evt.target, incrementId)
        );
    };

    for (let i = 0; i < $allButtonHeadingsRemove.length; i++) {
        const buttonHeadersRemove = $allButtonHeadingsRemove[i];
        buttonHeadersRemove.addEventListener("click", removeElementForm);
    };
}
