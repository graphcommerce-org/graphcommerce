import { GQLRowHeroVideoFragment } from '../../generated/graphql'

/**
 * In GQLHeroBannerFragment you can see the data defined in ContentRenderer
 * Besides that link it is _just_ a regular function component.
 *
 * Registration of this component can be found in
 * ../ContentRenderer/ContentRenderer.graphql
 * ../ContentRenderer/defaultRenderer.tsx
 */
const RowHeroVideo: React.FC<GQLRowHeroVideoFragment> = ({ content, video }) => {
  return (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: content.html }} />

      {video && (
        <video autoPlay loop muted playsinline id='video' style={{ height: '200px' }}>
          <source src={video.url} type={video.mimeType!} />
        </video>
      )}
    </div>
  )
}

export default RowHeroVideo
