/* eslint-disable import/no-extraneous-dependencies */
import { randomUUID } from 'crypto'
import type { MethodPlugin } from '@graphcommerce/next-config'
import { runInServerContext } from '@graphcommerce/next-ui/server/runInServerContext'
import { requestContext } from '../components/GraphQLProvider/measurePerformanceLink'

export const func = 'runInServerContext'
export const exported = '@graphcommerce/next-ui/server/runInServerContext'

const runInServerContextRequestId: MethodPlugin<typeof runInServerContext> = (
  prev,
  storefront,
  callback,
  ...args
) => {
  const reqId = randomUUID()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return requestContext.run(reqId, () => prev(storefront, callback, ...args))
}

export const plugin = runInServerContextRequestId
