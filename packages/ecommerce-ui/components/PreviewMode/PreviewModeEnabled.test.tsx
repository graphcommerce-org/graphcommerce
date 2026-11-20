// @vitest-environment happy-dom

import { createTheme, ThemeProvider } from '@mui/material'
import type React from 'react'
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { afterAll, afterEach, beforeAll, beforeEach, expect, it, vi } from 'vitest'
import { PreviewModeEnabled } from './PreviewModeEnabled'

vi.mock('@graphcommerce/next-ui', () => ({
  iconClose: '',
  iconContrast: '',
  iconInfo: '',
  iconRefresh: '',
  IconSvg: () => null,
  MessageSnackbar: (props: { children: React.ReactNode }) => props.children,
}))

// A toolbar with one `previewData` field, such as the Hygraph stage select.
vi.mock('./PreviewModeToolbar', async () => {
  const { useController } = await import('@graphcommerce/react-hook-form')
  const { usePreviewModeForm } = await import('./usePreviewModeForm')

  return {
    PreviewModeToolbar: () => {
      const { control } = usePreviewModeForm()
      const { field } = useController({
        control,
        name: 'previewData.stage' as 'previewData',
        defaultValue: 'DRAFT' as never,
      })
      return (
        <input
          aria-label='stage'
          value={`${field.value}`}
          onChange={(event) => field.onChange(event.target.value)}
        />
      )
    },
  }
})

const pageUrl = 'https://example.com/page'
const originalLocation = window.location

async function renderPreviewMode() {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)

  await act(async () => {
    root.render(
      <ThemeProvider theme={createTheme({ cssVariables: true })}>
        <PreviewModeEnabled />
      </ThemeProvider>,
    )
  })
  await waitForAutoSubmit()

  return { container, unmount: () => act(() => root.unmount()) }
}

/** FormAutoSubmit submits after a debounce. */
function waitForAutoSubmit() {
  return act(async () => {
    await vi.advanceTimersByTimeAsync(1000)
  })
}

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

beforeEach(() => {
  vi.useFakeTimers()
  Object.defineProperty(window, 'location', {
    configurable: true,
    writable: true,
    value: { href: pageUrl },
  })
})

afterEach(() => {
  vi.useRealTimers()
  window.sessionStorage.clear()
  Object.defineProperty(window, 'location', {
    configurable: true,
    writable: true,
    value: originalLocation,
  })
})

it('sends no update when FormPersist restores previewData after a page load', async () => {
  window.sessionStorage.PreviewModePreviewData = JSON.stringify({
    previewData: { stage: 'PUBLISHED' },
  })

  const { container, unmount } = await renderPreviewMode()

  expect(container.querySelector('input')?.value).toBe('PUBLISHED')
  expect(window.location.href).toBe(pageUrl)

  unmount()
})

it('sends the update when the user changes previewData', async () => {
  const { container, unmount } = await renderPreviewMode()
  const input = container.querySelector('input') as HTMLInputElement

  await act(async () => {
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set?.call(
      input,
      'PUBLISHED',
    )
    input.dispatchEvent(new window.Event('input', { bubbles: true }))
  })
  await waitForAutoSubmit()

  const url = new URL(window.location.href)
  expect(url.pathname).toBe('/api/preview')
  expect(url.searchParams.get('action')).toBe('update')
  expect(url.searchParams.get('previewData')).toBe(JSON.stringify({ stage: 'PUBLISHED' }))

  unmount()
})
