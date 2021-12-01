import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { ColorSwatchDataFragment } from './ColorSwatchData.gql'
import { SwatchDataProps } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      margin: '0 auto',
      height: responsiveVal(22, 30),
      width: responsiveVal(22, 30),
      borderRadius: '50%',
    },
    sizeSmall: {
      height: responsiveVal(8, 12),
      width: responsiveVal(8, 12),
      marginTop: responsiveVal(2, 4),
    },
  }),
  { name: 'ColorSwatchData' },
)

type ColorSwatchDataProps = ColorSwatchDataFragment & SwatchDataProps & UseStyles<typeof useStyles>

export default function ColorSwatchData(props: ColorSwatchDataProps) {
  const classes = useStyles(props)
  const { value, store_label, size } = props

  return (
    <div>
      <div
        className={clsx({
          [classes.root]: true,
          [classes.sizeSmall]: size === 'small',
        })}
        style={{ backgroundColor: value ?? undefined }}
      />
      <span>{size !== 'small' && store_label}</span>
    </div>
  )
}
