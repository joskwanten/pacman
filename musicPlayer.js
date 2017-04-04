function MusicPlayer(tempo, audioCtx) {

    var channels = [];

    function frequency(note) {
        if (note != null) {
            if (note.match("[A-G][b#]?\\d") != null) {
                var noteLetter = note.match("[A-G]")[0];
                var flatSharp = note.match("[b#]") != null ? note.match("[b#]")[0] : "";
                var octave = note.match("\\d")[0];
                var noteNumber = "C.D.EF.G.A.B".search(noteLetter);

                // Middle note A4=440Hz  has number 57
                var note = noteNumber + (12 * octave ) + (flatSharp == "#" ? 1 : flatSharp == "b" ? -1 : 0);
                return 440 * Math.pow(2, (note - 57) / 12);
            }
        }
        return 0;
    }

    var time = audioCtx.currentTime;

    this.reset = function() {
        time = audioCtx.currentTime;
    }

    function durationTime(durationNote) {
        return durationNote *  60 / tempo;
    }

    function timeAdvances(durationNote) {
        time += (durationNote *  60 / tempo);
        return time;
    }

    this.play = function(channelNumber, note, duration, advances) {
        channels.forEach(function(channel) {
            if (channel.channelNumber == channelNumber ) {
                channel.adsrFunction(frequency(note), durationTime(duration), timeAdvances(advances), 1 / channels.length);
            }
        })
    }

    this.registerChannel = function(channelNumber, adsrFunction) {
        channels.push({channelNumber: channelNumber, adsrFunction: adsrFunction});
    }

}
