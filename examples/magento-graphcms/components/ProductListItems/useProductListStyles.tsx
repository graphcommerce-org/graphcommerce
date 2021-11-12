import { makeStyles, Theme } from '@material-ui/core'

const useProductListStyles = makeStyles(
  (theme: Theme) => ({
    [theme.breakpoints.up('xl')]: {
      productList: {
        '& > :nth-child(7n + 3)': {
          gridColumn: 'span 2',
          gridRow: 'span 2',
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: '100%',
          gridTemplateRows: '1fr auto',
          '& > div:first-of-type': {
            position: 'relative',
            height: '100%',
          },
        },
      },
    },
  }),
  { name: 'ProductList' },
)

export default useProductListStyles
