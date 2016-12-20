function Sound(audioCtx) {

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

	// create Gain node
	var slowWowGain1 = audioCtx.createGain();

	this.playSlowWow = function() {
		// create Oscillator node
		var slowWowOscillator1 = audioCtx.createOscillator();

		// create Oscillator node
		var slowWowOscillator2 = audioCtx.createOscillator();

		// create another Oschillator node
		var slowWowOscillator3 = audioCtx.createOscillator();

		// create Gain node
		var slowWowGain2 = audioCtx.createGain();

		// create Gain node
		var slowWowGain3 = audioCtx.createGain();

		// Create a filter to filter the signal of oscillator 1
		var slowWowBiquadFilter = audioCtx.createBiquadFilter();

		slowWowOscillator1.type = 'sine';
		slowWowOscillator1.frequency.value = 200;
		slowWowOscillator1.connect(slowWowGain1);
		slowWowGain1.connect(slowWowBiquadFilter);

		slowWowBiquadFilter.frequency.value = 1000;
		slowWowBiquadFilter.Q.value = 10;
		slowWowBiquadFilter.connect(audioCtx.destination);

		// LFO for frequency of Oscillator1
		slowWowOscillator2.connect(slowWowGain2);
		slowWowGain2.connect(slowWowOscillator1.frequency)
		slowWowGain2.gain.value = 100;
		slowWowOscillator2.type = 'sine';
		slowWowOscillator2.frequency.value = 2;

		//
		slowWowOscillator3.type = 'sine';
		slowWowOscillator3.frequency.value = 2;
		slowWowOscillator3.connect(slowWowGain3);
		slowWowGain3.gain.value = 700;
		slowWowGain3.connect(slowWowBiquadFilter.frequency);

		// Start the oscillators
		slowWowOscillator1.start();
		slowWowOscillator2.start();
		slowWowOscillator3.start();

		slowWowGain1.gain.value = .3;
	}

	this.playGhostEaten = function() {
		slowWowGain1.gain.setValueAtTime(0, audioCtx.currentTime);


		// create Oscillator node
		let dieOscillator1 = audioCtx.createOscillator();
		let dieOscillator2 = audioCtx.createOscillator();
		let dieGain1 = audioCtx.createGain();
		let dieGain2 = audioCtx.createGain();

		dieOscillator1.type = 'sawtooth';
		dieOscillator1.frequency.value = 200;
		dieOscillator1.connect(dieGain1);
        dieGain1.gain.value = 0.3;
		dieGain1.connect(audioCtx.destination);

		// LFO for frequency of Oscillator1
		dieOscillator2.connect(dieGain2);
		dieGain2.connect(dieOscillator1.frequency)
		dieGain2.gain.value = 200;
		dieOscillator2.type = 'sine';
		dieOscillator2.frequency.value = 2;

		// Start the oscillators
		dieOscillator1.start();
		dieOscillator2.start();

		dieGain1.gain.setValueAtTime(0, audioCtx.currentTime  + 0.5);
		slowWowGain1.gain.setValueAtTime(0.3, audioCtx.currentTime + 0.5);

	}

	this.silentSlowWow = function() {
		slowWowGain1.gain.setValueAtTime(0, audioCtx.currentTime + 0);
	}

    this.playPacmanDies = function() {
        slowWowGain1.gain.setValueAtTime(0, audioCtx.currentTime);

        // create Oscillator node
        let dieOscillator1 = audioCtx.createOscillator();
        let dieOscillator2 = audioCtx.createOscillator();
        let dieGain1 = audioCtx.createGain();
        let dieGain2 = audioCtx.createGain();

        dieOscillator1.type = 'square';
        dieOscillator1.frequency.value = 400;
        dieOscillator1.connect(dieGain1);
        dieGain1.gain.value = 0.3;
        dieGain1.connect(audioCtx.destination);

        // LFO for frequency of Oscillator1
        dieOscillator2.connect(dieGain2);
        dieGain2.connect(dieOscillator1.frequency)
        dieGain2.gain.value = 50;
        dieOscillator2.type = 'sine';
        dieOscillator2.frequency.value = 5;

        // Start the oscillators
        dieOscillator1.start();
        dieOscillator2.start();

        dieGain1.gain.setValueAtTime(0, audioCtx.currentTime  + 2);
        dieGain1.gain.setValueAtTime(0, audioCtx.currentTime  + 2);
        dieOscillator1.frequency.setValueAtTime(350, audioCtx.currentTime  + 0.2);
        dieOscillator1.frequency.setValueAtTime(300, audioCtx.currentTime  + 0.5);
        dieOscillator1.frequency.setValueAtTime(200, audioCtx.currentTime  + 0.7);

        dieOscillator1.frequency.setValueAtTime(100, audioCtx.currentTime  + 0.7);

        dieGain1.gain.setValueAtTime(0, audioCtx.currentTime + 1);
        dieGain2.gain.setValueAtTime(0, audioCtx.currentTime + 1);

        dieOscillator1.frequency.setValueAtTime(150, audioCtx.currentTime  + 1.05);
        dieGain1.gain.setValueAtTime(1, audioCtx.currentTime + 1.05);
        dieGain2.gain.setValueAtTime(1, audioCtx.currentTime + 1.05);

        dieOscillator1.frequency.setValueAtTime(150, audioCtx.currentTime  + 1.1);
        dieGain1.gain.setValueAtTime(0, audioCtx.currentTime + 1.1);
        dieGain2.gain.setValueAtTime(0, audioCtx.currentTime + 1.1);

        dieOscillator1.frequency.setValueAtTime(150, audioCtx.currentTime  + 1.15);
        dieGain1.gain.setValueAtTime(1, audioCtx.currentTime + 1.15);
        dieGain2.gain.setValueAtTime(1, audioCtx.currentTime + 1.15);

        dieOscillator1.frequency.setValueAtTime(150, audioCtx.currentTime  + 1.2);
        dieGain1.gain.setValueAtTime(0, audioCtx.currentTime + 1.2);
        dieGain2.gain.setValueAtTime(0, audioCtx.currentTime + 1.2);

        slowWowGain1.gain.setValueAtTime(0.3, audioCtx.currentTime + 2);
    }
}

function test() {
    //let ctx = new window.AudioContext();
    //let obj = new Sound(ctx);
    //obj.playPacmanDies();
}

test();