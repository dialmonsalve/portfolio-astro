import { create } from "../inputs/DoubleButtonForm";
import smooth from "../utils/smoothWindow";

const $ = (selector: string) => document.querySelector(selector)

export default function doubleBackNext() {
    let incrementId = 0;

    const $buttonDoubleBackNext = $("#double-back-next");

    $buttonDoubleBackNext?.addEventListener("click", () => {
        incrementId++;
        create({ type: "next", incrementId, buttonType: "button" });
        smooth()
    });

}
