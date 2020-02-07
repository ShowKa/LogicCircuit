module.exports = {
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // pre-defined sets for a Vue application
    'plugin:vue/recommended',
    // standard linting rules
    'standard'
  ],
  plugins: [
    'vue'
  ]
}