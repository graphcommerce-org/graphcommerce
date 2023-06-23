export interface Cancelable {
  clear(): void
}

export type DebounceOptions = {
  wait?: number
  maxWait?: number
  initialWait?: number
}

type DebounceState = {
  timeout: ReturnType<typeof setTimeout> | null
  firstCallTime: number | null
  isFirstCall: boolean
}

export default function debounce<T extends (...args: unknown[]) => unknown>({
  func,
  wait = 166,
  maxWait = 100000,
  initialWait = wait,
}: DebounceOptions & { func: T }): T & Cancelable {
  let state: DebounceState = { timeout: null, firstCallTime: null, isFirstCall: true }

  // Guidance for developers - Logging warnings for invalid parameter combinations
  if (process.env.NODE_ENV !== 'production') {
    // Rewrite to array
    const params = { wait, initialWait, maxWait }
    const invalidParams = Object.entries(params)
      .filter(([, value]) => value < 0)
      .map(([key]) => key)

    if (invalidParams.length > 0)
      console.warn(`debounce: ${invalidParams.join(', ')} should not be negative.`)

    if (maxWait < wait)
      console.warn(`debounce: maxWait should not be less than wait. This does nothing`)
  }

  const clear = () => {
    if (state.timeout !== null) clearTimeout(state.timeout)
    state = { timeout: null, firstCallTime: null, isFirstCall: true }
  }

  function debounced<This>(this: This, ...args: Parameters<T>) {
    const now = Date.now()
    state.firstCallTime ??= now

    const exec = () => {
      state.isFirstCall = false
      clear()
      func.apply(this, args)
    }

    const delay = state.isFirstCall ? initialWait : wait

    if (now - state.firstCallTime >= maxWait) {
      exec()
      return
    }

    if (state.timeout !== null) clearTimeout(state.timeout)
    state.timeout = setTimeout(exec, delay)
  }

  debounced.clear = clear

  return debounced as T & Cancelable
}
