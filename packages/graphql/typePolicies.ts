import { mergeDeep } from './apollo'
import type { TypedTypePolicies } from './generated/types'

export const mergeTypePolicies = (policies: TypedTypePolicies[]): TypedTypePolicies =>
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

export const getTypePoliciesVersion = (policies: TypedTypePolicies[]) =>
  generateIdentifyer(JSON.stringify(policies))
