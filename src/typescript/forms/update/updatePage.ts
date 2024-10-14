import addPage from "../utils/addPage.js";
import removePage from "../utils/removePage.js";

const doc = document;
const $ = (selector) => doc.querySelector(selector);
const $$ = (selector) => doc.querySelectorAll(selector);

export default function updatePage() {
    const $buttonCreate = $(`#add-page`);

    $buttonCreate.addEventListener("click", (evt) => addPage(evt, incrementId));
    const $allButtonRemove = $$('.card button[id*="remove-page"]');
    let incrementId = $$(".card").length;

    for (let i = 0; i < $allButtonRemove.length; i++) {
        const buttonRemove = $allButtonRemove[i];

        buttonRemove.addEventListener("click", (evt) =>
            removePage(evt, incrementId)
        );
    }
}
