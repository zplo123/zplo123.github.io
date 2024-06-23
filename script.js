function alertbutton() {
    alert("If using mobile turn silent mode off")
}

//#region Synth

//#region declarations
const audioContext = new AudioContext();
let oscillator;
let panner = audioContext.createStereoPanner();
let biquadFilter = audioContext.createBiquadFilter();
let isFilterOn = true;
//#endregion

//#region startstopbuttons
const startButton = document.getElementById("startbutton");
startButton.addEventListener("click", () => {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
    oscillator = audioContext.createOscillator();
    oscillator.connect(biquadFilter);
    oscillator.connect(panner);
    biquadFilter.connect(audioContext.destination);
    panner.connect(audioContext.destination);
    oscillator.frequency.value = 92;
    oscillator.type = "sawtooth";
    oscillator.start();
    pitchslider.value = oscillator.frequency.value;
    filterslider.value = biquadFilter.frequency.value;
});
const stopButton = document.getElementById("stopbutton");
stopButton.addEventListener("click", () => {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
});
//#endregion

//#region shapebuttons
const squarebutton = document.getElementById("square");
squarebutton.addEventListener("click", () => {
    oscillator.type = "square";
});
const sawtoothbutton = document.getElementById("sawtooth");
sawtoothbutton.addEventListener("click", () => {
    oscillator.type = "sawtooth";
});
const trianglebutton = document.getElementById("triangle");
trianglebutton.addEventListener("click", () => {
    oscillator.type = "triangle";
});
const sinebutton = document.getElementById("sine");
sinebutton.addEventListener("click", () => {
    oscillator.type = "sine";
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
    let minFreq = 100;
    let maxFreq = 10000;
    let frequency = minFreq + (filterslider.value / 100) * (maxFreq - minFreq);
    biquadFilter.frequency.value = frequency;
    }
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

const pitchupbutton = document.getElementById("pitchup");
pitchupbutton.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * 2;
    pitchslider.value = oscillator.frequency.value;
});

const pitchdownbutton = document.getElementById("pitchdown");
pitchdownbutton.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value / 2;
    pitchslider.value = oscillator.frequency.value;
});
const pitchdownfifth = document.getElementById("pitchdownfifth");
pitchdownfifth.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-7 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const pitchupfifth = document.getElementById("pitchupfifth");
pitchupfifth.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (7 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const pitchupthird = document.getElementById("pitchupthird");
pitchupthird.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (4 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const pitchdownthird = document.getElementById("pitchdownthird");
pitchdownthird.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-4 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const pitchupsecond = document.getElementById("pitchupsecond");
pitchupsecond.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (3 / 12));
    pitchslider.value = oscillator.frequency.value;
});
const pitchdownsecond = document.getElementById("pitchdownsecond");
pitchdownsecond.addEventListener("click", () => {
    oscillator.frequency.value = oscillator.frequency.value * (2 ** (-3 / 12));
    pitchslider.value = oscillator.frequency.value;
});




//#endregion

