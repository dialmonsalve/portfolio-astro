import { create } from "../inputs/DoubleButtonForm.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function doubleBackNext() {
    const $buttonDoubleBackSubmit = $("#double-back-submit");

    const $allButtonBackSubmitRemove = $$(
        '.card button[id*="both-back-submit-remove"]'
    );

    let incrementId = $$('.card button[id*="both-back-submit-remove"]').length;

    $buttonDoubleBackSubmit?.addEventListener("click", () => {
        incrementId++;
        create({ type: "submit", incrementId, buttonType: "submit" });
        smooth();
    });

    for (let i = 0; i < $allButtonBackSubmitRemove.length; i++) {
        const buttonSignatureRemove = $allButtonBackSubmitRemove[i] as HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
