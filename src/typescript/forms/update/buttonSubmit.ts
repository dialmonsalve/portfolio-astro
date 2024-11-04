import { create } from "../inputs/SingleButtonForm.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $$ = (selector: string) => doc.querySelectorAll(selector);

export default function singleNext() {
    const $buttonSubmit = $("#single-submit");

    const $allButtonSubmitRemove = $$('.card button[id*="btn-submit-remove"]');

    let incrementId = $$('.card button[id*="btn-submit-remove"]').length;

    $buttonSubmit?.addEventListener("click", () => {
        incrementId++;
        create({
            type: "submit",
            incrementId,
            buttonType: "submit",
            style: 100,
        });
        smooth();
    });

    for (let i = 0; i < $allButtonSubmitRemove.length; i++) {
        const buttonSignatureRemove = $allButtonSubmitRemove[i] as  HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
