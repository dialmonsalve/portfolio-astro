import { create } from "../components/dateDateTimeTextarea.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function textarea() {
  const $textarea = $("#textarea");
  let incrementId = 0;

  $textarea?.addEventListener("click", () => {
    incrementId++;
    create(incrementId, {
      object: "Textarea",
      type: "textarea",
      input: "TEXTAREA",
    });
  });
}