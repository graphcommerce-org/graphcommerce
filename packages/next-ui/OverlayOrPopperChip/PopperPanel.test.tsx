// @vitest-environment happy-dom

import type React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import { PopperPanel } from './PopperPanel'

vi.mock('./PopperPanelActions', () => ({
  PopperPanelActions: (props: { children: React.ReactNode }) => props.children,
}))

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

it('passes popperProps to the Popper', () => {
  const anchor = document.createElement('button')
  const container = document.createElement('div')
  document.body.append(anchor, container)
  const root = createRoot(container)

  act(() =>
    root.render(
      <PopperPanel
        activeEl={anchor}
        title='Filter'
        onApply={() => {}}
        onClose={() => {}}
        popperProps={{ className: 'CustomPopper' }}
      >
        {() => 'Content'}
      </PopperPanel>,
    ),
  )
  const popper = container.querySelector('.CustomPopper')
  act(() => root.unmount())
  anchor.remove()
  container.remove()

  expect(popper).not.toBeNull()
})
