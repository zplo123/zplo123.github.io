function alertbutton() {
    alert("If using mobile turn silent mode off")
}

//#region Synth

//#region declarations
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;
let panner = audioContext.createStereoPanner();
let biquadFilter = audioContext.createBiquadFilter();
let isFilterOn = true;
let isOscillatorPlaying = false;
let currentOscillatorType = "sawtooth";
let oscillators = [];
let gainNode = audioContext.createGain();

//#endregion

//#region startstopbuttons
const startButton = document.getElementById("startbutton");
startButton.addEventListener("click", () => {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
    oscillator = audioContext.createOscillator()
    oscillator.connect(biquadFilter);
    biquadFilter.connect(gainNode);
    biquadFilter.connect(audioContext.destination);
    gainNode.connect(audioContext.destination);
    biquadFilter.frequency.value = 500;
    oscillator.frequency.value = 92;
    oscillator.type = currentOscillatorType;
    oscillator.start();
    pitchslider.value = oscillator.frequency.value;
    filterslider.value = biquadFilter.frequency.value;
    oscillators.push(oscillator);
    isOscillatorPlaying = true;
});
const stopButton = document.getElementById("stopbutton");
stopButton.addEventListener("click", () => {
    console.log(`Stopping ${oscillators.length} oscillators...`);
    oscillators.forEach((osc, index) => {
        console.log(`Stopping oscillator ${index + 1}`);
        osc.stop();
        osc.disconnect();
    });
    oscillators = [];
    console.log("All oscillators stopped.");
});
//#endregion

//#region shapebuttons
const squarebutton = document.getElementById("square");
squarebutton.addEventListener("click", () => {
    oscillator.type = "square";
    currentOscillatorType = "square";
});
const sawtoothbutton = document.getElementById("sawtooth");
sawtoothbutton.addEventListener("click", () => {
    oscillator.type = "sawtooth";
    currentOscillatorType = "sawtooth";
});
const trianglebutton = document.getElementById("triangle");
trianglebutton.addEventListener("click", () => {
    oscillator.type = "triangle";
    currentOscillatorType = "triangle";
});
const sinebutton = document.getElementById("sine");
sinebutton.addEventListener("click", () => {
    oscillator.type = "sine";
    currentOscillatorType = "sine";
});
//#endregion

//#region sliders
const pitchslider = document.getElementById("pitchslider");
pitchslider.addEventListener("input", () => {
    if (oscillator) {
        oscillator.frequency.value = pitchslider.value;
    }
});
const panslider = document.getElementById("panslider");
panslider.addEventListener("input", () => {
    let sliderValue = Number(panslider.value);
    let panValue = (sliderValue - 50) / 50; 
    panner.pan.value = panValue;
});
const filterslider = document.getElementById("filterslider");
filterslider.addEventListener("input", () => {
    if (isFilterOn === true) {
    let minFreq = 0;
    let maxFreq = 1000;
    biquadFilter.frequency.value = minFreq + (filterslider.value / 100) * (maxFreq - minFreq);
    }
});
const lforateslider = document.getElementById("lforate");
lforateslider.addEventListener("input", () => {
    lfo.frequency.value = lforateslider.value;
});
const lfodepthslider = document.getElementById("lfodepth");
lfodepthslider.addEventListener("input", () => {
    lfoDepth.gain.value = lfodepthslider.value;
});
//#endregion

//#region filteronoffbuttons
const filterOnButton = document.getElementById("filteron");
filterOnButton.addEventListener("click", () => {
    oscillator.connect(biquadFilter);
    biquadFilter.connect(audioContext.destination);
    isFilterOn = true;
});
const filteroffButton = document.getElementById("filteroff");
filteroffButton.addEventListener("click", () => {
    biquadFilter.disconnect(audioContext.destination);
    oscillator.disconnect(biquadFilter);
    isFilterOn = false;
});
//#endregion

