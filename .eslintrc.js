module.exports = {
  root: true,
  env: {
    node: true
  },
  // extends: ["plugin:vue/essential", "@vue/prettier"],
  extends: [
    "plugin:vue/recommended", // essential에서 recommended로 변경
    "eslint:recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": "off",
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
