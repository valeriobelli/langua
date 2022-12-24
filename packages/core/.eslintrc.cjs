const {
  utils: { createEslintConfig },
} = require('../../.eslintrc.js')

module.exports = createEslintConfig({ root: __dirname })
