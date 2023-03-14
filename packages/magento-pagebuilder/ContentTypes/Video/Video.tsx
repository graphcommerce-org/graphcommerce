import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import { extractBorderProps, extractMarginProps, extractPaddingProps } from '../../utils'
import { VideoContentType } from './types'

const VideoBox = styled('video')({})
const IFrameBox = styled('iframe')({})

const youtubeRegExp = new RegExp(
  '^(?:https?://|//)?(?:www\\.|m\\.)?' +
    '(?:youtu\\.be/|youtube\\.com/(?:embed/|v/|watch\\?v=|watch\\?.+&v=))([\\w-]{11})(?![\\w-])',
)
const vimeoRegExp = new RegExp(
  'https?://(?:www\\.|player\\.)?vimeo.com/(?:channels/' +
    '(?:\\w+/)?|groups/([^/]*)/videos/|album/(\\d+)/video/|video/|)(\\d+)(?:$|/|\\?)',
)

/**
 * Page Builder Video component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page
 * Builder.
 */
export const Video: VideoContentType['component'] = (props) => {
  const [margin, additional] = extractMarginProps(props)
  const [border, additional2] = extractBorderProps(additional)
  const [padding, additional3] = extractPaddingProps(additional2)

  const { url, autoplay, muted, maxWidth, textAlign, cssClasses } = additional3

  if (!url) return null

  return (
    <Box sx={{ fontSize: '0', textAlign, ...margin }} className={cssClasses?.join(' ')}>
      <Box sx={{ display: 'inline-block', width: '100%', maxWidth }}>
        <Box sx={{ ...border, ...padding, overflow: 'hidden' }}>
          <Box sx={{ overflow: 'hidden', paddingTop: `${100 / (16 / 9)}%`, position: 'relative' }}>
            {youtubeRegExp.test(url) || vimeoRegExp.test(url) ? (
              <IFrameBox
                title={url}
                frameBorder='0'
                allowFullScreen
                loading='lazy'
                src={url}
                sx={{ position: 'absolute', height: '100%', left: 0, top: 0, width: '100%' }}
              />
            ) : (
              <VideoBox
                src={url}
                autoPlay={autoplay}
                muted={muted}
                controls
                sx={{ position: 'absolute', height: '100%', left: 0, top: 0, width: '100%' }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
