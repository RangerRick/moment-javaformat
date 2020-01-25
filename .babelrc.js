module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "modules": "umd",
      /*
      "useBuiltIns": "usage",
      "corejs": 3,
      */
    },],
    '@babel/preset-typescript',
  ],
  "plugins": [
    "@babel/plugin-proposal-async-generator-functions",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-transform-for-of",
    "@babel/plugin-transform-modules-commonjs",
  ]
};
