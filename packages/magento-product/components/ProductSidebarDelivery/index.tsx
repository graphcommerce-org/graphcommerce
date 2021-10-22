import { SvgImage, responsiveVal, iconBox } from '@graphcommerce/next-ui'
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
      background: '#fff',
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
      color: theme.palette.primary.mutedText,
    },
  }),
  { name: 'ProductSidebarDelivery' },
)

export default function ProductSidebarDelivery() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SvgImage className={classes.image} src={iconBox} alt='box' loading='eager' />
      <Typography className={classes.title} variant='caption' component='div'>
        Order before 22:00
      </Typography>
      <Typography className={classes.subtitle} variant='caption' component='div'>
        Next day delivery - Shipping free
      </Typography>
    </div>
  )
}
