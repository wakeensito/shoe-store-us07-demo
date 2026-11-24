# Shoe store US-07 demo

A small static shoe store page for a Scrum class project. It shows continuous integration and deployment with GitHub Actions and GitHub Pages: each push to `main` runs the unit tests, and the site is published only if they pass.

The page is plain HTML, CSS and JavaScript. It has no backend and no build step.

## User story

US-07: As a shopper, I want to search for shoes by keyword so that I can quickly find a specific brand or model.

Acceptance criteria:

1. A search box appears in the header of the page.
2. Results match product name, brand or category.
3. A "no results found" message appears when nothing matches.

## What the demo shows

The header has a search box that filters the product grid while you type, ignoring upper and lower case. The 12 shoes in `products.json` are made up. The matching is done by `searchProducts(products, query)` in `search.js`, and `test/search.test.js` tests that function with Node's built-in test runner.

The workflow in `.github/workflows/deploy.yml` has two jobs. `test` runs `npm test`. `deploy` needs `test`, so a failing test stops the deployment and a passing run publishes the site to GitHub Pages.

## Run it locally

The page loads `products.json` with `fetch`, so open it through a local web server instead of double-clicking `index.html`:

```bash
python3 -m http.server
```

Then visit http://localhost:8000.

## Run the tests

You need Node 20 or newer. There is nothing to install.

```bash
npm test
```
