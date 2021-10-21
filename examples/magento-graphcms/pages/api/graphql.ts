import { createServer, config } from '@graphcommerce/graphql-mesh'
import mesh from '../../lib/mesh'

export default await createServer(mesh, '/api/graphql')
export { config }
