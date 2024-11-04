import addPage from "../utils/addPage.js";

export default function createPage() {
  const $buttonCreate = document.querySelector("#add-page");
  const incrementId = 1;
  $buttonCreate?.addEventListener("click", (evt) => addPage(evt, incrementId));
}
