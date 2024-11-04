import { create } from "../inputs/select";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function select() {
  const $select = $("#select");
  let incrementId = 0;

  $select?.addEventListener("click", () => {
    incrementId++;
    create({ incrementId });
    smooth();
  });
}
