// @vitest-environment happy-dom

import { createTheme, ThemeProvider } from '@mui/material'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import type { ComparableItemFragment } from '../graphql'
import { CompareListRow } from './CompareListRow'

vi.mock('@lingui/core/macro', () => ({
  t: (strings: TemplateStringsArray) => strings[0],
}))

const theme = Object.assign(createTheme({ cssVariables: true }), {
  page: { horizontal: '20px' },
  spacings: { xxs: '10px', xs: '12px', sm: '15px', md: '20px', lg: '30px' },
})

const item = (name: string) =>
  ({
    uid: name,
    attributes: [{ code: 'brand', value: name }],
  }) as unknown as ComparableItemFragment

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

it('spans the attribute label over the compared products', () => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  act(() =>
    root.render(
      <ThemeProvider theme={theme}>
        <CompareListRow
          compareAbleItems={[item('Zyxel'), item('Teltonika')]}
          attribute={{ code: 'brand', label: 'Brand' }}
        />
      </ThemeProvider>,
    ),
  )

  const css = [...document.querySelectorAll('style')].map((style) => style.textContent).join('\n')

  act(() => root.unmount())
  container.remove()

  expect(css).toContain('width:calc(calc(calc(100% / 3) * 2) + 20px)')
})
