const path = require('path')

const createEslintConfig = ({ root, overrides = [] }) => {
  /** @type {import('eslint').Linter.BaseConfig} */
  const config = {
    env: {
      commonjs: true,
      es6: true,
      jest: true,
      node: true,
    },
    extends: ['eslint:recommended', 'plugin:import/typescript'],
    globals: {
      process: true,
    },
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      project: path.join(root, 'tsconfig.eslint.json'),
      sourceType: 'module',
    },
    overrides: [
      {
        files: ['.eslintrc.js'],
        rules: {
          '@typescript-eslint/no-var-requires': 'off',
        },
      },
      ...overrides,
    ],
    plugins: ['@typescript-eslint', 'import'],
    root: true,
    rules: {
      'sort-keys': ['warn', 'asc', { natural: true }],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['mjs', 'js', 'ts', 'tsx'],
        },
        typescript: {
          project: path.join(root, 'tsconfig.eslint.json'),
        },
      },
    },
  }

  return config
}

module.exports = {
  ...createEslintConfig({ root: __dirname }),
  utils: {
    createEslintConfig,
  },
}
