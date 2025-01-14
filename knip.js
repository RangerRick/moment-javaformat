module.exports = {
  $schema: "https://unpkg.com/knip@5/schema.json",

  entry: ["src/index.js"],
  ignore: ["dist/**", ".husky/**"],
  ignoreDependencies: ["moment-timezone"],
  project: ["src/**", "eslint.config.js"],
};
