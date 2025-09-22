/* Simple data the page will render (image paths can be your own) */
const RECIPES = [
  {
    id: 1,
    title: "Mediterranean Quinoa Salad",
    meal: "Lunch",
    diet: "Vegetarian",
    time: 15,
    rating: 4.8,
    image: "./image/pexels-daniela-elena-tentis-118658-1213710.jpg",
    desc: "Refreshing quinoa with veggies, herbs and lemon.",
    ingredients: ["quinoa","cucumber","tomato","olive","lemon"]
  },
  {
    id: 2,
    title: "Spicy Peanut Noodles",
    meal: "Dinner",
    diet: "Vegan",
    time: 20,
    rating: 4.5,
    image: "./image/spicy-noodles.jpg.jpg",
    desc: "Quick weeknight noodles with creamy peanut sauce.",
    ingredients: ["noodles","peanut","soy","garlic","chili"]
  },
  {
    id: 3,
    title: "Overnight Oats with Berries",
    meal: "Breakfast",
    diet: "Vegetarian",
    time: 5,
    rating: 4.9,
    image: "./image/pexels-roman-odintsov-5150210.jpg",
    desc: "Customizable breakfast jar with oats and yogurt.",
    ingredients: ["oats","milk","yogurt","berries","honey"]
  },
  {
    id: 4,
    title: "Baked Salmon with Roasted Veg",
    meal: "Dinner",
    diet: "High-Protein",
    time: 10,
    rating: 4.7,
    image: "./image/pexels-vidalbalielojrfotografia-14515086.jpg",
    desc: "Omega-3 rich salmon, simple and elegant.",
    ingredients: ["salmon","lemon","pepper","broccoli"]
  },
  {
    id: 5,
    title: "Berry Chia Pudding",
    meal: "Dessert",
    diet: "Vegan",
    time: 5,
    rating: 4.6,
    image: "./image/pexels-vladimirsrajber-3810779.jpg",
    desc: "Sweet and satisfying chia dessert or snack.",
    ingredients: ["chia","coconut milk","berries","maple"]
  },
  {
    id: 6,
    title: "Healthy Chicken Stir-fry",
    meal: "Dinner",
    diet: "High-Protein",
    time: 20,
    rating: 4.4,
    image: "./image/pexels-vidalbalielojrfotografia-14515086.jpg",
    desc: "Lean chicken with crisp vegetables.",
    ingredients: ["chicken","soy","ginger","carrot","pepper"]
  }
];

/* ===== Helpers to render one card ===== */
function createRecipeCard(r) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <img class="card__img" src="${r.image}" alt="${r.title}">
    <div class="card__body">
      <span class="badge">${r.meal}</span>
      <h3 class="card__title" title="${r.title}">${r.title}</h3>
      <p class="card__desc">${r.desc}</p>
    </div>
    <div class="card__meta">
      <div class="meta__left">
        <span class="meta__item">⏱ ${r.time} mins</span>
      </div>
      <div class="meta__item"><span class="star">★</span> ${r.rating.toFixed(1)}</div>
    </div>
  `;
  return card;
}

/* ===== Filtering logic ===== */
function applyFilters(data) {
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  const meal = document.getElementById("mealFilter").value;
  const diet = document.getElementById("dietFilter").value;
  const time = document.getElementById("timeFilter").value;   // "All" or number as string
  const rating = document.getElementById("ratingFilter").value; // "All" or number as string

  return data.filter(r => {
    // search by title or ingredients
    const inText = r.title.toLowerCase().includes(q) ||
                   r.ingredients.join(" ").toLowerCase().includes(q);

    const byMeal = (meal === "All") || (r.meal === meal);
    const byDiet = (diet === "All") || (r.diet === diet);
    const byTime = (time === "All") || (r.time <= Number(time));
    const byRating = (rating === "All") || (r.rating >= Number(rating));

    return inText && byMeal && byDiet && byTime && byRating;
  });
}

/* ===== Render to the grid ===== */
function render(list) {
  const grid = document.getElementById("recipesGrid");
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML = `<p>No recipes found. Try different filters.</p>`;
    return;
    }
  list.forEach(r => grid.appendChild(createRecipeCard(r)));
}

/* ===== Hook up events ===== */
function setup() {
  render(RECIPES);

  const inputs = [
    "searchInput","mealFilter","dietFilter","timeFilter","ratingFilter"
  ].map(id => document.getElementById(id));

  inputs.forEach(el => {
    el.addEventListener("input", () => render(applyFilters(RECIPES)));
    el.addEventListener("change", () => render(applyFilters(RECIPES)));
  });
}

window.addEventListener("DOMContentLoaded", setup);