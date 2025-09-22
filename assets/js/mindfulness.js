/* =========================
   Guided Breathing
   ========================= */
const breathCircle = document.getElementById("breathCircle");
const breathLabel  = document.getElementById("breathLabel");
const breathStart  = document.getElementById("breathStart");
const breathStop   = document.getElementById("breathStop");

let breathTimer = null;
let breathing = false;

// cycle: 4s in -> 4s hold -> 4s out -> 4s hold (very simple)
function startBreathing() {
  if (breathing) return;
  breathing = true;
  let step = 0;

  function runStep() {
    if (!breathing) return;

    // 0: In, 1: Hold, 2: Out, 3: Hold
    if (step === 0) {
      breathLabel.textContent = "Breathe In";
      breathCircle.style.transform = "scale(1.15)";
    } else if (step === 1) {
      breathLabel.textContent = "Hold";
    } else if (step === 2) {
      breathLabel.textContent = "Breathe Out";
      breathCircle.style.transform = "scale(0.9)";
    } else if (step === 3) {
      breathLabel.textContent = "Hold";
    }

    step = (step + 1) % 4;
  }

  runStep(); // start immediately
  breathTimer = setInterval(runStep, 4000); // 4-counts per phase
}

function stopBreathing() {
  breathing = false;
  clearInterval(breathTimer);
  breathLabel.textContent = "Breathe In";
  breathCircle.style.transform = "scale(1.0)";
}

breathStart.addEventListener("click", startBreathing);
breathStop.addEventListener("click", stopBreathing);

/* =========================
   Meditation / Pomodoro Timer
   ========================= */
const display = document.getElementById("timerDisplay");
const minuteInput = document.getElementById("minuteInput");
const btnStart = document.getElementById("timerStart");
const btnPause = document.getElementById("timerPause");
const btnReset = document.getElementById("timerReset");

let totalSeconds = 30;
let countdownId = null;
let paused = true;

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}
function updateDisplay() { display.textContent = formatTime(totalSeconds); }

function startTimer() {
  if (!paused) return; // already running
  paused = false;
  countdownId = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(countdownId);
      paused = true;
      alert("Time's up! 🎉");
    }
  }, 1000);
}
function pauseTimer() {
  paused = true;
  clearInterval(countdownId);
}
function resetTimer() {
  pauseTimer();
  const mins = Math.max(1, Math.min(120, parseInt(minuteInput.value || "25", 10)));
  totalSeconds = mins * 60;
  updateDisplay();
}

btnStart.addEventListener("click", startTimer);
btnPause.addEventListener("click", pauseTimer);
btnReset.addEventListener("click", resetTimer);

// keep display in sync when user edits minutes
minuteInput.addEventListener("input", () => {
  if (!paused) return;
  const mins = parseInt(minuteInput.value || "25", 10);
  totalSeconds = Math.max(1, Math.min(120, mins)) * 60;
  updateDisplay();
});

updateDisplay();

/* =========================
   Ambient Sounds (toggle one at a time)
   ========================= */
const audioRain   = document.getElementById("audioRain");
const audioForest = document.getElementById("audioForest");
const audioOcean  = document.getElementById("audioOcean");

const btnRain   = document.getElementById("btnRain");
const btnForest = document.getElementById("btnForest");
const btnOcean  = document.getElementById("btnOcean");

const pairs = [
  {btn: btnRain, audio: audioRain},
  {btn: btnForest, audio: audioForest},
  {btn: btnOcean, audio: audioOcean},
];

function stopAll() {
  pairs.forEach(p => { p.audio.pause(); p.audio.currentTime = 0; p.btn.textContent = "Activate"; });
}

pairs.forEach(({btn, audio}) => {
  btn.addEventListener("click", () => {
    // if this one is playing, stop it; otherwise stop others and play this
    if (!audio.paused) {
      audio.pause(); audio.currentTime = 0; btn.textContent = "Activate";
    } else {
      stopAll();
      audio.volume = 0.6;
      audio.play().catch(() => {/* ignore autoplay errors */});
      btn.textContent = "Stop";
    }
  });
});
