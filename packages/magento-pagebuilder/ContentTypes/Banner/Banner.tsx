import { Box } from '@mui/material'
import { ButtonLink } from '../../components/ButtonLink/ButtonLink'
import { MediaBackground } from '../../components/MediaBackground/MediaBackground'
import { TextRenderer } from '../../components/TextRenderer/TextRenderer'
import type { BannerContentType } from './types'

/**
 * Page Builder Banner component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const Banner: BannerContentType['component'] = (props) => {
  const { minHeight, content, overlayColor } = props

  return (
    <Box sx={{ display: 'grid', minHeight }}>
      <Box sx={{ gridArea: '1 / 1', position: 'relative', overflow: 'hidden' }}>
        <MediaBackground
          {...props}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            pointerEvents: 'none',
          }}
        />
      </Box>

      <Box
        sx={(theme) => ({
          gridArea: '1 / 1',
          zIndex: 1,
          display: 'grid',
          justifyContent: 'center',
          alignItems: 'center',
          p: theme.spacings.sm,
        })}
      >
        <Box sx={(theme) => ({ backgroundColor: overlayColor, p: theme.spacings.sm })}>
          <TextRenderer textContent={content} />
          <ButtonLink {...props} />
        </Box>
      </Box>
    </Box>
  )
}
