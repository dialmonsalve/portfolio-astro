
import { create } from "../inputs/checkbox";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector:string) => doc.querySelector(selector);

export default function checkbox() {
    const $checkbox = $("#checkbox");
    let incrementId = 0;

    $checkbox?.addEventListener("click", () => {
        incrementId++;
        create(incrementId);
        smooth()
    });
}