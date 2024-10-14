import { create } from "../inputs/SingleButtonForm";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector:string) => doc.querySelector(selector);

let incrementId = 0;
export default function singleNext() {
    const $buttonNext = $("#single-next");

    $buttonNext?.addEventListener("click", () => {
        incrementId++;
        create({ type: "next", incrementId, buttonType: "button" });
        smooth();
    });
}
