function  playTune(audioCtx) {

    // create Oscillator node
    var c3oscillator1 = audioCtx.createOscillator();
    var c3oscillator2 = audioCtx.createOscillator();
    var c3oscillator3 = audioCtx.createOscillator();
    var c3oscillator4 = audioCtx.createOscillator();
    var c3oscillator5 = audioCtx.createOscillator();
    var c3gain1 = audioCtx.createGain();
    var c3gain2 = audioCtx.createGain();
    var c3gain3 = audioCtx.createGain();
    var c3gain4 = audioCtx.createGain();
    var c3gain5 = audioCtx.createGain();

    var c3biquadFilter = audioCtx.createBiquadFilter();

    c3oscillator1.type = 'sawtooth';
    c3oscillator2.type = 'sawtooth';
    c3oscillator3.type = 'sawtooth';
    c3oscillator4.type = 'sawtooth';
    c3oscillator5.type = 'sine';


    c3oscillator1.connect(c3gain1);
    c3oscillator2.connect(c3gain2);
    c3oscillator3.connect(c3gain3);
    c3oscillator4.connect(c3gain4);
    c3oscillator5.connect(c3gain5);

    c3gain1.connect(c3biquadFilter);
    c3gain2.connect(c3biquadFilter)
    c3gain3.connect(c3biquadFilter);
    c3gain4.connect(c3biquadFilter);
    c3gain5.connect(c3biquadFilter.frequency);

    c3biquadFilter.frequency.value = 1000;
    c3biquadFilter.Q.value = 10;
    c3biquadFilter.connect(audioCtx.destination);

    c3gain1.gain.value = 0;
    c3gain2.gain.value = 0;
    c3gain3.gain.value = 0;
    c3gain4.gain.value = 0;
    c3gain5.gain.value = 100;

    c3oscillator1.frequency.value = 440;
    c3oscillator2.frequency.value = 440;
    c3oscillator3.frequency.value = 440;
    c3oscillator4.frequency.value = 440;
    c3oscillator5.frequency.value = 2;

    c3oscillator1.start();
    c3oscillator2.start();
    c3oscillator3.start();
    c3oscillator4.start();
    c3oscillator5.start();

    var musicPlayer = new MusicPlayer(120, audioCtx);

    musicPlayer.registerChannel(3, function (frequency, duration, time, relativeVolume) {
        var attack = 0.03;
        var decay = 0.1;
        var decayLevel = 0.7
        var sustain = 0.1;
        var sustainLevel = 0.1
        var release = 5;

        c3oscillator1.frequency.setValueAtTime(frequency, time);
        c3oscillator2.frequency.setValueAtTime(frequency * 1.01, time);
        c3oscillator3.frequency.setValueAtTime(frequency * .99, time);
        c3oscillator4.frequency.setValueAtTime(frequency / 2, time);
        c3oscillator5.frequency.setValueAtTime(.5, time);

        c3gain1.gain.linearRampToValueAtTime(0.2 * relativeVolume * 1, time + attack);
        c3gain1.gain.linearRampToValueAtTime(0.2 * relativeVolume * decayLevel, time + decay);
        c3gain1.gain.linearRampToValueAtTime(0.2 * relativeVolume * sustainLevel, time + sustain);
        c3gain1.gain.linearRampToValueAtTime(0, time + release);

        c3gain2.gain.linearRampToValueAtTime(0.2 * relativeVolume / 3 * 1, time + attack);
        c3gain2.gain.linearRampToValueAtTime(0.2 * relativeVolume * decayLevel, time + decay);
        c3gain2.gain.linearRampToValueAtTime(0.2 * relativeVolume * sustainLevel, time + sustain);
        c3gain2.gain.linearRampToValueAtTime(0, time + release);

        c3gain3.gain.linearRampToValueAtTime(0.2 * relativeVolume * 1, time + attack);
        c3gain3.gain.linearRampToValueAtTime(0.2 * relativeVolume * decayLevel, time + decay);
        c3gain3.gain.linearRampToValueAtTime(0.2 * relativeVolume * sustainLevel, time + sustain);
        c3gain3.gain.linearRampToValueAtTime(0, time + release);

        c3gain4.gain.linearRampToValueAtTime(0.2 * relativeVolume * 1, time + attack);
        c3gain4.gain.linearRampToValueAtTime(0.2 * relativeVolume * decayLevel, time + decay);
        c3gain4.gain.linearRampToValueAtTime(0.2 * relativeVolume * sustainLevel, time + sustain);
        c3gain4.gain.linearRampToValueAtTime(0, time + release);
    });

    //musicPlayer.play(2, "B2", 1, 0);
    musicPlayer.play(3, "B4", 1 / 8, 1 / 4);
    musicPlayer.play(3, "B5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "F#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "D#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "B5", 1 / 8, 1 / 4);
    //musicPlayer.play(2, "F#2", 8, 0);
    musicPlayer.play(3, "F#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "D#5", 1 / 8, 1 / 4);

    //musicPlayer.play(2, "C2", 1, 0);
    musicPlayer.play(3, "C5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "C6", 1 / 8, 1 / 4);
    musicPlayer.play(3, "G5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "E5", 1 / 8, 1 / 4);
    //musicPlayer.play(2, "G2", 1, 0);
    musicPlayer.play(3, "C6", 1 / 8, 1 / 4);
    musicPlayer.play(3, "G5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "E5", 1 / 8, 1 / 4);

    //musicPlayer.play(2, "B2", 1, 0);
    musicPlayer.play(3, "B4", 1 / 8, 1 / 4);
    musicPlayer.play(3, "B5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "F#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "D#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "B5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "F#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "D#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "E5", 1 / 8, 1 / 4);
    //musicPlayer.play(2, "E2", 1, 0);
    musicPlayer.play(3, "F5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "F#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "G5", 1 / 8, 1 / 4);
    //musicPlayer.play(2, "G2", 1, 0);
    musicPlayer.play(3, "G#5", 1 / 8, 1 / 4);
    musicPlayer.play(3, "A#5", 1 / 8, 1 / 4);
    //musicPlayer.play(2, "B2", 1/4, 1/4);
    musicPlayer.play(3, "B5", 1 / 8, 1 / 4);
}