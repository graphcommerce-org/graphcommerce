import { makeStyles, Theme } from '@material-ui/core'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import { UseStyles } from '@reachdigital/next-ui/Styles'
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
    link: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'max-content',
      margin: '0 auto',
    },
  }),
  { name: 'Logo' },
)

type LogoProps = UseStyles<typeof useStyles>

export default function Logo(props: LogoProps) {
  const classes = useStyles(props)

  return (
    <PageLink href='/' passHref>
      <a className={classes.link}>
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
