import { Container, Theme, Typography, makeStyles } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.gql'
import { RowProductFeatureFragment } from './RowProductFeature.gql'

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

type ProductFeatureProps = RowProductFeatureFragment & ProductFeatureMediaFragment

export default function RowProductFeature(props: ProductFeatureProps) {
  const { copy, topic, media_gallery } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  const item = media_gallery?.[2] ?? media_gallery?.[0]
  if (!item) return null

  return (
    <Container maxWidth={false} className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.asset}>
          {item.__typename === 'ProductImage' && item.url && (
            <PictureResponsiveNext
              alt={item.label ?? ''}
              width={328}
              height={328}
              src={item.url}
              type='image/jpeg'
            />
          )}
        </div>
        <div className={classes.copy}>
          {topic && (
            <Typography variant='body2' className={classes.topic}>
              {topic}
            </Typography>
          )}
          <RichText classes={richTextOneClasses} {...copy} />
        </div>
      </div>
    </Container>
  )
}
