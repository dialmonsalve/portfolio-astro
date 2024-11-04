import { create } from "../inputs/number";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function phone() {
  const $number = $("#number");
  let incrementId = 0;

  $number?.addEventListener("click", () => {
    incrementId++;
    create({ incrementId });
    smooth();
  });
}
