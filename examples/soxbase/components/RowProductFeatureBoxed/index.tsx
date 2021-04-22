import { Container, Theme, Typography, makeStyles } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import SectionHeader from '@reachdigital/next-ui/SectionHeader'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import { ProductFeatureMediaBoxedFragment } from './ProductFeatureMediaBoxed.gql'
import { RowProductFeatureBoxedFragment } from './RowProductFeatureBoxed.gql'

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

type RowProductFeatureBoxedProps = RowProductFeatureBoxedFragment & ProductFeatureMediaBoxedFragment

export default function RowProductFeatureBoxedBoxed(props: RowProductFeatureBoxedProps) {
  const { copy, topic, media_gallery } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  const item = media_gallery?.[1] ?? media_gallery?.[0]
  if (!item) return null

  return (
    <Container className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.copy}>
          {topic && <SectionHeader labelLeft={topic} />}
          <RichText classes={richTextOneClasses} {...copy} />
        </div>
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
      </div>
    </Container>
  )
}
