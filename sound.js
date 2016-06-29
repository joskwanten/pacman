function Sound() {

	// create web audio api context
	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	// create Oscillator node
	var oscillator1 = audioCtx.createOscillator();

	// create Oscillator node
	var oscillator2 = audioCtx.createOscillator();

	// create another Oschillator node
	var oscillator3 = audioCtx.createOscillator();

	// create Gain node
	var gain1 = audioCtx.createGain();

	// create Gain node
	var gain2 = audioCtx.createGain();

	// create Gain node
	var gain3 = audioCtx.createGain();

	// Create a filter to filter the signal of oscillator 1
	var biquadFilter = audioCtx.createBiquadFilter();

	oscillator1.type = 'sawtooth';
	oscillator1.frequency.value = 400;
	oscillator1.connect(gain1);
	gain1.connect(biquadFilter);

	biquadFilter.frequency.value = 1000;
	biquadFilter.Q.value = 10;
	biquadFilter.connect(audioCtx.destination);

	// LFO for frequency of Oscillator1
	oscillator2.connect(gain2);
	gain2.connect(oscillator1.frequency)
	gain2.gain.value = 110;
	oscillator2.type = 'square';
	oscillator2.frequency.value = 20;

	//
	oscillator3.type = 'sine';
	oscillator3.frequency.value = 2;
	oscillator3.connect(gain3);
	gain3.gain.value = 700;
	gain3.connect(biquadFilter.frequency);

	// Start the oscillators
	oscillator1.start();
	oscillator2.start();
	oscillator3.start();
	
	gain1.gain.value = 0;

	this.eatPellet = function() {
		oscillator1.frequency.setValueAtTime(220, audioCtx.currentTime);
		oscillator2.frequency.setValueAtTime(2, audioCtx.currentTime);
		gain1.gain.setValueAtTime(1, audioCtx.currentTime + 0);
		gain1.gain.setValueAtTime(0, audioCtx.currentTime + 0.05);
	}
}