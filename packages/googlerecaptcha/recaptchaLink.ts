import { GraphQLRequest } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const isMutation = (operation: GraphQLRequest) =>
  operation.query.definitions.some(
    (definition) =>
      definition.kind === 'OperationDefinition' && definition.operation === 'mutation',
  )

export const recaptchaLink = setContext(async (operation, context) => {
  const recaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY
  if (!recaptchaKey || !globalThis.grecaptcha || !isMutation(operation)) return context

  await new Promise<void>(globalThis.grecaptcha?.ready)

  const token = await globalThis.grecaptcha.execute(recaptchaKey, { action: 'submit' })

  if (!context.headers) context.headers = {}
  context.headers['X-ReCaptcha'] = token
  return context
})
