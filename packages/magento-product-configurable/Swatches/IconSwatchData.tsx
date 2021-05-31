import { Button, makeStyles, Theme } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconStar } from '@reachdigital/next-ui/icons'

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
      height: 20,
      width: 20,
    },
    button: {
      borderRadius: 50,
    },
  }),
  { name: 'IconSwatchData' },
)

// type ColorSwatchDataProps = ColorSwatchDataFragment & SwatchDataProps & UseStyles<typeof useStyles>

export default function ColorSwatchData(props: any) {
  const classes = useStyles(props)
  const { value, store_label, size } = props

  return (
    <div>
      <Button variant='outlined' className={classes.button} size='small'>
        <SvgImage src={iconStar} size='extrasmall' shade='inverted' alt='review' loading='lazy' />
      </Button>
    </div>
  )
}
