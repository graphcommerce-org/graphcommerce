import { useQuery } from '@graphcommerce/graphql'
import { iconHeart, DesktopHeaderBadge, IconSvg, extendableComponent } from '@graphcommerce/next-ui'
import { t } from '@lingui/macro'
import { Fab, FabProps as FabPropsType, NoSsr, SxProps, Theme } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'

type WishlistFabContentProps = {
  icon?: React.ReactNode
  FabProps?: Omit<FabPropsType, 'children'>
  sx?: SxProps<Theme>
}

const name = 'WishlistFab'
const parts = ['root'] as const
const { classes } = extendableComponent(name, parts)

function WishlistFabContent(props: WishlistFabContentProps) {
  const { icon, FabProps, sx } = props

  return (
    <PageLink href='/wishlist' passHref>
      <Fab
        color='inherit'
        data-test-id='wishlist-fab'
        aria-label={t`Wishlist`}
        size='large'
        className={classes.root}
        {...FabProps}
        sx={sx}
      >
        <DesktopHeaderBadge
          badgeContent={true ? 1 : 0}
          color={true ? 'primary' : 'error'}
          variant='dot'
          overlap='circular'
        >
          {icon ?? <IconSvg src={iconHeart} size='large' />}
        </DesktopHeaderBadge>
      </Fab>
    </PageLink>
  )
}

export function WishlistFab(props: WishlistFabContentProps) {
  return (
    <NoSsr fallback={<WishlistFabContent {...props} />}>
      <WishlistFabContent {...props} />
    </NoSsr>
  )
}
