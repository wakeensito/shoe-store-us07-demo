// app.js
// Loads the shoes, draws the grid, and redraws it as the shopper types.
// The matching itself lives in search.js so it can be tested without a browser.
import { searchProducts } from "./search.js";

// The parts of the page this script works with.
const searchBox = document.getElementById("search-box");
const grid = document.getElementById("product-grid");
const noResults = document.getElementById("no-results");
const resultCount = document.getElementById("result-count");

// One emoji per category stands in for a product photo.
const EMOJI = {
  Running: "👟",
  Tennis: "👟",
  Basketball: "👟",
  Hiking: "🥾",
  Casual: "🩴",
  Dress: "👞",
};

// Filled once products.json has loaded.
let allProducts = [];

// Build the HTML for one product card.
function cardHtml(product) {
  const mainColor = product.colors[0];

  const swatches = product.colors
    .map(
      (color) =>
        `<span class="swatch" style="--sw:${color.hex}" title="${color.name}"></span>`
    )
    .join("");

  const sizes = product.sizes
    .map((size) => `<span class="size">${size}</span>`)
    .join("");

  // --tint tells the CSS which colour to wash the card in.
  return `
    <li class="card" style="--tint:${mainColor.hex}">
      <div class="stage">
        <span class="word" aria-hidden="true">${mainColor.name}</span>
        <span class="shoe" aria-hidden="true">${EMOJI[product.category] ?? "👟"}</span>
      </div>
      <div class="info">
        <p class="eyebrow">${product.brand} · ${product.category}</p>
        <div class="title-row">
          <h2 class="name">${product.name}</h2>
          <span class="price">$${product.price}</span>
        </div>
        <div class="swatches" aria-label="Colours">${swatches}</div>
        <div class="sizes" aria-label="Sizes">${sizes}</div>
      </div>
    </li>`;
}

// Draw the shoes that match whatever is in the search box right now.
function render() {
  const matches = searchProducts(allProducts, searchBox.value);

  grid.innerHTML = matches.map(cardHtml).join("");

  // Show the "No results found" message only when the list is empty.
  noResults.hidden = matches.length > 0;
  resultCount.textContent =
    matches.length === 1 ? "1 shoe" : `${matches.length} shoes`;
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
