import { create } from "../inputs/images";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function singleImage() {
    const $singleImage = $("#one-image");
    let incrementId = 0;

    $singleImage?.addEventListener("click", () => {
        incrementId++;

        create(incrementId, {
            showPhoto: false,
            stringId: "single-image",
        });
        smooth()
    });
}
