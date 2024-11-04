import { create } from "../inputs/DoubleButtonForm.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function doubleBackNext() {
    const $buttonDoubleBackNext = $("#double-back-next");

    const $allButtonBackNextRemove = $$(
        '.card button[id*="both-back-next-remove"]'
    );

    let incrementId = $$('.card button[id*="both-back-next-remove"]').length;

    $buttonDoubleBackNext?.addEventListener("click", () => {
        incrementId++;
        create({ type: "next", incrementId, buttonType: "button" });
        smooth();
    });

    for (let i = 0; i < $allButtonBackNextRemove.length; i++) {
        const buttonSignatureRemove = $allButtonBackNextRemove[
            i
        ] as HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
