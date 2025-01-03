import { Button, IconSvg } from '@graphcommerce/next-ui'
import { useWatch } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import Box from '@mui/material/Box'
import useEventCallback from '@mui/material/utils/useEventCallback'
import LocationIcon from '../icons/LocationIcon.svg'
import type { StoreFragment } from '../Store.gql'
import { useStoreLocatorForm } from './StoreLocatorFormProvider'

type InfoWindowProps = {
  content: StoreFragment
}

export function StoreInfo(props: InfoWindowProps) {
  const { content } = props
  const { pickup_location_code, description } = content
  const { setValue, control } = useStoreLocatorForm()
  const preferredStore = useWatch({ control, name: 'preferredStore' })
  const isPreferredStore = preferredStore?.pickup_location_code === pickup_location_code

  const setPreferredStore = useEventCallback(() => {
    if (!content) return
    setValue('preferredStore', content)
    global.localStorage.setItem(
      'pickup_location_code',
      JSON.stringify(content.pickup_location_code),
    )
    global.document.dispatchEvent(
      new CustomEvent('set-preferred-store', {
        detail: {
          pickup_location_code: content.pickup_location_code,
        },
      }),
    )
  })

  if (!content) return null

  return (
    <>
      <Box
        sx={(theme) => ({
          typography: 'body2',
          width: '100%',
          my: theme.spacings.xs,
          '& :first-of-type(*)': { mt: 0 },
          '& :last-of-type(*)': { mb: 0 },
        })}
        dangerouslySetInnerHTML={{ __html: description ?? '' }}
      />

      {import.meta.graphCommerce.storeLocator?.enablePreferredStoreSelection && (
        <Box>
          <Button
            color='primary'
            onClick={!isPreferredStore ? setPreferredStore : undefined}
            variant='pill'
            sx={{ display: 'flex', gap: '7px' }}
            disabled={isPreferredStore}
            onMouseDown={(e) => {
              e.stopPropagation()
            }}
          >
            <IconSvg src={LocationIcon} size='large' />
            <Trans id='Select as your store' />
          </Button>
        </Box>
      )}
    </>
  )
}
