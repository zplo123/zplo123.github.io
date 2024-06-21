function alertbutton() {
    alert("If using mobile turn silent mode off")
}



const audioContext = new AudioContext();
let oscillator;
let panner = audioContext.createStereoPanner();
let biquadFilter = audioContext.createBiquadFilter();
let isFilterOn = true;



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
    oscillator.frequency.value = 98;
    oscillator.type = "square";
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
//



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



const filterslider = document.getElementById("filterslider");
filterslider.addEventListener("input", () => {
    if (isFilterOn === true) {
    let sliderValue = filterslider.value;
    let minFreq = 110;
    let maxFreq = 10000;
    let frequency = minFreq + (sliderValue / 100) * (maxFreq - minFreq);
    biquadFilter.frequency.value = frequency;
    }
});