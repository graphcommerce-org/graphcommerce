import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.lg}`,
      maxWidth: 820,
    },
    title: {
      marginBottom: `${theme.spacings.md}`,
    },
    optionsWrapper: {
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 280)}, 1fr))`,
      gap: `${theme.spacings.sm}`,
    },
    contactOption: {
      display: 'grid',
      gridAutoFlow: 'row',
      justifyItems: 'center',
      gap: `${theme.spacings.xs}`,
      border: `1px solid ${theme.palette.grey[300]}`,
      padding: `${theme.spacings.sm}`,
      borderRadius: '6px',
      cursor: 'pointer',
      textAlign: 'center',
    },
    wrapper: {
      paddingTop: `${theme.spacings.lg}`,
    },
  }),
  { name: 'ServiceOptions' },
)

type ServiceOptionsProps = UseStyles<typeof useStyles> & {
  title: string
  options: React.ReactNode
}

export default function ServiceOptions(props: ServiceOptionsProps) {
  const { title, options } = props
  const classes = useStyles(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>
        <div className={classes.optionsWrapper}>{options}</div>
      </div>
    </Container>
  )
}
