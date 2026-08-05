// @vitest-environment happy-dom

import { act } from 'react'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { AddressAutocomplete } from './AddressAutocomplete'

const { loaderOptions } = vi.hoisted(() => ({
  loaderOptions: [] as unknown[],
}))
const { fetchAutocompleteSuggestions, importLibrary, setValue } = vi.hoisted(() => ({
  fetchAutocompleteSuggestions: vi.fn(),
  importLibrary: vi.fn(),
  setValue: vi.fn(),
}))

vi.mock('@graphcommerce/ecommerce-ui', () => ({
  TextFieldElement: ({
    inputProps,
    inputRef,
    name,
    onChange,
    onFocus,
    onKeyDown,
    variant,
  }: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    inputRef?: React.Ref<HTMLInputElement>
    name: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    variant: string
  }) => (
    <input
      ref={inputRef}
      aria-label='Street'
      data-variant={variant}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      {...inputProps}
    />
  ),
}))

vi.mock('@graphcommerce/magento-customer', () => ({
  useAddressFieldsForm: () => ({
    control: {},
    getValues: () => '',
    name: {
      street: 'street',
      houseNumber: 'houseNumber',
      addition: 'addition',
      postcode: 'postcode',
      city: 'city',
      countryCode: 'countryCode',
      regionId: 'regionId',
    },
    readOnly: false,
    required: { street: true },
    setValue,
  }),
}))

vi.mock('@graphcommerce/next-config/config', () => ({
  googleMapsApiKey: 'test-key',
}))

vi.mock('@lingui/core/macro', () => ({
  t: (strings: TemplateStringsArray) => strings.join(''),
}))

