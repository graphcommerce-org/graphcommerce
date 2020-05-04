import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import RichText from '../RichText'
import Asset from '../Asset'
import Container from '../Container'
import { ChevronRight } from '../Icons'
import { Button } from '../Link'
import { RowHeroProps } from '.'
import { useHeaderSpacing } from '../Header'

const useStyles = makeStyles(
  (theme: Theme) => ({
    headerWysiwyg: {
      color: theme.palette.tertiary.contrastText,
      '& a': {
        color: theme.palette.tertiary.contrastText,
        textDecoration: 'underline',
      },
    },
    video: {
      position: 'absolute',
      zIndex: -1,
      top: '0',
      width: '100%',
      height: '100%',
      margin: '0 auto',
      left: '50%',
      objectFit: 'cover',
      transform: 'translateX(-50%)',
    },
    aboutUsIntroContainer: {
      position: 'relative',
      zIndex: 0,
      background: theme.palette.tertiary['500'],
      paddingTop: theme.spacings.xxl,
      paddingBottom: theme.spacings.xl,
    },
    ctaBlock: {
      padding: 30,
      marginTop: 42,
      borderRadius: 3,
      border: '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#fff',
      '& small .MuiTypography-body1': {
        ...theme.typography.body2,
      },
      '& > :first-child': {
        flexGrow: 0,
        flexShrink: 1,
      },
      '& > :last-child': {
        flexGrow: 1,
        flexShrink: 0,
      },
    },
  }),
  { name: 'RowHeroVideoBackground' },
)

const useContainerStyles = makeStyles((theme: Theme) => ({
  left: { alignSelf: 'stretch' },
  root: {
    alignItems: 'center',
    paddingBottom: theme.spacings.xl,
  },
  after: { position: 'relative' },
}))

const useCtaStyles = makeStyles({
  paragraph: { marginBottom: 0 },
})

const RowHeroVideoBackground: React.FC<RowHeroProps> = ({
  text,
  asset,
  links,
  richTextClasses,
}) => {
  const classes = useStyles()
  const containerClasses = useContainerStyles()
  const ctaClasses = useCtaStyles()
  const headerSpacing = useHeaderSpacing()

  const left = (
    <div>
      <div className={`${classes.headerWysiwyg}`}>
        <RichText {...text} classes={richTextClasses} />
      </div>
      {links.map((link) => {
        if (link.__typename === 'LinkInternal' && link.page && link.description)
          return (
            <div key={link.id} className={classes.ctaBlock}>
              <small>
                <RichText {...link.description} classes={ctaClasses} />
              </small>
              <Button
                href={link.page.url}
                metaRobots={link.page.metaRobots}
                variant='contained'
                color='primary'
                endIcon={<ChevronRight />}
                size='large'
                disableElevation
              >
                {link.title}
              </Button>
            </div>
          )
        return undefined
      })}
    </div>
  )

  return (
    <div className={classes.aboutUsIntroContainer}>
      <Asset asset={asset} className={classes.video} />
      <Container left={left} leftWidth={0.5} classes={containerClasses} spaceBetween />
    </div>
  )
}

export default RowHeroVideoBackground
