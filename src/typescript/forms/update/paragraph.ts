import { create, configure } from "../inputs/paragraph.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector) => doc.querySelector(selector);
const $$ = (selector) => doc.querySelectorAll(selector);

export default function paragraph() {
    const $paragraph = $("#paragraph");

    const $allButtonParagraphsUpdate = $$('.card button[id*="paragraph-update"]');
    const $allButtonParagraphsRemove = $$('.card button[id*="paragraph-remove"]');
    let incrementId = $$('.card button[id*="paragraph-update"]').length;

    $paragraph.addEventListener("click", () => {
        incrementId++;
        create(incrementId);
        smooth();
    });

    for (let i = 0; i < $allButtonParagraphsUpdate.length; i++) {
        const buttonParagraphsUpdate = $allButtonParagraphsUpdate[i];
        buttonParagraphsUpdate.addEventListener("click", configure );
    };

    for (let i = 0; i < $allButtonParagraphsRemove.length; i++) {
        const buttonParagraphsRemove = $allButtonParagraphsRemove[i];
        buttonParagraphsRemove.addEventListener("click", removeElementForm);
    };
}
