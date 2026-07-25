// @vitest-environment happy-dom

import { act } from 'react'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { AddressAutocomplete } from './AddressAutocomplete'

const { loaderOptions, loaderState } = vi.hoisted(() => ({
  loaderOptions: [] as unknown[],
  loaderState: {
    isLoaded: false,
    loadError: new Error('Maps failed') as Error | undefined,
  },
}))
const { autocompleteOptions } = vi.hoisted(() => ({
  autocompleteOptions: [] as unknown[],
}))

vi.mock('@graphcommerce/ecommerce-ui', () => ({
  TextFieldElement: ({
    inputProps,
    name,
    variant,
  }: {
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    name: string
    variant: string
  }) => <input aria-label='Street' data-variant={variant} name={name} {...inputProps} />,
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
    setValue: vi.fn(),
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

vi.mock('@react-google-maps/api', () => ({
  Autocomplete: ({ children, options }: { children: React.ReactNode; options: unknown }) => {
    autocompleteOptions.push(options)
    return <div data-google-autocomplete>{children}</div>
  },
  useLoadScript: (options: unknown) => {
    loaderOptions.push(options)
    return loaderState
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
  loaderState.isLoaded = false
  loaderState.loadError = new Error('Maps failed')
  loaderOptions.length = 0
  autocompleteOptions.length = 0
  vi.clearAllMocks()
})

let testRoot: Root | undefined
let testContainer: HTMLDivElement | undefined

beforeAll(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
})

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT')
})

describe('AddressAutocomplete', () => {
  it('keeps manual street entry available when Google Maps fails', () => {
    testContainer = document.createElement('div')
    document.body.appendChild(testContainer)
    testRoot = createRoot(testContainer)

    act(() => {
      testRoot?.render(
        <AddressAutocomplete
          form={{} as never}
          fallback={<label htmlFor='street'>Manual street input</label>}
        />,
      )
    })

    expect(testContainer.textContent).toContain('Manual street input')
    expect(testContainer.textContent).toContain(
      'Address search is unavailable. You can enter the address manually.',
    )
  })

  it('uses the standard styled street field after Google Maps loads', () => {
    loaderState.isLoaded = true
    loaderState.loadError = undefined
    testContainer = document.createElement('div')
    document.body.appendChild(testContainer)
    testRoot = createRoot(testContainer)

    act(() => {
      testRoot?.render(
        <AddressAutocomplete
          form={{} as never}
          fallback={<label htmlFor='street'>Manual street input</label>}
        />,
      )
    })

    const streetInput = testContainer.querySelector<HTMLInputElement>('input[aria-label="Street"]')
    expect(streetInput).not.toBeNull()
    expect(streetInput?.dataset.variant).toBe('outlined')
    expect(streetInput?.getAttribute('autocomplete')).toBe('one-time-code')
    expect(streetInput?.name).toMatch(/^places-search-/)
    expect(testContainer.querySelector('[data-google-autocomplete]')).not.toBeNull()
    expect(loaderOptions.at(-1)).toEqual({
      googleMapsApiKey: 'test-key',
      libraries: ['places'],
    })
    expect(autocompleteOptions.at(-1)).toEqual({
      fields: ['address_components'],
      types: ['address'],
    })
  })
})
