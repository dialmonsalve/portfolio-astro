import { create } from "../inputs/images";
import smooth from "../utils/smoothWindow";

const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

export default function image() {
  const $singleImage = $("#one-image");
  let incrementId = 0;

  $singleImage?.addEventListener("click", () => {
    incrementId++;
    create({
      incrementId,
      showPhoto: true,
      stringId: "image",
      takePicture: false,
    });
    smooth();
  });
}
