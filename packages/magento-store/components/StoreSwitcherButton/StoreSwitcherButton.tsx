import { useQuery } from '@graphcommerce/graphql'
import { FlagAvatar, extendableComponent } from '@graphcommerce/next-ui'
import { Button, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import { StoreConfigDocument } from '../../StoreConfig.gql'

export type StoreSwitcherButtonProps = { sx?: SxProps<Theme> }

const name = 'StoreSwitcherButton' as const
const parts = ['root', 'avatar'] as const
const { classes } = extendableComponent(name, parts)

export function StoreSwitcherButton(props: StoreSwitcherButtonProps) {
  const { sx } = props
  const config = useQuery(StoreConfigDocument)
  const country = config.data?.storeConfig?.locale?.split('_')?.[1]?.toLowerCase() ?? ''

  return (
    <PageLink href='/switch-stores' passHref>
      <Button variant='text' size='medium' className={classes.root} sx={sx}>
        <FlagAvatar
          country={country}
          className={classes.avatar}
          sx={{ height: 20, width: 20, marginRight: 10 }}
        />
        {config.data?.storeConfig?.store_name} - {config.data?.storeConfig?.base_currency_code}
      </Button>
    </PageLink>
  )
}
