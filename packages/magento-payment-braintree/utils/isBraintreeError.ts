import type { BraintreeError } from 'braintree-web'

const errorTypes = ['CUSTOMER', 'MERCHANT', 'NETWORK', 'INTERNAL', 'UNKNOWN']

export function isBraintreeError(e: unknown): e is BraintreeError {
  return errorTypes.includes((e as BraintreeError).type) && e instanceof Error
}

export function isBraintreeCustomerError(e: unknown): e is BraintreeError {
  return isBraintreeError(e) && e.type === 'CUSTOMER'
}
