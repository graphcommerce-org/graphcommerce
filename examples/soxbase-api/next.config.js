/* eslint-disable @typescript-eslint/no-var-requires */
const withTranspile = require('next-transpile-modules')(['@reachdigital/graphql-mesh'])

const nextConfig = {}

module.exports = withTranspile(nextConfig)
