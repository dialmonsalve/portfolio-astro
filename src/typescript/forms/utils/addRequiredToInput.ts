const doc = document;

interface AddRequiredToInput {
    elementRequired: HTMLElement;
    checkedRequired: "true" | "false";
    min?: number;
    max?: number;
}

export default function addRequiredToInput({
    elementRequired,
    checkedRequired,
    min,
    max,
}: AddRequiredToInput) {
    if (checkedRequired === "true") {
        const $spanRequired = span({ label: "Required" });
        elementRequired.appendChild($spanRequired);
    } else {
        const $oldSpan = elementRequired?.querySelector("#required");
        $oldSpan?.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.remove();
            }
        });

        $oldSpan?.remove();
    }

    if (min && min > 0) {
        const $spanMin = span({ label: "Min", quantity: min });
        elementRequired.appendChild($spanMin);
    } else {
        const $oldSpan = elementRequired?.querySelector("#min");
        $oldSpan?.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.remove();
            }
        });
        $oldSpan?.remove();
    }

    if (max && max > 0) {
        const $spanMin = span({ label: "Max", quantity: max });
        elementRequired.appendChild($spanMin);
    } else {
        const $oldSpan = elementRequired?.querySelector("#max");
        $oldSpan?.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.remove();
            }
        });
        $oldSpan?.remove();
    }
}

function span({ label, quantity }: { label: string; quantity?: number }) {
    const $span = doc.createElement("SPAN");
    const textNode = document.createTextNode(quantity ? `${label}: ${quantity}` : label);
    $span.appendChild(textNode);
    $span.className = "text-danger";
    $span.style.fontSize = "10px";
    $span.style.marginLeft = "4px";
    $span.id = label.toLocaleLowerCase();

    return $span;
}
