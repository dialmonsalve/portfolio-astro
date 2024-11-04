import { create } from "../inputs/dateDateTimeTextarea.js";
import smooth from "../utils/smoothWindow.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

interface Options {
    object: Obj;
    type: InputType;
    input: Input;
}

type InputType = "date" | "time" | "textarea";
type Input = "textarea" | "input";
type Obj = "Date" | "DateTime" | "Textarea";

export default function dateOrArea({ type, object, input }: Options) {
    const $input = $(`#${type}`);
    let incrementId = 0;

    $input?.addEventListener("click", () => {
        incrementId++;
        create({
            incrementId,
            object,
            type,
            input,
        });
        smooth();
    });
}
