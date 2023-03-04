{
	const styles = [];
	let newId = 0;
	makeButtons = (type, min, max, datatype) => {
		let confirmation = document.createElement("input");
		let intensity = document.createElement("input");
		let newlabel = document.createElement("label");
		let newbr = document.createElement("br");
		newlabeltext = document.createTextNode(type);
		newlabel.appendChild(newlabeltext);
		confirmation.type = "checkbox";
		intensity.type = "range";
		intensity.min = min;
		intensity.id = newId;
		intensity.max = max;
		intensity.style.display = "none";
		confirmation.addEventListener("click", (e) => {
			confirmation.checked ? (intensity.style.display = "inline") : (intensity.style.display = "none"); //I'm going slowly insane
		});
		intensity.addEventListener("input", (e) => {
			styles[this.id] = `${type}(${this.value}${datatype})`;
		});
		filterMenu.appendChild(confirmation);
		filterMenu.appendChild(newlabel);
		filterMenu.appendChild(intensity);
		filterMenu.appendChild(newbr);
		newId = newId + 1;
	};
	let filterMenu = document.createElement("div");
	let filterButton = document.createElement("button");
	filterMenu.style = "position: fixed;width: 75%;height: 50%;border: 2px solid black;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color:white;";
	filterButton.style = "position: fixed; top: 77%; left: 45%; z-index: 10000; width: 10%; height: 5%;";
	filterButton.innerHTML = "Filter";
	document.body.append(filterMenu);
	document.body.append(filterButton);

	makeButtons("hue-rotate", 0, 360, "deg");
	makeButtons("invert", 0, 360, "%");

	filterButton.addEventListener("click", (e) => {
		filterMenu.remove();
		filterButton.remove();
		filterMenu = undefined;
		filterButton = undefined;
		document.querySelector("body").style.filter = styles.join(";");
		console.log(styles);
	});
} // requals.github.io
