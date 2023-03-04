{
	let jsArea = document.createElement("textarea");
	let jsButton = document.createElement("button");
	jsArea.style = "position: fixed; top: 25%; left: 12.5%; z-index: 10000; width: 75%; height: 50%;";
	jsButton.style = "position: fixed; top: 77%; left: 45%; z-index: 10000; width: 10%; height: 5%;";
	jsButton.innerHTML = "Run";
	document.body.append(jsArea);
	document.body.append(jsButton);

	jsButton.addEventListener("click", (e) => {
		let value = jsArea.value;
		jsArea.remove();
		jsButton.remove();
		jsArea = undefined;
		jsButton = undefined;
		eval(value);
	});
} //Naitronbomb Gamer
