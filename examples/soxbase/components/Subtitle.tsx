import { makeStyles, Theme } from '@material-ui/core'

type SubtitleProps = {
  value: string
}

export const useStyles = makeStyles(
  (theme: Theme) => ({
    subTitle: {
      display: 'inline-block',
      textTransform: 'uppercase',
      fontSize: 13,
      fontWeight: 400,
      marginLeft: 8,
    },
  }),
  { name: 'Subtitle' },
)

export default function Subtitle(props: SubtitleProps) {
  const { value } = props
  const classes = useStyles(props)

  return <span className={classes.subTitle}>{value}</span>
}
