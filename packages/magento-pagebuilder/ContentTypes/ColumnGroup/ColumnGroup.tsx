import { Box } from '@mui/material'
import type { ColumnGroupContentType } from './types'

/**
 * Page Builder ColumnGroup component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const ColumnGroup: ColumnGroupContentType['component'] = (props) => {
  const { display, children } = props

  return <Box sx={{ flexWrap: { xs: 'wrap', md: 'initial' }, display }}>{children}</Box>
}
