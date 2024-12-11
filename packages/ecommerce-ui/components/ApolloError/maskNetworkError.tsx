import type { ServerError, ServerParseError } from '@graphcommerce/graphql'
import { Trans } from '@lingui/react'

function isServerError(error: Error | ServerParseError | ServerError | null): error is ServerError {
  return 'name' in (error as ServerError)
}

function isServerParseError(
  error: Error | ServerParseError | ServerError | null,
): error is ServerParseError {
  return 'bodyText' in (error as ServerParseError)
}

export function maskNetworkError(networkError: Error | ServerParseError | ServerError | null) {
  if (!networkError) return null

  if (isServerParseError(networkError) || isServerError(networkError)) {
    return <Trans id='Something went wrong on the server, please try again later.' />
  }

  if (globalThis.navigator && !globalThis.navigator?.onLine) {
    return <Trans id='It appears you are offline, please try again later.' />
  }

  return <Trans id='Something went wrong' />
}
