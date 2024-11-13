import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import Button from '@mui/material/Button'
import { useEffect } from 'react'
import { usePositionContext } from './PositionProvider'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { useStoreLocatorMap } from './StoreLocatorMapLoader'

export function FindLocation() {
  const { setValue, control } = useStoreLocatorForm()
  const { additionalOptions } = useStoreLocatorMap()
  const search = useWatch({ control, name: 'search' })
  const { setPosition } = usePositionContext()

  const additionalSearchQuery = additionalOptions.searchQuerySuffix
    ? `, ${additionalOptions.searchQuerySuffix}`
    : ''

  const handleSearch = async () => {
    try {
      const geocoder = new globalThis.google.maps.Geocoder()
      const { results } = await geocoder.geocode({ address: `${search}, ${additionalSearchQuery}` })

      if (results.length > 0) {
        const { location } = results[0].geometry
        const lat = location.lat()
        const lng = location.lng()

        setPosition({ lat, lng })
        setValue('search', '')
      }
    } catch (error) {
      console.error('Error while geocoding:', error)
    }
  }

  useEffect(() => {
    const handleEnterKey = (ev) => {
      if (ev.key === 'Enter') {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleSearch()
      }
    }

    document.getElementById('StoreFilters_Input')?.addEventListener('keyup', handleEnterKey)

    return () => {
      document.getElementById('StoreFilters_Input')?.removeEventListener('keyup', handleEnterKey)
    }
  })

  if (search?.length < 1) return null

  return (
    <div>
      <Button
        variant='pill'
        color='primary'
        sx={(theme) => ({
          '&.MuiButton-root': {
            padding: {
              xs: `${theme.spacings.xxs} ${theme.spacings.lg}`,
              md: `calc(${theme.spacings.xxs} * 0.4) ${theme.spacings.md}`,
            },
            marginTop: theme.spacings.sm,
            fontSize: theme.typography.subtitle1.fontSize,
            fontWeight: 'bold',
          },
        })}
        onClick={handleSearch}
      >
        <Trans id='Search near "{search}"' values={{ search }} />
      </Button>
    </div>
  )
}
