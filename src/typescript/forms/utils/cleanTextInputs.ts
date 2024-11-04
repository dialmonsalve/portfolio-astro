export default function cleanTextInputs(
    elementToIterator:
        | HTMLParagraphElement
        | HTMLLabelElement
        | null
        | undefined
) {
    let labelText = "";

    elementToIterator?.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            labelText += node.textContent;
        }
    });

    return labelText.trim();
}
