import { create } from "../components/images";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function singleImage() {
  const $singleImage = $("#single-image");
  let incrementId = 0;

  $singleImage?.addEventListener("click", () => {
    incrementId++;

    create(incrementId, {
      showPhoto: false,
      object: "SingleImage",
      stringId: "single-image",
    });
  });
}