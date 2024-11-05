interface GetImageOptions {
  id: string;
  name?: string;
}

export function getImage({ id, name }: GetImageOptions) {
  const $parentDiv = document.createElement("div");
  const $label = document.createElement("label");
  $parentDiv.id = `container-${id}`;
  $parentDiv.setAttribute("data-target", id);
  $parentDiv.classList.add("new-uploader");
  $label.htmlFor = "image";
  $label.classList.add("label");
  $label.textContent = "Upload image";

  const svg = `<svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="#8c68cd" 
            class="bi bi-cloud-plus new-uploader__image" 
            viewBox="0 0 16 16" data-sk-target="${id}"
        >
            <path 
                fill-rule="evenodd" 
                d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" 
            >
            </path>
            <path 
                d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z">
            </path>
        </svg>`;

  const $input = document.createElement("label");
  $input.id = `input-${id}`;
  $input.classList.add("new-uploader__input");
  $input.setAttribute("data-sk-drawer", `drawer-${id}`);
  $input.setAttribute("name", `input-${name}`);
  $input.setAttribute("data-sk-target", `${id}`);
  $input.setAttribute("data-required", "true");

  $parentDiv.innerHTML = svg;
  $parentDiv.appendChild($label);
  $parentDiv.appendChild($input);

  return $parentDiv;
}
