import { styled } from '@mui/material'

export const SearchOverlayBodyBase = styled('div', { name: 'SearchOverlayBodyBase' })(
  ({ theme }) => ({
    padding: `0 ${theme.page.horizontal} ${theme.page.vertical}`,
    '&:empty': { display: 'none' },
  }),
)
