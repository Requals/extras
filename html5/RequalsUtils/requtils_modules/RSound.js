class RSound {
	constructor() {}

	playSound(src) {
		const audio = new Audio(src);
		audio.play();
	}
}

// TODO: Make this work
