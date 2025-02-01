import { create } from "../inputs/textEmailPhonePassword";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function input({
  type,
}: {
  type: "Text" | "Email" | "Phone" | "Password";
}) {
  const lowerType = type.toLocaleLowerCase() as
    | "text"
    | "email"
    | "phone"
    | "password";
  const $input = $(`#${lowerType}`);
  let incrementId = 0;

  $input?.addEventListener("click", () => {
  
    incrementId++;
    create({
      incrementId,
      object: type,
      type: lowerType === "password" ? "text" : lowerType,
    });
    smooth();
  });
}
