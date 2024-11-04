import modal from "../components/modal.js";
import { create, bodyModal, update } from "../inputs/files.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function files() {
    const $files = $("#files");
    const $allButtonFilesUpdate = $$('.card button[id*="files-update"]');
    const $allButtonFilesRemove = $$('.card button[id*="files-remove"]');

    let incrementId = $$('.card button[id*="files-update"]').length;

    $files?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });

    for (let i = 0; i < $allButtonFilesUpdate.length; i++) {
        const buttonSignatureUpdate = $allButtonFilesUpdate[i];
        buttonSignatureUpdate.addEventListener("click", (evt) =>
            modal({
                title: "configure files",
                content: () => bodyModal(evt.target as HTMLButtonElement),
                action: () =>
                    update(evt.target as HTMLButtonElement, { incrementId }),
            })
        );
    }

    for (let i = 0; i < $allButtonFilesRemove.length; i++) {
        const buttonSignatureRemove = $allButtonFilesRemove[
            i
        ] as HTMLButtonElement;
        buttonSignatureRemove.addEventListener("click", removeElementForm);
    }
}
