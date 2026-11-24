// search.js
// The search logic for US-07, kept apart from the page so it can be tested
// with Node. It is a pure function: it reads its two arguments, returns a new
// list, and touches nothing else (no DOM, no network, no global state).

/**
 * Return the products whose name, brand or category contains the query.
 *
 * @param {Array<{name: string, brand: string, category: string}>} products
 * @param {string} query - what the shopper typed in the search box
 * @returns {Array} the matching products, in their original order
 */
export function searchProducts(products, query) {
  // Lower-case the query and drop spaces at either end, so "  KESTREL " and
  // "kestrel" behave the same way.
  const text = String(query ?? "").trim().toLowerCase();

  // Nothing typed yet: show every product.
  if (text === "") {
    return [...products];
  }

  // Keep a product if any of the three fields contains the query.
  return products.filter((product) =>
    [product.name, product.brand, product.category].some((field) =>
      field.toLowerCase().includes(text)
    )
  );
}
