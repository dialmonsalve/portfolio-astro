const drawer = document.createElement("canvas");
drawer.style.display = "none";
drawer.id = "drawer";
document.body.appendChild(drawer);

let rowIterator = 1;

export default function startUpload({
  userId,
  token,
  route,
  containerId,
  name
}) {
  const $buttonAdd = document.querySelector(`#button-${name}`);
  const uploads = document.querySelectorAll(`.uploader-${name}`);

  for (let item of uploads) {
    item.style.display = "none";
    item.insertAdjacentHTML(
      "beforebegin",
      getImage(
        item,
        item.dataset.uploadRoute,
        item.dataset.uploadKey,
        item.dataset.uploadId
      )
    );
    document
      .getElementById(`container-${item.id}`)
      .addEventListener("click", addImageByClick);
    document
      .getElementById(`container-${item.id}`)
      .addEventListener("drop", addImageByDrop);
    document
      .getElementById(`container-${item.id}`)
      .addEventListener("dragover", dragOverEvent);
  }

  $buttonAdd.addEventListener("click", function () {
    add(route, token, userId, containerId);
  });
}

function add(route, key, id, containerId) {
  rowIterator++;
  let content = `
        <div id="row-${containerId}-${rowIterator}"
            >
            <input
                type="file" 
                id="multi-${containerId}-${rowIterator}"
                name="multi-${containerId}-${rowIterator}" 
                class="uploader" 
                data-upload-route="${route}" 
                data-upload-key="${key}" 
                data-upload-id="${id}"
            />
            <div class="container-button-add">
                <span 
                    class="delete-photo"
                    data-target="row-${containerId}-${rowIterator}"
                    id='delete-${rowIterator}'
                ><i class="bi bi-x"></i>
                </span>
            </div>
        </div>`;

  const containerPhoto = document.querySelector(`#contain-${containerId}`);
  const lastChild = containerPhoto.children.length - 1;
  containerPhoto.children.item(lastChild).insertAdjacentHTML("afterend", content);
  const newRow = document.getElementById(
    `multi-${containerId}-${rowIterator}`
  );

  newRow.style.display = "none";
  newRow.insertAdjacentHTML(
    "beforebegin",
    getImage(
      newRow,
      newRow.dataset.uploadRoute,
      newRow.dataset.uploadKey,
      newRow.dataset.uploadId
    )
  );
  document
    .getElementById(`container-${newRow.id}`)
    .addEventListener("click", addImageByClick);
  document
    .getElementById(`container-${newRow.id}`)
    .addEventListener("drop", (e) => addImageByDrop(e, target));
  document
    .getElementById(`container-${newRow.id}`)
    .addEventListener("dragover", dragOverEvent);

  const $btnDelete = document.querySelector(`#delete-${rowIterator}`)

  $btnDelete.addEventListener('click', function (e) {
    quit(e, this)
  })
}

function quit(e, element) {

  const divParent = element.parentNode.parentNode.parentNode;

  let target = e.target;
  if (target.tagName == "I") {
    target = target.parentNode;
  }

  const divContainer = divParent.querySelector(`#${target.dataset.target}`);
  rowIterator--;
  divContainer.remove();
}

function createImage(file, parent) {
  const uploadRoute = parent.dataset.uploadRoute;
  const token = parent.dataset.uploadKey;
  const userId = parent.dataset.uploadId;
  createImageBitmap(file, {
    resizeQuality: "high",
    premultiplyAlpha: "premultiply",
    imageOrientation: "none",
  }).then((img) => {
    drawer.height = img.height;
    drawer.width = img.width;
    let ctx = drawer.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    drawer.toBlob(
      (blob) => {
        const UUID = getUUID();
        let webpImage = new File([blob], UUID, { type: "image/webp" });
        generateWebp(webpImage, uploadRoute, parent.id, token, userId);
        let inputText = parent.querySelector('input[type="text"]');

        inputText.value =
          UUID + "." + webpImage.type.replace("image/", "");
        const urlObj = URL.createObjectURL(webpImage);
        const image = document.createElement("img");
        const label = document.createElement("label")
        image.width = 100;
        image.height = 100;
        image.src = urlObj;
        image.alt = UUID;
        image.classList.add('image')
        label.innerText = "Click image to delete"
        label.classList.add('label-reset-image')
        image.addEventListener("click", reset);
        parent.querySelector("svg").replaceWith(label, image);
      },
      "image/webp",
      0.95
    );

    ctx.reset();
  });
}

