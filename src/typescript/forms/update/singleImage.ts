import { create, update } from "../inputs/images.js";
import bodyModal from "../components/bodyImage.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";
import modal from "../components/modal.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);
const $$ = (selector: string) => doc.querySelectorAll(selector);

export default function singleImage() {
    const $singleImage = $("#single-image");

    const $allButtonSingleImageUpdate = $$(
        '.card button[id*="single-image-update"]'
    );
    const $allButtonSingleImageRemove = $$(
        '.card button[id*="single-image-remove"]'
    );
    let incrementId = $$('.card button[id*="single-image-update"]').length;

    $singleImage?.addEventListener("click", () => {
        incrementId++;

        create({
            incrementId,
            showPhoto: false,
            stringId: "single-image",
            takePicture: false,
        });
        smooth();
    });

    for (let i = 0; i < $allButtonSingleImageUpdate.length; i++) {
        const buttonSignatureUpdate = $allButtonSingleImageUpdate[i];
        buttonSignatureUpdate.addEventListener("click", (evt) =>
            modal({
                title: `update image options`,
                content: () =>
                    bodyModal(evt.target as HTMLButtonElement, {
                        showPhoto: false,
                        
                    }),
                action: () =>
                    update(evt.target as HTMLButtonElement, {
                        incrementId,
                        showPhoto: false,

                    }),
            })
        );
    }

    for (let i = 0; i < $allButtonSingleImageRemove.length; i++) {
        const buttonSignatureRemove = $allButtonSingleImageRemove[i] as HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
