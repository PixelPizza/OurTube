/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
    endOfLine: "lf",
    printWidth: 80,
    quoteProps: "as-needed",
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "none",
    useTabs: true,
    overrides: [
        {
            files: "*.yml",
            options: {
                tabWidth: 2,
                useTabs: false
            }
        }
    ]
};

export default config;
