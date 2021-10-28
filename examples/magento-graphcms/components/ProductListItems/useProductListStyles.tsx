import { makeStyles, Theme } from '@material-ui/core'

const useProductListStyles = makeStyles(
  (theme: Theme) => ({
    [theme.breakpoints.up('xl')]: {
      productList: {
        '& > :nth-child(7n + 3)': {
          gridColumn: 'span 2',
          gridRow: 'span 2',
        },
      },
    },
  }),
  { name: 'ProductList' },
)

export default useProductListStyles
