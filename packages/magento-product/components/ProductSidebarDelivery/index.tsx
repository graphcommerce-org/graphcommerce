import { SvgImage, responsiveVal, iconBox, SvgImageSimple } from '@graphcommerce/next-ui'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      alignItems: 'center',
      gridTemplate: `
        "image title"
        ". subtitle"
      `,
      gridTemplateColumns: `min-content auto`,
      columnGap: theme.spacings.xxs,
      marginTop: theme.spacings.xxs,
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacings.xxs,
      borderRadius: responsiveVal(4, 6),
    },
    text: {},
    image: {
      gridArea: 'image',
      width: responsiveVal(18, 24),
      height: responsiveVal(18, 24),
    },
    title: {
      gridArea: 'title',
      fontWeight: 600,
    },
    subtitle: {
      gridArea: 'subtitle',
      color: theme.palette.text.primary,
    },
  }),
  { name: 'ProductSidebarDelivery' },
)

export default function ProductSidebarDelivery() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SvgImageSimple className={classes.image} src={iconBox} />
      <Typography className={classes.title} variant='body2' component='div'>
        Order before 22:00
      </Typography>
      <Typography className={classes.subtitle} variant='body2' component='div'>
        Next day delivery - Shipping free
      </Typography>
    </div>
  )
}
