// @vitest-environment happy-dom

import { createTheme, ThemeProvider } from '@mui/material'
import { motionValue } from 'framer-motion'
import type React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import type { NavigationPath } from '../hooks/useNavigation'
import { NavigationContext } from '../hooks/useNavigation'
import { NavigationOverlay } from './NavigationOverlay'

vi.mock('@lingui/core/macro', () => ({
  t: (strings: TemplateStringsArray) => strings[0],
}))

vi.mock('../../Overlay/components/OverlaySsr', () => ({
  OverlaySsr: (props: { children: React.ReactNode }) => props.children,
}))

vi.mock('../../Layout/components/LayoutHeaderContent', () => ({
  LayoutHeaderContent: (props: { right: React.ReactNode }) => props.right,
}))

vi.mock('./NavigationList', () => ({ NavigationList: () => null }))

const theme = Object.assign(createTheme({ cssVariables: true }), {
  appShell: { headerHeightSm: '46px', appBarHeightMd: '80px' },
  page: { horizontal: '20px' },
  spacings: { md: '20px' },
})

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

it('focuses the close button without a scroll of the closed overlay', () => {
  const focus = vi.spyOn(HTMLElement.prototype, 'focus')
  const selection = motionValue<NavigationPath | false>(false)
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  act(() =>
    root.render(
      <ThemeProvider theme={theme}>
        <NavigationContext.Provider
          value={{
            selection,
            items: [],
            hideRootOnNavigate: true,
            animating: motionValue(false),
            closing: motionValue(false),
            serverRenderDepth: 2,
            animationDuration: 0.225,
          }}
        >
          <NavigationOverlay variantSm='left' variantMd='left' mouseEvent='click' />
        </NavigationContext.Provider>
      </ThemeProvider>,
    ),
  )
  act(() => selection.set([]))

  const closeButton = container.querySelector('[aria-label="Close"]')
  const [options] = focus.mock.calls.at(-1) ?? []
  const focused = document.activeElement

  act(() => root.unmount())
  container.remove()
  focus.mockRestore()

  expect(focused).toBe(closeButton)
  expect(options).toEqual({ preventScroll: true })
})
