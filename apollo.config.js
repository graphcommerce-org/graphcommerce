module.exports = {
  client: {
    includes: ['./components/**/*.graphql'],
    service: {
      name: 'graphcms',
      localSchemaFile: './generated/schema.graphql',
    },
  },
}
