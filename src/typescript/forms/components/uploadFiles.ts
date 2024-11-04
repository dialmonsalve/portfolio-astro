import modal from "./modal";

export default function uploadFiles({
  containerId,
  maxFiles,
}: {
  containerId: string;
  maxFiles?: number;
}) {
  let incrementId = 0;

  const containerFiles = document.querySelector(
    `#${containerId}`,
  ) as HTMLDivElement;
  const containerParent = containerFiles?.parentElement;
  const nameFiles = containerFiles?.querySelector(
    'input[type="file"]',
  ) as HTMLInputElement;

  const buttonText = document.querySelector("#button-text") as HTMLInputElement;

  const divContain = document.createElement("div");

  nameFiles?.addEventListener("change", (event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    const buttonDelete = document.createElement("button");

    incrementId++;

    if (!files) return;

    if (maxFiles && files.length > maxFiles) {
      removeChildren(divContain);
      alertMessage({
        messageError: `No deben ser más de ${maxFiles} archivos`,
      });
      event.preventDefault();
      return;
    }

    removeChildren(divContain);
    for (const file of files) {
      if (file.size > 5242880) {
        alertMessage({ messageError: `${file.name} es muy pesado` });
        event.preventDefault();
      } else {
        const paragraph = document.createElement("p");
        paragraph.textContent = file.name;
        buttonDelete.textContent = buttonText.value;

        divContain.classList.add("container-name-files__contain");
        buttonDelete.setAttribute("type", "button");
        buttonDelete.setAttribute("id", `button-${incrementId}`);
        paragraph.classList.add("container-name-files__p");
        buttonDelete.classList.add("container-name-files__delete");

        // if (containerFiles.find(`p:contains(${file.name})`).length)
        //     return;

        divContain?.appendChild(paragraph);
        divContain?.appendChild(buttonDelete);
        containerParent?.appendChild(divContain);
        buttonDelete.addEventListener("click", removeSiblings);
      }
    }
  });

  function removeSiblings(evt: Event) {
    const target = evt.target as HTMLButtonElement;
    const parentButton = target.parentElement;
    removeChildren(parentButton);
    parentButton?.remove();
    nameFiles.value = "";
  }
}
function alertMessage({ messageError }: { messageError: string }) {
  modal({
    title: "error".toUpperCase(),
    content() {
      const div = document.createElement("div");
      const p = document.createElement("p");

      p.textContent = messageError;
      p.classList.add("paragraph");
      div.appendChild(p);
      return div;
    },
    twoButtons: false,
    type: "red",
  });
}

function removeChildren(parentButton: HTMLElement | null) {
  while (parentButton?.firstChild) {
    parentButton.removeChild(parentButton.firstChild);
  }
}
