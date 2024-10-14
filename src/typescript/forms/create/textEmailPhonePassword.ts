import { create } from "../inputs/textEmailPhonePassword";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

type InputType = "Text" | "Email" | "Phone" | "Password"

export default function input({ type }: { type: InputType }) {
    const lowerType = type.toLocaleLowerCase();
    const $input = $(`#${lowerType}`);
    let incrementId = 0;

    $input?.addEventListener("click", () => {
        incrementId++;
        create(incrementId, {
            object: type,
            type: lowerType === "password" ? "text" : lowerType as "text",
        });
        smooth();
    });
}
