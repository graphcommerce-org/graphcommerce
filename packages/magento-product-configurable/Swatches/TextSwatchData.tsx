import { makeStyles, Theme, Typography } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'
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
      gridTemplateColumns: '1fr auto',
      gridTemplateAreas: `
        "label value"
      `,
    },
    storeLabel: {
      gridArea: 'label',
    },
    value: {
      gridArea: 'value',
    },
    delivery: {},
  }),
  { name: 'TextSwatchData' },
)

type TextSwatchDataProps = TextSwatchDataFragment & SwatchDataProps & UseStyles<typeof useStyles>

export default function TextSwatchData(props: TextSwatchDataProps) {
  const classes = useStyles(props)
  const { value, store_label, size } = props
  return (
    <div className={classes.root}>
      {size === 'large' ? (
        <>
          <div className={classes.storeLabel}>{store_label}</div>
          <div className={classes.value}>{value}</div>
          <div className={classes.delivery}>
            <Typography variant='subtitle2'>{store_label}</Typography>
          </div>
        </>
      ) : (
        <>{store_label}</>
      )}
    </div>
  )
}
