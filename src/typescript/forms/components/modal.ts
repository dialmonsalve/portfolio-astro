export const Color = {
  yellow: "yellow",
  green: "green",
  purple: "purple",
  red: "red",
} as const;

interface Modal {
  title: string;
  type?: keyof typeof Color;
  content?: () => HTMLElement | undefined;
  action?: (e: MouseEvent) => void;
  twoButtons?: boolean;
}

export default function modal({
  title,
  content,
  type = "green",
  action,
  twoButtons = true,
}: Modal) {
  const windowModal = document.querySelector(".modal.show-modal");

  if (windowModal) return;
  const body = document.querySelector("body");

  const $modal = document.createElement("div");
  $modal.classList.add("modal", "show-modal");

  const $containerModal = document.createElement("div");
  $containerModal.classList.add("modal-content", type);

  const $modalHeader = document.createElement("div");
  $modalHeader.classList.add("modal-header");

  const $titleModal = document.createElement("p");
  $titleModal.classList.add("modal-header__title");
  $titleModal.textContent = title;

  const $modalFooter = document.createElement("div");
  $modalFooter.classList.add("modal-footer");

  const $buttonFooter1 = document.createElement("button");
  $buttonFooter1.classList.add("modal-footer__button-1");
  $buttonFooter1.textContent = "ok";

  const $buttonFooter2 = document.createElement("button");
  $buttonFooter2.classList.add("modal-footer__button-2");
  $buttonFooter2.textContent = "Cancel";

  const $element = document.createElement("div");

  const $nodeChild = content ? content() : $element;
  $element?.classList.add("modal-body");

  $modalHeader.appendChild($titleModal);

  $modalFooter.appendChild($buttonFooter1);
  if (twoButtons) $modalFooter.appendChild($buttonFooter2);

  $containerModal.appendChild($modalHeader);
  $containerModal.appendChild($nodeChild!);
  $containerModal.appendChild($modalFooter);
  $modal.appendChild($containerModal);

  if (action) {
    $buttonFooter1.addEventListener("click", action);
  }

  $buttonFooter1.addEventListener("click", () => closeModal($modal));

  $buttonFooter2.addEventListener("click", () => closeModal($modal));

  $modal.addEventListener("click", function (e) {
    if (e.target === this) closeModal(this);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal($modal);
  });

  body?.appendChild($modal);
}

function closeModal($modal: HTMLDivElement) {
  $modal.classList.add("hide-modal");
  setTimeout(() => {
    $modal.remove();
  }, 300);
}
