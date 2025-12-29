import type { StrictTypedTypePolicies } from '@graphcommerce/graphql'
import { mergeDeep } from '../../apollo'

export const mergeTypePolicies = (policies: StrictTypedTypePolicies[]): StrictTypedTypePolicies =>
  mergeDeep(...policies)

const generateIdentifyer = (s: string) =>
  Math.abs(
    s.split('').reduce((a, b) => {
      // eslint-disable-next-line no-param-reassign, no-bitwise
      a = (a << 5) - a + b.charCodeAt(0)
      // eslint-disable-next-line no-bitwise
      return a & a
    }, 0),
  ).toString()

export const getTypePoliciesVersion = (policies: StrictTypedTypePolicies[]) =>
  generateIdentifyer(JSON.stringify(policies))
