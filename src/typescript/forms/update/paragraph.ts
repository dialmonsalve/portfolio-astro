import modal from "../components/modal.js";
import { create, bodyModal, update } from "../inputs/paragraph.js";
import removeElementForm from "../utils/removeElements.js";
import smooth from "../utils/smoothWindow.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

export default function paragraph() {
    const $paragraph = $("#paragraph");

    const $allButtonParagraphsUpdate = $$(
        '.card button[id*="paragraph-update"]'
    );
    const $allButtonParagraphsRemove = $$(
        '.card button[id*="paragraph-remove"]'
    );
    let incrementId = $$('.card button[id*="paragraph-update"]').length;

    $paragraph?.addEventListener("click", () => {
        incrementId++;
        create({ incrementId });
        smooth();
    });

    for (let i = 0; i < $allButtonParagraphsUpdate.length; i++) {
        const buttonParagraphsUpdate = $allButtonParagraphsUpdate[i];
        buttonParagraphsUpdate.addEventListener("click", (evt) =>
            modal({
                title: "update title",
                content: () => bodyModal(evt.target as HTMLButtonElement),
                action: () => update(evt.target as HTMLButtonElement),
            })
        );
    }

    for (let i = 0; i < $allButtonParagraphsRemove.length; i++) {
        const buttonParagraphsRemove = $allButtonParagraphsRemove[i] as HTMLButtonElement;
        buttonParagraphsRemove.addEventListener("click", removeElementForm);
    }
}
