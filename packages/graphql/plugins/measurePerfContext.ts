/* eslint-disable import/no-extraneous-dependencies */
import { randomUUID } from 'crypto'
import { graphqlSharedClient } from '@graphcommerce/graphql-mesh'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { GetStaticPropsResult } from 'next'
import {
  flushMeasurePerf,
  requestContext,
} from '../components/GraphQLProvider/measurePerformanceLink'

export const func = 'enhanceStaticProps'
export const exported = '@graphcommerce/next-ui/server'

function isPropsResponse<Props extends Record<string, unknown>>(
  result: GetStaticPropsResult<Props>,
): result is { props: Props; revalidate?: number | boolean } {
  return typeof result === 'object' && 'props' in result
}

const applloStateEnhanceStaticProps: MethodPlugin<typeof enhanceStaticProps> = (prev, cb) =>
  prev((context) =>
    requestContext.run(randomUUID(), async () => {
      const client = graphqlSharedClient()
      const conf = client.query({ query: StoreConfigDocument })

      try {
        const result = await cb(context)

        if (isPropsResponse(result)) {
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
        // wait for 100ms
        await new Promise((resolve) => {
          setTimeout(resolve, 100)
        })
        throw e
      }
    }),
  )

export const plugin = applloStateEnhanceStaticProps
