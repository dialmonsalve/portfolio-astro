import { create } from "../components/textEmailPhonePassword";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function password() {
  const $password = $("#password");
  let incrementId = 0;

  $password?.addEventListener("click", () => {
    incrementId++;
    create(incrementId, { object: "Password", type: "text" });
  });
}