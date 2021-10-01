import { SvgImage, responsiveVal, iconBox } from '@graphcommerce/next-ui'
import { Theme, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      alignItems: 'center',
      gridTemplate: `
        "image title"
        "image subtitle"
      `,
      gridTemplateColumns: `min-content auto`,
      columnGap: theme.spacings.xs,
      marginTop: theme.spacings.xs,
    },
    text: {},
    image: {
      gridArea: 'image',
    },
    title: {
      gridArea: 'title',
    },
    subtitle: {
      gridArea: 'subtitle',
      color: theme.palette.primary.mutedText,
    },
  }),
  { name: 'ProductSidebarDelivery' },
)

export default function ProductSidebarDelivery() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SvgImage className={classes.image} size='medium' src={iconBox} alt='box' loading='eager' />
      <Typography className={classes.title} variant='subtitle2' component='div'>
        Order before 22:00 and
      </Typography>
      <Typography className={classes.subtitle} variant='body2' component='div' color='error'>
        Next day delivery - Shipping free
      </Typography>
    </div>
  )
}
