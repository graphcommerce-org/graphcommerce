import { makeStyles, Theme } from '@material-ui/core'
import { Image } from '@reachdigital/image'
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
        <Image layout='fixed' alt='logo' src={svgLogo} loading='eager' className={classes.logo} />
      </a>
    </PageLink>
  )
}
