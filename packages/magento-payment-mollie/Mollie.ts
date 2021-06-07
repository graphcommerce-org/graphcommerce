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
export type ComponentEventListener = (fieldState: ComponentFieldState) => void

interface ComponentInstance {
  mount(element: string | HTMLElement): void
  unmount(): void
  addEventListener(type: 'change' | 'focus' | 'blur', listener: ComponentEventListener): void
  removeEventListener(listener: ComponentEventListener): void
}

export type MollieComponentVariants =
  | 'cardNumber'
  | 'cardHolder'
  | 'expiryDate'
  | 'verificationCode'

type CreateComponent = (component: MollieComponentVariants) => ComponentInstance

type TokenInstance = {}
type CreateToken = () => TokenInstance
