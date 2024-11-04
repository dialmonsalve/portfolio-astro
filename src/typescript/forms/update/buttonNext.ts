import { create } from "../inputs/SingleButtonForm.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $$ = (selector: string) => doc.querySelectorAll(selector);

export default function singleNext() {
    const $buttonNext = $("#single-next");

    const $allButtonNextRemove = $$('.card button[id*="btn-next-remove"]');

    let incrementId = $$('.card button[id*="Next-update"]').length;

    $buttonNext?.addEventListener("click", () => {
        incrementId++;
        create({ type: "next", incrementId, buttonType: "button" });
        smooth();
    });

    for (let i = 0; i < $allButtonNextRemove.length; i++) {
        const buttonSignatureRemove = $allButtonNextRemove[i] as  HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
