import { makeStyles, Theme, Typography } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconEmptyCart } from '@reachdigital/next-ui/icons'
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

export default function EmptyCart() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div>
        <SvgImage
          src={iconEmptyCart}
          alt='Empty Cart'
          className={classes.img}
          loading='eager'
          size='large'
        />
        <Typography variant='h3' gutterBottom component='h1'>
          Your cart is empty
        </Typography>
        <Typography>Discover our collection and add items to your basket!</Typography>
      </div>
    </div>
  )
}
