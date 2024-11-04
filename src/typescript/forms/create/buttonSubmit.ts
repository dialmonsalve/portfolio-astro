import { create } from "../inputs/SingleButtonForm.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

let incrementId = 0;
export default function singleNext() {
    const $buttonSubmit = $("#single-submit");

    $buttonSubmit?.addEventListener("click", () => {
        incrementId++;
        create({
            type: "submit",
            incrementId,
            buttonType: "submit",
            style: 100,
        });
        smooth();
    });
}
