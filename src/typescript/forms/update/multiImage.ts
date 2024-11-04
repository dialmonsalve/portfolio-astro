import modal from "../components/modal.js";
import { create, update } from "../inputs/multiImage.js";
import bodyModal from "../components/bodyImage.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function multiImage() {
    const $multiImage = $("#multi-image");

    const $allButtonMultiImageUpdate = $$(
        '.card button[id*="multi-image-update"]'
    );
    const $allButtonMultiImageRemove = $$(
        '.card button[id*="multi-image-remove"]'
    );

    let incrementId = $$('.card button[id*="multi-image-update"]').length;

    $multiImage?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });

    for (let i = 0; i < $allButtonMultiImageUpdate.length; i++) {
        const buttonSignatureUpdate = $allButtonMultiImageUpdate[i];
        buttonSignatureUpdate.addEventListener("click", (evt) =>
            modal({
                title: "update photo options",
                content: () =>
                    bodyModal(evt.target as HTMLButtonElement, {
                        showPhoto: false,
                    }),
                action: () =>
                    update(evt.target as HTMLButtonElement, { incrementId }),
            })
        );
    }

    for (let i = 0; i < $allButtonMultiImageRemove.length; i++) {
        const buttonSignatureRemove = $allButtonMultiImageRemove[i] as HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