vi.mock('@lingui/react/macro', () => ({
  Trans: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('@graphcommerce/next-ui', () => ({
  ErrorSnackbar: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div>{children}</div> : null,
}))

vi.mock('@mui/material', () => ({
  Box: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CircularProgress: () => <span data-loading />,
  ClickAwayListener: ({ children }: { children: React.ReactNode }) => children,
  List: ({ children, id, role }: { children: React.ReactNode; id: string; role: string }) => (
    <ul id={id} role={role}>
      {children}
    </ul>
  ),
  ListItemButton: ({
    children,
    id,
    onClick,
    onMouseDown,
    onMouseEnter,
    role,
  }: {
    children: React.ReactNode
    id: string
    onClick: React.MouseEventHandler<HTMLButtonElement>
    onMouseDown: React.MouseEventHandler<HTMLButtonElement>
    onMouseEnter: React.MouseEventHandler<HTMLButtonElement>
    role: string
  }) => (
    <button
      id={id}
      type='button'
      role={role}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </button>
  ),
  ListItemText: ({
    primary,
    secondary,
  }: {
    primary: React.ReactNode
    secondary?: React.ReactNode
  }) => (
    <span>
      {primary} {secondary}
    </span>
  ),
  Paper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Popper: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-places-popper>{children}</div> : null,
  Typography: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}))

vi.mock('@googlemaps/js-api-loader', () => ({
  Loader: class {
    constructor(options: unknown) {
      loaderOptions.push(options)
    }

    importLibrary = importLibrary
  },
}))

vi.mock('../hooks/useCountries', () => ({
  useCountries: () => undefined,
}))

afterEach(() => {
  act(() => testRoot?.unmount())
  testContainer?.remove()
  testRoot = undefined
  testContainer = undefined
  loaderOptions.length = 0
  vi.useRealTimers()
  vi.clearAllMocks()
})

let testRoot: Root | undefined
let testContainer: HTMLDivElement | undefined

class AutocompleteSessionToken {}

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

function renderAutocomplete() {
  testContainer = document.createElement('div')
  document.body.appendChild(testContainer)
  testRoot = createRoot(testContainer)
  testRoot.render(
    <AddressAutocomplete
      form={{} as never}
      fallback={<label htmlFor='street'>Manual street input</label>}
    />,
  )
}

describe('AddressAutocomplete', () => {
  it('keeps manual street entry available when Google Maps fails', async () => {
    importLibrary.mockRejectedValue(new Error('Maps failed'))

    await act(async () => renderAutocomplete())

    expect(testContainer?.textContent).toContain('Manual street input')
    expect(testContainer?.textContent).toContain(
      'Address search is unavailable. You can enter the address manually.',
    )
  })

  it('uses the standard styled street field after Google Maps loads', async () => {
    importLibrary.mockResolvedValue({
      AutocompleteSessionToken,
      AutocompleteSuggestion: { fetchAutocompleteSuggestions },
    })

    await act(async () => renderAutocomplete())

    const streetInput = testContainer?.querySelector<HTMLInputElement>('input[aria-label="Street"]')
    expect(streetInput).not.toBeNull()
    expect(streetInput?.dataset.variant).toBe('outlined')
    expect(streetInput?.getAttribute('autocomplete')).toBe('one-time-code')
    expect(streetInput?.getAttribute('role')).toBe('combobox')
    expect(streetInput?.name).toMatch(/^places-search-/)
    expect(loaderOptions.at(-1)).toEqual({
      apiKey: 'test-key',
      version: 'weekly',
    })
    expect(importLibrary).toHaveBeenCalledWith('places')
  })

  it('loads new Places suggestions and fills the selected address', async () => {
    vi.useFakeTimers()

    const fetchFields = vi.fn().mockResolvedValue(undefined)
    const place = {
      addressComponents: [
        { longText: 'Baker Street', shortText: 'Baker St', types: ['route'] },
        { longText: '221B', shortText: '221B', types: ['street_number'] },
        { longText: 'London', shortText: 'London', types: ['postal_town'] },
        { longText: 'United Kingdom', shortText: 'GB', types: ['country'] },
        { longText: 'NW1 6XE', shortText: 'NW1 6XE', types: ['postal_code'] },
      ],
      fetchFields,
    }
    const prediction = {
      mainText: { text: '221B Baker Street' },
      placeId: 'baker-street',
      secondaryText: { text: 'London, UK' },
      text: { text: '221B Baker Street, London, UK' },
      toPlace: () => place,
    }
    fetchAutocompleteSuggestions.mockResolvedValue({
      suggestions: [{ placePrediction: prediction }],
    })
    importLibrary.mockResolvedValue({
      AutocompleteSessionToken,
      AutocompleteSuggestion: { fetchAutocompleteSuggestions },
    })

    await act(async () => renderAutocomplete())

    const streetInput = testContainer?.querySelector<HTMLInputElement>('input[aria-label="Street"]')
    expect(streetInput).not.toBeNull()

    await act(async () => {
      if (!streetInput) return
      const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
      valueSetter?.call(streetInput, 'Baker')
      streetInput.dispatchEvent(new Event('input', { bubbles: true }))
      await vi.advanceTimersByTimeAsync(250)
    })

    expect(fetchAutocompleteSuggestions).toHaveBeenCalledWith({
      includedPrimaryTypes: ['street_address', 'premise', 'subpremise', 'route'],
      input: 'Baker',
      sessionToken: expect.any(AutocompleteSessionToken),
    })
    expect(testContainer?.textContent).toContain('221B Baker Street')
    expect(testContainer?.textContent).toContain('Google Maps')

    const option = testContainer?.querySelector<HTMLButtonElement>('button[role="option"]')
    await act(async () => option?.click())

    expect(fetchFields).toHaveBeenCalledWith({ fields: ['addressComponents'] })
    expect(setValue).toHaveBeenCalledWith('street', 'Baker Street', expect.any(Object))
    expect(setValue).toHaveBeenCalledWith('houseNumber', '221', expect.any(Object))
    expect(setValue).toHaveBeenCalledWith('addition', 'B', expect.any(Object))
    expect(setValue).toHaveBeenCalledWith('postcode', 'NW1 6XE', expect.any(Object))
    expect(setValue).toHaveBeenCalledWith('city', 'London', expect.any(Object))
    expect(setValue).toHaveBeenCalledWith('countryCode', 'GB', expect.any(Object))
  })
})
