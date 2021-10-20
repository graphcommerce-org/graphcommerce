import { getMesh } from '@graphcommerce/graphql-mesh'
import meshConfig from '../.meshrc.yml'
console.log('[@graphcommerce/graphql-mesh]: using mesh in development mode')
export default getMesh(meshConfig)
