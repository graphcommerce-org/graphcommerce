import React from 'react'
import { makeStyles } from '@material-ui/core'
import LinkInternal from '../LinkInternal/LinkInternal'
import LinkExternal from '../LinkExternal/LinkExternal'
import RichText from '../RichText'
import Container from '../Container'

const useContainerStyles = makeStyles({
  left: {
    alignSelf: 'stretch',
  },
  right: {},
  after: {
    position: 'relative',
  },
  before: {},
})

const useStyles = makeStyles({
  video: {
    width: '100%',
  },
})

/**
 * In GQLHeroBannerFragment you can see the data defined in ContentRenderer
 * Besides that link it is _just_ a regular function component.
 *
 * Registration of this component can be found in
 * ../ContentRenderer/ContentRenderer.graphql
 * ../ContentRenderer/defaultRenderer.tsx
 */
const RowHero: React.FC<GQLRowHeroFragment> = ({ text, asset, links }) => {
  const classes = useStyles()
  const containerClasses = useContainerStyles()

  const left = asset && (
    <video autoPlay loop muted playsInline id='video' className={classes.video}>
      <source src={asset.url} type={asset.mimeType!} />
    </video>
  )

  const right = (
    <>
      <RichText {...text} />
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
    <Container left={left} right={right} leftWidth={0.5} classes={containerClasses} spaceBetween />
  )
}

export default RowHero
