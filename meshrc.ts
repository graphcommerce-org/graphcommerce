if (!process.env.GRAPHCMS_BEARER || !process.env.GRAPHCMS)
  throw new Error('GRAPHCMS_BEARER or GRAPHCMS env variable not set')

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
        },
      ],
    },
  ],
}

export default meshrc
