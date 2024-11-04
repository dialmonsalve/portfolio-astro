import { create } from "../inputs/multiImage";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function MultiImage() {
  const $multiImage = $("#multi-images");

  let incrementId = 0;

  $multiImage?.addEventListener("click", () => {
    incrementId++;
    create({ incrementId });
    smooth();
  });
}
