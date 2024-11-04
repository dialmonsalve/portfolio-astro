import modal from "../components/modal.js";
import { create, update, bodyModal } from "../inputs/signature.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function signature() {
    const $signature = $("#signature");

    const $allButtonSignaturesUpdate = $$(
        '.card button[id*="signature-update"]'
    );
    const $allButtonSignaturesRemove = $$(
        '.card button[id*="signature-remove"]'
    );
    let incrementId = $$('.card button[id*="signature-update"]').length;

    $signature?.addEventListener("click", () => {
        incrementId++;
        create({incrementId});
        smooth();
    });

    for (let i = 0; i < $allButtonSignaturesUpdate.length; i++) {
        const buttonSignatureUpdate = $allButtonSignaturesUpdate[i];
        buttonSignatureUpdate.addEventListener("click", (evt) =>
            modal({
                title: "update signature",
                content: () => bodyModal(evt.target as HTMLButtonElement),
                action: () =>
                    update(evt.target as HTMLButtonElement, { incrementId }),
            })
        );
    }

    for (let i = 0; i < $allButtonSignaturesRemove.length; i++) {
        const buttonSignatureRemove = $allButtonSignaturesRemove[i] as HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
