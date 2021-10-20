import { createServer, config } from '@graphcommerce/graphql-mesh'
import meshConfig from '../../.meshrc.yml'

export default await createServer(meshConfig, '/api/graphql')
export { config }
