import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import type { FieldPath, FieldValues, PathValue } from '@graphcommerce/ecommerce-ui'
import { useQuery } from '@graphcommerce/graphql'
import type { AddressFieldsOptions } from '@graphcommerce/magento-customer'
import { useAddressFieldsForm } from '@graphcommerce/magento-customer'
import { CountryRegionsDocument } from '@graphcommerce/magento-store'
import { Trans } from '@lingui/react/macro'
import { Box, CircularProgress, ClickAwayListener, useEventCallback } from '@mui/material'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { usePlacesAutocomplete } from '../hooks/usePlacesAutocomplete'
import { addressValues } from '../utils/addressValues'
import type { FormattedAddress } from '../utils/formatAddress'
import { AddressAutocompletePopper } from './AddressAutocompletePopper'

const updateOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
} as const

export type AddressAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = AddressFieldsOptions<TFieldValues, TName> & {
  fallback: ReactNode
}

export function AddressAutocomplete<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(options: AddressAutocompleteProps<TFieldValues, TName>) {
  const { fallback } = options
  const form = useAddressFieldsForm<TFieldValues, TName>(options)
  const { control, getValues, name, readOnly, required, setValue } = form
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null)
  const pendingRegion = useRef<FormattedAddress | null>(null)
  const countries = useQuery(CountryRegionsDocument).data?.countries

  const onAddress = useEventCallback((address: FormattedAddress) => {
    const values = addressValues(address, countries)
    const updateValue = (fieldName: TName, value: unknown) => {
      setValue(fieldName, value as PathValue<TFieldValues, TName>, updateOptions)
    }

    updateValue(name.regionId, null)
    updateValue(name.street, values.street)
    updateValue(name.houseNumber, values.houseNumber)
    updateValue(name.addition, values.addition)
    updateValue(name.postcode, values.postcode)
    updateValue(name.city, values.city)
    updateValue(name.countryCode, values.countryCode)
    if (countries) {
      updateValue(name.regionId, values.regionId)
      pendingRegion.current = null
    } else {
      pendingRegion.current = address
    }
  })

  const places = usePlacesAutocomplete({ onAddress })

  useEffect(() => {
    const address = pendingRegion.current
    if (!address || !countries) return

    pendingRegion.current = null
    if (getValues(name.countryCode) !== address.country) return

    setValue(
      name.regionId,
      addressValues(address, countries).regionId as PathValue<TFieldValues, TName>,
      updateOptions,
    )
  }, [countries, getValues, name.countryCode, name.regionId, setValue])

  return (
    <>
      {places.autocompleteAvailable ? (
        <ClickAwayListener onClickAway={places.closeSuggestions}>
          <Box ref={setAnchorElement} sx={{ position: 'relative', width: '100%' }}>
            <TextFieldElement
              sx={{ width: '100%' }}
              variant='outlined'
              control={control}
              required={required[name.street]}
              name={name.street}
              type='text'
              label={<Trans>Street</Trans>}
              showValid={!places.loading}
              onChange={places.onChange}
              onFocus={places.onFocus}
              onKeyDown={places.onKeyDown}
              inputProps={{
                'aria-activedescendant':
                  places.activeIndex >= 0
                    ? `${places.listboxId}-option-${places.activeIndex}`
                    : undefined,
                'aria-autocomplete': 'list',
                'aria-busy': places.loading,
                'aria-controls': places.listboxOpen ? places.listboxId : undefined,
                'aria-expanded': places.listboxOpen,
                'aria-haspopup': 'listbox',
                role: 'combobox',
                // Force disabling browser autocomplete so it does not compete with Google suggestions.
                autoComplete: 'one-time-code',
                name: places.addressSearchName,
              }}
              InputProps={{
                readOnly,
                endAdornment: places.loading ? <CircularProgress size={20} /> : undefined,
              }}
            />
            <AddressAutocompletePopper
              activeIndex={places.activeIndex}
              anchorElement={anchorElement}
              listboxId={places.listboxId}
              open={places.listboxOpen}
              predictions={places.predictions}
              onActiveIndexChange={places.setActiveIndex}
              onSelect={(prediction) => void places.selectPrediction(prediction)}
            />
          </Box>
        </ClickAwayListener>
      ) : (
        fallback
      )}
    </>
  )
}
