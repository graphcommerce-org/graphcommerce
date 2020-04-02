import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { GQLRowHeroVideoFragment } from '../../generated/graphql'
import { LinkInternal } from '../LinkInternal/LinkInternal'
import { LinkExternal } from '../LinkExternal/LinkExternal'
import RichText from '../RichText'
import Container, { ContainerStyles } from '../Container'
import logoReachBgShadow from '../../public/images/logo-reach-bg-shadow-secondary.svg'
import { vpCalc } from '../../layout/FullLayout'

const useContainerStyles = makeStyles<Theme, ContainerStyles>(
  (theme: Theme) => ({
    left: {
      alignSelf: 'stretch',
    },
    right: {},
    root: {
      background: `linear-gradient(to bottom right, transparent 50%, ${theme.palette.secondary.main} 50%)`,
      minHeight: 'calc(90vh - 60px)',
      alignItems: 'center',
    },
    after: {
      position: 'relative',
    },
    before: {},
  }),
  { name: 'RowHeroVideo' },
)

const useStyles = makeStyles(
  (theme: Theme) => ({
    videoContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '50vh',
      overflow: 'hidden',
    },
    video: {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      height: '100%',
      width: 'auto',
    },
    logo: {
      position: 'absolute',
      maxHeight: '100%',
      maxWidth: '92%',
      bottom: 0,
      right: 0,
    },
  }),
  { name: 'RowHeroVideo' },
)

/**
 * In GQLHeroBannerFragment you can see the data defined in ContentRenderer
 * Besides that link it is _just_ a regular function component.
 *
 * Registration of this component can be found in
 * ../ContentRenderer/ContentRenderer.graphql
 * ../ContentRenderer/defaultRenderer.tsx
 */
const RowHeroVideo: React.FC<GQLRowHeroVideoFragment> = ({ content, video, links }) => {
  // const { width, height, ref } = useResizeObserver<HTMLImageElement>({})
  const classes = useStyles()
  const containerClasses = useContainerStyles()

  const left = video && (
    <div className={classes.videoContainer}>
      <video autoPlay loop muted playsInline id='video' className={classes.video}>
        <source src={video.url} type={video.mimeType!} />
      </video>
    </div>
  )

  const right = (
    <>
      <RichText {...content} />
      <div>
        {links.map((link) => {
          if (link.__typename === 'LinkInternal') return <LinkInternal {...link} key={link.id} />
          if (link.__typename === 'LinkExternal') return <LinkExternal {...link} key={link.id} />
          return undefined
        })}
      </div>
    </>
  )

  return (
    <Container left={left} right={right} leftWidth={0.5} classes={containerClasses} spaceBetween>
      <img src={`${logoReachBgShadow}`} alt='Logo Reach Digital' className={classes.logo} />
    </Container>
  )
}

export default RowHeroVideo
