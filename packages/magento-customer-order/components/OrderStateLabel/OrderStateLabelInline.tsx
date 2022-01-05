import { makeStyles, useMergedClasses } from '@graphcommerce/next-ui'
import React from 'react'
import OrderStateLabel, { OrderStateLabelProps } from '.'

type OrderStateLabelInlineProps = OrderStateLabelProps

const useStyles = makeStyles({ name: 'OrderStateLabelInline' })((theme) => ({
  orderStatus: {
    fontStyle: 'normal',
    display: 'inline-block',
    padding: `0 6px`,
    borderRadius: 3,
    fontWeight: 'normal',
    background: `${theme.palette.secondary.main}20`,
  },
  orderStateRefunded: {
    color: theme.palette.primary.main,
    background: `${theme.palette.primary.main}20`,
  },
  orderStateShipped: {
    color: theme.palette.success.main,
    fontWeight: 'normal',
    background: `${theme.palette.success.main}20`,
  },
  orderStateCanceled: {
    color: theme.palette.primary.main,
    background: `${theme.palette.primary.main}20`,
  },
}))

export default function OrderStateLabelInline(props: OrderStateLabelInlineProps) {
  const classes = useMergedClasses(useStyles().classes, props.classes)
  return <OrderStateLabel classes={classes} {...props} />
}
