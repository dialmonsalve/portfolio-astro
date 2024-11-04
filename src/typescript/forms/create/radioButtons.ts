import { create } from "../inputs/radioButtons";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function radioButtons() {
  const $radioButtons = $("#radio-buttons");
  let incrementId = 0;

  $radioButtons?.addEventListener("click", () => {
    incrementId++;
    create({ incrementId });
    smooth();
  });
}
