import { Box } from '@mui/material'
import { extractAdvancedProps } from '../../utils'
import { ColumnLineContentType } from './types'

/**
 * Page Builder ColumnGroup component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const ColumnLine: ColumnLineContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)
  const { children, appearance, contentType, display, width, sx } = additional

  return (
    <Box
      data-appearance={appearance}
      data-content-type={contentType}
      className={cssClasses.join(' ')}
      sx={[...(Array.isArray(sx) ? sx : [sx]), cssProps, { display, width }]}
    >
      {children}
    </Box>
  )
}
