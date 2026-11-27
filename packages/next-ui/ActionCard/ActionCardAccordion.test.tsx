// @vitest-environment happy-dom

import { createTheme, ThemeProvider } from '@mui/material'
import { cleanup, render } from '@testing-library/react'
import { afterEach, expect, it } from 'vitest'
import { ActionCardAccordion } from './ActionCardAccordion'

const theme = createTheme({ cssVariables: true })

afterEach(() => cleanup())

it('renders a button in right without a button around it', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ActionCardAccordion
        summary='Sort by'
        details={null}
        right={<button type='button'>Clear</button>}
      />
    </ThemeProvider>,
  )

  expect(container.querySelector('button button')).toBeNull()
})
