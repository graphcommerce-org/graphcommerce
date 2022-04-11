import { Box } from '@mui/material'
import {
  extractBackgroundImagesProps,
  extractAdvancedProps,
  verticalAlignmentToFlex,
} from '../../utils'
import { TabItemContentType } from './types'

/**
 * Page Builder TabItem component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const TabItem: TabItemContentType['component'] = (props) => {
  const [cssProps, cssClasses, isHidden, additional] = extractAdvancedProps(props)
  const [imageProps, additional2] = extractBackgroundImagesProps(additional)

  const { minHeight, verticalAlignment, backgroundColor, tabName, children } = additional2

  return (
    <Box sx={{ ...cssProps, minHeight, alignItems: verticalAlignmentToFlex(verticalAlignment) }}>
      {children}
    </Box>
  )
}
