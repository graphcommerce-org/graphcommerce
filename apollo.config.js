module.exports = {
  client: {
    includes: ['./components/**/*.graphql'],
    service: {
      name: 'm2-pwa',
      localSchemaFile: './generated/schema.graphql',
    },
  },
}
