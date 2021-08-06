import { makeStyles, Theme } from '@material-ui/core'

type UseProductListStylesProps = { count: number }

const useProductListStyles = makeStyles(
  (theme: Theme) => ({
    [theme.breakpoints.up('xl')]: {
      productList: {
        '& > :nth-child(7n + 3)': {
          gridColumn: 'span 2',
          gridRow: 'span 2',
          '& > a > div': {
            paddingTop: `calc(100% + ${theme.spacings.lg} - 7px)`,
          },
        },
      },
    },
  }),
  { name: 'ProductList' },
)

export default useProductListStyles
