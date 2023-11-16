import { ApolloLink, FetchResult, Observable, Operation, RequestHandler } from '@apollo/client/core'
import { ExecuteMeshFn, MeshInstance, SubscribeMeshFn } from '@graphql-mesh/runtime'
import { isAsyncIterable } from '@graphql-tools/utils'

const ROOT_VALUE = {}

function createMeshApolloRequestHandler(
  mesh: MeshInstance | Promise<MeshInstance>,
): RequestHandler {
  return (operation: Operation): Observable<FetchResult> =>
    new Observable((observer) => {
      Promise.resolve()
        .then(async () => {
          // Create a new executor for each request
          const operationFn: SubscribeMeshFn | ExecuteMeshFn = (await mesh).createExecutor({})

          const results = await operationFn(
            operation.query,
            operation.variables,
            operation.getContext(),
            ROOT_VALUE,
            operation.operationName,
          )
          if (isAsyncIterable(results)) {
            for await (const result of results) {
              if (observer.closed) return
              observer.next(result)
            }
            observer.complete()
          } else if (!observer.closed) {
            observer.next(results)
            observer.complete()
          }
        })
        .catch((error) => {
          if (!observer.closed) observer.error(error)
        })
    })
}

export class MeshApolloLink extends ApolloLink {
  constructor(options: MeshInstance | Promise<MeshInstance>) {
    super(createMeshApolloRequestHandler(options))
  }
}
