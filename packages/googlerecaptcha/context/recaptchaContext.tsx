import { createContext } from 'react'

export type RecaptchaContext = {
  enabled: boolean
  enable?: () => void
}

export const recaptchaContext = createContext<RecaptchaContext>({ enabled: false })
