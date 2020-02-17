// This file only exists for eslint-plugin-resolver-webpack
// https://github.com/benmosher/eslint-plugin-import/issues/1286
const alias = require('./next.config-alias')

module.exports = {
  resolve: {
    alias,
  },
}
