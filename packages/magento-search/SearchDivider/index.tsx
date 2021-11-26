import { styled } from '@material-ui/core'

const SearchDivider = styled('div')(
  ({ theme }) => ({
    boxShadow: theme.shadows[2],
    width: '100%',
    height: 16,
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.md,
  }),
  { name: 'FormDivider' },
)

export default SearchDivider
