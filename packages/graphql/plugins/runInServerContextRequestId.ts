/* eslint-disable import/no-extraneous-dependencies */
import { randomUUID } from 'crypto'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { runInServerContext } from '@graphcommerce/next-ui/server/runInServerContext'
import {
  flushMeasurePerf,
  requestContext,
} from '../components/GraphQLProvider/measurePerformanceLink'
import { graphqlQueryPassToClient, graphqlSharedClient } from '@graphcommerce/graphql-mesh'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { hasProps } from '@graphcommerce/next-ui/server'

export const func = 'runInServerContext'
export const exported = '@graphcommerce/next-ui/server/runInServerContext'

const runInServerContextRequestId: MethodPlugin<typeof runInServerContext> = (
  prev,
  storefront,
  callback,
  ...args
) => {
  const reqId = randomUUID()

  return requestContext.run(reqId, async () => {
    const client = graphqlSharedClient()
    const conf = graphqlQueryPassToClient(StoreConfigDocument)

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await prev(storefront, callback, ...args)

      if (hasProps(result)) {
        if (result.props.apolloState) {
          console.warn('You can safely remove the apolloState prop from your page props')
        }

        await conf
        flushMeasurePerf()
        return {
          revalidate: result.revalidate,
          props: {
            ...result.props,
            apolloState: client.cache.extract(),
          },
        }
      }

      flushMeasurePerf()
      return result
    } catch (e) {
      flushMeasurePerf()
      // wait for 100ms so console.logs are flushed
      await new Promise((resolve) => {
        setTimeout(resolve, 100)
      })
      throw e
    }
  })
}

export const plugin = runInServerContextRequestId
