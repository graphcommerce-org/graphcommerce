import filterSchemaTransform from '@graphql-mesh/transform-filter-schema'

if (!process.env.GRAPHCMS || !process.env.GRAPHCMS_BEARER)
  throw new Error(
    `GRAPHCMS_BEARER:${process.env.GRAPHCMS} or GRAPHCMS ${process.env.GRAPHCMS} env variable not set`,
  )

const meshrc = {
  sources: [
    {
      handler: {
        graphql: {
          headers: {
            Authorization: process.env.GRAPHCMS_BEARER,
          },
          endpoint: process.env.GRAPHCMS,
        },
      },
      name: 'GraphCMS',
      transforms: [
        {
          filterSchema: ['Mutation.createContactForm'],
          tranformFn: filterSchemaTransform,
        },
      ],
    },
  ],
}

export default meshrc
