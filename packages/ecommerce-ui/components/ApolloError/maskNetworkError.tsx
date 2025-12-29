import type { ErrorLike } from '@apollo/client'
import { ServerError, ServerParseError } from '@apollo/client/errors'
import { Trans } from '@lingui/react/macro'

export function maskNetworkError(error: ErrorLike | null) {
  if (!error) return null

  if (process.env.NODE_ENV === 'development') {
    console.log(error)
  }

  if (ServerParseError.is(error) || ServerError.is(error)) {
    return <Trans>Something went wrong on the server, please try again later.</Trans>
  }

  if (globalThis.navigator && !globalThis.navigator?.onLine) {
    return <Trans>It appears you are offline, please try again later.</Trans>
  }

  return <Trans>Something went wrong</Trans>
}
