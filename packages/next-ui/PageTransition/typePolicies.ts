import { makeVar, ReactiveVar, TypePolicies } from '@apollo/client'
import { Query } from '@reachdigital/magento-graphql'

function makeSessionVar<T>(key: string, defaultValue: T) {
  let sessionValue: T | undefined
  if (typeof window !== 'undefined') {
    const sessionString = window.sessionStorage.getItem(key)
    if (sessionString) sessionValue = JSON.parse(sessionString)
  }

  const reactiveVar = makeVar(sessionValue ?? defaultValue)

  const sessionVar: ReactiveVar<T> & { reset: () => void } = (value) => {
    if (value) {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(value))
      }
      return reactiveVar(value)
    }
    return reactiveVar()
  }
  sessionVar.onNextChange = (listener) => reactiveVar.onNextChange(listener)
  sessionVar.reset = () => sessionVar(defaultValue)

  return sessionVar
}

export const historyStateVar = makeSessionVar<Query['historyState']>('historyState', {
  direction: 'FORWARD',
  idx: 0,
  pages: [],
  phase: 'FINISHED',
})

if (historyStateVar().phase !== 'FINISHED') {
  historyStateVar({ ...historyStateVar(), phase: 'FINISHED' })
}

const typePolicies: TypePolicies = {
  Query: { fields: { historyState: () => historyStateVar() } },
}
export default typePolicies
