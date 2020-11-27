import { makeStyles, Theme } from '@material-ui/core'
import { SwatchTypeRenderer } from '.'

export const useStyles = makeStyles(
  (theme: Theme) => ({
    circle: ({ value }: any) => ({
      backgroundColor: value ?? undefined,
      borderRadius: '100%',
      height: '20px',
      width: '20px',
      border: `3px solid #f4f4f4`,
      boxSizing: 'border-box',
    }),
  }),
  { name: 'Subtitle' },
)

const ColorSwatchData: SwatchTypeRenderer['ColorSwatchData'] = (props: any) => {
  const classes = useStyles(props)

  return <div className={classes.circle} />
}

export default ColorSwatchData
