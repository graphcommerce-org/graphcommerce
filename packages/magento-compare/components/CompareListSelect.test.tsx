// @vitest-environment happy-dom

import { createTheme, ThemeProvider } from '@mui/material'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { motionValue } from 'motion/react'
import { afterEach, expect, it, vi } from 'vitest'
import { CompareListForm } from './CompareListForm'
import { CompareListSelect } from './CompareListSelect'

vi.mock('@lingui/core/macro', () => ({
  t: (strings: TemplateStringsArray) => strings[0],
}))

// The index of ecommerce-ui loads the interceptors of the example, and through them it imports itself
vi.mock('@graphcommerce/ecommerce-ui', async () => ({
  ...(await import('@graphcommerce/react-hook-form')),
  ...(await import('../../ecommerce-ui/components/FormComponents/SelectElement')),
}))

vi.mock('@graphcommerce/next-ui', async (importOriginal) => {
  const scrollY = motionValue(0)
  return {
    ...(await importOriginal<typeof import('@graphcommerce/next-ui')>()),
    useScrollY: () => scrollY,
  }
})

vi.mock('../hooks/useCompareList', () => ({
  useCompareList: () => ({
    data: {
      compareList: {
        uid: 'list',
        item_count: 3,
        attributes: [],
        items: ['Zyxel', 'Teltonika', 'Ubiquiti'].map((name) => ({
          uid: name,
          attributes: [],
          product: { name },
        })),
      },
    },
  }),
}))

const theme = Object.assign(createTheme({ cssVariables: true }), {
  appShell: { headerHeightSm: '46px', appBarHeightMd: '80px' },
  page: { horizontal: '20px' },
  spacings: { xxs: '10px', xs: '12px', sm: '15px', md: '20px', lg: '30px' },
})

afterEach(() => {
  cleanup()
  sessionStorage.clear()
})

it('swaps the products when a select picks the product of another column', () => {
  render(
    <ThemeProvider theme={theme}>
      <CompareListForm>
        <CompareListSelect />
      </CompareListForm>
    </ThemeProvider>,
  )

  fireEvent.mouseDown(screen.getAllByRole('combobox')[0])
  fireEvent.click(screen.getByRole('option', { name: 'Teltonika' }))

  expect(screen.getAllByRole('combobox').map((select) => select.textContent)).toEqual([
    'Teltonika',
    'Zyxel',
    'Ubiquiti',
  ])
})
