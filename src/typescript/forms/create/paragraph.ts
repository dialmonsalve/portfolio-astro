import { create } from "../inputs/paragraph";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector:string) => doc.querySelector(selector);

export default function paragraph() {
    const $paragraph = $("#paragraph");
    let incrementId = 0;

    $paragraph?.addEventListener("click", () => {
        incrementId++;
        create(incrementId);
        smooth();
    });
}