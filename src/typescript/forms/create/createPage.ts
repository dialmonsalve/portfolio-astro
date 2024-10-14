import addPage from "../utils/addPage";

export default function createPage() {
    const $buttonCreate = document.querySelector(`#button-add-page`);
    let incrementId = 1;
    $buttonCreate?.addEventListener("click", (evt) => addPage(evt, incrementId));
}