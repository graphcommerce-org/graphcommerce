import { useQuery } from '@graphcommerce/graphql'
import { cookie, extendableComponent, FlagAvatar } from '@graphcommerce/next-ui'
import type { SxProps, Theme } from '@mui/material'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { StoreConfigDocument } from '../../graphql'

export type StoreSwitcherButtonProps = { sx?: SxProps<Theme> }

const name = 'StoreSwitcherButton'
const parts = ['root', 'avatar'] as const
const { classes } = extendableComponent(name, parts)

export function StoreSwitcherButton(props: StoreSwitcherButtonProps) {
  const { sx } = props

  const config = useQuery(StoreConfigDocument)
  const country = config.data?.storeConfig?.locale?.split('_')?.[1]?.toLowerCase() ?? ''
  const router = useRouter()

  const currency = useMemo(
    () => cookie('Magento-Content-Currency') ?? config.data?.storeConfig?.base_currency_code,
    [config.data?.storeConfig?.base_currency_code],
  )

  return (
    <Button
      variant='text'
      size='medium'
      className={classes.root}
      onClick={() => router.push('/switch-stores')}
      sx={sx}
    >
      <FlagAvatar
        country={country}
        className={classes.avatar}
        size='20px'
        sx={{ marginRight: '10px' }}
      />
      {config.data?.storeConfig?.store_name} – {currency}
    </Button>
  )
}
