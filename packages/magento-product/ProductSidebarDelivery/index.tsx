import { makeStyles, Theme, Typography } from '@material-ui/core'
import { SvgImage, responsiveVal, iconBox } from '@reachdigital/next-ui'
import React from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'wrap',
    // padding: `${theme.spacings.xs} 0`,
    marginTop: theme.spacings.xs,
  },
  text: {
    marginLeft: theme.spacings.xxs,
  },
  title: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: responsiveVal(0, 5),
    fontSize: responsiveVal(12, 14),
  },
  subtitle: {
    textTransform: 'none',
    letterSpacing: 'unset',
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function ProductSidebarDelivery() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SvgImage size='medium' src={iconBox} alt='box' loading='eager' />
      <div className={classes.text}>
        <Typography className={classes.title} variant='subtitle2'>
          Order before 22:00 and
        </Typography>
        <Typography className={classes.subtitle} variant='subtitle1'>
          Next day delivery - Shipping free
        </Typography>
      </div>
    </div>
  )
}
