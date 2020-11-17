/* eslint-disable @typescript-eslint/no-var-requires */
const withTranspile = require('next-transpile-modules')(['@reachdigital'], {
  unstable_webpack5: true,
})

const nextConfig = {}

module.exports = withTranspile(nextConfig)
