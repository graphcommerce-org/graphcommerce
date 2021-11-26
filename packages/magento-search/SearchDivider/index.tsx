import { styled } from '@material-ui/core'

const SearchDivider = styled('div')(
  ({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.md,
  }),
  { name: 'FormDivider' },
)

export default SearchDivider
