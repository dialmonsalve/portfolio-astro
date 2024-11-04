import { create } from "../inputs/signature";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function signature() {
  const $signature = $("#signature");
  let incrementId = 0;

  $signature?.addEventListener("click", () => {
    incrementId++;
    create({ incrementId });
    smooth();
  });
}
