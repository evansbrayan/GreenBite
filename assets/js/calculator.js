/* ========= Simple Calorie Calculator =========
   Formula: Mifflin-St Jeor BMR
   Male   = 10W + 6.25H - 5A + 5
   Female = 10W + 6.25H - 5A - 161
   TDEE   = BMR * activityFactor
   Macro split: Protein 30%, Carbs 45%, Fats 25% (can change below)
================================================ */
const PCT = { protein: 30, carbs: 45, fat: 25 };

// Elements
const ageEl = document.getElementById("age");
const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");
const activityEl = document.getElementById("activity");
const calcBtn = document.getElementById("calcBtn");
const kcalOut = document.getElementById("kcalOut");

// bars
const pBar = document.getElementById("pBar");
const cBar = document.getElementById("cBar");
const fBar = document.getElementById("fBar");
const pPct = document.getElementById("pPct");
const cPct = document.getElementById("cPct");
const fPct = document.getElementById("fPct");

// donut arcs
const arcProtein = document.getElementById("arcProtein");
const arcCarb    = document.getElementById("arcCarb");
const arcFat     = document.getElementById("arcFat");
const donutCenter = document.getElementById("donutCenter");

// circumference for r=40
const C = 2 * Math.PI * 40;

// Helpers
function getGender() {
  return document.querySelector('input[name="sex"]:checked').value;
}

function calcTDEE() {
  const age = Number(ageEl.value);
  const h = Number(heightEl.value);
  const w = Number(weightEl.value);
  const act = Number(activityEl.value);
  const sex = getGender();

  // Very basic validation
  if (!age || !h || !w) return null;

  const bmr = sex === "male"
    ? 10*w + 6.25*h - 5*age + 5
    : 10*w + 6.25*h - 5*age - 161;

  return Math.round(bmr * act);
}

function updateBars() {
  pBar.style.width = PCT.protein + "%";
  cBar.style.width = PCT.carbs + "%";
  fBar.style.width = PCT.fat + "%";
  pPct.textContent = PCT.protein + "%";
  cPct.textContent = PCT.carbs + "%";
  fPct.textContent = PCT.fat + "%";
}

function updateDonut() {
  // Build arcs in order: protein -> carbs -> fat
  const pLen = (PCT.protein/100)*C;
  const cLen = (PCT.carbs/100)*C;
  const fLen = (PCT.fat/100)*C;

  // dasharray = visible hidden, dashoffset shifts the start
  arcProtein.setAttribute("stroke-dasharray", `${pLen} ${C - pLen}`);
  arcProtein.setAttribute("stroke-dashoffset", "0");

  arcCarb.setAttribute("stroke-dasharray", `${cLen} ${C - cLen}`);
  arcCarb.setAttribute("stroke-dashoffset", `-${pLen}`);

  arcFat.setAttribute("stroke-dasharray", `${fLen} ${C - fLen}`);
  arcFat.setAttribute("stroke-dashoffset", `-${pLen + cLen}`);

  donutCenter.textContent = `${PCT.protein}%`;
}

function handleCalc() {
  const tdee = calcTDEE();
  if (tdee === null) {
    alert("Please enter valid age, height and weight.");
    return;
  }
  kcalOut.textContent = `${tdee} kcal`;
  updateBars();
  updateDonut();
}

// init
updateBars();
updateDonut();
document.getElementById("calcBtn").addEventListener("click", handleCalc);
