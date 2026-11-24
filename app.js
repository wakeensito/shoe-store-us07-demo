// app.js
// Loads the shoes and shows the ones that match as the shopper types.
// The matching itself lives in search.js so it can be tested without a browser.
// (The big product stage at the top of the page is drawn by hero.js.)
import { searchProducts } from "./search.js";

// The parts of the page this script works with.
const searchBox = document.getElementById("search-box");
const hero = document.getElementById("hero");
const catalog = document.getElementById("catalog");
const grid = document.getElementById("product-grid");
const noResults = document.getElementById("no-results");
const resultCount = document.getElementById("result-count");

// The three colourways there are photos for: a dot colour, a tint for the
// glow behind the shoe, and the photo itself.
const COLOURWAYS = {
  Onyx: { swatch: "#1d1d1f", tint: "#7fd8bd", image: "images/onyx.webp" },
  Cloud: { swatch: "#e4e4e4", tint: "#ff9f6e", image: "images/cloud.webp" },
  Cobalt: { swatch: "#2f4fd0", tint: "#5b7cff", image: "images/cobalt.webp" },
};

// Filled once products.json has loaded.
let allProducts = [];

// Build the HTML for one product card.
function cardHtml(product) {
  // The card shows the shoe in the first colour on its list.
  const first = product.colors[0];
  const way = COLOURWAYS[first];

  const dots = product.colors
    .map((name) => `<span class="dot" style="--sw:${COLOURWAYS[name].swatch}" title="${name}"></span>`)
    .join("");

  // --t tells the CSS which colour to light the card in.
  return `
    <li class="card" style="--t:${way.tint}">
      <div class="card-stage">
        <span class="card-word" aria-hidden="true">${first}</span>
        <img src="${way.image}" alt="${product.brand} ${product.name} in ${first}" loading="lazy" />
      </div>
      <p class="card-eyebrow">${product.brand} · ${product.category}</p>
      <div class="card-row">
        <h2 class="card-name">${product.name}</h2>
        <span class="card-price">$${product.price}</span>
      </div>
      <div class="card-dots" aria-label="Colours">${dots}</div>
    </li>`;
}

// Show the right thing for whatever is in the search box right now.
function render() {
  const searching = searchBox.value.trim() !== "";

  // Nothing typed: show only the product stage. Something typed: the stage
  // steps aside and the matching shoes take its place.
  hero.hidden = searching;
  catalog.hidden = !searching;
  if (!searching) return;

  const matches = searchProducts(allProducts, searchBox.value);

  grid.innerHTML = matches.map(cardHtml).join("");

  // Show the "No results found" message only when the list is empty.
  noResults.hidden = matches.length > 0;
  resultCount.textContent = matches.length === 1 ? "1 shoe" : `${matches.length} shoes`;
}

// Fetch the product list, then draw the page for the first time.
async function start() {
  try {
    const response = await fetch("products.json");
    allProducts = await response.json();
    render();
  } catch (error) {
    resultCount.textContent = "Could not load the shoes. Please refresh the page.";
    console.error(error);
  }
}

// "input" fires on every keystroke, which gives the live filtering.
searchBox.addEventListener("input", render);

start();
