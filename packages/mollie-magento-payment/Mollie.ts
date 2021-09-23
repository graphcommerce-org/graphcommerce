export interface Mollie {
  (profileId: string, options: { locale: string; testmode: boolean }): MollieInstance
}

export type MollieInstance = {
  createComponent: CreateComponent
  createToken: CreateToken
}

export type ComponentFieldState = {
  valid: boolean
  dirty: boolean
  touched: boolean
  error?: string
}
export type ComponentEventHandler = (fieldState: ComponentFieldState) => void

export interface ComponentHandler {
  mount(element: string | HTMLElement): void
  unmount(): void
  addEventListener(type: 'change' | 'focus' | 'blur', listener: ComponentEventHandler): void
  removeEventListener(listener: ComponentEventHandler): void
}

export type MollieFieldName = 'cardNumber' | 'cardHolder' | 'expiryDate' | 'verificationCode'

type CreateComponent = (name: MollieFieldName) => ComponentHandler

export type MollieTokenReturn = { token?: string; error?: string } | undefined
type CreateToken = () => Promise<MollieTokenReturn>
