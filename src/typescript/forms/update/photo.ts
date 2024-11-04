import modal from "../components/modal.js";
import { create, update } from "../inputs/images.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";
import bodyModal from "../components/bodyImage.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function photo() {
    const $photo = $("#photo");

    const $allButtonPhotoUpdate = $$('.card button[id*="photo-update"]');
    const $allButtonPhotoRemove = $$('.card button[id*="photo-remove"]');

    let incrementId = $$('.card button[id*="photo-update"]').length;

    $photo?.addEventListener("click", () => {
        incrementId++;

        create({
            incrementId,
            showPhoto: false,
            stringId: "photo",
            takePicture: true,
        });
        smooth();
    });

    for (let i = 0; i < $allButtonPhotoUpdate.length; i++) {
        const buttonSignatureUpdate = $allButtonPhotoUpdate[
            i
        ] as HTMLButtonElement;
        buttonSignatureUpdate.addEventListener("click", (evt) =>
            modal({
                title: `update photo options`,
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

    for (let i = 0; i < $allButtonPhotoRemove.length; i++) {
        const buttonSignatureRemove = $allButtonPhotoRemove[i] as HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
