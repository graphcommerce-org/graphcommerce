import { makeVar, ReactiveVar, TypePolicies } from '@apollo/client'

function makeSessionVar<T>(key: string, defaultValue: T): ReactiveVar<T> {
  if (typeof window === 'undefined') return makeVar<T>(defaultValue)

  const sessionString = window.sessionStorage.getItem(key)
  let sessionValue: T | undefined
  if (sessionString) sessionValue = JSON.parse(sessionString)

  const reactiveVar = makeVar(sessionValue ?? defaultValue)

  const sessionVar: ReactiveVar<T> = (value) => {
    if (value) {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      return reactiveVar(value)
    }
    return reactiveVar()
  }
  sessionVar.onNextChange = (listener) => reactiveVar.onNextChange(listener)

  return sessionVar
}

export const historyStateVar = makeSessionVar<GQLQuery['historyState']>('historyState', {
  direction: 'FORWARD',
  idx: 0,
  pages: [],
  phase: 'REGISTERED',
})

if (historyStateVar().phase !== 'REGISTERED') {
  historyStateVar({ ...historyStateVar(), phase: 'REGISTERED' })
}

const typePolicies: TypePolicies = {
  Query: { fields: { historyState: () => historyStateVar() } },
}
export default typePolicies
