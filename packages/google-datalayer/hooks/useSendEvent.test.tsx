// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { useSendEvent } from './useSendEvent'

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

it('returns the same function at each render', () => {
  const functions: unknown[] = []
  function Component() {
    functions.push(useSendEvent())
    return null
  }

  const root = createRoot(document.createElement('div'))
  act(() => root.render(<Component />))
  act(() => root.render(<Component />))
  act(() => root.unmount())

  expect(functions).toHaveLength(2)
  expect(functions[1]).toBe(functions[0])
})
