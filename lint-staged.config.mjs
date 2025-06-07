/**
 * @filename: lint-staged.config.mjs
 * @type {import("lint-staged").Configuration}
 */
export default {
    "*": "prettier --ignore-unknown --write",
    "*.{mjs,js,ts}": "eslint --fix --ext mjs,js,ts"
};
