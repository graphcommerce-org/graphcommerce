import { Image, ImageProps } from '@graphcommerce/image'
import { Theme } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles()(
  (theme: Theme) => ({
    logo: {},
    parent: {
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

export type LogoProps = { href?: `/${string}`; image: ImageProps } & UseStyles<typeof useStyles>

export default function Logo(props: LogoProps) {
  const { href, image } = props
  const router = useRouter()
  const { classes } = useStyles(props)

  return router.asPath === '/' ? (
    <div className={classes.parent}>
      <Image layout='fixed' loading='eager' {...image} className={classes.logo} />
    </div>
  ) : (
    <PageLink href={href ?? '/'} passHref>
      <a className={classes.parent} aria-label='Logo'>
        <Image layout='fixed' loading='eager' {...image} className={classes.logo} />
      </a>
    </PageLink>
  )
}
