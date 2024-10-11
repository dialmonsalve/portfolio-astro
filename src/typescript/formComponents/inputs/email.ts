import { create } from "../components/textEmailPhonePassword";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function email() {
  const $email = $("#email");
  let incrementId = 0;

  $email?.addEventListener("click", () => {
    incrementId++;
    create(incrementId, { object: "Email", type: "email" });
  });
}