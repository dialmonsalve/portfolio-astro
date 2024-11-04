import { create, update } from "../inputs/select.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";
import bodyModal from "../components/bodySelectRadio.js";
import modal from "../components/modal.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function select() {
    const $select = $("#select");
    const $allButtonSelectUpdate = $$('.card button[id*="select-update"]');
    const $allButtonSelectRemove = $$('.card button[id*="select-remove"]');
    let incrementId = $$('.card button[id*="select-update"]').length;

    $select?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });

    for (let i = 0; i < $allButtonSelectUpdate.length; i++) {
        const buttonNumberUpdate = $allButtonSelectUpdate[i];
        buttonNumberUpdate.addEventListener("click", (evt) => {
            modal({
                title: "update select options",
                content: () =>
                    bodyModal(evt.target as HTMLButtonElement, {
                        tag: "select",
                        tagOptions: "option",
                    }),
                action: () =>
                    update(evt.target as HTMLButtonElement, { incrementId }),
            });
        });
    }

    for (let i = 0; i < $allButtonSelectRemove.length; i++) {
        const buttonHeadersRemove = $allButtonSelectRemove[i] as HTMLButtonElement;
        buttonHeadersRemove.addEventListener("click", removeElementForm);
    }
}
