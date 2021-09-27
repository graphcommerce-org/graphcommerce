import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { ColorSwatchDataFragment } from './ColorSwatchData.gql'
import { SwatchDataProps } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      height: responsiveVal(35, 70),
      width: responsiveVal(35, 70),
      border: `3px solid ${theme.palette.background.highlight}`,
      boxSizing: 'border-box',
      borderRadius: '50%',
    },
    sizeSmall: {
      height: responsiveVal(15, 20),
      width: responsiveVal(15, 20),
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
