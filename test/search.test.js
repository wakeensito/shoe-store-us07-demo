// Tests for searchProducts, run with Node's built-in test runner: npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { searchProducts } from "../search.js";

// A small fixed list, so the tests do not depend on products.json.
const products = [
  { name: "Vapor Pace 3", brand: "Kestrel", category: "Running" },
  { name: "Ridgeline Mid", brand: "Northfold", category: "Hiking" },
  { name: "Court Classic", brand: "Baseline", category: "Tennis" },
  { name: "Tempo Glide", brand: "Kestrel", category: "Running" },
];

// Helper: turn a result list into a list of names, which is easier to compare.
const names = (list) => list.map((product) => product.name);

test("matches by product name", () => {
  const result = searchProducts(products, "Ridgeline");
  assert.deepEqual(names(result), ["Ridgeline Mid"]);
});

test("matches by brand", () => {
  const result = searchProducts(products, "Kestrel");
  assert.deepEqual(names(result), ["Vapor Pace 3", "Tempo Glide"]);
});

test("matches by category", () => {
  const result = searchProducts(products, "Tennis");
  assert.deepEqual(names(result), ["Court Classic"]);
});

test("ignores upper and lower case", () => {
  const result = searchProducts(products, "kEsTrEL");
  assert.deepEqual(names(result), ["Vapor Pace 3", "Tempo Glide"]);
});

test("an empty query returns every product", () => {
  assert.equal(searchProducts(products, "").length, products.length);
  // Spaces alone count as empty too.
  assert.equal(searchProducts(products, "   ").length, products.length);
});

test("a query that matches nothing returns an empty list", () => {
  assert.deepEqual(searchProducts(products, "sandals"), []);
});
