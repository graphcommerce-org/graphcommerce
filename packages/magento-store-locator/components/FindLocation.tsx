import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import Button from '@mui/material/Button'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'
import { PositionProps } from '../helpers/usePosition'

export type FindLocationProps = {
  onLocationLookup: (props: PositionProps) => void
}

export function FindLocation(props: FindLocationProps) {
  const { onLocationLookup } = props
  const { reset, control } = useStoreLocatorForm()
  const search = useWatch({ control, name: 'search' })

  const handleSearch = async () => {
    try {
      const geocoder = new globalThis.google.maps.Geocoder()
      const { results } = await geocoder.geocode({ address: `${search}, Nederland` })

      if (results.length > 0) {
        const { location } = results[0].geometry
        const lat = location.lat()
        const lng = location.lng()

        onLocationLookup({ lat, lng })
        reset({ search: '' })
      }
    } catch (error) {
      console.error('Error while geocoding:', error)
    }
  }

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
