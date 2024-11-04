import modal from "../components/modal.js";
import { create, update } from "../inputs/images.js";
import removeElementForm from "../utils/removeElements.js";
import bodyModal from "../components/bodyImage.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

interface ImageOptions {
    userId: string;
    userToken: string;
    route: string;
}

export default function image({ userId, userToken, route }: ImageOptions) {
    const $singleImage = $("#image");

    const $allButtonMultiImageUpdate = $$('.card button[id*="image-update"]');
    const $allButtonMultiImageRemove = $$('.card button[id*="image-remove"]');

    let incrementId = $$('.card button[id*="image-update"]').length;

    $singleImage?.addEventListener("click", () => {
        incrementId++;
        create({
            incrementId,
            showPhoto: true,
            userId,
            userToken,
            route,
            stringId: "image",
            takePicture: false,
        });
        smooth();
    });

    for (let i = 0; i < $allButtonMultiImageUpdate.length; i++) {
        const buttonSignatureUpdate = $allButtonMultiImageUpdate[i];
        buttonSignatureUpdate.addEventListener("click", (evt) =>
            modal({
                title: `update image options`,
                content: () =>
                    bodyModal(evt.target as HTMLButtonElement, {
                        showPhoto: true,
                    }),
                action: () =>
                    update(evt.target as HTMLButtonElement, {
                        incrementId,
                        showPhoto: true,
                    }),
            })
        );
    }

    for (let i = 0; i < $allButtonMultiImageRemove.length; i++) {
        const buttonSignatureRemove = $allButtonMultiImageRemove[i] as HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
