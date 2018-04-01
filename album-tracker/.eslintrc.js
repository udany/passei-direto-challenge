module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        "indent": ["off", 4],
        "no-trailing-spaces": ["warn", {skipBlankLines: true}],
        "space-before-function-paren": ["off"],
        "no-extra-semi": ["off"],
        "padded-blocks": ["off", "always"],
        "quotes": ["off", "always"],
        "semi": ["off", "always"],
        "eol-last": ["off"],
        "comma-dangle": ["off"],
        "new-cap": ["off"],
        "no-undef": ["off"],
        "no-redeclare": ["off"],
        "no-debugger": ["off"],
        "no-multiple-empty-lines": ["off"],
        "no-extend-native": ["off"],
        "no-useless-constructor": ["off"],
        "no-useless-escape": ["off"],
        "no-throw-literal": ["off"]
    }
};