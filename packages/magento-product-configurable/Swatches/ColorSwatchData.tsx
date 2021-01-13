import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import { ColorSwatchDataFragment } from './ColorSwatchData.gql'
import { SwatchDataProps } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      height: responsiveVal(40, 80),
      width: responsiveVal(40, 80),
      border: `3px solid ${theme.palette.grey[100]}`,
      boxSizing: 'border-box',
      borderRadius: '50%',
    },
    sizeSmall: {
      height: 20,
      width: 20,
    },
  }),
  { name: 'Subtitle' },
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
      {size !== 'small' && store_label}
    </div>
  )
}
