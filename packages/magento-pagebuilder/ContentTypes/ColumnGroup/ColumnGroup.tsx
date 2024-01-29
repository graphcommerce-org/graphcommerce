import { Box } from '@mui/material'
import { ColumnGroupContentType } from './types'
import { extractAdvancedProps } from '../../utils'

/**
 * Page Builder ColumnGroup component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const ColumnGroup: ColumnGroupContentType['component'] = (props) => {
  const [cssProps, cssClasses, additional] = extractAdvancedProps(props)
  const { children, appearance, contentType } = additional

  return (
    <Box
      data-appearance={appearance}
      data-content-type={contentType}
      className={cssClasses.join(' ')}
      sx={cssProps}
    >
      {children}
    </Box>
  )
}
