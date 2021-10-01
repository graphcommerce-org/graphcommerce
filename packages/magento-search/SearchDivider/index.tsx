import { styled } from '@mui/material'

const SearchDivider = styled('div')(
  ({ theme }) => ({
    boxShadow: '0 5px 4px 0 rgb(3 3 3 / 3%)',
    width: '100%',
    height: 16,
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.md,
  }),
  { name: 'FormDivider' },
)

export default SearchDivider
