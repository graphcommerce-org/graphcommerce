import { styled } from '@mui/material'
import { Row } from '../../Row/Row'
import { responsiveVal } from '../../Styles/responsiveVal'

export const BlogItemGrid = styled(Row, { name: 'BlogList' })(({ theme }) => ({
  display: 'grid',
  gap: theme.spacings.md,
  gridTemplateColumns: `repeat(auto-fill, minmax(${responsiveVal(150, 285)}, 1fr))`,
}))
