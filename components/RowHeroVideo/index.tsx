import React from 'react'
import { styled } from '@material-ui/core'
import { GQLRowHeroVideoFragment } from '../../generated/graphql'
import { LinkInternal } from '../LinkInternal/LinkInternal'
import { LinkExternal } from '../LinkExternal/LinkExternal'

// Using https://cssinjs.org/styled-jss?v=v2.2.3#default-styled-function
const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}))
const Video = styled('video')({
  width: 200,
  display: 'block',
})

/**
 * In GQLHeroBannerFragment you can see the data defined in ContentRenderer
 * Besides that link it is _just_ a regular function component.
 *
 * Registration of this component can be found in
 * ../ContentRenderer/ContentRenderer.graphql
 * ../ContentRenderer/defaultRenderer.tsx
 */
const RowHeroVideo: React.FC<GQLRowHeroVideoFragment> = ({ content, video, links }) => {
  return (
    <Container>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: content.html }} />

      {video && (
        <Video autoPlay loop muted playsInline id='video'>
          <source src={video.url} type={video.mimeType!} />
        </Video>
      )}

      <div>
        {links.map(link => {
          if (link.__typename === 'LinkInternal') return <LinkInternal {...link} key={link.id} />
          if (link.__typename === 'LinkExternal') return <LinkExternal {...link} key={link.id} />
          return <></>
        })}
      </div>
    </Container>
  )
}

export default RowHeroVideo
