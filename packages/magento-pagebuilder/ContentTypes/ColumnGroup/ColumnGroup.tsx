import { Box } from '@mui/material'
import { ColumnGroupContentType } from './types'

/**
 * Page Builder ColumnGroup component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 */
export const ColumnGroup: ColumnGroupContentType['component'] = (props) => {
  const { display, children } = props

  return <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'initial' } }}>{children}</Box>
}
