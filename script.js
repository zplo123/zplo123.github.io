function alertbutton() {
    alert("If using mobile turn silent mode off")
}

const audioContext = new AudioContext();
let oscillator;
let panner = audioContext.createStereoPanner();
let biquadFilter = audioContext.createBiquadFilter();
//
const startButton = document.getElementById("startbutton");
startButton.addEventListener("click", () => {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
    oscillator = audioContext.createOscillator();
    oscillator.connect(panner);
    panner.connect(audioContext.destination);
    oscillator.frequency.value = 73.42;
    oscillator.start();
});
//
const stopButton = document.getElementById("stopbutton");
stopButton.addEventListener("click", () => {
    if (oscillator) {
        oscillator.stop();
        oscillator = null;
    }
});
//
const panslider = document.getElementById("panslider");
panslider.addEventListener("input", () => {
    let sliderValue = Number(panslider.value);
    let panValue = (sliderValue - 50) / 50; 
    panner.pan.value = panValue;
});
//
const pitchslider = document.getElementById("pitchslider");
pitchslider.addEventListener("input", () => {
    if (oscillator) {
        oscillator.frequency.value = pitchslider.value;
    }
});
//
const shapeslider = document.getElementById("shapeslider");
shapeslider.addEventListener("input", () => {
    const value = Number(shapeslider.value);
    if (value < 25) {
        oscillator.type = 'sine';
    } else if (value < 50) {
        oscillator.type = 'square';
    } else if (value < 75) {
        oscillator.type = 'sawtooth';
    } else {
        oscillator.type = 'triangle';
    }
});
//
const filterslider = document.getElementById("filterslider");
filterslider.addEventListener("input", () => {
    biquadFilter.type = "lowpass";
    biquadFilter.frequency.value = filterslider.value;
    oscillator.connect(biquadFilter);
    biquadFilter.connect(panner);
});