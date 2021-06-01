import { makeStyles, Theme } from '@material-ui/core'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import PageLink from 'next/link'
import React from 'react'
import svgLogo from './logo.svg'

const useStyles = makeStyles(
  (theme: Theme) => ({
    logo: {
      pointerEvents: 'all',
      transform: 'scale(.65)',
      [theme.breakpoints.up('md')]: {
        transform: 'scale(1)',
      },
    },
  }),
  { name: 'Logo' },
)

export default function Logo() {
  const classes = useStyles()

  return (
    <PageLink href='/'>
      <a className={classes.logo}>
        <PictureResponsiveNext
          alt='logo'
          width={209}
          height={25}
          src={svgLogo}
          type='image/svg+xml'
          loading='eager'
        />
      </a>
    </PageLink>
  )
}
