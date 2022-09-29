import { useContext, useEffect } from 'react'
import { recaptchaContext } from '../context/recaptchaContext'

export const useGoogleRecaptcha = () => {
  const context = useContext(recaptchaContext)

  useEffect(() => {
    if (!context.enabled) context.enable?.()
  }, [context])
}
