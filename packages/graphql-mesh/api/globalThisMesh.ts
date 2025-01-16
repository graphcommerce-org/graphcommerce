import type { MeshInstance } from '@graphql-mesh/runtime'
import type {
  ServerAdapter,
  ServerAdapterBaseObject,
  ServerAdapterRequestHandler,
} from '@whatwg-node/server'
import { createBuiltMeshHTTPHandlerBase, getBuiltMeshBase } from '../.mesh'

type MeshHTTPHandler<TServerContext = Record<string, unknown>> = ServerAdapter<
  TServerContext,
  ServerAdapterBaseObject<TServerContext, ServerAdapterRequestHandler<TServerContext>>
>

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var buildMesh: Promise<MeshInstance> | undefined

  // eslint-disable-next-line vars-on-top, no-var
  var builtMeshHandler: MeshHTTPHandler | undefined
}

const shouldGlobalThisMeshBeCreated =
  process.env.NODE_ENV === 'development' && import.meta.graphCommerce.graphqlMeshEditMode !== true

/**
 * We are creating a global instance of the mesh so it doesn't get recreated on every change.
 * Creating the instance is a very long operation and with sufficiently complex schema's it can take
 * multiple seconds. During development it can happen multiple times during a single change.
 *
 * During development this creates a big advantage as we do not recreate the mesh on every reload.
 * This makes development a lot faster.
 *
 * The disadvantage of this is that the mesh and any resolvers custom resolver will not be refreshed
 * whenever code changes are made, to enable this set the config value `graphqlMeshEditMode: true`
 * in your graphcommerce.config.js or set the env variable `GC_GRAPHQL_MESH_EDIT_MODE=1`.
 */
export function getBuiltMesh() {
  if (shouldGlobalThisMeshBeCreated) {
    globalThis.buildMesh ??= getBuiltMeshBase()
    return globalThis.buildMesh
  }
  return getBuiltMeshBase()
}

/**
 * Same as globalThisGetBuiltMesh but for the mesh handler. As the handler uses additional logic so
 * we can't re-use globalThisGetBuiltMesh.
 */
export function createBuiltMeshHTTPHandler(): MeshHTTPHandler {
  if (shouldGlobalThisMeshBeCreated) {
    globalThis.builtMeshHandler ??= createBuiltMeshHTTPHandlerBase() as MeshHTTPHandler
    return globalThis.builtMeshHandler
  }
  return createBuiltMeshHTTPHandlerBase() as MeshHTTPHandler
}
