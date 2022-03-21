import { useContext } from 'react'
import { recaptchaContext } from '../context/recaptchaContext'

export const useGoogleRecaptcha = () => useContext(recaptchaContext).enable?.()
