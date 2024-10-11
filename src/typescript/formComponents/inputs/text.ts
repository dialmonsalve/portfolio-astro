import { create } from "../components/textEmailPhonePassword.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function text() {
  const $text = $("#text");
  let incrementId = 0;

  $text?.addEventListener("click", () => {
    incrementId++;
    create(incrementId, { object: "Text", type: "text" });
  });
}
