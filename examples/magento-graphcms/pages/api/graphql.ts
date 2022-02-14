import { createServer, config } from '@graphcommerce/graphql-mesh'
import mesh from '../../lib/graphql/mesh'

export default await createServer(mesh, '/api/graphql')
export { config }
