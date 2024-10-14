const doc = document;
const $ = (selector: string) => doc.querySelector(selector);

interface UploadFiles {
    buttonMessage: string;
    idNameFiles: string;
    inputId: string;
    deletedButton: number,
    maxFiles: number
    maxWeight: number
}

export function uploadFiles({
    buttonMessage,
    idNameFiles,
    inputId,
    deletedButton,
    maxFiles,
    maxWeight,
}: UploadFiles) {
    const nameFiles = $(inputId) as HTMLInputElement;
    const containerFiles = $(idNameFiles);

    nameFiles?.addEventListener("change", function addSiblings(event) {

        if (!containerFiles) return

        while (containerFiles.firstChild) {
            containerFiles.removeChild(containerFiles.firstChild);
        }

        const target = event.target as HTMLInputElement;
        const files = target.files;
        const buttonDelete = doc.createElement("BUTTON") as HTMLButtonElement;

        if (!files) return;

        if (files.length > 5) {
            removeSiblings(event);
            alertFunction({ messageError: maxFiles });
            event.preventDefault();
        }

        for (const file of files) {
            if (file.size > 5242880) {
                alertFunction({ messageError: `${file.name} ${maxWeight}` });
                event.preventDefault();
            } else {
                const divContain = doc.createElement("DIV") as HTMLButtonElement;;
                const paragraph = doc.createElement("P") as HTMLParagraphElement;
                paragraph.textContent = file.name;
                buttonDelete.textContent = buttonMessage;

                divContain.classList.add("container-name-files__contain");
                buttonDelete.setAttribute("type", "button");
                buttonDelete.setAttribute("id", `button-${deletedButton}`);
                paragraph.classList.add("container-name-files__p");
                buttonDelete.classList.add("container-name-files__delete");

                if (Array.from(containerFiles).find(`p:contains(${file.name})`).length)
                    return;

                containerFiles.appendChild(divContain);
                containerFiles.appendChild(buttonDelete);
                divContain.appendChild(paragraph);
                buttonDelete.addEventListener("click", removeSiblings);
            }
        }
    });

    function removeSiblings(event: Event) {
        if (!nameFiles) return;
        const $this = event.target as HTMLButtonElement
        nameFiles.value = ""
        $this.siblings().remove();
        $this.remove();
    }

    function alertFunction({ messageError }) {
        $.confirm({
            title: "error".toUpperCase(),
            content: ` 
                <p class='paragraph' >${messageError}</p>
            `,
            type: "red",
            escapeKey: "cancel",
            buttons: {
                cancel: {
                    text: "cancel",
                    btnClass: "btn btn-danger btn-sm",
                    action: function () { },
                },
            },
        });
    }
}
