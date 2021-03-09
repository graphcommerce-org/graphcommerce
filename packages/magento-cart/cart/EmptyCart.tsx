import { Theme, makeStyles, Typography, Box } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      display: 'block',
      margin: `0 auto ${theme.spacings.xxs} auto`,
      width: responsiveVal(180, 240),
      height: responsiveVal(180, 240),
    },
  }),
  { name: 'EmptyCart' },
)

export default function EmptyCart() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <div>
        <img
          src='/icons/desktop_shopping_bag.svg'
          alt='shopping bag'
          className={classes.img}
          loading='eager'
        />
        <Typography variant='h3' component='h1'>
          Your cart is empty
        </Typography>
        <Typography variant='subtitle1'>
          Discover our collection and add items to your basket!
        </Typography>
      </div>
    </Box>
  )
}
