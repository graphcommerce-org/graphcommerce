import type { Types } from '@adyen/api-library'
import { makeVar, useReactiveVar } from '@graphcommerce/graphql'
import { useClearCurrentCartId, useCurrentCartId } from '@graphcommerce/magento-cart'
import { useEventCallback } from '@mui/material'
import { useRouter } from 'next/router'
import { AdyenPaymentResponseFragment } from './AdyenPaymentResponse.gql'
import { useAdyenCartLock } from './useAdyenCartLock'

export enum ResultCodeEnum {
  AuthenticationFinished = 'AuthenticationFinished',
  Authorised = 'Authorised',
  Cancelled = 'Cancelled',
  ChallengeShopper = 'ChallengeShopper',
  Error = 'Error',
  IdentifyShopper = 'IdentifyShopper',
  Pending = 'Pending',
  PresentToShopper = 'PresentToShopper',
  Received = 'Received',
  RedirectShopper = 'RedirectShopper',
  Refused = 'Refused',
  Success = 'Success',
}

function isResultCodeEnum(value: string): value is ResultCodeEnum {
  return Object.values(ResultCodeEnum).includes(value as ResultCodeEnum)
}

export type AdyenPaymentResponse = {
  isFinal: boolean
  resultCode: ResultCodeEnum
  action?: Types.checkout.PaymentResponse['action']
  additionalData?: Types.checkout.PaymentResponse['additionalData']
}

export function parsePaymentResponse(
  status?: AdyenPaymentResponseFragment | null,
): AdyenPaymentResponse {
  if (!status?.resultCode) return { isFinal: false, resultCode: ResultCodeEnum.Error }

  const { isFinal, resultCode, action, additionalData } = status

  if (!isResultCodeEnum(resultCode) && process.env.NODE_ENV !== 'production')
    throw Error(
      `Returned resultCode ${resultCode} is not in available resultCodes: ${Object.values(
        ResultCodeEnum,
      )}`,
    )

  const response: AdyenPaymentResponse = {
    isFinal: Boolean(isFinal),
    // todo: do we need to check if these values are actually valid?
    resultCode: isResultCodeEnum(resultCode) ? resultCode : ResultCodeEnum.Error,
  }

  if (action) {
    try {
      response.action = JSON.parse(action)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        throw Error('Could not parse AdyenPaymentStatusResult.action as JSON')
      }
      if (process.env.NODE_ENV === 'production') {
        response.isFinal = false
        response.resultCode = ResultCodeEnum.Error
      }
    }
  }

  if (additionalData) {
    try {
      response.additionalData = JSON.parse(additionalData)
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        throw Error('Could not parse AdyenPaymentStatusResult.additionalData as JSON')
      }
      if (process.env.NODE_ENV === 'production') {
        response.isFinal = false
        response.resultCode = ResultCodeEnum.Error
      }
    }
  }

  return response
}

const paymentResult = makeVar<AdyenPaymentResponse | undefined>(undefined)

export const useAdyenPaymentResponse = () => useReactiveVar(paymentResult)

export function useAdyenHandlePaymentResponse() {
  const clearCurrentCartId = useClearCurrentCartId()
  const { currentCartId } = useCurrentCartId()
  const { push } = useRouter()
  const [, , unlockAdyen] = useAdyenCartLock()

  const unlock = () => unlockAdyen({ adyen: null, redirectResult: null })

  return useEventCallback((status?: AdyenPaymentResponseFragment | null) => {
    const parsedResponse = parsePaymentResponse(status)
    const resultCode = parsedResponse?.resultCode

    // https://github.com/Adyen/adyen-magento2/blob/f814d4c095b04d775faced7bdad8f10866354612/Helper/PaymentResponseHandler.php#L91
    switch (resultCode) {
      case ResultCodeEnum.RedirectShopper:
      case ResultCodeEnum.Refused:
      case ResultCodeEnum.Pending:
      case ResultCodeEnum.Error:
        unlock()
        break
      case ResultCodeEnum.Authorised:
        clearCurrentCartId()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        push({ pathname: '/checkout/success', query: { cart_id: currentCartId } })
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          throw Error(`Unknown resultCode: ${resultCode}`)
        }
    }
    paymentResult(parsedResponse)
  })
}
