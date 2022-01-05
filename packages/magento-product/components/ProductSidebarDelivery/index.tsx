import { responsiveVal, iconOrderBefore, SvgImageSimple } from '@graphcommerce/next-ui'
import { darken, lighten, Theme, Typography } from '@mui/material'
import { makeStyles } from '@graphcommerce/next-ui'
import React from 'react'

const useStyles = makeStyles({ name: 'ProductSidebarDelivery' })((theme) => ({
  root: {
    display: 'grid',
    alignItems: 'center',
    gridTemplate: `
      "image title"
      ".     subtitle"
    `,
    gridTemplateColumns: `min-content auto`,
    columnGap: theme.spacings.xxs,
    marginTop: theme.spacings.xxs,
    background:
      theme.palette.mode === 'light'
        ? darken(theme.palette.background.default, 0.01)
        : lighten(theme.palette.background.default, 0.2),
    padding: theme.spacings.xxs,
    borderRadius: responsiveVal(theme.shape.borderRadius * 3, theme.shape.borderRadius * 4),
  },
  text: {},
  image: {
    gridArea: 'image',
  },
  title: {
    gridArea: 'title',
    fontWeight: 600,
  },
  subtitle: {
    gridArea: 'subtitle',
    color: theme.palette.text.primary,
  },
}))

export default function ProductSidebarDelivery() {
  const { classes } = useStyles()

  return (
    <div className={classes.root}>
      <SvgImageSimple className={classes.image} src={iconOrderBefore} size='small' />
      <Typography className={classes.title} variant='body2' component='div'>
        Order before 22:00
      </Typography>
      <Typography className={classes.subtitle} variant='body2' component='div'>
        Next day delivery - Shipping free
      </Typography>
    </div>
  )
}
