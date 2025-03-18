import type { FetchResult, Operation, RequestHandler } from '@apollo/client/core'
import { ApolloLink, Observable } from '@apollo/client/core'
import type { ExecuteMeshFn, MeshInstance, SubscribeMeshFn } from '@graphql-mesh/runtime'

function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
  return value?.[Symbol.asyncIterator] != null
}

const ROOT_VALUE = {}

function createMeshApolloRequestHandler(
  mesh: MeshInstance | Promise<MeshInstance>,
): RequestHandler {
  return (operation: Operation): Observable<FetchResult> => {
    operation.setContext({
      request: new Request('http://localhost:3000/graphql'),
      params: {
        query: operation.query,
        variables: operation.variables,
        operationName: operation.operationName,
      },
    })

    return new Observable((observer) => {
      Promise.resolve()
        .then(async () => {
          // Create a new executor for each request
          const operationFn: SubscribeMeshFn | ExecuteMeshFn = (await mesh).createExecutor({})

          const jaja = await mesh.getEnveloped

          const results = await operationFn(
            operation.query,
            operation.variables,
            operation.getContext(),
            ROOT_VALUE,
            operation.operationName,
          )

          console.log({ operation })

          // if (isAsyncIterable(results)) {
          //   for await (const result of results) {
          //     if (observer.closed) return
          //     observer.next(result)
          //   }
          //   observer.complete()
          // } else if (!observer.closed) {
          //   observer.next(results)
          observer.complete()
          // }
        })
        .catch((error) => {
          console.log({ error })
          if (!observer.closed) observer.error(error)
        })
    })
  }
}

export class MeshApolloLink extends ApolloLink {
  constructor(options: MeshInstance | Promise<MeshInstance>) {
    super(createMeshApolloRequestHandler(options))
  }
}
