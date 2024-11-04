import smooth from "./smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function navigateInPage() {
    const scroller = $("main");
    const $buttonUp = $("#btn-up");
    const $buttonDown = $("#btn-down");

    $buttonUp?.addEventListener("click", () => {
        scroller?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    $buttonDown?.addEventListener("click", smooth);
}
