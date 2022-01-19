import { ContainerProps } from '@mui/material'
import { Row } from '..'
import { UseStyles } from '../../Styles'
import { responsiveVal } from '../../Styles/responsiveVal'
import { makeStyles, useMergedClasses } from '../../Styles/tssReact'

const useStyles = makeStyles({ name: 'ParagraphWithSidebarSlide' })((theme) => ({
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
      borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
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
}))

export type ParagraphWithSidebarSlideProps = UseStyles<typeof useStyles> &
  ContainerProps & {
    slidingItems: React.ReactNode
    background: React.ReactNode
    children: React.ReactNode
  }

export function ParagraphWithSidebarSlide(props: ParagraphWithSidebarSlideProps) {
  const { background, slidingItems, children, ...containerProps } = props
  let { classes } = useStyles()
  classes = useMergedClasses(classes, props.classes)

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
