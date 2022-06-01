import { ClientContext, GraphQLRequest, setContext } from '@graphcommerce/graphql'

const isMutation = (operation: GraphQLRequest) =>
  operation.query.definitions.some(
    (definition) =>
      definition.kind === 'OperationDefinition' && definition.operation === 'mutation',
  )

/** Apollo link that adds the Google reCAPTCHA token to the request context. */
export const recaptchaLink = setContext(async (operation, context: ClientContext) => {
  const recaptchaKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY
  if (!recaptchaKey || !globalThis.grecaptcha || !isMutation(operation)) return context

  await new Promise<void>((resolve) => {
    globalThis.grecaptcha?.ready(resolve)
  })

  const token = await globalThis.grecaptcha.execute(recaptchaKey, { action: 'submit' })

  if (!context.headers) context.headers = {}
  context.headers['X-ReCaptcha'] = token
  return context
})
