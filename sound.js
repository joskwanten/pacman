function Sound() {

	// create web audio api context
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	// create Oscillator node
	var oscillator = audioCtx.createOscillator();

	// create Oscillator node
	var oscillator2 = audioCtx.createOscillator();

	// create Gain node
	var gain = audioCtx.createGain();

	// create Gain node
	var gain2 = audioCtx.createGain();

	oscillator.type = 'square';
	oscillator.frequency.value = 400;
	oscillator.connect(gain);
	oscillator2.connect(gain2);
	gain2.connect(oscillator.frequency)

	gain.connect(audioCtx.destination);
	oscillator.start();
	oscillator2.start();
	gain2.gain.value = 100;
	oscillator2.type = 'triangle';
	oscillator2.frequency.value = 20;
	
	gain.gain.value = 0;

	this.eatPellet = function() {
		oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
		oscillator2.frequency.setValueAtTime(5, audioCtx.currentTime);
		gain.gain.setValueAtTime(1, audioCtx.currentTime + 0); 
		gain.gain.setValueAtTime(0, audioCtx.currentTime + 0.05); 
	}
}