# Shoe store US-07 demo

A small static shoe store page for a Scrum class project. It shows continuous integration and deployment with GitHub Actions and GitHub Pages: each push to `main` runs the unit tests, and the site is published only if they pass.

The site is static files only. It has no backend, and nothing is built or installed when it deploys.

## User story

US-07: As a shopper, I want to search for shoes by keyword so that I can quickly find a specific brand or model.

Acceptance criteria:

1. A search box appears in the header of the page.
2. Results match product name, brand or category.
3. A "no results found" message appears when nothing matches.

## What the demo shows

The header has a search box that filters the product grid while you type, ignoring upper and lower case. While a search is typed, the large product stage at the top steps aside so the results sit directly under the search box. The 12 shoes in `products.json` are made up. The matching is done by `searchProducts(products, query)` in `search.js`, and `test/search.test.js` tests that function with Node's built-in test runner.

The workflow in `.github/workflows/deploy.yml` has two jobs. `test` runs `npm test`. `deploy` needs `test`, so a failing test stops the deployment and a passing run publishes the site to GitHub Pages.

## The product stage

The stage at the top of the page is the Sneaker Product Hero component, a React component that animates with GSAP. Its source is in `theme/`, unchanged apart from showing the Onyx colourway first. The shoe photos are of one unbranded shoe and were AI-generated for that component's demo; the copies in `images/` are the same photos, used by the grid.

Browsers cannot run the component's TypeScript directly, so it was compiled once, together with React and GSAP, into the single file `hero.js`. That file is committed, which is why the site still needs no build step. To rebuild it after editing `theme/`:

```bash
npm install --no-save esbuild react react-dom gsap
npx esbuild theme/main.jsx --bundle --minify --format=esm --jsx=automatic \
  --define:process.env.NODE_ENV='"production"' \
  --alias:@/components/ui=./theme --outfile=hero.js
```

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
