let currentCopy = undefined;

function copyText(element) {
	if (currentCopy) {
		currentCopy.innerHTML = "Copy Bookmarklet";
	}
	currentCopy = element;
	let textToCopy = element.parentElement.children[1];
	navigator.clipboard.writeText(textToCopy.innerText);
	currentCopy.innerHTML = "Copied!";
}
