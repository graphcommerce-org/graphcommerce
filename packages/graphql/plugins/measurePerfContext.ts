/* eslint-disable import/no-extraneous-dependencies */
import { randomUUID } from 'crypto'
import { graphqlSharedClient } from '@graphcommerce/graphql-mesh'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { enhanceStaticProps, hasProps } from '@graphcommerce/next-ui/server'
import {
  flushMeasurePerf,
  requestContext,
} from '../components/GraphQLProvider/measurePerformanceLink'

export const func = 'enhanceStaticProps'
export const exported = '@graphcommerce/next-ui/server'

const applloStateEnhanceStaticProps: MethodPlugin<typeof enhanceStaticProps> = (prev, cb) =>
  prev((context) =>
    requestContext.run(randomUUID(), async () => {
      const client = graphqlSharedClient()
      const conf = client.query({ query: StoreConfigDocument })

      try {
        const result = await cb(context)

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
        // wait for 100ms
        await new Promise((resolve) => {
          setTimeout(resolve, 100)
        })
        throw e
      }
    }),
  )

export const plugin = applloStateEnhanceStaticProps