//#region filtertypebuttons
const allpassbutton = document.getElementById("allpassbutton");
allpassbutton.addEventListener("click", () => {
    if (isFilterOn === true && (biquadFilter.type !== "allpass")) {
        biquadFilter.type = "allpass";
    }
});
const highpassbutton = document.getElementById("highpassbutton");
highpassbutton.addEventListener("click", () => {
    if (isFilterOn && (biquadFilter.type !== "highpass")) {
        biquadFilter.type = "highpass";
    }
});
const lowpassbutton = document.getElementById("lowpassbutton");
lowpassbutton.addEventListener("click", () => {
    if (isFilterOn && (biquadFilter.type !== "lowpass")) {
        biquadFilter.type = "lowpass";
    }
});
const bandpassbutton = document.getElementById("bandpassbutton");
bandpassbutton.addEventListener("click", () => {
    if (isFilterOn && (biquadFilter.type !== "bandpass")) {
        biquadFilter.type = "bandpass";
    }
});
const notchbutton = document.getElementById("notchbutton");
notchbutton.addEventListener("click", () => {
    if (isFilterOn && (biquadFilter.type !== "notch")) {
        biquadFilter.type = "notch";
    }
});
//#endregion

//#region pitchbuttons
const onesemiup = document.getElementById("onesemiup");
onesemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (1 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const onesemidown = document.getElementById("onesemidown");
onesemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-1 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const twosemiup = document.getElementById("twosemiup");
twosemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (2 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const twosemidown = document.getElementById("twosemidown");
twosemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-2 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const threesemiup = document.getElementById("threesemiup");
threesemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (3 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const threesemidown = document.getElementById("threesemidown");
threesemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-3 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const foursemiup = document.getElementById("foursemiup");
foursemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (4 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const foursemidown = document.getElementById("foursemidown");
foursemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-4 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const fivesemiup = document.getElementById("fivesemiup");
fivesemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (5 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const fivesemidown = document.getElementById("fivesemidown");
fivesemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-5 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const sixsemiup = document.getElementById("sixsemiup");
sixsemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (6 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const sixsemidown = document.getElementById("sixsemidown");
sixsemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-6 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const sevensemiup = document.getElementById("sevensemiup");
sevensemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (7 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const sevensemidown = document.getElementById("sevensemidown");
sevensemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-7 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const eightsemiup = document.getElementById("eightsemiup");
eightsemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (8 / 12));
    pitchslider.value = oscillator.frequency.value;
}
);
const eightsemidown = document.getElementById("eightsemidown");
eightsemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-8 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const ninesemiup = document.getElementById("ninesemiup");
ninesemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (9 / 12));
    pitchslider.value = oscillator.frequency.value;
}
);
const ninesemidown = document.getElementById("ninesemidown");
ninesemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-9 / 12));
    pitchslider.value = oscillator.frequency.value;
}
);
const tensemiup = document.getElementById("tensemiup");
tensemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (10 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const tensemidown = document.getElementById("tensemidown");
tensemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-10 / 12));
    pitchslider.value = oscillator.frequency.value;
}
);
const elevensemiup = document.getElementById("elevensemiup");
elevensemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (11 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const elevensemidown = document.getElementById("elevensemidown");
elevensemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-11 / 12));
    pitchslider.value = oscillator.frequency.value;

});
const twelvesemiup = document.getElementById("twelvesemiup");
twelvesemiup.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * 2;
    pitchslider.value = oscillator.frequency.value;
});
const twelvesemidown = document.getElementById("twelvesemidown");
twelvesemidown.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value / 2;
    pitchslider.value = oscillator.frequency.value;
});
//#endregion

//#region lfo
const lfo = audioContext.createOscillator();
lfo.type = "triangle";
lfo.frequency.value = 2;

const lfoDepth = audioContext.createGain();
lfoDepth.gain.value = 2.2;
lfo.connect(lfoDepth);
lfoDepth.connect(gainNode.gain);

const lfoStartButton = document.getElementById("lfostart");
lfoStartButton.addEventListener("click", () => {
        lfo.start();
});
const lfosquarebutton = document.getElementById("squarelfo");
lfosquarebutton.addEventListener("click", () => {
    lfo.type = "square";
});
const lfotrianglebutton = document.getElementById("trianglelfo");
lfotrianglebutton.addEventListener("click", () => {
    lfo.type = "triangle";
});
const lfosawtoothbutton = document.getElementById("sawtoothlfo");
lfosawtoothbutton.addEventListener("click", () => {
    lfo.type = "sawtooth";
});
//#endregion




//#endregion