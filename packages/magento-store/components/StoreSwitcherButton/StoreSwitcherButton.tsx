import { FlagAvatar, extendableComponent } from '@graphcommerce/next-ui'
import { Button, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { MagentoEnv } from '../../storeConfigEnv'

export type StoreSwitcherButtonProps = { sx?: SxProps<Theme> }

const name = 'StoreSwitcherButton' as const
const parts = ['root', 'avatar'] as const
const { classes } = extendableComponent(name, parts)

export function StoreSwitcherButton(props: StoreSwitcherButtonProps) {
  const { sx } = props

  const { locale } = useRouter()
  const country = locale?.split('_')?.[1]?.toLowerCase() ?? ''

  return (
    <PageLink href='/switch-stores' passHref>
      <Button variant='text' size='medium' className={classes.root} sx={sx}>
        <FlagAvatar
          country={country}
          className={classes.avatar}
          sx={{ height: 20, width: 20, marginRight: '10px' }}
        />
        {(process.env as MagentoEnv).NEXT_PUBLIC_STORE_NAME} -{' '}
        {(process.env as MagentoEnv).NEXT_PUBLIC_CURRENCY_CODE}
      </Button>
    </PageLink>
  )
}
