import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import Button from '@mui/material/Button'
import { PositionProps, usePosition } from '../helpers/usePosition'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { useEffect } from 'react'

export function FindLocation(props: { updatePosition: (pos: PositionProps) => void }) {
  const { updatePosition } = props
  const { reset, control } = useStoreLocatorForm()
  const search = useWatch({ control, name: 'search' })

  const handleSearch = async () => {
    try {
      const geocoder = new globalThis.google.maps.Geocoder()
      const { results } = await geocoder.geocode({ address: `${search}, Nederland` }) // @todo additional search query configurable via st

      if (results.length > 0) {
        const { location } = results[0].geometry
        const lat = location.lat()
        const lng = location.lng()

        updatePosition({ lat, lng })
        reset({ search: '' })
      }
    } catch (error) {
      console.error('Error while geocoding:', error)
    }
  }

  useEffect(() => {
    const handleEnter = (ev) => {
      if (ev.key === 'Enter') {
        console.log('hoi bram!')
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        handleSearch()
      }
    }

    document.getElementById('StoreFilters_Input')?.addEventListener('keyup', handleEnter)

    return () => {
      document.getElementById('StoreFilters_Input')?.removeEventListener('keyup', handleEnter)
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
        <Trans id='Search near "{placeName}"' values={{ placeName: search }} />
      </Button>
    </div>
  )
}
