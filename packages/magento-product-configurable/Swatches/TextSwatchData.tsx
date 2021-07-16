import { makeStyles, Theme, Typography } from '@material-ui/core'
import { Money } from '@reachdigital/magento-store'
import { UseStyles } from '@reachdigital/next-ui'
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
    storeLabel: {
      gridArea: 'label',
      fontWeight: theme.typography.fontWeightMedium,
    },
    value: {
      gridArea: 'value',
      justifySelf: 'end',
      ...theme.typography.caption,
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
    <div className={classes.root}>
      {size === 'large' ? (
        <>
          <div className={classes.storeLabel}>{value}</div>
          <div className={classes.value}>
            <Money {...price} />
          </div>
          <div className={classes.delivery}>
            {/* TODO: change to actual delivery data */}
            <Typography variant='caption'>{store_label}</Typography>
          </div>
        </>
      ) : (
        <>{value ?? store_label}</>
      )}
    </div>
  )
}
