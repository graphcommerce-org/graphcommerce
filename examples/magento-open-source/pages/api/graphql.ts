import { createServer } from '@graphcommerce/graphql-mesh'

export default await createServer('/api/graphql')

// bodyParser must stay disabled: Yoga parses the request body itself, and Next's bodyParser
// decodes multipart bodies as UTF-8 text, corrupting binary `Upload` variables.
export const config = { api: { externalResolver: true, bodyParser: false } }
