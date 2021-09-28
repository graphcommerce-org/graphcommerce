import { Money } from '@graphcommerce/magento-store'
import { UseStyles } from '@graphcommerce/next-ui'
import { makeStyles, Theme, Typography } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'
import { TextSwatchDataFragment } from './TextSwatchData.gql'
import { SwatchDataProps } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      width: '100%',
      textAlign: 'start',
      gridColumnGap: theme.spacings.sm,
      gridTemplateAreas: `
        "label value"
        "delivery delivery"
      `,
    },
    sizesmall: {},
    storeLabel: {
      gridArea: 'label',
      // fontWeight: theme.typography.fontWeightMedium,
    },
    value: {
      gridArea: 'value',
      justifySelf: 'end',
      // ...theme.typography.body1,
      margin: 'auto 0',
    },
    delivery: {
      gridArea: 'delivery',
      color: theme.palette.primary.mutedText,
    },
  }),
  { name: 'TextSwatchData' },
)

type TextSwatchDataProps = TextSwatchDataFragment & SwatchDataProps & UseStyles<typeof useStyles>

export default function TextSwatchData(props: TextSwatchDataProps) {
  const classes = useStyles(props)
  const { store_label, size, price, value } = props

  return (
    <div className={clsx(classes.root, classes?.[`size${size}`])}>
      {size === 'large' ? (
        <>
          <Typography className={classes.storeLabel} variant='subtitle2' component='div'>
            {value}
          </Typography>
          <Typography className={classes.value} variant='body2' component='div'>
            <Money {...price} />
          </Typography>
          {store_label !== value && (
            <Typography variant='body2' className={classes.delivery} component='div'>
              {store_label}
            </Typography>
          )}
        </>
      ) : (
        <Typography variant='caption'>{value ?? store_label}</Typography>
      )}
    </div>
  )
}
