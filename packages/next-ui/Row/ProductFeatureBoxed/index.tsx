import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import React from 'react'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
    },
    wrapper: {
      display: 'grid',
      border: `1px solid ${theme.palette.divider}`,
      justifyItems: 'center',
      columnGap: `${theme.spacings.lg}`,
      padding: 0,
      [theme.breakpoints.up('md')]: {
        background: 'none',
        gridTemplateColumns: '1fr auto',
        columnGap: `${theme.spacings.lg}`,
      },
    },
    asset: {
      height: '100%',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        height: '100%',
        width: responsiveVal(100, 600),
      },
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: `cover`,
      },
    },
    copy: {
      padding: `${theme.spacings.lg} 0`,
      color: theme.palette.text.primary,
      maxWidth: '80%',
      display: 'grid',
      alignContent: 'center',
      [theme.breakpoints.up('md')]: {
        maxWidth: '70%',
      },
      '& > *': {
        maxWidth: 'max-content',
      },
    },
    topic: {
      ...theme.typography.caption,
    },
    url: {
      ...theme.typography.body2,
      [theme.breakpoints.up('md')]: {
        ...theme.typography.h4,
      },
      color: theme.palette.text.primary,
    },
  }),
  { name: 'ProductFeatureBoxed' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  h2: {
    fontSize: responsiveVal(30, 56),
    maxWidth: '50%',
    color: theme.palette.text.primary,
    marginTop: responsiveVal(8, 20),
    marginBottom: responsiveVal(18, 20),
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    },
  },
}))

type ProductFeatureBoxedProps = UseStyles<typeof useStyles & typeof useRichTextOne> & {
  topic?: string
  RichContent: (props) => React.ReactElement
  item?: React.ReactNode
}

export default function ProductFeatureBoxed(props: ProductFeatureBoxedProps) {
  const { RichContent, topic, item } = props
  const classes = useStyles(props)
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.copy}>
          {topic && (
            <Typography variant='body2' className={classes.topic}>
              {topic}
            </Typography>
          )}
          <RichContent classes={richTextOneClasses} />
        </div>
        <div className={classes.asset}>{item}</div>
      </div>
    </Container>
  )
}
