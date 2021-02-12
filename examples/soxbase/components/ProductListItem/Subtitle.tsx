import { makeStyles, Theme } from '@material-ui/core'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'

type SubtitleProps = {
  value: string
}

export const useStyles = makeStyles(
  (theme: Theme) => ({
    subTitle: {
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

  return <span className={classes.subTitle}>{value}</span>
}
