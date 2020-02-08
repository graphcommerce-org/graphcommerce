module.exports = {
  client: {
    service: {
      name: 'graphcms',
      localSchemaFile: 'generated/schema.graphql',
    },
    includes: ['graphql/*.graphql'],
  },
}
