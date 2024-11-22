import type { MeshContext } from '@graphcommerce/graphql-mesh'
// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'cookie'

const ALGOLIA_USER_TOKEN_COOKIE_NAME = '_algolia_userToken'
export function getUserToken(context: MeshContext): string | undefined {
  const { headers } = context as MeshContext & { headers?: Record<string, string | undefined> }

  const cookie = headers?.cookie
  if (cookie) return parse(cookie)[ALGOLIA_USER_TOKEN_COOKIE_NAME]
  return undefined
}
