import type { GraphQLRequest } from '@graphcommerce/graphql'
import { setContext } from '@graphcommerce/graphql/apollo'
import { Kind, OperationTypeNode } from 'graphql'
import { RecaptchaV3ConfigDocument } from '../graphql/query/RecaptchaV3Config.gql'

const isMutation = (operation: GraphQLRequest) =>
  operation.query.definitions.some(
    (definition) =>
      definition.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.MUTATION,
  )

/** Apollo link that adds the Google reCAPTCHA token to the request context. */
export const recaptchaLink = setContext(async (operation, context) => {
  const siteKey = context.cache?.readQuery({ query: RecaptchaV3ConfigDocument })?.recaptchaV3Config
    ?.website_key

  if (!siteKey || !globalThis.grecaptcha || !isMutation(operation)) return context

  await new Promise<void>((resolve) => {
    globalThis.grecaptcha?.ready(resolve)
  })

  let token: string | null = null
  let failure = 0
  while (failure < 5) {
    try {
      // eslint-disable-next-line no-await-in-loop
      token = await globalThis.grecaptcha.execute(siteKey, { action: 'submit' })
      break
    } catch {
      failure++
    }
  }

  if (!token) {
    console.error('Failed to get reCAPTCHA token after 5 attempts')
    return context
  }

  if (!context.headers) context.headers = {}
  context.headers['X-ReCaptcha'] = token
  return context
})
