import { ContainerProps, makeStyles, Theme } from '@material-ui/core'
import Row from '..'
import { responsiveVal } from '../..'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    wrapper: {
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: `${theme.spacings.md}`,
      [theme.breakpoints.up('md')]: {
        gridTemplateColumns: '8fr 3fr',
      },
    },
    backstory: {
      position: 'relative',
      '& img': {
        position: 'absolute',
        top: '0',
        zIndex: 0,
        width: '100%',
        height: '100% !important',
        objectFit: 'cover',
        filter: 'brightness(80%)',
        [theme.breakpoints.up('md')]: {
          filter: 'brightness(100%)',
          height: '100%',
        },
        borderRadius: responsiveVal(8, 12),
      },
    },
    copy: {
      color: theme.palette.secondary.contrastText,
      display: 'grid',
      zIndex: 1,
      justifyItems: 'start',
      alignContent: 'end',
      position: 'relative',
      padding: `${theme.spacings.md}`,
      '& > *': {
        zIndex: 1,
        maxWidth: 'max-content',
      },
      [theme.breakpoints.up('md')]: {
        background: 'none',
        width: '60%',
        minHeight: '130vh',
      },
      [theme.breakpoints.up('lg')]: {
        padding: `${theme.spacings.lg} ${theme.spacings.lg}`,
        width: '50%',
      },
    },
    slidingItems: {
      '& > *': {
        height: 'auto !important',
      },
    },
  }),
  { name: 'ParagraphWithSidebarSlide' },
)

export type ParagraphWithSidebarSlideProps = UseStyles<typeof useStyles> &
  ContainerProps & {
    slidingItems: React.ReactNode
    background: React.ReactNode
    children: React.ReactNode
  }

export default function ParagraphWithSidebarSlide(props: ParagraphWithSidebarSlideProps) {
  const { background, slidingItems, children, ...containerProps } = props
  const classes = useStyles(props)

  return (
    <Row maxWidth={false} {...containerProps}>
      <div className={classes.wrapper}>
        <div className={classes.backstory}>
          <div className={classes.copy}>{children}</div>
          {background}
        </div>
        <div className={classes.slidingItems}>{slidingItems}</div>
      </div>
    </Row>
  )
}
