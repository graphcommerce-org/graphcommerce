// @vitest-environment happy-dom

import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import { Scroller } from '../components/Scroller'
import { ScrollerProvider } from '../components/ScrollerProvider'

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

it('calls the onMouseDown of its props', () => {
  const onMouseDown = vi.fn()
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  act(() =>
    root.render(
      <ScrollerProvider>
        <Scroller onMouseDown={onMouseDown}>
          <div>Item</div>
        </Scroller>
      </ScrollerProvider>,
    ),
  )
  act(() => {
    container
      .querySelector('.Scroller-root')
      ?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
  })
  act(() => root.unmount())
  container.remove()

  expect(onMouseDown).toHaveBeenCalledTimes(1)
})
