import { createServer } from '@graphcommerce/graphql-mesh'

export default await createServer('/api/graphql')

export const config = { api: { externalResolver: true } }
