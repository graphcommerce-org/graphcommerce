import { Image, ImageProps } from '@graphcommerce/image'
import { makeStyles, Theme } from '@material-ui/core'
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
  }),
  { name: 'Logo' },
)

export type LogoProps = {
  href?: `/${string}`
  image: ImageProps
} & UseStyles<typeof useStyles>

export default function Logo(props: LogoProps) {
  const { href, image } = props
  const classes = useStyles(props)

  return (
    <PageLink href={href ?? '/'} passHref>
      <a className={classes.link} aria-label='Logo'>
        <Image {...image} className={classes.logo} />
      </a>
    </PageLink>
  )
}
