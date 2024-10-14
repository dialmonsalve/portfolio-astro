import { create } from "../inputs/dateDateTimeTextarea";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

interface Options {
    object: 'Date' | 'DateTime' | 'Textarea',
    type: InputType;
    input: Input
}

type InputType = 'date' | 'time' | 'textarea'
type Input = 'TEXTAREA' | 'INPUT'

export default function date({ type, object, input }: Options) {
    const isTime = type === "time" ? "date-time" : type;
    const $input = $(`#${isTime}`);
    let incrementId = 0;

    $input?.addEventListener("click", () => {
        incrementId++;
        create(incrementId, {
            object,
            type,
            input,
        });
        smooth();
    });
}
