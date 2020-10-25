/* eslint-disable @typescript-eslint/no-var-requires */
const withTranspile = require('next-transpile-modules')(['@reachdigital'])

const nextConfig = {}

module.exports = withTranspile(nextConfig)
