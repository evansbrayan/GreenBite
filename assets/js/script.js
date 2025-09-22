// Simple JS for rotating daily tips
const tips = [
  "Prioritize whole foods over processed snacks.",
  "Drink enough water daily for hydration.",
  "Aim for at least 30 minutes of exercise.",
  "Practice mindfulness to reduce stress.",
  "Get 7-8 hours of sleep each night."
];

function loadTip() {
  const tipText = document.getElementById("tip-text");
  const randomIndex = Math.floor(Math.random() * tips.length);
  tipText.textContent = tips[randomIndex];
}

// Load tip on page load
window.onload = loadTip;
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });