import { makeStyles, Theme } from '@material-ui/core'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import PageLink from 'next/link'
import React from 'react'
import svgLogo from './graphcommerce.svg'

const useStyles = makeStyles(
  (theme: Theme) => ({
    logo: {
      width: 136,
      height: 16,
      pointerEvents: 'all',
      [theme.breakpoints.up('md')]: {
        width: 209,
        height: 25,
      },
    },
  }),
  { name: 'Logo' },
)

export default function Logo() {
  const classes = useStyles()

  return (
    <PageLink href='/' passHref>
      <a>
        <PictureResponsiveNext
          alt='logo'
          width={209}
          height={25}
          src={svgLogo}
          type='image/svg+xml'
          loading='eager'
          className={classes.logo}
        />
      </a>
    </PageLink>
  )
}
