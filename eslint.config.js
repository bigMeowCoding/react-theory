import js from '@eslint/js';
import react from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

// 过滤有问题的全局变量
const filteredBrowserGlobals = Object.fromEntries(
  Object.entries(globals.browser).map(([key, value]) => [
    key.trim(), // 去除变量名前后的空格
    value
  ])
);

export default [
  // JavaScript 基础规则
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...filteredBrowserGlobals,
        ...globals.node,
      },
    },
    rules: {
      // 基础代码质量规则
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': ['warn', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      'no-undef': 'error',
      'no-empty': 'warn',
      'eqeqeq': 'error',
      'curly': 'error',
      'prefer-const': 'error',
      'arrow-spacing': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'no-useless-return': 'error',
    },
  },

  // React 规则和 Prettier 集成保持不变...
  // (后续配置与之前相同，此处省略)
];