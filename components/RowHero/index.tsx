import React from 'react'
import { makeStyles } from '@material-ui/core'
import LinkInternal from '../LinkInternal/LinkInternal'
import RichText from '../RichText'
import Container from '../Container'
import Asset from '../Asset'
import { UseStyles } from '../Theme'
import { UseRichTextStyles } from '../RichText/useRichTextStyles'
import Link from '../Link'

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

const useStyles = makeStyles(
  {
    video: {
      width: '100%',
    },
  },
  { name: 'RowHero' },
)

export type RowHeroProps = GQLRowHeroFragment &
  UseStyles<typeof useStyles> & {
    richTextClasses?: UseRichTextStyles['classes']
  }

/**
 * In GQLHeroBannerFragment you can see the data defined in ContentRenderer
 * Besides that link it is _just_ a regular function component.
 *
 * Registration of this component can be found in
 * ../ContentRenderer/ContentRenderer.graphql
 * ../ContentRenderer/defaultRenderer.tsx
 */
const RowHero: React.FC<RowHeroProps> = (props) => {
  const { text, asset, links, richTextClasses } = props
  const classes = useStyles(props)
  const containerClasses = useContainerStyles()

  const left = asset && (
    <Asset asset={asset} autoPlay loop muted playsInline className={classes.video} />
  )

  const right = (
    <>
      <RichText {...text} classes={richTextClasses} />
      <div>
        {links.map((link) => {
          if (link.__typename === 'LinkInternal' && link.page)
            return (
              <Link href={link.page.url} metaRobots={link.page.metaRobots} key={link.id}>
                {link.title}
              </Link>
            )
          if (link.__typename === 'LinkExternal')
            return (
              <a href={link.url} target='_blank' rel='noopener nofollow noreferrer' key={link.id}>
                {link.title}
              </a>
            )
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
