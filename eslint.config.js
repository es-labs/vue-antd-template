import pluginVue from 'eslint-plugin-vue'
export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    ignores: ['node_modules', 'dist'],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
      'max-statements-per-line': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-empty': 'off',
      'no-prototype-builtins': 'off',
      'no-unused-vars': 'off',
      'no-useless-computed-key': 'off', // cause problem with HTML5 slot
      // 'standard/no-callback-literal': 'off', // useless rule -> need this to work! callback(...args)
      'vue/attributes-order': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/no-deprecated-slot-attribute': 'off', // interferes with html5 custom elements slot
      'vue/singleline-html-element-content-newline': 'off',
      'vue/no-v-model-argument': 'off',
      // 'vue/max-attributes-per-line': ['error', {
      //   'singleline': 1,
      //   'multiline': {
      //     'max': 1,
      //     'allowFirstLine': false
      //   }
      // }],
      'import/no-absolute-path': 'off',
      // 'prettier/prettier': 'error'
    }
  }
]