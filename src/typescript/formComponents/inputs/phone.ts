import { create } from "../components/textEmailPhonePassword.js";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function phone() {
  const $phone = $("#phone");
  let incrementId = 0;

  $phone?.addEventListener("click", () => {
    incrementId++;
    create(incrementId, { object: "Phone", type: "phone" });
  });
}