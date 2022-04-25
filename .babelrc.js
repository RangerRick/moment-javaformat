module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": "auto",
    },],
    '@babel/preset-typescript',
  ],
  "plugins": [
    "@babel/plugin-proposal-async-generator-functions",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-transform-for-of",
  ]
};
