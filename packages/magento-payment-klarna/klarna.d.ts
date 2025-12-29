export type KlarnaResponse = {
  approved?: boolean
  finalize_required?: boolean
  authorization_token: string
  show_form?: boolean
}

declare global {
  namespace Klarna {
    const Payments: {
      init: (options: { client_token: string | null | undefined }) => void
      load: (
        options: { container: string },
        data: Record<string, unknown>,
        callback: (res: unknown) => void,
      ) => void
      authorize: (
        options: { payment_method_category: string },
        data: Record<string, unknown>,
        callback: (response: KlarnaResponse) => void,
      ) => void
    }
  }
}
