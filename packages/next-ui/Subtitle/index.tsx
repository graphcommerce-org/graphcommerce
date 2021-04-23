import { makeStyles, Theme } from '@material-ui/core'
import responsiveVal from '../Styles/responsiveVal'

type SubtitleProps = {
  value: string
}

export const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      textTransform: 'uppercase',
      fontSize: responsiveVal(11, 13),
      fontWeight: 400,
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'Subtitle' },
)

export default function Subtitle(props: SubtitleProps) {
  const { value } = props
  const classes = useStyles(props)

  return <span className={classes.root}>{value}</span>
}
