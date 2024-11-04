import modal from "../components/modal";

const $$ = (selector: string) => document.querySelectorAll(selector);
const $ = (selector: string) => document.querySelector(selector);

(() => {
  const $allButtonDeleteForm = $$(".delete-user");

  $allButtonDeleteForm.forEach(($button) => {
    const uuid = $button.getAttribute("data-uuid");
    const title = $button.getAttribute("data-title");
    $button.addEventListener("click", () => {
      modal({
        title: "Delete",
        content() {
          const $div = document.createElement("DIV");
          const $paragraph = document.createElement("P");

          $paragraph.textContent = `Do you want delete ${title} form?`;

          $div.appendChild($paragraph);

          return $div;
        },
        type: "red",
        action() {
          const $form = $("#delete-form") as HTMLFormElement;
          $form.action = `/admin/forms/${uuid}`;
          $form.submit();
        },
      });
    });
  });
})();