function generateWebp(blob, route, id, token, userId) {
  let loadImageWorker = null;
  if (window.Worker) {
    loadImageWorker = new Worker("/js/workers/loadImage.js");
  }

  if (loadImageWorker == null) {
    $.alert({
      title: "Unsupport functionality for this browser.",
      content:
        "This funtionality isn't support in this browser, please use other browser.",
    });
    return;
  }

  loadImageWorker.postMessage({
    img: blob,
    route: route,
    id,
    token,
    userId,
  });

  loadImageWorker.onmessage = (e) => {
    parent = document.getElementById(e.data.id);
    if (e.data.status == 200) {
      let inputText = parent.querySelector('input[type="text"]');
      document.getElementById(e.data.id.replace("container-", "")).value =
        null;
      inputText.style.background = "#A8F0A8";
    } else {
      $.alert({
        title: "error al cargar imagen",
        color: "red",
        content: "error al cargar imagen",
        buttons: {
          ok: {
            text: "Ok",
            btnClass: "btn btn-success",
            keys: ["enter"],
            action: () => {
              parent.firstElementChild.click();
            },
          },
        },
      });
    }
  };
}

function addImageByClick(e) {
  e.stopPropagation();
  const target = e.target.dataset.skTarget;
  let obj = document.getElementById(target);
  obj?.addEventListener("change", loadImage);
  obj?.click();
}

function addImageByDrop(e) {
  e.preventDefault();
  const target = "";
  const tagName = e.target.tagName;
  const parent = null;

  if (tagName == "svg" || tagName == "input") {
    parent = e.target.parentNode;
  } else if (tagName == "path") {
    parent = e.target.parentNode.parentNode;
  } else {
    parent = e.target.parentNode;
  }

  const file = e.dataTransfer.files.item(0);

  createImage(file, parent);
}

function dragOverEvent(e) {
  e.preventDefault();
}

function loadImage(e) {
  const file = e.target.files[0];
  let obj = document.getElementById(`container-${e.target.id}`);
  createImage(file, obj);
}

function getImage(item, route, token, userId) {
  return `<div 
                class="new-uploader"
                id="container-${item.id}" 
                data-target="${item.id}" 
                data-upload-route="${route}" 
                data-upload-key="${token}" 
                data-upload-id="${userId}"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg"  
                    fill="#8c68cd"
                    class="bi bi-cloud-plus new-uploader__image" 
                    viewBox="0 0 16 16" 
                    data-sk-target="${item.id}"
                >
                    <path 
                        fill-rule="evenodd" 
                        d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5" 
                    >
                    </path>
                    <path 
                        d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"
                    >
                    </path>
                </svg>
                <input 
                    type="text" 
                    readonly data-sk-drawer="drawer-${item.id}" 
                    id="input-${item.id}" 
                    name="input-${item.id}" 
                    data-sk-target="${item.id}" 
                    required
                    class="new-uploader__input"
                    data-required='true'
                />
            </div>`;
}

function getUUID() {
  let buffer = new ArrayBuffer(24);
  let bigint64 = new BigUint64Array(buffer);

  let uuid = crypto.getRandomValues(bigint64);

  return uuid[0] + "-" + uuid[1] + "-" + uuid[2];
}

function reset(e) {
  e.stopPropagation();
  const parent = e.target.parentNode;
  const inputText = parent.querySelector('input[type="text"]');
  inputText.style.background = "transparent";
  const id = parent.dataset.target;
  const route = parent.dataset.uploadRoute;
  const token = parent.dataset.uploadKey;
  const userId = parent.dataset.uploadId;
  const elem = $(getImage({ id }, route, token, userId))[0];
  elem.addEventListener("click", addImageByClick);
  elem.addEventListener("drop", addImageByDrop);
  elem.addEventListener("dragover", dragOverEvent);
  parent.replaceWith(elem);
  inputText.value = "";
}