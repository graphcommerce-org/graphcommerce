import { Image } from '@graphcommerce/image'
import { UseStyles } from '@graphcommerce/next-ui/Styles'
import { makeStyles, Theme, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import svgLogo from './graphcommerce.svg'

const useStyles = makeStyles(
  (theme: Theme) => ({
    logo: {
      width: 'auto',
      height: 16,
      pointerEvents: 'all',
      paddingLeft: 10,
      [theme.breakpoints.up('md')]: {
        width: 'auto',
        height: 28,
        paddingLeft: 0,
        marginTop: '-5px',
      },
    },
    dark: {
      filter: 'invert(100%)',
    },
    link: {
      height: '100%',
      width: 'max-content',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      justifyContent: 'center',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        margin: 'unset',
        justifyContent: 'left',
      },
    },
  }),
  { name: 'Logo' },
)

type LogoProps = UseStyles<typeof useStyles>

export default function Logo(props: LogoProps) {
  const classes = useStyles(props)
  const theme = useTheme()

  return (
    <PageLink href='/' passHref>
      <a className={classes.link}>
        <Image
          layout='fixed'
          alt='logo'
          src={svgLogo}
          unoptimized
          loading='eager'
          className={clsx(classes.logo, theme.palette.type === 'dark' && classes.dark)}
        />
      </a>
    </PageLink>
  )
}
