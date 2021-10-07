import {
  responsiveVal,
  SvgImage,
  iconSadShoppingBag,
  FullPageMessage,
} from '@graphcommerce/next-ui'
import { Button, makeStyles, Theme, Typography } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        minHeight: '70vh',
      },
      [theme.breakpoints.up('md')]: {
        minHeight: '60vh',
      },
    },
    img: {
      display: 'block',
      margin: `0 auto ${theme.spacings.xxs} auto`,
      width: responsiveVal(120, 180),
      height: responsiveVal(120, 180),
    },
  }),
  { name: 'EmptyCart' },
)

type EmptyCartProps = { children?: React.ReactNode }
export default function EmptyCart(props: EmptyCartProps) {
  const { children } = props
  const classes = useStyles()

  return (
    <FullPageMessage
      title={'Your cart is empty'}
      icon={
        <SvgImage
          src={iconSadShoppingBag}
          alt='Empty Cart'
          className={classes.img}
          loading='eager'
          size='large'
        />
      }
      button={
        <Link href='/' passHref>
          <Button variant='contained' color='primary' size='large'>
            Continue shopping
          </Button>
        </Link>
      }
    >
      Discover our collection and add items to your basket!
    </FullPageMessage>
  )

  return (
    <div className={classes.root}>
      <div>
        <SvgImage
          src={iconSadShoppingBag}
          alt='Empty Cart'
          className={classes.img}
          loading='eager'
          size='large'
        />

        {children ?? (
          <>
            <Typography variant='h3' gutterBottom component='h1'>
              Your cart is empty
            </Typography>
            <Typography>Discover our collection and add items to your basket!</Typography>
          </>
        )}
      </div>
    </div>
  )
}
