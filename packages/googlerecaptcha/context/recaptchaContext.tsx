import { createContext } from 'react'

export type RecaptchaContext = {
  enabled: boolean
  enable?: () => void
  siteKey?: string
}

export const recaptchaContext = createContext<RecaptchaContext>({ enabled: false })
