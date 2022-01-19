import { IconHeader, iconBox, makeStyles } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'

const useStyles = makeStyles({ name: 'NoOrdersFound' })((theme) => ({
  noOrdersContainer: {
    marginTop: theme.spacings.sm,
  },
}))

export default function NoOrdersFound() {
  const { classes } = useStyles()

  return (
    <div className={classes.noOrdersContainer}>
      <IconHeader src={iconBox} size='small'>
        <Trans>No orders found</Trans>
      </IconHeader>
    </div>
  )
}
