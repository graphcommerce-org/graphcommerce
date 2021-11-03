import { Image, ImageProps } from '@graphcommerce/image'
import { makeStyles, Theme, useTheme } from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    logo: {},
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
    logoHideOnMobile: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'unset',
      },
    },
  }),
  { name: 'Logo' },
)

export type LogoProps = {
  href?: `/${string}`
  image: ImageProps
  alwaysShow?: boolean
} & UseStyles<typeof useStyles>

export default function Logo(props: LogoProps) {
  const { href, alwaysShow, image } = props
  const classes = useStyles(props)
  const theme = useTheme()

  return (
    <PageLink href={href ?? '/'} passHref>
      <a className={classes.link}>
        <Image
          {...{ ...image }}
          className={clsx(classes.logo, !alwaysShow && classes.logoHideOnMobile)}
        />
      </a>
    </PageLink>
  )
}
