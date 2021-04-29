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
      background: 'rgba(0,0,0,0.03)',
      justifyItems: 'center',
      columnGap: `${theme.spacings.lg}`,
      padding: `${theme.spacings.xl} 0`,
      [theme.breakpoints.up('md')]: {
        padding: 0,
        background: 'none',
        gridTemplateColumns: '1fr 1fr',
        columnGap: `${theme.spacings.lg}`,
      },
    },
    asset: {
      height: '100%',
      width: responsiveVal(300, 900),
      '& img': {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
      },
    },
    copy: {
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
  { name: 'ProductFeature' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  h2: {
    maxWidth: '80%',
    fontSize: responsiveVal(30, 56),
    color: theme.palette.text.primary,
    marginTop: responsiveVal(8, 20),
    marginBottom: responsiveVal(18, 20),
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
    },
  },
  paragraph: {
    ...theme.typography.body1,
  },
}))

type ProductFeatureProps = UseStyles<typeof useStyles & typeof useRichTextOne> & {
  topic?: string
  RichContent: (props) => React.ReactElement
  item?: React.ReactNode
}

export default function ProductFeature(props: ProductFeatureProps) {
  const { RichContent, topic, item } = props
  const classes = useStyles(props)
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.asset}>{item}</div>
        <div className={classes.copy}>
          {topic && (
            <Typography variant='body2' className={classes.topic}>
              {topic}
            </Typography>
          )}
          <RichContent classes={richTextOneClasses} />
        </div>
      </div>
    </Container>
  )
}
